---
wiki: notes
title: 2024/11
updated: 2024-11-1 00:00:00
excerpt: 2024年11月份的代码笔记，记录学习过程中遇到的难题以及解决问题的思路与方案。
---

{% folders %}

<!-- folder golang遍历文件夹，判断子文件类型 -->

```go
package main

import (
	"fmt"
	"os"
)

func main() {
	pathList, err := os.ReadDir("D:/Code/Program/Hexo")
	if err != nil {
		errMsg := fmt.Sprintf("读取失败，错误为：%v", err)
		panic(errMsg)
	}
	for _, pathName := range pathList {
		fmt.Println(pathName.Name(), pathName.IsDir())
	}
}
```

<!-- folder Linux修改主机名 -->

```shell
# 方法一
hostnamectl set-hostname "newHostName"
service network restart
# 方法二
echo "newHostName" > /etc/hostname

# 重启
sudo reboot
```

<!-- folder Linux修改ip地址 -->

```shell
cd /etc/sysconfig/network-scripts
vi ifcfg-ens33
```

然后修改 **IPADDR**

```shell
TYPE="Ethernet"
PROXY_METHOD="none"
BROWSER_ONLY="no"
BOOTPROTO="static"
DEFROUTE="yes"
IPV4_FAILURE_FATAL="no"
IPV6INIT="yes"
IPV6_AUTOCONF="yes"
IPV6_DEFROUTE="yes"
IPV6_FAILURE_FATAL="no"
IPV6_ADDR_GEN_MODE="stable-privacy"
NAME="ens33"
UUID="4e255d11-c746-4da9-af60-07462b04a19a"
DEVICE="ens33"
ONBOOT="yes"
IPADDR=192.168.202.202
GATEWAY=192.168.202.2
DNS1=192.168.202.2
```

重启网络

```shell
service network restart
```

<!-- folder golang如何读取文件内容 -->

{% box color:yellow %}

为什么不直接用 `os.ReadFile` 读取，再 string()转换成文件直接输出呢。因为直接读取整个文件会造成额外的内存开销，如果文件很大，就容易让内存负载过高，

{% endbox %}

```go
package main

import (
	"bufio"
	"fmt"
	"os"
)

func main() {
	file, _ := os.Open("D:/Code/Program/hexo/package.json")
	// 一行行读取
	scanner := bufio.NewScanner(file)
	for scanner.Scan() {
		fmt.Println(scanner.Text()) // 打印每一行
	}

	if err := scanner.Err(); err != nil {
		panic(err)
	}
}
```

<!-- folder golang如何使用channel优化读取速度 -->

{% tabs active: 2 align: center %}

<!-- tab 不使用goroutine -->

```go
package main

import (
	"fmt"
	"os"
	"time"
)

var (
	matches = 0
	query   = "test"
)

func Search(pathName string) {
	fileList, err := os.ReadDir(pathName)
	if err == nil {
		for _, file := range fileList {
			if file.Name() == query {
				fmt.Println(pathName+"/"+file.Name(), "matches")
				matches++
			}
			if file.IsDir() {
				Search(pathName + "/" + file.Name())
			}
		}
	}
}
func main() {
	startTime := time.Now()
	Search("D:/Code")
	fmt.Println(matches)
	fmt.Println(time.Since(startTime))
}
```

<!-- tab 使用goroutine -->

```go
package main

import (
	"fmt"
	"os"
	"sync"
	"time"
)

var query = "test"

// Search 函数接收一个路径，递归查找匹配的文件
func Search(pathName string, c chan int, wg *sync.WaitGroup) {
	defer wg.Done() // 确保每个 goroutine 执行完后，调用 Done()

	// 读取目录内容
	fileList, err := os.ReadDir(pathName)
	if err != nil {
		fmt.Println("Failed to read dir:", err)
		return
	}

	// 遍历文件列表
	for _, file := range fileList {
		// 如果是目录，递归查找
		if file.IsDir() {
			wg.Add(1) // 对每个子目录，增加 WaitGroup 计数
			go Search(pathName+"/"+file.Name(), c, wg)
		}
		// 如果文件名匹配，发送到通道
		if file.Name() == query {
			fmt.Println(pathName+"/"+file.Name(), "matches")
			c <- 1
		}
	}
}

func main() {
	startTime := time.Now()

	// 创建 WaitGroup 和通道
	var wg sync.WaitGroup
	c := make(chan int, 1000) // 使用缓冲通道来防止阻塞

	// 启动递归搜索
	wg.Add(1) // 初始计数
	go Search("D:/Code", c, &wg)

	// 先启动接收操作
	matches := 0
	go func() {
		for match := range c {
			matches += match
		}
	}()

	// 等待所有的 goroutine 完成
	wg.Wait()

	// 关闭通道
	close(c)

	// 输出结果
	fmt.Println("Total matches:", matches)
	fmt.Println("Time taken:", time.Since(startTime))
}
```

{% endtabs %}

<!-- folder golang互斥锁和读写锁的运用场景 -->

- 对于互斥锁，在对共享资源进行频繁的写操作且不希望同时有多个协程进行读写操作的场景下使用。
- 对于读写锁，在读操作远多于写操作的场景下，如缓存系统、配置文件读取等，可以提高并发性能。

<!-- folder 更新.gitignore发现文件已经加入缓冲区 -->

```bash
git rm -r --cached .
git add .
```
这样即可删除索引，重新加入暂存区，使.gitignore生效

{% endfolders %}
