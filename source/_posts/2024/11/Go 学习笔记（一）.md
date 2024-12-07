---
title: Go 学习笔记（一）
tags: [golang]
categories: [技术分享]
permalink: posts/31.html
excerpt: Golang的第一次学习笔记，涵盖锁（互斥锁，读写锁）、文件读写、原生http（客户端，服务端）的使用。
poster:
  topic: null
  headline: Go 学习笔记（一）
  caption: null
  color: null
date: 2024-11-23 17:26:07
updated: 2024-11-23 17:26:07
topic:
banner:
references:
---

## 锁的使用

在 Go 语言中，锁是一种重要的同步机制，用于确保在并发环境下对共享资源的安全访问。这里我们将介绍两种常见的锁：互斥锁和读写锁。

### 互斥锁

- **特点**：互斥锁会阻塞其他的读锁和写锁。这意味着在同一时刻，只有一个 goroutine 可以访问被互斥锁保护的资源。无论是读取还是写入操作，都会排斥其他的并发访问。这种严格的同步机制在对资源的访问需要高度一致性时非常有用，但在某些情况下可能会限制并发性能。

### 读写锁

- **特点**：读写锁相对于互斥锁更加灵活。它允许同时存在多个读锁，但排斥其他的写锁。这意味着在没有写操作进行时，多个 goroutine 可以同时读取被保护的资源，从而提高了并发读取的效率。然而，当有写操作进行时，所有的读操作和其他写操作都会被阻塞，以确保数据的一致性。

## `sync.Once`

`sync.Once` 是 Go 语言中一个非常有用的工具，用于确保某个操作只执行一次。

### 示例代码

```go
package main

import (
    "fmt"
    "sync"
)

func main() {
    o := &sync.Once{}
    for i := 0; i < 10; i++ {
        o.Do(func() {
            fmt.Println(i)
        })
    }
}
```

**结果分析**：在上述代码中，尽管循环执行了 10 次，但由于 `sync.Once` 的作用，内部的函数只会被执行一次。输出结果为 `0`，这展示了 `sync.Once` 确保操作只执行一次的强大功能。

## 并发安全的 `map`

在 Go 语言中，原生的 `map` 类型并不是并发安全的，这意味着在多个 goroutine 同时读写 `map` 时可能会导致数据不一致或程序崩溃。为了解决这个问题，Go 提供了 `sync.Map` 类型。

### 示例代码

```go
package main

import (
    "fmt"
    "sync"
)

func main() {
    m := sync.Map{}
    go func() {
        for {
            m.Store(1, 853)
        }
    }()
    go func() {
        for {
            fmt.Println(m.Load(1))
        }
    }()
    for {
    }
}
```

**注意事项**：

- Go 原生的 `map` 不支持异步读写。在并发环境下，如果尝试同时对原生 `map` 进行读写操作，可能会导致不可预测的结果。
- 为了保证并发安全，必须使用 `sync.Map`。`sync.Map` 提供了一系列方法，如 `Store` 用于存储键值对，`Load` 用于读取键对应的值，这些方法在并发环境下是安全的。

## 并发池 (`sync.Pool`)

`sync.Pool` 是 Go 语言中用于管理临时对象的一种机制，可以有效地减少内存分配的开销。

### 示例代码

```go
package main

import (
    "fmt"
    "sync"
    "time"
)

func main() {
    p := &sync.Pool{}
    p.Put(1)
    p.Put(2)
    p.Put(3)
    for {
        time.Sleep(1 * time.Second)
        fmt.Println(p.Get())
    }
}
```

**特点分析**：并发池 `sync.Pool` 可以存储临时对象，当需要使用这些对象时，可以从池中获取，而不是每次都重新分配内存。这样可以减少内存分配和垃圾回收的压力，提高程序的性能。

## 文件操作

在 Go 语言中，文件操作是一项常见的任务。这里我们将介绍文件的读写操作以及文件夹的操作。

### 文件读写

1. **直接文件读写**：

   ```go
   package main

   import (
       "fmt"
       "os"
   )

   func main() {
       f, err := os.OpenFile("test.txt", os.O_RDWR|os.O_CREATE, 0777)
       if err!= nil {
           panic("文件打开失败")
       }
       f.Write([]byte("how do you do\nwhat the help\nI like golang"))
       f.Seek(0, 0)
       for {
           b := make([]byte, 12)
           n, err := f.Read(b)
           fmt.Println(err)
           if err!= nil {
               return
           }
           fmt.Println(string(b), n)
       }
   }
   ```

   在这个例子中，我们首先打开一个文件，如果文件不存在则创建它。然后向文件中写入一些内容，并通过循环读取文件的内容。

