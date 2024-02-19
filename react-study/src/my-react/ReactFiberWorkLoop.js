import { updateFunctionComponent, updateFragmentComponent, updateHostComponent, updateClassComponent } from "./ReactFiberReconciler";
import { Placement, Update, isFn, isStr, updateNode } from "./utils";
import { scheduleCallback, shouldYield } from "./scheduler";

// work in progress 当前正在工作的
let wipRoot = null;
let nextUnitOfWork = null;
export function scheduleUpdateOnFiber(fiber) {
  fiber.alternate = {...fiber};

  wipRoot = fiber;
  nextUnitOfWork = wipRoot;

  scheduleCallback(workLoop);
}

function perfornUnitOfWork(wip) {
  // 更新当前fiber
  const { type } = wip;
  if (isStr(type)) {
    // 原生标签
    updateHostComponent(wip);
  } else if (isFn(type)) {
    if (type.prototype.isReactComponent) {
      updateClassComponent(wip);
    } else {
      updateFunctionComponent(wip);
    }
  } else {
    updateFragmentComponent(wip);
  }

  // 返回下一个要更新的fiber
  if (wip.child) {
    return wip.child;
  }

  while (wip) {
    if (wip.sibling) {
      return wip.sibling;
    }

    wip = wip.return;
  }

  return null;
}

function workLoop() {
  while (nextUnitOfWork && !shouldYield()) {
    nextUnitOfWork = perfornUnitOfWork(nextUnitOfWork);
  }

  if (!nextUnitOfWork && wipRoot) {
    // vnode更新完了
    commitRoot();
  }
}

function commitRoot() {
  isFn(wipRoot.type) ? commitWoker(wipRoot) : commitWoker(wipRoot.child);
}

function invokeHooks(wip) {
  const { updateQueueOfEffect, updateQueueOfLayout } = wip;

  if (updateQueueOfLayout) {
    for (let i = 0; i < updateQueueOfLayout.length; i++) {
      const effect = updateQueueOfLayout[i];
      effect.create();
    }
  }

  if (updateQueueOfEffect) {
    for (let i = 0; i < updateQueueOfEffect.length; i++) {
      const effect = updateQueueOfEffect[i];
      scheduleCallback(() => {effect.create()});
    }
  }
}

function commitWoker(wip) {
  if (!wip) {
    return ;
  }

  if (isFn(wip.type)) {
    invokeHooks(wip);
  }

  // commit自己
  const parentNode = getParentNode(wip.return);
  const { flags, stateNode } = wip;

  if (flags & Placement && stateNode) {
    let hasSiblingNode = foundSiblingNode(wip, parentNode);
    if (hasSiblingNode) {
      parentNode.insertBefore(stateNode, hasSiblingNode);
    } else {
      parentNode.appendChild(stateNode);
    }
  }

  if (flags & Update && stateNode) {
   updateNode(stateNode, wip.alternate.props, wip.props);
  }

  // 检查wip有没有要删除的节点
  if (wip.deletions) {
    commitDeletions(wip.deletions, stateNode || parentNode);
  }


  // commit child
  commitWoker(wip.child);

  // commit sibling
  commitWoker(wip.sibling);
}

// 找后面最近的有dom节点的fiber
function foundSiblingNode(fiber, parentNode) {
  let siblingHasNode = fiber.sibling;
  let node = null;
  while (siblingHasNode) {
    node = siblingHasNode.stateNode;
    if (node && parentNode.contains(node)) {
      return node;
    }
    siblingHasNode = siblingHasNode.sibling;
  }

  return null;
}

function getParentNode(wip) {
  while (wip) {
    if (wip.stateNode) {
      return wip.stateNode;
    }

    wip = wip.return;
  }
}

function getStateNode(fiber) {
  while (!fiber.stateNode) {
    fiber = fiber.child;
  }

  return fiber.stateNode;
}

function commitDeletions(deletions, parentNode) {
  for (let i = 0; i < deletions.length; i++) {
    const element = deletions[i];
    parentNode.removeChild(getStateNode(element));
  }
}

// requestIdleCallback(workLoop);