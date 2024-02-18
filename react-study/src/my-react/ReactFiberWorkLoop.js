import { Component } from "react";
import { updateFunctionComponent, updateFragmentComponent, updateHostComponent, updateClassComponent } from "./ReactFiberReconciler";
import { isFn, isStr } from "./utils";

// work in progress 当前正在工作的
let wipRoot = null;
let nextUnitOfWork = null;
export function scheduleUpdateOnFiber(fiber) {
  wipRoot = fiber;
  nextUnitOfWork = wipRoot;
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

function workLoop(IdleDeadline) {
  while (nextUnitOfWork && IdleDeadline.timeRemaining() > 0) {
    nextUnitOfWork = perfornUnitOfWork(nextUnitOfWork);
  }

  if (!nextUnitOfWork && wipRoot) {
    // vnode更新完了
    commitRoot();
  }
}

function commitRoot() {
  commitWoker(wipRoot.child);
}

function commitWoker(wip) {
  if (!wip) {
    return ;
  }

  // commit自己
  const parentNode = getParentNode(wip.return);
  const { stateNode } = wip;
  if (stateNode) {
    parentNode.appendChild(stateNode);
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

requestIdleCallback(workLoop);