---
title: wiki侧边栏可设置为折叠块
tags: [stellar]
categories: [技术分享]
permalink: posts/29.html
excerpt: wiki添加folding属性控制侧边栏折叠，原主题wiki文档数量过多的时候会有滚动条，未免有点难定位到自己的文章，因此魔改来方便自己查阅文章。
poster:
  topic: null
  headline: wiki侧边栏可设置为折叠块
  caption: null
  color: null
date: 2024-11-14 11:32:13
updated: 2024-11-14 11:32:13
topic:
banner:
references:
---

## 前言

stellar 主题不错，就是 wiki 文档数量过多的时候会有滚动条，未免有点难定位到自己的文章，所以我加了一个 `folding` 属性控制 wiki 侧边栏目录是否为折叠块。

## 具体效果

![折叠 wiki 侧边栏](https://comment.codepzj.cn/static/images/20241109-183651.472.png)

## 修改代码

覆盖 `themes/stellar/layout/_partial/widgets/tree.ejs` 中的代码

```js
<%
const proj = theme.wiki.tree[page.wiki]

function layoutTocHeader(title) {
  var el = ''
  el += `<div class="widget-header dis-select">`
  el += `<span class="name">${title || __("meta.toc")}</span>`
  el += `</div>`
  return el
}

function layoutWikiTocHeader(title) {
  var el = ''
  el += `${title || __("meta.toc")}`
  return el
}

function layoutDocTree(pages) {
  var el = ''
  for (let p of pages) {
    if (p.title == null || p.title.length == 0) {
      continue
    }
    let isActive = ''
    if (p.path === page.path) {
      isActive += ' active'
    }
    if (proj.pages.length > 0) {
      let href = url_for(p.path);
      if (p.is_homepage) {
        href += '#start'
      }
      el += `<a class="link${isActive}" href="${href}">`
      el += `<span class="toc-text">${p.title}</span>`
      if (isActive.length > 0) {
        el += icon('default:bookmark.active')
      }
      el += `</a>`
    }
  }
  return el
}


function layoutDiv(fallback) {
  if (proj == null) {
    return ''
  }
  if (proj.pages == null || proj.pages.length == 0) {
    return ''
  }
  if (proj.sections == null || proj.sections.length == 0) {
    return ''
  }
  var el = ''
  let index = 0
  for (let sec of proj.sections) {
    if (sec.pages.length == 0) {
      continue
    }
    if (sec.title?.length > 0 && proj.folding && page.path.startsWith("wiki")) {
      const sectionIndex = findPageSectionIndex(proj.sections, page.path);
      if(sectionIndex === index) el +=`<details class="tag-plugin colorful folding" color="black" open><summary><p>`
      else el +=`<details class="tag-plugin colorful folding" color="black"><summary><p>`
      el += layoutWikiTocHeader(sec.title)
      el += `</p></summary>`
      const docTree = layoutDocTree(sec.pages)
      if (docTree.trim().length > 0) {
        el += `<div class=""><p>`
        el += `<div class="widget-body fs14">${docTree}</div>`
        el += `</p></div>`
      }
      el += `</details>`
      index++
    }else{
      el += layoutTocHeader(sec.title)
      const docTree = layoutDocTree(sec.pages)
      if (docTree.trim().length > 0) {
        el += `<div class="widget-body fs14">${docTree}</div>`
      }
    }

  }
  if (el.trim().length > 0) {
    return `<widget class="widget-wrapper${scrollreveal(' ')} post-list">${el}</widget>`
  } else {
    return ''
  }
}

function findPageSectionIndex(sections, currentPagePath) {
  for (let i = 0; i < sections.length; i++) {
      const sec = sections[i];
      for (let j = 0; j < sec.pages.length; j++) {
          if (sec.pages[j].path === currentPagePath) {
              return i; // 返回匹配的 section 索引
          }
      }
  }
  return -1; // 如果没有匹配项，返回 -1
}
%>

<%- layoutDiv() %>
```

## 使用方法

在 `data/wiki/example.yml` 中设置 `folding` 属性为 `true` 即可。
{% note 注意
如果不设置，默认 wiki 侧边栏不折叠
color: yellow %}

拿 `go-learn` 举例子，对应的配置文件为 `data/wiki/go-learn.yml`

```yaml
name: golang学习指南
title: golang学习指南
subtitle: "go语言圣经 | haohanxinghe.com"
tags: 文档
icon: /assets/wiki/go-learn/icon.svg
cover: /assets/wiki/go-learn/icon.svg
coverpage: true
description: 总结学习golang的一些常用知识点
share: true
comments: false
base_dir: /wiki/go-learn/
folding: true
tree:
  "快速开始":
    - 入门指南
  "语法基础":
    - 基本语法/包
    - 基本语法/关键字
    - 基本语法/运算符
    - 基本语法/字面量
    - 基本语法/字符串
    - 基本语法/时间与日期
    - 基本语法/指针
    - 基本语法/函数
    - 基本语法/数组与切片
```

配置好后的 [折叠效果](/wiki/go-learn/入门指南.html#start)
