---
title: cloudflare解决cors跨域问题
tags: [cloudfare, cors]
categories: [技术分享]
permalink: posts/10.html
excerpt: 本文讲述了在使用CloudFlare的过程中的跨域问题。
topic: station
poster:
  topic: null
  headline: cloudflare解决cors跨域问题
  caption: null
  color: null
date: 2024-09-25 13:52:34
updated: 2024-09-25 13:52:34
description:

references:
  - "[cloudflare解决cors跨域问题](https://roy.wang/cloudflare-cors-error/)"
---

本站使用的 cloudfare 的 cdn，今天在博客访问 memos 时出现了跨域，原因是使用 CloudFlare 会导致一部分跨域问题，使某些样式无法正常加载，不过最终还是找到了解决方案，记录一下。

## 解决方案

前往 cloudfare 控制台，**规则 > 转换规则 > 修改响应头 > 创建规则**

往里面新增一条跨域的规则

```txt
Access-Control-Allow-Methods: GET, HEAD, POST, OPTIONS
Access-Control-Allow-Origin: *
```

{% image https://image.codepzj.cn/image/202410191651907.png 允许所有的源发送跨域请求 %}

然后等待半分钟，强制刷新浏览器，即可生效

打开控制台，检测是否生效

{% image https://image.codepzj.cn/image/202410191713308.png origin和methods加到了响应头处 %}

配置成功，完美解决 cloudfare 的跨域问题
