---
title: windows下git对文件名大小写不敏感的bug
tags: [git]
categories: [Bug]
permalink: posts/5.html
poster:
  topic: null
  headline: windows下git对文件名大小写不敏感的bug
  caption: null
  color: null
date: 2024-09-01 14:11:55
topic:
description: 本文讲述了通过配置Git以识别文件名大小写变化，确保文件重命名操作能够被正确追踪。
banner: /assets/banner/git.jpg
references:
---

今天设置 blog 的 banner 的时候，有一张图片`TailwindCSS.jpg`是包含大写字母，放在一堆小写字母的文件中，我直接改名成`tailwindcss.jpg`，但是改名推送到远程仓库的时候发现文件名并没有改变，而且本地的 git 并没有把这个修改记录进去

{% note 注意
这是因为 git 默认情况下是不区分大小写的，你更改了以后它还认为是大写的，它只关心文件内容是否变化，而不关心文件名是否变化。
color:red %}

让 git 能够识别大小写，其实做法非常简单，只需要一行配置就搞定了：

```bash
git config core.ignorecase false
```
