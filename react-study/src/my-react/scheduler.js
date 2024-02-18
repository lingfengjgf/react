let taskQueue = [];
let timerQueue = [];
let deadline = 0;
let yieldInterval = 5;

const postMessage = () => {
  const { port1, port2 } = new MessageChannel();

  port1.onmessage = () => {
    const tem = timerQueue.splice(0, timerQueue.length);
    tem.forEach(cb => cb());
  }

  port2.postMessage(null);
}

function schedule(callback) {
  timerQueue.push(callback);
  postMessage();
}

export function scheduleCallback(callback) {
  const newTask = { callback };
  taskQueue.push(newTask);
  schedule(flushWork);
}

// 执行任务
function flushWork() {
  deadline = getCurrentTime() + yieldInterval;
  let currentTask = taskQueue[0];
  while (currentTask) {
    currentTask.callback();
    taskQueue.shift();
    currentTask = taskQueue[0];
  }
}

export function shouldYield() {
  return getCurrentTime() >= deadline;
}

export function getCurrentTime() {
  return performance.now();
}