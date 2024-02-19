import { reconcileChildren } from "./ReactChildFiber";
import { renderHooks } from "./hooks";
import { updateNode } from "./utils";

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