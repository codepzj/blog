---
title: vscode中git放弃了所有更改怎么办
tags: [vscode]
categories: [技术分享]
permalink: posts/47.html
excerpt: "vscode中git放弃了所有更改怎么办，使用'本地历史记景：查找要还原的条目'来恢复"
poster:
  topic: null
  headline: vscode中git放弃了所有更改怎么办
  caption: null
  color: null
date: 2025-01-19 11:11:56
updated: 2025-01-19 11:11:56
topic:
banner:
references:
---

{% box %}
使用 vscode 的 git 管理工具的时候，不小心放弃了所有更改，这时候怎么办呢？
{% endbox %}

1. `Ctrl + Shift + P` 打开命令面板，输入 `Local History:Find Entry to Restore`，打开。
2. 选择你想要恢复的文件，直接点击即可。
   ![恢复文件](https://cdn.codepzj.cn/image/202501191122301.png)

目前没有找到特别好的方法，只能一个个文件恢复，如果有更好的方法，欢迎留言交流。
