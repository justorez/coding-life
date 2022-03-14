## 内部实现

在 Chrome 中除了正常使用的消息队列之外，还有另外一个消息队列，这个队列中维护了需要延迟执行的任务列表，包括了定时器和 Chromium 内部一些需要延迟执行的任务。所以当创建一个定时器时，渲染进程会将该定时器的回调任务添加到延迟队列中。

```js
function showName() {
  console.log("极客时间")
}
var timerID = setTimeout(showName,200);
```

```c++
DelayedIncomingQueue delayed_incoming_queue;

struct DelayTask {
  int64 id；
  CallBackFunction cbf;
  int start_time;
  int delay_time;
};
DelayTask timerTask;
timerTask.cbf = showName;
timerTask.start_time = getCurrentTime(); // 获取当前时间
timerTask.delay_time = 200;// 设置延迟执行时间

delayed_incoming_queue.push(timerTask);
```

模拟消息循环
```c++
class TaskQueue {
  public:
    Task takeTask(); // 取出队列头部的一个任务
    void pushTask(Task task); // 添加一个任务到队列尾部
}
```

```c++
void ProcessDelayTask() {
  // 从 delayed_incoming_queue 中取出已经到期的定时器任务
  // 依次执行这些任务
}

TaskQueue task_queue；
void ProcessTask();
bool keep_running = true;
void MainTherad() {
  for(;;) {
    // 执行消息队列中的任务
    Task task = task_queue.takeTask();
    ProcessTask(task);
    
    // 执行延迟队列中的任务
    ProcessDelayTask()

    if(!keep_running) // 如果设置了退出标志，那么直接退出线程循环
        break; 
  }
}
```

## 注意事项

#### 1. 如果当前任务执行时间过久，会影响定时器任务的执行

```js
function bar() {
    console.log('bar')
}
function foo() {
    setTimeout(bar, 0) // 不会立即执行
    for (let i = 0; i < 5000; i++) {
        let i = 5+8+8+8
        console.log(i)
    }
}
foo()
```
#### 2. 如果 setTimeout 存在嵌套调用，那么系统会设置最短时间间隔为 4 毫秒

```js
function cb() { setTimeout(cb, 0); }
setTimeout(cb, 0);
```

在 Chrome 中，定时器被嵌套调用 5 次以上，系统会判断该函数方法被阻塞了，如果定时器的调用时间间隔小于 4 毫秒，那么浏览器会将每次调用的时间间隔设置为 4 毫秒。

#### 3. 未激活的页面，setTimeout 执行最小间隔是 1000 毫秒

为了优化后台页面的加载损耗以及降低耗电量。

#### 4. 延时执行时间有最大值

Chrome、Safari、Firefox 都是以 32 个 bit 来存储延时值的，如果 setTimeout 设置的延迟值大于 2147483647 毫秒（大约 24.8 天）时就会溢出，那么相当于延时值被设置为 0 了。
