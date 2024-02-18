import { createFiber } from "./createFiber";
import { renderHooks } from "./hooks";
import { Update, isArray, isStringOrNumber, updateNode } from "./utils";

export function updateHostComponent(wip) {

  // 更新自己
  if (!wip.stateNode) {
    wip.stateNode = document.createElement(wip.type);

    // 属性
    updateNode(wip.stateNode, {}, wip.props);
  }

  // 协调子节点
  reconcileChildren(wip, wip.props.children);
  // console.log('updateHostComponent wip:',wip);

}

export function updateFunctionComponent(wip) {
  renderHooks(wip);

  // 协调子节点
  const children = wip.type(wip.props);
  reconcileChildren(wip, children);

}

export function updateClassComponent(wip) {

  const { type, props } = wip;
  const instance = new type(props);
  const child = instance.render();
  // 协调子节点
  reconcileChildren(wip, child);

}

export function updateFragmentComponent(wip) {
  // 协调子节点
  reconcileChildren(wip, wip.props.children);

}

function reconcileChildren(returnFiber, children) {

  if (isStringOrNumber(children)) {
    // 文本内容不创建fiber
    return ;
  }
  const newChildren = isArray(children) ? children : [children];
  let previousNewFiber = null;
  let oldFiber = returnFiber.alternate && returnFiber.alternate.child;
  for (let i = 0; i < newChildren.length; i++) {
    const newChild = newChildren[i];
    const newFiber = createFiber(newChild, returnFiber);

    const same = sameNode(newFiber, oldFiber);

    if (same) {
      Object.assign(newFiber, {
        alternate: oldFiber,
        flags: Update,
        stateNode: oldFiber.stateNode
      })
    }

    if (oldFiber) {
      oldFiber = oldFiber.sibling;
    }

    if (previousNewFiber === null) {
      returnFiber.child = newFiber; // 头节点
    } else {
      previousNewFiber.sibling = newFiber;
    }

    previousNewFiber = newFiber;
  }
}

function sameNode(a, b) {
  return a && b && a.key === b.key && a.type === b.type;
}