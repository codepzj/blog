---
title: tailwindcss实现响应式导航栏
tags: [taiwindcss, git]
categories: [技术分享]
permalink: posts/8.html
excerpt: 本文介绍了如何使用Vue和TailwindCSS框架制作响应式导航栏。
poster:
  topic: null
  headline: tailwindcss实现响应式导航栏
  caption: null
  color: null
date: 2024-09-20 00:08:49
updated: 2024-09-20 00:08:49
topic: tailwindcss
description:

references:
---

## 前言

{% folding 响应式布局和自适应布局的区别 open:false color:yellow %}
响应式布局是会根据屏幕的大小尺寸，给元素分配不同的尺寸和空间，例如在较大的页面一行会呈现多个元素，而随着页面尺寸的减小，一行能够容纳的元素变少，一些元素被挤压到下一行当中（`@media`）；而自适应布局呈现的是整个页面，会随着页面尺寸的减小，而缩小元素的尺寸以及间距，来实现一行呈现完所有元素的目的（`%`、`vw`、`vh`）。
{% endfolding %}

## 快速开始

{% link https://www.bilibili.com/video/BV1Ya411u7xR?vd_source=717e5631051a8339c2eea7fb70959d5b tailwindcss制作响应式导航栏 icon:https://bilibili.com/favicon.ico %}
最近学了 tailwindcss，然后仿照 B 站的教程做了一个 tailwindcss 实现响应式导航栏的 demo，本文将介绍实现该功能的流程，采用的是`Vue`和`TailwindCSS`框架。

我们来直接看核心代码 -- `Navbar.vue`

```html
<template>
  <div
    class="bg-gray-900 text-white px-6 py-3.5 shadow md:flex justify-between items-center"
  >
    <div class="flex items-center">
      <span class="text-green-500 text-lg">
        <i class="bi bi-messenger"></i>
      </span>
      <h1 class="ml-1.5 text-lg" @click="toggleOpen">Designer</h1>
    </div>
    <span class="md:hidden absolute right-6 top-3.5 text-2xl">
      <i
        :class="[open ? 'bi bi-x' : 'bi bi-filter-right']"
        @click="toggleOpen"
      ></i>
    </span>
    <ul
      class="text-white bg-gray-900 rounded-bl-xl md:flex md:items-center md:px-3 px-8 md:py-0 py-3 md:w-auto w-full md:mx-0 ml-4  md:static absolute duration-500 ease-in-out"
      :class="[open ? 'left-0' : 'left-[-120%]']"
    >
      <li class="md:px-4 py-1.5" v-for="link in links">
        <a :href="link.link" class="hover:text-green-600 focus:text-green-600"
          >{{ link.name }}</a
        >
      </li>
      <button>Get Started</button>
    </ul>
  </div>
</template>
<script setup>
  import { ref } from "vue";
  import Button from "./Button.vue";
  let open = ref(false);
  let links = [
    { name: "Brand", link: "#" },
    { name: "Product", link: "#" },
    { name: "Cart", link: "#" },
    { name: "About", link: "#" },
  ];

  let toggleOpen = () => {
    open.value = !open.value;
  };
</script>
```

## 核心技巧

- 通过`md:`来实现**响应式布局**，md: 指的是在 min-width:768px 条件下执行冒号后面的样式，使用原生 css 要使用@media 媒体查询来控制不同尺寸下的样式，这样一来，使用原生 css 会出现较多的冗余代码 1，这就彰显出 tailwindcss 的强大之处，响应式前缀；sm: - 小屏幕（≥ 640px），md: - 中屏幕（≥ 768px），lg: - 大屏幕（≥ 1024px），xl: - 超大屏幕（≥ 1280px），例如：书写 md:flex，指的是宽度大于等于 768px 的屏幕是`flex`布局，小屏幕则是`static`布局；`md:w-auto w-full`，在宽度大于等于 768px 的屏幕时盒子根据内容的宽度调整，小屏幕则表示宽度占满整行。

- 通过`md:hidden`来控制元素隐藏，宽度足够大的时候不隐藏导航栏的其他元素，当处于小屏幕（<768px）的时候，就会让控制导航栏隐藏信息折叠的按钮显现出来（本 demo 使用的时 bootstrap-icons 图标库），然后之前导航栏后半段设置的`md:flex`就会因为屏幕尺寸的减小而压缩导航栏之下。

- tailwindcss 也能够很好的处理动画的渐变，比如说我点击折叠按钮，来控制导航栏剩余部分内容的呈现与隐藏。如`:class="[open ? 'left-0' : 'left-[-120%]']`通过折叠按钮是否处于开启状态来切换样式，同时也能控制**渐变效果的时延**，**渐进渐出的效果**，如`duration-500 ease-in-out`，使动画变得更加丝滑。

## 具体效果

{% image https://cdn.codepzj.cn/image/202410192139061.gif tailwindcss实现响应式导航栏 download:true %}

## 项目部署

我们想要部署 **vite** 项目到 **GitHub Pages** 上，而且我的主域名**codepzj.github.io**已经使用了，应该怎么做呢？

**修改 vite-config-js：**

```js
export default defineConfig({
  plugins: [vue()],
  base: "/tailwindcss-responsive-design/",
});
```

以此实现二级目录托管

**将项目代码 push 到 main 分支，将打包好的 dist 静态文件 push 到 gh-pages 分支生成 Github Pages**

```bash
git init
git add .
git commit -m "tailwindcss响应式导航栏"
git remote add origin git@github.com:codepzj/tailwindcss-responsive-design.git
git branch -M main
git push origin main
git checkout -b gh-pages
# 将.gitignore中的dist注释
git add dist
git commit -m "tailwindcss响应式导航栏静态页面"
git subtree push --prefix dist origin gh-pages
# 将.gitignore中的dist取消注释
```

git subtree 是一个 Git 子命令，用于管理和推送子项目到一个 Git 仓库。它可以让你在一个项目中包含另一个 Git 仓库的内容，同时保持这些内容的历史记录

**推送子树：将指定子目录的更改推送到远程仓库的指定分支。**

```bash
git subtree push --prefix <subdirectory> <repository> <branch>
```

**然后项目部署成功**😃😃😃

{% link https://github.com/codepzj/tailwindcss-responsive-design 项目仓库 icon:https://github.com/favicon.ico %}

{% link https://tailwindcss-responsive-design.vercel.app/ 项目预览地址 icon:https://github.com/favicon.ico %}
