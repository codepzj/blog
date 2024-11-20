---
title: 使用stellar标签和代码片段在vscode中高效编写博客
tags: [stellar]
categories: [技术分享]
permalink: posts/9.html
excerpt: 这篇文章介绍了如何在VSCode中配置md写作时的代码片段。
poster:
  topic: null
  headline: 使用stellar标签和代码片段在vscode中高效编写博客
  caption: null
  color: null
date: 2024-09-24 00:16:46
updated: 2024-09-24 00:16:46
topic:
description:

references:
---

## 前言

{% note 什么是代码片段
代码片段（Code Snippets），指的是一些使用率很高的代码模板，用户可以通过‘文件 > 首选项 > 用户片段’来创建自定义代码片段。每个代码片段包含‘key’（输入标记）、‘prefix’（触发提示的前缀）和‘body’（代码主体）。通过输入‘prefix’并按Tab键，可以在文件中快速插入预设的代码结构。详细步骤和更多高级配置可以参考相关链接。
color:yellow %}

stellar 博客标签种类繁多，每一个标签书写起来都得查阅 stellar 官方文档，非常麻烦，所以我配置了一下 vscode 当中书写 markdown 的代码片段，节省书写博客中查阅 stellar 标签耗费的时间

## 快速开始

在根目录新建一个`.vscode`文件夹

新建一个文件`settings.json`，往里面写入：

{% folding settings.json的作用 open:false color:default %}
vscode 当中 markdown 格式的文件是无法使用代码片段的，所以需要用户加入一些自定义片段，允许在 markdown 文件当中使用代码片段
{% endfolding %}

```json
{
  "[markdown]": {
    "editor.quickSuggestions": {
      "other": true,
      "comments": false,
      "strings": false
    }
  }
}
```

新建 hexo 博客代码片段，`设置 > 用户代码片段 > 新建"hexo"文件夹的代码片段文件`，将其命名为 markdown

然后往这个`.vscode/markdown.code-snippets`文件写入：

