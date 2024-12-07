---
title: artalk配置社交登录踩坑日记
tags: [artalk]
categories: [技术分享]
permalink: posts/30.html
excerpt: 记录一次配置artalk登录配置遇到的坑，通过配置匿名登录，邮件登录，GitHub登录，微信登录来完善artalk的登录功能，其中微信登录要300元。
poster:
  topic: null
  headline: artalk配置社交登录踩坑日记
  caption: null
  color: null
date: 2024-11-17 15:03:13
updated: 2024-11-17 15:03:13
topic:
banner:
references:
---

## 社交登录

### 匿名登录

{% box %}

这是最简单的一个，勾选即可

{% endbox %}

![匿名登录](https://image.codepzj.cn/image/202411171842741.png)

### 邮件登录

{% box %}

邮件登录也是直接勾选

{% endbox %}

![邮件登录](https://image.codepzj.cn/image/202411171849759.png)

### GitHub 登录

请替换你的 **artalk 评论** 的域名

![设置回调地址](https://image.codepzj.cn/image/202411171505731.png)

然后去 [Github OAuth Apps](https://github.com/settings/developers) 创建一个 app

![创建一个 app](https://image.codepzj.cn/image/202411171510177.png)

{% note 注意

**Homepage** 写的是博客首页，**Callback** 写的是 artalk 对应的回调地址

color: red %}

### 微信登录

登录 [微信开放平台](https://open.weixin.qq.com/)

管理中心 > 网站应用 > 创建网站应用

{% box %}

每个账号最多能够创建 10 个网站应用

{% endbox %}

**网站信息登记表扫描件下载**

{% link https://open.weixin.qq.com/zh_CN/htmledition/res/assets/manage/Website_Information_Form.doc 网站信息登记表扫描件 %}

下载好后，填写自己的个人信息，去附近打印店打印，盖手印之类的，微信备案也挺麻烦的。不过审核速度真的快，1 天之内就搞定了{% emoji blobcat blobcatflower %}

如图是 **审核成功** 的结果：

![微信审核通过](https://image.codepzj.cn/image/202411171611411.png)

审核通过后，点击查看

![申请 AppSecret](https://image.codepzj.cn/image/202411171617055.png)

申请 AppSecret，和开通微信登录服务。

申请开通点击进去一看，人都傻了

![收费 300 元](https://image.codepzj.cn/image/202411171631109.png)

调用一个微信登录的 API 接口要 300！{% emoji blobcat blobcatdead %}，不过你是富哥/富姐的话，可以考虑开通（狗头保命）

对于我这种就不开通了，浪费钱！！

![三个登录方式](https://image.codepzj.cn/image/202411171852589.png)

一般来说，三个登录方式就够了，如果说用多种方式登录对应的邮箱是一致的，那么就可以合并到一个账户里面去。
