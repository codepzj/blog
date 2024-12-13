---
title: cnpm同步npm发布的包
tags: [npm]
categories: [技术分享]
permalink: posts/43.html
excerpt: cnpm同步npm发布的包，解决数据源没及时更新，无法拉取最新包的问题。
poster:
  topic: null
  headline: cnpm同步npm发布的包
  caption: null
  color: null
date: 2024-12-13 23:54:42
updated: 2024-12-13 23:54:42
topic:
banner:
references:
---

在 npm 发布新的包后，下载的时候发现从 npm 仓库拉下来的不是刚刚最新发布到仓库的包，原因是我们太"墙"大了，cnpm 还没有把 npm 包给同步过来，可能得 1，2 天左右。

所以我们要手动同步，前往https://npmmirror.com/package/hexo-graph

后面填写你的`<package_name>`

点击 Sync 按钮，手动同步

![同步日志](https://image.codepzj.cn/image/202412132358992.png)

我看网上有人用，CI/CD 在发布包的时候，顺便同步了 cnpm 仓库，不过有时间再研究了

大功告成
