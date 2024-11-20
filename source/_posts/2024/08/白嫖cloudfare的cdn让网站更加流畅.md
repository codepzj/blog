---
title: 白嫖cloudfare的cdn让网站更加流畅
tags: [cdn, cloudfare]
categories: [技术分享]
permalink: posts/1.html
excerpt: 本文讲述了CDN的作用和特点，以及如何使用Cloudflare免费CDN加速网站。
topic: station
poster:
  topic: null
  headline: 白嫖cloudfare的cdn让网站更加流畅
  caption: 免费cdn，抗DDOS，缓存静态资源
  color: null
date: 2024-08-16 00:07:34
updated: 2024-08-16 00:07:34
description:
references:
---

## cdn 是什么

**CDN** 英文全称 `Content Delivery Network`，中文翻译即为 [**内容分发网络**](https://cloud.tencent.com/product/cdn?from_column=20065&from=20065)。它是建立并覆盖在承载网之上，由分布在不同区域的边缘节点服务器群组成的分布式网络。

CDN 应用广泛，支持多种行业、多种场景内容加速，例如：图片小文件、大文件下载、视音频点播、直播流媒体、全站加速、安全加速。

所以 **cdn** 的作用就是，当用户使用网站，浏览器就会向服务器请求资源，而域名会通过 DNS 解析寻找距离请求地址最近的节点，并检查该请求是否命中节点中的缓存资源，如果命中，那么就直接返回数据；不命中的话，就直接向源站发请求，并把资源缓存到节点上。

cdn 的特点主要有 **加速内容传输**，**缓存机制**，**负载均衡**，**安全性提升** 等等特点。

## 测试我的网站不套 cdn 的速度

首先，推荐大家一个网站测速，[炸了么 - 网站测速, HTTP 测速, PING 检测, TCPPING 检测, CDN 测速, 多地区网站测速, 网络拨测工具 (zhale.me)](https://zhale.me/)

快速检测：

![快速检测](https://image.codepzj.cn/image/202410191438537.png)

慢速监测：

![慢速监测](https://image.codepzj.cn/image/202410191441441.png)

> 这两者的区别
>
> **快速检测**：指的是高并发场景，全国各地同时对源服务器请求到资源加载完全的平均时间
>
> **慢速监测**：指的是队列，一个一个请求发送，监测系统对单个请求的平均响应时间

## 使用 cloudfare 免费 cdn

进入 [cloudfare 官网](https://dash.cloudflare.com/)，注册你的域名

### 第一步、更换域名服务器

![更换 DNS 解析](https://image.codepzj.cn/image/202410191443051.png)

更换域名服务器，就是把将域名的 DNS 解析管理权给了该云厂商，假如说你使用的阿里云的域名就应该删除掉阿里云的 dns 解析记录，更换成 cloudfare，接下来你才能让 cloudfare 托管你的域名，并使用 cdn 加速，设置 A、AAAA、CNAME 等等的记录。

等待 cloudfare 验证 dns 解析等待大约 3-5 分钟

一路继续，设置成功。

### 第二步、更换 dns 解析记录

然后之前所有在旧云服务厂商设置的 dns 解析记录，全部迁移到 cloudfare 中

![更换 dns 解析记录](https://image.codepzj.cn/image/202410191503561.png)

在此处添加，**不要忘记要打开代理模式**，这样才会使用 cdn

### 第三步、设置一些免费的配置项优化网站

`安全性 > 自动程序`

![自动程序](https://image.codepzj.cn/image/202410191518476.png)

`速度 > 优化`

![激活 cloudfare 所有免费的功能](https://image.codepzj.cn/image/202410191628901.png)

还有一些免费的功能自己探索！
