## V8 垃圾回收

堆空间划分

- 新生代：存放生存时间短的对象
- 老生代：存放生存时间久的对象

![堆空间划分](./img/%E5%A0%86%E7%A9%BA%E9%97%B4%E5%88%92%E5%88%86.webp)

垃圾回收器

- 副垃圾回收器 - minor gc（scavenger）负责新生代
- 主垃圾回收器 - major gc 负责老生代

### 副垃圾回收器

新加入的对象都会存放到对象区域，**当对象区域快被写满时**，就需要执行一次垃圾清理操作。

首先对对象区域中的垃圾做标记，之后把存活对象复制到空闲区域，同时将这些对象有序排列（内存整理），故不存在内存碎片。最后将对象区域与空闲区域进行角色翻转。

因为复制操作需要时间成本，所以新生代空间一般设置得比较小，通常1~8M。

**对象晋升：经过两次垃圾回收依然存活的对象会移动到老生代。**

### 主垃圾回收器

除了晋升的对象，一些大对象会直接进老生代。

- 标记 - 清除：标记完成后，垃圾数据会被直接清除。
- 标记 - 整理：为了解决一块内存多次 标记-清除 会产生大量不连续内存碎片的问题。标记完成后，让所有存活对象向一端移动，然后直接清理这一端之外的内存。

老生代何时触发垃圾回收

- 某一个空间没有分块
- 空间被对象超过一定限制
- 空间不能保证新生代中的对象移动到老生代中

### 垃圾回收优化

> 全停顿（Stop-The-World）：js 运行在主线程上，一旦垃圾回收，脚本会被暂停，只能回收完毕再恢复脚本执行

- 并行回收（多个辅助线程）：时间缩短，但依然会全停顿。副垃圾回收器使用。
- 增量回收：将标记工作分解，穿插在主线程不同的任务之间执行。
- 并发回收：辅助线程在后台完成垃圾回收操作。

主垃圾回收器同时采用这三种策略
- 主要使用并发标记
- 标记完成之后，执行并行清理操作
- 另外还用了增量标记

![](./img/%E4%B8%BB%E5%9E%83%E5%9C%BE%E5%9B%9E%E6%94%B6.webp)