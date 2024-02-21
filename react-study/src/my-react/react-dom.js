// vnode 虚拟dom节点

import { scheduleUpdateOnFiber } from "./ReactFiberWorkLoop";

// node 真实dom节点
function render(vnode, container) {
  const fiberRoot = {
    props: { children: vnode },
    type: container.nodeName.toLocaleLowerCase(),
    stateNode: container
  }
  scheduleUpdateOnFiber(fiberRoot);
}

export default {render};
