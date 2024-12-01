---
title: nuxt初始化被墙解决方案（DNS污染）
tags: [nuxt]
categories: [设计开发]
permalink: posts/33.html
excerpt: nuxt初始化被墙，修改hosts文件解决
poster:
  topic: null
  headline: nuxt初始化被墙解决方案（DNS污染）
  caption: null
  color: null
date: 2024-11-27 23:49:00
topic:
banner:
references:
---

今天打算开始学习 nuxt 框架，结果初始化项目就报错了 🤣👉🤡

![nuxt 下载失败](https://image.codepzj.cn/image/202411272258324.png)

由于 `hosts` 的原因无法下载 nuxt

前往 C:\Windows\System32\drivers\etc\hosts，然后往里面加 2 条记录

```bash
185.199.108.133 raw.githubusercontent.com
185.199.108.133:443 raw.githubusercontent.com
```

打开 `cmd`

```bash
ipconfig /flushdns
```

更换 **淘宝镜像源**

```bash
nrm use taobao
```

下载 nuxt

```bash
npx nuxi@latest init myNuxt
```

![nuxt 成功下载](https://image.codepzj.cn/image/202411272336365.png)

问题成功解决，{% emoji blobcat blobcatflower %}
