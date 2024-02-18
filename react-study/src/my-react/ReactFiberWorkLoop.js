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

function commitWoker(wip) {
  if (!wip) {
    return ;
  }

  // commit自己
  const parentNode = getParentNode(wip.return);
  const { flags, stateNode } = wip;
  if (flags & Placement && stateNode) {
    parentNode.appendChild(stateNode);
  }

  if (flags & Update && stateNode) {
   updateNode(stateNode, wip.alternate.props, wip.props);
  }


  // commit child
  commitWoker(wip.child);

  // commit sibling
  commitWoker(wip.sibling);
}

function getParentNode(wip) {
  while (wip) {
    if (wip.stateNode) {
      return wip.stateNode;
    }

    wip = wip.return;
  }
}

// requestIdleCallback(workLoop);