2. **使用 bufio 进行文件读写**：

   ```go
   package main

   import (
       "bufio"
       "fmt"
       "os"
   )

   func main() {
       f, err := os.OpenFile("test.txt", os.O_RDWR|os.O_CREATE, 0777)
       if err!= nil {
           panic("文件打开失败")
       }
       reader := bufio.NewReader(f)
       for {
           str, err := reader.ReadString('\n')
           fmt.Println(str)
           if err!= nil {
               return
           }
       }
   }
   ```

   `bufio` 包提供了更方便的文件读写方式。在这个例子中，我们使用 `bufio.NewReader` 创建了一个读取器，然后逐行读取文件的内容。

### 文件夹操作

```go
package main

import (
    "fmt"
    "os"
)

func main() {
    dirEntry, err := os.ReadDir("./")
    if err!= nil {
        return
    }
    for _, file := range dirEntry {
        fmt.Println(file.Name())
        fmt.Println(file.IsDir())
        fmt.Println(file.Info()) // 字节信息
        fmt.Println(file.Type()) // 文件类型
    }
}
```

这个例子展示了如何读取当前文件夹下的文件和文件夹信息。通过 `os.ReadDir` 函数可以获取当前文件夹下的所有条目，然后可以获取每个条目的名称、是否为文件夹、字节信息和文件类型等。

### 写文件（使用 bufio.NewWriter）

```go
package main

import (
    "bufio"
    "fmt"
    "os"
    "strconv"
)

func main() {
    f, _ := os.OpenFile("test.txt", os.O_RDWR, 0777)
    reader := bufio.NewReader(f)
    writer := bufio.NewWriter(f)
    i := 0
    for {
        i++
        line, _, err := reader.ReadLine()
        if err!= nil {
            fmt.Println(err.Error())
            break
        }
        writer.WriteString(strconv.Itoa(i) + " " + string(line) + "\n")
    }
    f.Seek(0, 0)
    writer.Flush()
}
```

这个例子展示了如何使用 `bufio.NewWriter` 向文件中写入内容。首先打开一个文件，然后创建一个读取器和一个写入器。通过循环读取文件的每一行，并在每一行前面加上行号后写入文件。最后，调用 `writer.Flush` 确保所有的写入操作都被提交到文件中。

## http

HTTP 是现代应用程序中广泛使用的协议，Go 语言提供了强大的 HTTP 支持。

### 简单 HTTP 服务端

```go
package main

import "net/http"

func handler(rep http.ResponseWriter, req *http.Request) {
    rep.Write([]byte("hello world"))
}
func main() {
    http.HandleFunc("/test", handler)
    http.ListenAndServe(":8081", nil)
}
```

这个例子创建了一个简单的 HTTP 服务端，当接收到 `/test` 路径的请求时，返回 `hello world`。

### 支持 GET 和 POST 请求

```go
package main

import (
    "io"
    "net/http"
)

func handler(rep http.ResponseWriter, req *http.Request) {
    method := req.Method
    switch method {
    case "GET":
        rep.Write([]byte("这是一个 GET 请求"))
    case "POST":
        body, _ := io.ReadAll(req.Body)
        header := rep.Header()
        header["myheader"] = []string{"myvalue"}
        rep.WriteHeader(http.StatusBadRequest)
        rep.Write(body)
    }
}
func main() {
    mux := http.NewServeMux()
    mux.HandleFunc("/test", handler)
    http.ListenAndServe(":8081", mux)
}
```

这个例子中的服务端可以处理 GET 和 POST 请求。根据请求的方法不同，返回不同的响应内容，并设置响应头。

### HTTP 服务端 + 客户端

服务端代码：

```go
package main

import (
    "fmt"
    "io"
    "net/http"
    "time"
)

func handler(resp http.ResponseWriter, req *http.Request) {
    method := req.Method
    switch method {
    case "GET":
        resp.Write([]byte("这是一个 GET 请求"))
    case "POST":
        body, _ := io.ReadAll(req.Body)
        header := resp.Header()
        fmt.Println(string(body))
        header["myheader"] = []string{"myvalue"}
        resp.WriteHeader(http.StatusBadRequest)
        resp.Write(body)
    }
}
func main() {
    mux := http.NewServeMux()
    mux.HandleFunc("/test", handler)
    go func() {
        time.Sleep(1 * time.Second)
        client.Request()
    }()
    http.ListenAndServe(":8081", mux)
}
```

客户端代码：

```go
package client

import (
    "bytes"
    "fmt"
    "net/http"
)

func Request() {
    client := new(http.Client)
    jsonData := `{"name":"pzj","age":"20"}`
    r1, _ := http.NewRequest("POST", "http://localhost:8081/test", bytes.NewBuffer([]byte(jsonData)))
    resp, _ := client.Do(r1)
    fmt.Println(resp.Header)
}
```

这个例子展示了一个完整的 HTTP 服务端和客户端的交互。服务端可以处理 GET 和 POST 请求，并在接收到 POST 请求时打印请求体内容并设置响应头。客户端发送一个 POST 请求，并打印响应头信息。

注意事项：在进行 HTTP 编程时，要注意处理各种请求方法、设置正确的响应状态码和响应头，以及处理可能出现的错误情况。同时，合理地设计服务端和客户端的交互流程，可以提高应用程序的可靠性和性能。
