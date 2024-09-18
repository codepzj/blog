---
wiki: operating-system
title: 实验一、xv6及其系统调用
---

## 前言

### 在 wsl 中安装 QEMU 和构建 xv6-riscv

```bash
sudo apt-get update && sudo apt-get upgrade
sudo apt-get install git build-essential gdb-multiarch qemu-system-misc gcc-riscv64-linux-gnu binutils-riscv64-linux-gnu
```

从 Ubuntu 软件源拉取镜像：

![拉取镜像](https://image.codepzj.cn/image/202409181505666.png)

这个过程比较漫长，从**Ubuntu**的[软件源](http://archive.ubuntu.com/)获取的各种包的下载信息，大概需要下载 15min 左右

### 查看操作系统是否符合实验所需环境

```bash
codepzj@pzj666:/mnt/d/PZJ_PERSONAL/大三资料/xv6/xv6-riscv$ uname -a
Linux pzj666 5.15.153.1-microsoft-standard-WSL2 #1 SMP Fri Mar 29 23:14:13 UTC 2024 x86_64 x86_64 x86_64 GNU/Linux
```

该架构是符合要求的，uname -a 应该提到 **i386 GNU/Linux** 或 **i686 GNU/Linux** 或 **x86_64 GNU/Linux**

### 下载好 xv6 所需环境之后，使用 git 克隆所需工具

```bash
git clone git://g.csail.mit.edu/xv6-labs-2021

# 进入目录，并切换到util分支
cd xv6-labs-2021
git checkout util
```

根据文档，当前版本是为实验量身定制的**xv6**版本，比原本**risvc**分支领先一个提交
![查看riscv的提交记录](https://image.codepzj.cn/image/202409181532291.png)

### 编译并进入 xv6 系统

进入项目根目录，使用`make qemu`来编译和构建**qemu**虚拟机，进入 xv6 系统

{% copy make qemu prefix:$ %}

{% note 如果顺利的话，你会看见如下信息，就表示已经进入了 xv6 的交互界面：
xv6 kernel is booting<br>
hart 2 starting<br>
hart 1 starting<br>
init: starting sh
color:yellow %}

### 退出 xv6 系统

按下 {% kbd Ctrl %} + {% kbd A %} ，再松开两个按键，然后点击 {% kbd X %} 按键即可退出

## 快速开始

### sleep

这个 sleep 的程序是 xv6 的应用层程序，它的主要运行逻辑是：在终端进入睡眠状态，该状态持续的时间为用户输入的数值参数 t。而 t 的准确定义是：t 个由 xv6 定义的时间单位，一个时间单位为两次连续时间中断事件之间的延时（中断来自于底层的硬件计时器）。

此程序要用到 xv6 已有的系统调用——int sleep(int n)，但是需要 include 一些对应的头文件或库。大家可以在 xv6 源码目录中找到名为 user/的文件夹，这里已经有一些样本程序供大家参考，例如：user/echo.c, user/grep.c, and user/rm.c。

{% folding 提示 open:false color:yellow %}
（1） 请将“sleep.c”拷贝至 xv6 源码目录下的 user/文件夹下（图 1.1 主机系统层或者图 1.2 的虚拟机系统层）；
（2） 然后在 xv6 源码根目录下的 Makefile 文件里，找到关键字“UPROGS=\”（可能是第 179 行左右）,在其下面列出的多个以“&U”开头的字符串的下方（可能是第 195 行左右），添加一行“&U/\_sleep\”，并保存；
（3） 回到 xv6 的源码目录的根目录下，敲“make qemu”，以让 sleep.c 得以编译并在 xv6 内部形成可执行程序；
（4） 顺利进入到 xv6 的终端后，敲“./sleep 5”;
（5） 如果没有出错信息，该程序会在终端等待几秒钟延迟后，又回到了 xv6 的命令提示符。
{% endfolding %}

**实现逻辑**: 程序接受一个参数 ticks，验证其是否为有效整数。如果无效，则输出错误信息并退出。有效时，调用 sleep 函数暂停指定时间后正常退出。

```c
#include "kernel/types.h"
#include "kernel/stat.h"
#include "user/user.h"

int main(int argc, char *argv[])
{
  if (argc != 2)
  {
    fprintf(2, "Usage: sleep ticks\n");
    exit(1);
  }

  // get the tick from the second pattern
  char *tick_str = argv[1];
  for (int i = 0; tick_str[i] != '\0'; i++)
  {
    // validate whether a string can be converted to an integer
    if (!(tick_str[i] >= '0' && tick_str[i] <= '9'))
    {
      fprintf(2, "error: %s is not a integer\n", tick_str);
      exit(1);
    }
  }

  sleep(atoi(tick_str));
  exit(0);
}
```

### pingpong

第二个练手程序叫做 pingpong，是一个典型的进程通信应用。它的运行逻辑是：
父进程使用 fork()系统调用，创建一个子进程，然后使用管道 pipe，在两者之间进行
通信。例如：
（1） 父进程创建子进程；
（2） 父进程用管道向子进程发送信息（ping）；
（3） 子进程收到此信息后，回复父进程一个信息（pong）；
（4） 完成上述动作后，两者都退出。

{% folding 提示 open:false color:yellow %}
除了 fork 系统调用，上述过程还需要用到创建管道的系统调用 pipe。大家之前如果
没有用到的话，可以去网络上查一下它们的基本用法。虽然 xv6 对这些标准的系统调用的
实现会和 Linux 有所不同，但是接口的使用方法基本一致。此外，父进程与子进程可能需
要一个同步的动作，以免提前退出。
{% endfolding %}

**查询资料**：

- [管道的创建](https://jacktang816.github.io/post/pipe/)

管道通过调用 pipe 函数创建，通过 pipe(2)系统调用，让系统构建一个匿名管道，这样在进程中就打开了两个新的，打开的文件描述符：一个只读端和一个只写端。管道的两端是两个普通的，匿名的文件描述符，这就让其他进程无法连接该管道。 为了避免死锁并利用进程的并行运行的好处，有一个或多个管道的 UNIX 进程通常会调用 fork(2)产生新进程。 并且每个子进程在开始读或写管道之前都会关掉不会用到的管道端。或者进程会产生一个子线程并使用管道来让线程进行数据交换。

![父进程到子进程的管道](https://image.codepzj.cn/image/202409182235088.png)

**实现逻辑**: 通过 fork 克隆一个子进程，并通过 pipe 创建管道，通过正确设置管道的读/写端，父进程发送 "ping"，子进程接收并回复 "pong"，实现父子进程间的数据传输。

```c
#include "kernel/types.h"
#include "kernel/stat.h"
#include "user/user.h"

int main(int argc, char *argv[])
{
  int p1[2], p2[2];
  pipe(p1);
  pipe(p2);

  if (fork() > 0)
  {
    // parent process
    close(p1[0]);
    write(p1[1], "c", 1);
    close(p1[1]);

    close(p2[1]);
    char str[2];
    str[1] = '\0';
    read(p2[0], str, 1);
    printf("received pong\n");
    close(p2[0]);
  }
  else
  {
    // child process
    close(p1[1]);
    char buf[2];
    buf[1] = '\0';
    read(p1[0], &buf, 1);
    printf("received ping\n");
    close(p1[0]);

    close(p2[0]);
    write(p2[1], "s", 1);
    close(p2[1]);
  }

  exit(0);
}
```

### primes

这里的 prime 是质数的意思。该程序的逻辑是把 2-35 之间的质数筛选出来，并在
终端进行输出。看起来不是很难，但是本题目为了和 OS 的知识点进行结合，做出了以
下解题步骤约定：
（1） 父进程 A 生成[2-35]之间的所有数字，包括 2 和 35；
（2） 向 A 的子进程 B 进行输出（通过管道）；
（3） B 对[2-35]进行筛选，打印出第一个质数 2；
（4） B 把剩下的数字（通过）通过管道传递给 B 的子进程 C；
（5） C 打印出第二个质数，也即 3；
（6） 重复（4）和（5）的过程，直到 2-35 之间的质数全部在终端输出，如图 1.3 所示。

![primes](https://image.codepzj.cn/image/202409182247804.png)

{% folding 提示 open:false color:yellow %}
请注意关闭进程不需要的文件描述符，否则你的程序会在第一个进程达到 35 之前耗尽 xv6 的资源。一旦第一个进程达到 35，它应该等待整个管道终止，包括所有子进程、孙子进程等。因此，主要的 primes 进程应在所有输出打印完毕，并且所有其他 primes 进程退出后再退出。
当管道的写入端关闭时，read 返回零。直接将 32 位（4 字节）整数写入管道比使用格式化的 ASCII I/O 更简单。你应该在需要时才创建管道中的进程。将程序添加到 Makefile 中的 UPROGS。
{% endfolding %}

**实现逻辑**: 由主进程创建一个管道 p 用于进程间的通信，并随后创建一个子进程。子进程调用 hoare 函数开始处理已知的最小质数 2。在父进程中，关闭管道的读端，并依次向管道写入从 3 到 35 的所有整数。hoare 函数读取管道中的每个数字，检查它们是否能被已知的质数整除；如果不能被整除，则认为该数字可能是质数，并创建一个新的子进程继续这一过程。最终，当没有更多数字可读取时，所有子进程完成各自的任务，并由其父进程等待和回收。

```c
#include "kernel/types.h"
#include "kernel/stat.h"
#include "user/user.h"

void hoare(int prime, int *p)
{
  printf("prime %d\n", prime);
  close(p[1]);

  int triggered = 0;
  int value;
  int p2[2];
  pipe(p2);
  while (read(p[0], &value, 1) != 0)
  {
    if (value % prime != 0)
    {
      if (triggered == 0)
      {
        triggered = 1;
        if (fork() == 0)
        {
          hoare(value, p2);
        }
        else
        {
          close(p2[0]);
        }
      }
      else
      {
        write(p2[1], &value, 1);
      }
    }
  }
  close(p2[1]);
  close(p[0]);
}

int main(int argc, char *argv[])
{
  int p[2];
  pipe(p);

  if (fork() == 0)
  {
    // child process
    hoare(2, p);
  }
  else
  {
    // parent process
    close(p[0]);
    for (int i = 3; i <= 35; i++)
    {
      write(p[1], &i, 1);
    }
    close(p[1]);
  }

  while (wait(0) >= 0)
  {
    ;
  }

  exit(0);
}
```

## 实验总结

通过本次实验，我掌握了在 WSL 环境下搭建 QEMU 和配置 xv6 开发环境的方法，学习了常见系统调用如 sleep、fork 和 pipe 的应用，并通过实现 sleep、pingpong 和 primes 程序，加深了对进程管理、进程间通信及并发编程的理解，同时提升了调试技能和对操作系统内部工作机制的认识。

在 Go 语言中，channel 是一种用于 goroutine 之间通信的机制，它允许 goroutines 相互发送和接收值。而在操作系统层面，管道（pipe）是一种用于进程间通信（IPC）的技术，它允许一个进程的标准输出流（stdout）成为另一个进程的标准输入流（stdin）。对比于实验中 C 语言封装的 pipe，Go 的 Channel 更适合在同一进程内的 goroutine 之间进行高效、类型安全的通信，并且提供了丰富的并发编程支持。C 的 Pipe 则适用于进程间通信，尤其是父子进程之间的数据传递，但它需要更多的手工管理和错误处理。
