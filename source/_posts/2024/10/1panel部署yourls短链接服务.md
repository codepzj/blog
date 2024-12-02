---
title: 1panel部署yourls短链接服务
tags: [短链接]
categories: [技术分享]
permalink: posts/20.html
excerpt: 本文讲述了在1panel上部署yourls短链接服务的方法。
poster:
  topic: null
  headline: 1panel部署yourls短链接服务
  caption: null
  color: null
date: 2024-10-20 18:42:14
updated: 2024-10-20 18:42:14
topic:
references:
---

今天给大家分享一下如何在 1panel 上部署 yourls 短链接服务。

## 安装 yourls 服务

首先，部署 yourls 需要 mysql 数据库，安装好后直接安装 yourls 即可。

{% image https://image.codepzj.cn/image/202410201847496.png 配置yourls width:600px %}

然后安装完成以后，大概长这个样子

{% image https://image.codepzj.cn/image/202410201914434.png yourls初始界面 width:600px %}

## 使用 Sleeky 主题

原装主题界面太丑了，建议使用 Sleeky 主题，安装方法如下：
{% link https://github.com/Flynntes/Sleeky Sleeky主题 icon:https://github.com/favicon.ico %}

- 前台：sleeky-frontend 下的文件夹下的所有文件上传到 yourls 的根目录下
- 后台：sleeky-backend 文件夹直接上传到根目录下的 user/plugins/下，在后台激活即可

## 遇到的 bug

{% hashtag 前端css样式丢失 https://github.com/Flynntes/Sleeky/issues/130 color:red %}

解决方法：在 yourls 根目录下的.htaccess 文件中添加以下内容

在前端主题 `frontend > header.php` 15 行的位置下删除 `<?php echo $YOURLS_SITE ?>`即可

## 效果预览图

{% image https://image.codepzj.cn/image/202410201933322.png 前台效果预览图 width:600px %}
{% image https://image.codepzj.cn/image/202410201935059.png 后台效果预览图 width:600px %}
