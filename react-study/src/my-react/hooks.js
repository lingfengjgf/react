import { scheduleUpdateOnFiber } from "./ReactFiberWorkLoop";
import { HookLayout, HookPassive, areHookInputsEqual, isFn } from "./utils";

let currentlyRenderingFiber = null; // 当前正在工作的fiber
let workInProgressHook = null; // 当前的hook
let oldHook = null; // 老的hook 源码中是current

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
      oldHook = oldHook.next;
    } else {
      // 头节点
      hook = workInProgressHook = currentlyRenderingFiber.memorizedState;
      oldHook = current.memorizedState;
    }
  } else {
    // 初次渲染
    oldHook = null;
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
  currentlyRenderingFiber.updateQueueOfEffect = [];
  currentlyRenderingFiber.updateQueueOfLayout = [];
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

function updateEffectImpl(hookFlag, create, deps) {
  const hook = updateWorkInProgressHook();

  if (oldHook) {
    // 检查deps是否变化
    const prevEffect = oldHook.memorizedState;

    if (deps) {
      const prevDeps = prevEffect.deps;

      if (areHookInputsEqual(deps, prevDeps)) {
        return ;
      }
    }
  }

  const effect = {hookFlag, create, deps};
  hook.memorizedState = effect;

  if (hookFlag & HookPassive) {
    currentlyRenderingFiber.updateQueueOfEffect.push(effect);
  } else if (hookFlag & HookLayout) {
    currentlyRenderingFiber.updateQueueOfLayout.push(effect);
  }
}

export function useEffect(create, deps) {
  return updateEffectImpl(HookPassive, create, deps);
}

export function useLayoutEffect(create, deps) {
  return updateEffectImpl(HookLayout, create, deps);
}