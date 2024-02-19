import { createFiber } from "./createFiber";
import { Placement, Update, isArray, isStringOrNumber } from "./utils";

function deleteChild(returnFiber, childToDelete) {
  if (returnFiber.deletions) {
    returnFiber.deletions.push(childToDelete);
  } else {
    returnFiber.deletions = [childToDelete];
  }
}

function placeChild(
  newFiber,
  lastPlacedIndex,
  newIndex,
  shouldTrackSideEffects // 初次渲染（false）还是更新（true）
) {
  newFiber.index = newIndex;
  if (!shouldTrackSideEffects) {
    return lastPlacedIndex;
  }
  const current = newFiber.alternate;
  if (current) {
    const oldIndex = current.index;
    if (oldIndex < lastPlacedIndex) {
      // 相对位置发生变化
      newFiber.flags = Placement;
      return lastPlacedIndex;
    } else {
      return oldIndex;
    }
  } else {
    newFiber.flags = Placement;
    return lastPlacedIndex;
  }
}

function deleteRemainingChildren(returnFiber, currentFirstChild) {
  let childToDelete = currentFirstChild;
  while (childToDelete) {
    deleteChild(returnFiber, childToDelete);
    childToDelete = childToDelete.sibling;
  }
}

export function reconcileChildren(returnFiber, children) {
  if (isStringOrNumber(children)) {
    // 文本内容不创建fiber
    return;
  }
  const newChildren = isArray(children) ? children : [children];
  let previousNewFiber = null;
  let oldFiber = returnFiber.alternate && returnFiber.alternate.child;

  let shouldTrackSideEffects = !!returnFiber.alternate; // 是否是更新阶段
  let newIndex = 0; // 当前遍历的下标
  let lastPlacedIndex = 0; // 上次插入的位置
  let nextOldFiber = null;

  // 找能复用的节点
  for (; oldFiber && newIndex < newChildren.length; newIndex++) {
    const newChild = newChildren[newIndex];

    if (newChild === null) {
      continue;
    }

    if (oldFiber.index > newIndex) {
      nextOldFiber = oldFiber;
      oldFiber = null;
    } else {
      nextOldFiber = oldFiber.sibling;
    }
  
    const same = sameNode(newChild, oldFiber);

    if (!same) {
      if (oldFiber === null) {
        oldFiber = nextOldFiber;
      }
      break;
    }

    const newFiber = createFiber(newChild, returnFiber);
    Object.assign(newFiber, {
      alternate: oldFiber,
      flags: Update,
      stateNode: oldFiber.stateNode
    })

    lastPlacedIndex = placeChild(newFiber, lastPlacedIndex, newIndex, shouldTrackSideEffects);

    if (previousNewFiber === null) {
      returnFiber.child = newFiber;
    } else {
      previousNewFiber.sibling = newFiber;
    }
    previousNewFiber = newFiber;
    oldFiber = nextOldFiber;
  }

  // 能复用的已经找完了，如果老节点还有，直接删除
  if (newIndex === newChildren.length) {
    deleteRemainingChildren(returnFiber, oldFiber);
    return ;
  }

  // 初次渲染 或 老节点复用完了，新节点还有，新增
  if (!oldFiber) {
    for (; newIndex < newChildren.length; newIndex++) {
      const newChild = newChildren[newIndex];

      if (newChild === null) {
        continue;
      }
      const newFiber = createFiber(newChild, returnFiber);

      lastPlacedIndex = placeChild(newFiber, lastPlacedIndex, newIndex, shouldTrackSideEffects);

      if (previousNewFiber === null) {
        returnFiber.child = newFiber; // 头节点
      } else {
        previousNewFiber.sibling = newFiber;
      }

      previousNewFiber = newFiber;
    }

    return;
  }

  // 更新阶段，将链表转成Map，查找能复用的节点
  // 查找完老节点还有，新节点没了，删除老节点
  const existingChildren = mapRemainingChildren(oldFiber);
  for (; oldFiber && newIndex < newChildren.length; newIndex++) {
    const newChild = newChildren[newIndex];

    if (newChild === null) {
      continue;
    }

    const newFiber = createFiber(newChild, returnFiber);

    let matchedFiber = existingChildren.get(newFiber.key || newFiber.index);
    if (matchedFiber) {
      // 找到之后，将map中的删除
      existingChildren.delete(matchedFiber.key || matchedFiber.index);

      Object.assign(newFiber, {
        alternate: matchedFiber,
        flags: Update,
        stateNode: matchedFiber.stateNode
      })
    }

    lastPlacedIndex = placeChild(newFiber, lastPlacedIndex, newIndex, shouldTrackSideEffects);

    if (previousNewFiber === null) {
      returnFiber.child = newFiber;
    } else {
      previousNewFiber.sibling = newFiber;
    }
    previousNewFiber = newFiber;
  }

  // 检查map中还有没有老节点
  if (shouldTrackSideEffects) {
    existingChildren.forEach(child => deleteChild(returnFiber, child));
  }
}

function mapRemainingChildren(currentFirstChild) {
  const existingChildren = new Map();
  let existingChild = currentFirstChild;
  while (existingChild) {
    existingChildren.set(existingChild.key || existingChild.index, existingChild);
    existingChild = existingChild.sibling;
  }

  return existingChildren;
}

// export function reconcileChildren(returnFiber, children) {

//   if (isStringOrNumber(children)) {
//     // 文本内容不创建fiber
//     return ;
//   }
//   const newChildren = isArray(children) ? children : [children];
//   let previousNewFiber = null;
//   let oldFiber = returnFiber.alternate && returnFiber.alternate.child;
//   for (let i = 0; i < newChildren.length; i++) {
//     const newChild = newChildren[i];

//     if (newChild === null) {
//       continue ;
//     }
//     const newFiber = createFiber(newChild, returnFiber);

//     const same = sameNode(newFiber, oldFiber);

//     if (same) {
//       Object.assign(newFiber, {
//         alternate: oldFiber,
//         flags: Update,
//         stateNode: oldFiber.stateNode
//       })
//     }

//     if (!same && oldFiber) {
//       // 删除子节点
//       deleteChild(returnFiber, oldFiber);
//     }

//     if (oldFiber) {
//       oldFiber = oldFiber.sibling;
//     }

//     if (previousNewFiber === null) {
//       returnFiber.child = newFiber; // 头节点
//     } else {
//       previousNewFiber.sibling = newFiber;
//     }

//     previousNewFiber = newFiber;
//   }
// }

function sameNode(a, b) {
  return a && b && a.key === b.key && a.type === b.type;
}
