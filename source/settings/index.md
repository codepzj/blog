---
title: 设置
date: 2024-10-23 16:06:52
layout: page
comments: false
rightbar: toc
updated: 2024-10-23 16:06:52
excerpt: 个人博客的设置页面，控制Umami 统计，AI 摘要，黑夜模式，雪花模式的开关。
---

## AI 摘要

默认关闭

当前状态：<span id="chatgpt">loading</span>

{% button 启用/禁用 javascript:toggleAISummaryStatus(); %}

## 黑夜模式

默认白昼

{% button 白昼/黑夜/默认 javascript:switchTheme(); %}

## 雪花模式

默认关闭

{% button 启用/禁用 javascript:switchSnow(); %}

## 重新加载

{% button 清除缓存 javascript:cleanCache(); %}
