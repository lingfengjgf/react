import { Placement } from "./utils";

export function createFiber(vnode, returnFiber) {
  const newFiber = {
    type: vnode.type,
    key: vnode.key, //当前层级的唯一标识
    props: vnode.props,
    child: null, //第一个子fiber
    sibling: null, //下一个兄弟fiber
    return: returnFiber, //父fiber
    flags: Placement,
    alternate: null, //旧的fiber
    stateNode: null, //host:dom class:instance
  }

  return newFiber;
}