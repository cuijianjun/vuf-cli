#### node 多进程源码

- exec/execFile/spawn/fork的区别
  - Exec: 原理是调用/bin/sh -c 执行我们传入的shell脚本，底层调用了execFile
  - execFile: 原理是直接执行我们传入的file和args，底层调用spawn创建和执行子进程，并建立了回调，一次性将所有的stdout和stderr结果返回
  - spawn：原理是调用了internal/child_process,实例化了ChildProcess子进程对象，在调用child.spawn创建子进程并执行命令，底层是调用了child._handle.spawn执行process_wrap中的spawn方法，执行创建过程是异步的，执行完毕后通过PIPE进行单向数据通信，通信结束后会子进程发起onexit回调，同事socket会执行close回调
  - fork：原理是通过spawn创建子进程和执行命令，通过setupchannel创建IPC用于子进程和父进程之间的双向通信
- data/error/exit/close回调的区别
  - data:主进程读取数据过程中通过onstreamRead发起的回调
  - error：命令执行失败后发起的回调
  - exit：子进程关闭完成后发起的回调
  - close：子进程所有的Socket通信端口全部关闭后发起的回调
  - stdout close/stderr close ： 特定的PIPE读取完成后调用onReadableStreamEnd关闭Socket时发起的