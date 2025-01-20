---
title: element-plus的布局属性
tags: [element-plus, css]
categories: [技术分享]
permalink: posts/3.html
excerpt: 这篇文章为开发者介绍了使用ElementPlus组件库进行基础布局的方法。
poster:
  topic: null
  headline: element-plus的布局属性
  caption: null
  color: null
date: 2024-08-31 10:57:55
updated: 2024-08-31 10:57:55
topic:
description:

references:
---

{% note TIP

组件默认使用 Flex 布局，不需要手动设置 `type="flex"`。

请注意父容器避免使用 `inline` 相关样式，会导致组件宽度不能撑满。

color:yellow %}

## 基础布局 ​

使用列创建基础网格布局。

通过 row 和 col 组件，并通过 col 组件的 span 属性我们就可以自由地组合布局。

```html
<el-row>
  <el-col :span="24"><div class="grid-content ep-bg-purple-dark" /></el-col>
</el-row>
<el-row>
  <el-col :span="12"><div class="grid-content ep-bg-purple" /></el-col>
  <el-col :span="12"><div class="grid-content ep-bg-purple-light" /></el-col>
</el-row>
<el-row>
  <el-col :span="8"><div class="grid-content ep-bg-purple" /></el-col>
  <el-col :span="8"><div class="grid-content ep-bg-purple-light" /></el-col>
  <el-col :span="8"><div class="grid-content ep-bg-purple" /></el-col>
</el-row>
```

> 通过设置:span 来控制 el-col 占一行的比例

## 分栏间隔

在 el-row 中设置 gutter 属性（单位为 px），控制 el-row 当中 el-col 之间的间距

```html
<template>
  <el-row :gutter="20">
    <el-col :span="6"><div class="grid-content ep-bg-purple" /></el-col>
    <el-col :span="6"><div class="grid-content ep-bg-purple" /></el-col>
    <el-col :span="6"><div class="grid-content ep-bg-purple" /></el-col>
    <el-col :span="6"><div class="grid-content ep-bg-purple" /></el-col>
  </el-row>
</template>
```

## 列偏移

通过在 el-col 列中设置偏移量 offset 即可达到偏移的目的

```html
<el-col :span="6" :offset="6">
  <div class="grid-content ep-bg-purple" />
</el-col>
```

## 对齐方式

在 el-row 中设置 justify 属性来控制行内块的对齐方式，属性有`center`,`space-between`,`space-around`,`space-evenly`,`start`,`end`等等

```html
<el-row class="row-bg" justify="center"></el-row>
```

## 响应式布局

参照了 Bootstrap 的 响应式设计，预设了五个响应尺寸：xs、sm、md、lg 和 xl。

| 属性名 | 说明                                 | 类型            | 默认值 |
| ------ | ------------------------------------ | --------------- | ------ |
| xs     | <768px 响应式栅格数或者栅格属性对象  | number / object | —      |
| sm     | ≥768px 响应式栅格数或者栅格属性对象  | number / object | —      |
| md     | ≥992px 响应式栅格数或者栅格属性对象  | number / object | —      |
| lg     | ≥1200px 响应式栅格数或者栅格属性对象 | number / object | —      |
| xl     | ≥1920px 响应式栅格数或者栅格属性对象 | number / object | —      |

```html
<el-col :xs="8" :sm="6" :md="4" :lg="3" :xl="1">
  <div class="grid-content ep-bg-purple" />
</el-col>
```

{% note 含义
<768px 时占 1/3<br>
≥768px && <992px 时占 1/4<br>
≥992px && <1200px 时占 1/6<br>
≥1200px && <1920px 时占 1/8<br>
≥1920px 时占 1/24<br>
color:blue %}

## 基于断点的隐藏类 ​

Element Plus 额外提供了一系列类名，用于在某些条件下隐藏元素。 这些类名可以添加在任何 DOM 元素或自定义组件上。 如果需要，请自行引入以下文件：

```js
import "element-plus/theme-chalk/display.css";
```

这些类名为：

- hidden-xs-only - 当视口在 xs 尺寸时隐藏
- hidden-sm-only - 当视口在 sm 尺寸时隐藏
- hidden-sm-and-down - 当视口在 sm 及以下尺寸时隐藏
- hidden-sm-and-up - 当视口在 sm 及以上尺寸时隐藏
- hidden-md-only - 当视口在 md 尺寸时隐藏
- hidden-md-and-down - 当视口在 md 及以下尺寸时隐藏
- hidden-md-and-up - 当视口在 md 及以上尺寸时隐藏
- hidden-lg-only - 当视口在 lg 尺寸时隐藏
- hidden-lg-and-down - 当视口在 lg 及以下尺寸时隐藏
- hidden-lg-and-up - 当视口在 lg 及以上尺寸时隐藏
- hidden-xl-only - 当视口在 xl 尺寸时隐藏
