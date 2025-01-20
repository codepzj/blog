---
title: html2md-一款好用的html转md在线工具
tags: [html2md]
categories: [在线工具]
permalink: posts/40.html
excerpt: html2md，通过url将对应文章的内容爬取解析，转换成md格式，是一款非常好用的html转md在线工具
poster:
  topic: null
  headline: html2md-一款好用的html转md在线工具
  caption: null
  color: null
date: 2024-12-07 19:02:30
updated: 2024-12-07 19:02:30
topic:
banner:
references:
---

## 效果预览

https://www.helloworld.net/html2md

![html2md](https://image.codepzj.cn/image/202412072229884.png)

## Docker 部署

```yaml
version: "3.9"
services:
  html2md:
    image: "codepzj/html2md:1.0"
    container_name: html2md
    ports:
      - "3031:3031"
```
