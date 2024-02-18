import { scheduleUpdateOnFiber } from "./ReactFiberWorkLoop";
import { isFn } from "./utils";

let currentlyRenderingFiber = null; // 当前正在工作的fiber
let workInProgressHook = null; // 当前的hook

// fiber(memoizedState)->hook0(next)->hook1(next)->hook2(next)->null
function updateWorkInProgressHook() {
  const current = currentlyRenderingFiber.alternate;
  let hook;
  if (current) {
    // 更新，在老的hook的基础上
    currentlyRenderingFiber.memorizedState = current.memorizedState;
    
    if (workInProgressHook) {
      // 不是头节点
      hook = workInProgressHook = workInProgressHook.next;
    } else {
      // 头节点
      hook = workInProgressHook = currentlyRenderingFiber.memorizedState;
    }
  } else {
    // 初次渲染
    hook = {
      memorizedState: null, // 值
      next: null // 下一个hook
    }
    if (workInProgressHook) {
      // 不是头节点
      workInProgressHook = workInProgressHook.next = hook;
    } else {
      // 头节点
      workInProgressHook = currentlyRenderingFiber.memorizedState = hook;
    }
  }


  return hook;

}

export function renderHooks(wip) {
  currentlyRenderingFiber = wip;
  workInProgressHook = null;
  currentlyRenderingFiber.memorizedState = null;
}

export function useReducer(reducer, initalState) {
  const hook = updateWorkInProgressHook();

  if (!currentlyRenderingFiber.alternate) {
    hook.memorizedState = initalState;
  }

  const dispatch = (action) => {
    // 修改状态值
    hook.memorizedState = reducer ? reducer(hook.memorizedState, action) : isFn(action) ? action(hook.memorizedState) : action;

    // 更新组件
    scheduleUpdateOnFiber(currentlyRenderingFiber);
  }
  return [hook.memorizedState, dispatch]
}

export function useState(initalState) {
  return useReducer(null, initalState);
}