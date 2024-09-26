---
title: cloudflare解决cors跨域问题
tags: [cloudfare, cors]
categories: [技术分享]
permalink: posts/10.html
topic: station
poster:
  topic: null
  headline: cloudflare解决cors跨域问题
  caption: null
  color: null
date: 2024-09-25 13:52:34
description: 本文讲述了如何通过在 Cloudflare 控制台添加跨域规则来解决 CDN 导致的跨域问题，确保网站的某些样式和脚本能够正常加载。
banner: /assets/banner/cloudfare.webp
references:
  - "[cloudflare解决cors跨域问题](https://roy.wang/cloudflare-cors-error/)"
---

本站使用的cloudfare的cdn，今天在博客访问memos时出现了跨域，原因是使用 CloudFlare 会导致一部分跨域问题，使某些样式无法正常加载，不过最终还是找到了解决方案，记录一下。

## 解决方案

前往cloudfare控制台，**规则 > 转换规则 > 修改响应头 > 创建规则**

往里面新增一条跨域的规则

```txt
Access-Control-Allow-Methods: GET, HEAD, POST, OPTIONS
Access-Control-Allow-Origin: *
```

{% image https://image.codepzj.cn/image/202409251358919.png 允许所有的源发送跨域请求 %}

然后等待半分钟，强制刷新浏览器，即可生效

打开控制台，检测是否生效

{% image https://image.codepzj.cn/image/202409251404199.png origin和methods加到了响应头处 %}

配置成功，完美解决cloudfare的跨域问题