```json
{
  "Emoji Tag": {
    "prefix": "emoji",
    "body": ["{% emoji ${1:source} ${2:name} ${3:height:1.75em} %}"],
    "description": "Insert emoji tag"
  },
  "Icon Tag": {
    "prefix": "icon",
    "body": ["{% icon ${1:icon-source} %}"],
    "description": "Insert icon tag"
  },
  "Mark Tag": {
    "prefix": "mark",
    "body": ["{% mark ${1:内容} ${2:color:default} %}"],
    "description": "Insert mark tag"
  },
  "Hashtag Tag": {
    "prefix": "hashtag",
    "body": ["{% hashtag ${1:text} ${2:url} ${3:color:default} %}"],
    "description": "Insert hashtag tag"
  },
  "Image Tag": {
    "prefix": "image",
    "body": [
      "{% image ${1:src} ${2:description} ${3:download:bool/string} ${4:width:px} ${5:padding:px} %}"
    ],
    "description": "Insert image tag"
  },
  "Quot Tag": {
    "prefix": "quot",
    "body": ["{% quot ${1:内容} %}"],
    "description": "Insert quot tag"
  },
  "Poetry Tag": {
    "prefix": "poetry",
    "body": [
      "{% poetry ${1:诗名} author:${2:作者} footer:${3:节选} %}\n${4:诗内容}\n{% endpoetry %}"
    ],
    "description": "Insert poetry tag"
  },
  "Paper Tag": {
    "prefix": "paper",
    "body": [
      "{% paper style:${1:样式} title:${2:标题} author:${3:作者} date:${4:日期} footer:${5:节选} %}\n${6:内容}\n{% endpaper %}"
    ],
    "description": "Insert paper tag"
  },
  "Reel Tag": {
    "prefix": "reel",
    "body": [
      "{% reel ${1:作品} author:${2:作者} date:${3:日期} footer:${4:节选} %}\n${5:内容}\n{% endreel %}"
    ],
    "description": "Insert reel tag"
  },
  "Note Tag": {
    "prefix": "note",
    "body": ["{% note ${1:title} ${2:内容} ${3:color:yellow} %}"],
    "description": "Insert note tag"
  },
  "Link Tag": {
    "prefix": "link",
    "body": ["{% link ${1:href} ${2:title} ${3:icon:src} %}"],
    "description": "Insert link tag"
  },
  "Button Tag": {
    "prefix": "button",
    "body": [
      "{% button ${1:text} ${2:url} ${3:icon:key/src} ${4:color:color} ${5:size:xs} %}"
    ],
    "description": "Insert button tag"
  },
  "OKR Goal": {
    "prefix": "okr",
    "body": [
      "{% okr ${1:o1} %}",
      "${2:2024年的小目标：独立开发一个商城系统}",
      "来自${3:2025年的复盘：已《基本》实现目标} {% emoji blobcat blobcatflower %}",
      "<!-- okr kr1 percent:${4:0.9} -->",
      "${5:学习vue3和golang的基本语法}",
      "- ${6:element-plus的使用}",
      "- ${7:gorm的使用}",
      "<!-- okr kr2 percent:0 status:off_track -->",
      "${8:开发商城购物前台}",
      "<!-- okr kr3 percent:0 status:unfinished -->",
      "${9:开发商城管理后台}",
      "<!-- okr kr4 status:at_risk -->",
      "${10:开发、测试和发布}",
      "${11:大概率完不成了。。。}",
      "{% endokr %}"
    ],
    "description": "Insert an OKR goal"
  },
  "Copy Command": {
    "prefix": "copy",
    "body": ["{% copy ${1:command} prefix:$ %}"],
    "description": "Insert a copy command"
  },
  "Radio Button": {
    "prefix": "radio",
    "body": [
      "{% radio color:${1:red} ${2:未勾选的单选框} %}",
      "{% radio checked:true color:${3:green} ${4:已勾选的单选框} %}"
    ],
    "description": "Insert radio button"
  },
  "Checkbox": {
    "prefix": "checkbox",
    "body": [
      "{% checkbox ${1:普通的没有勾选的复选框} %}",
      "{% checkbox checked:true ${2:普通的已勾选的复选框} %}",
      "{% checkbox symbol:plus color:green checked:true ${3:显示为加号的绿色的已勾选的复选框} %}",
      "{% checkbox symbol:minus color:yellow checked:true ${4:显示为减号的黄色的已勾选的复选框} %}",
      "{% checkbox symbol:times color:red checked:true ${5:显示为乘号的红色的已勾选的复选框} %}"
    ],
    "description": "Insert checkboxes"
  },
  "Audio Tag": {
    "prefix": "audio",
    "body": ["{% audio type:${1:2} netease:${2:1856385686} autoplay:${3:0} %}"],
    "description": "Insert audio tag"
  },
  "Video Tag": {
    "prefix": "video",
    "body": [
      "{% video bilibili:${1:BV1BK411L7DJ} width:${2:80%} autoplay:${3:0} %}"
    ],
    "description": "Insert video tag"
  },
  "Navbar": {
    "prefix": "navbar",
    "body": [
      "{% navbar active:${1:/wiki/} ${2:[文章](/)} ${3:[项目](/wiki/)} ${4:[留言](#comments)} ${5:[GitHub](https://github.com/codepzj)} %}"
    ],
    "description": "Insert a navigation bar"
  },
  "Frame": {
    "prefix": "frame",
    "body": [
      "{% frame iphone11 img:${1:https://xaoxuu.com/assets/wiki/prohud/toast/demo-loading.png} video:${2:https://xaoxuu.com/assets/wiki/prohud/toast/demo-loading.mp4} focus:${3:top} %}"
    ],
    "description": "Insert device frame"
  },
  "Text Decoration": {
    "prefix": "textdecoration",
    "body": [
      "- 这是 {% psw ${1:密码} %} 标签",
      "- 这是 {% u ${2:下划线} %} 标签",
      "- 这是 {% emp ${3:着重号} %} 标签",
      "- 这是 {% wavy ${4:波浪线} %} 标签",
      "- 这是 {% del ${5:删除线} %} 标签",
      "- 这是 {% sup ${6:上角标} color:${7:red} %} 标签",
      "- 这是 {% sub ${8:下角标} %} 标签",
      "- 这是 {% kbd ${9:键盘样式} %} 标签，试一试：{% kbd Ctrl %} + {% kbd S %}"
    ],
    "description": "Insert text decoration tags"
  },
  "Static Timeline": {
    "prefix": "timeline",
    "body": [
      "{% timeline %}",
      "<!-- node ${1:2024 年 8 月 28 日} -->",
      "${2:逐渐熟悉 **Stellar** 标签的用法}",
      "<!-- node ${3:2024 年 8 月 18 日} -->",
      "${4:初步建站，使用的 hexo-theme-stellar 主题}",
      "{% endtimeline %}"
    ],
    "description": "Insert a static timeline"
  },
  "Render Markdown": {
    "prefix": "md",
    "body": [
      "{% md ${1:https://cdn.jsdmirror.com/gh/codepzj/AIContentSummaryCuteen/README.md} %}"
    ],
    "description": "Render external markdown file"
  },
  "GHCard": {
    "prefix": "ghcard",
    "body": ["{% ghcard ${1:codepzj} %}", "{% ghcard ${2:codepzj/blog} %}"],
    "description": "Insert GitHub card"
  },
  "TOC": {
    "prefix": "toc",
    "body": ["{% toc wiki:${1:xxx} [open:${2:true}] ${3:title} %}"],
    "description": "Insert a document table of contents"
  },
  "Folding Container": {
    "prefix": "folding",
    "body": [
      "{% folding ${1:title} [codeblock:${2:bool}] [open:${3:bool}] [color:${4:color}] %}",
      "${5:content}",
      "{% endfolding %}"
    ],
    "description": "Insert a folding container"
  },
  "Multiple Folding Containers": {
    "prefix": "folders",
    "body": [
      "{% folders %}",
      "<!-- folder ${1:题目1} -->",
      "${2:这是答案1}",
      "<!-- folder ${3:题目2} -->",
      "${4:这是答案2}",
      "<!-- folder ${5:题目3} -->",
      "${6:这是答案3}",
      "{% endfolders %}"
    ],
    "description": "Insert multiple folding containers"
  },
  "Tabs": {
    "prefix": "tabs",
    "body": [
      "{% tabs active:${1:2} align:${2:center} %}",
      "<!-- tab ${3:图片} -->",
      "${4:图片}",
      "<!-- tab ${5:代码块} -->",
      "${6:代码块}",
      "{% endtabs %}"
    ],
    "description": "Insert a tabbed container"
  },
  "Grid": {
    "prefix": "grid",
    "body": [
      "{% grid %}",
      "<!-- cell -->",
      "${1:{% image ${2:https://image.url} %}}",
      "<!-- cell -->",
      "${3:内容}",
      "{% endgrid %}"
    ],
    "description": "Insert a grid layout"
  }
}
```
