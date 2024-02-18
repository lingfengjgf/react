import { createFiber } from "./createFiber";
import { isArray, isStr, updateNode } from "./utils";

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

  if (isStr(children)) {
    // 文本内容不创建fiber
    return ;
  }
  const newChildren = isArray(children) ? children : [children];
  let previousNewFiber = null;
  for (let i = 0; i < newChildren.length; i++) {
    const newChild = newChildren[i];
    const newFiber = createFiber(newChild, returnFiber);

    if (previousNewFiber === null) {
      returnFiber.child = newFiber; // 头节点
    } else {
      previousNewFiber.sibling = newFiber;
    }

    previousNewFiber = newFiber;
  }
}