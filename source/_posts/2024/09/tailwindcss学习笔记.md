---
title: tailwindcss学习笔记
tags: [taiwindcss, css]
categories: [技术分享]
permalink: posts/4.html
excerpt: 本文是一份关于使用TailwindCSS实现响应式布局的学习笔记，涵盖布局、弹性盒子、间距、、尺寸、排版、背景、边框、效果、过渡和动画多个属性。
poster:
  topic: null
  headline: tailwindcss学习笔记
  caption: null
  color: null
date: 2024-09-01 11:58:46
updated: 2024-09-01 11:58:46
topic: tailwindcss
description:

references:
---

{% note TIPS
最近要做项目，要使用响应式布局，而且 element-plus 想要实现响应式布局只能在 el-row 和 el-col 内部写入元素，对于我这种强迫症患者，还是选择了 tailwindcss，接下来我介绍一下我的学习笔记 color:yellow %}

## 布局

### aspect-ratio 属性

> aspect-audio，这个 CSS 属性用于设置元素的宽高比，使其保持 16:9 的比例，适用于大多数屏幕

| Class         | Properties            |
| ------------- | --------------------- |
| aspect-auto   | aspect-ratio: auto;   |
| aspect-square | aspect-ratio: 1 / 1;  |
| aspect-video  | aspect-ratio: 16 / 9; |

### container 属性

> 用于将元素的宽度固定至当前断点的组件。

| Class        | Breakpoint     | Properties           |
| ------------ | -------------- | -------------------- |
| `.container` | None           | `width: 100%;`       |
|              | `sm (640px)`   | `max-width: 640px;`  |
|              | `md (768px)`   | `max-width: 768px;`  |
|              | `lg (1024px)`  | `max-width: 1024px;` |
|              | `xl (1280px)`  | `max-width: 1280px;` |
|              | `2xl (1536px)` | `max-width: 1536px;` |

- 在默认情况下（即屏幕宽度小于 640px），`.container` 的宽度是 100%。
- 当屏幕宽度至少为 640px 时，`.container` 的最大宽度将变为 640px。
- 当屏幕宽度至少为 768px 时，`.container` 的最大宽度将变为 768px。
- 当屏幕宽度至少为 1024px 时，`.container` 的最大宽度将变为 1024px。
- 当屏幕宽度至少为 1280px 时，`.container` 的最大宽度将变为 1280px。
- 当屏幕宽度至少为 1536px 时，`.container` 的最大宽度将变为 1536px。

{% note 注意

**Tailwind 的容器不会自动居中，并且没有任何内置的水平填充。**

color:green %}

要使容器居中，请使用以下 `mx-auto` 实用程序：

```html
<div class="container mx-auto">
  <!-- ... -->
</div>
```

### columns 属性

> 用于控制元素内列数的实用程序，一般用于将父盒子分成几列。

| Class     | Properties  |
| --------- | ----------- |
| columns-1 | columns: 1; |
| columns-2 | columns: 2; |
| columns-3 | columns: 3; |
| columns-4 | columns: 4; |
| columns-5 | columns: 5; |
| columns-6 | columns: 6; |
| columns-7 | columns: 7; |
| columns-8 | columns: 8; |

{% note 注意

gap 用于设置单元格之间的间隙大小

color:green %}

```html
<div class="gap-8 columns-3 ...">
  <img class="w-full aspect-video ..." src="..." />
  <img class="w-full aspect-square ..." src="..." />
  <!-- ... -->
</div>
```

### box-sizing 属性

> 用于控制浏览器如何计算元素总大小的实用程序。

| Class       | Properties               |
| ----------- | ------------------------ |
| box-border  | box-sizing: border-box;  |
| box-content | box-sizing: content-box; |

```html
<div class="w-32 h-32 box-border p-4 border-2 background"></div>
```

{% note 注意
`box-sizing`默认为`content-box`盒子会因为边框，内外边距而增大<br>
`box-sizing`设置为`border-box`之后，会让边框和内边距共用子元素的width和height
color:yellow %}

### display 属性

> 用于控制元素显示框类型的实用程序。

| Class         | Properties              |
| ------------- | ----------------------- |
| block         | display: block;         |
| inline-block  | display: inline-block;  |
| inline        | display: inline;        |
| flex          | display: flex;          |
| inline-flex   | display: inline-flex;   |
| table         | display: table;         |
| inline-table  | display: inline-table;  |
| table-caption | display: table-caption; |

### block 和 inline 布局

```html
<div class="inline">行内元素</div>
不是独占一行的后面还可以根元素
<span class="block">块级元素是独占一行的</span>
```

### flex 布局

```html
<div class="flex justify-center items-center">
  <div>这是一个align-item测试</div>
  <img src="https://www.baidu.com/favicon.ico" alt="百度图标" />
</div>
```

### grid 布局

```html
<div class="grid gap-4 grid-cols-5 mt-auto">
  <span class="w-32 h-32 background">1</span>
  <span class="w-32 h-32 background">2</span>
  <span class="w-32 h-32 background">3</span>
  <span class="w-32 h-32 background">4</span>
  <span class="w-32 h-32 background">5</span>
  <span class="w-32 h-32 background">6</span>
  <span class="w-32 h-32 background">7</span>
  <span class="w-32 h-32 background">8</span>
  <span class="w-32 h-32 background">9</span>
  <span class="w-32 h-32 background">10</span>
</div>
```

### hidden 属性

`class="hidden"` 相当于 `display:none`

### float 属性

> 用于控制元素周围内容包装的实用程序。

| Class         | Properties             |
| ------------- | ---------------------- |
| `float-start` | `float: inline-start;` |
| `float-end`   | `float: inline-end;`   |
| `float-right` | `float: right;`        |
| `float-left`  | `float: left;`         |
| `float-none`  | `float: none;`         |

```html
<div class="float-left">
  <img src="https://huya.com/favicon.ico" alt="虎牙直播图标" />
</div>
```

### clear 属性

| Class         | Properties             |
| ------------- | ---------------------- |
| `clear-start` | `clear: inline-start;` |
| `clear-end`   | `clear: inline-end;`   |
| `clear-left`  | `clear: left;`         |
| `clear-right` | `clear: right;`        |
| `clear-both`  | `clear: both;`         |
| `clear-none`  | `clear: none;`         |

```html
<div class="float-left">
  <img src="https://huya.com/favicon.ico" alt="虎牙直播图标" />
</div>
<div class="clear-both"></div>
<div>1</div>
<div>2</div>
<div>3</div>
```

### object-fit 属性

| Value        | Description                                            |
| ------------ | ------------------------------------------------------ |
| `fill`       | 默认值，拉伸内容以填充容器（可能会导致内容失真）       |
| `contain`    | 保持内容的宽高比，缩放内容以适应容器，可能会有空白区域 |
| `cover`      | 保持内容的宽高比，缩放内容以填满容器，可能会裁剪内容   |
| `none`       | 保持内容原始尺寸，不缩放                               |
| `scale-down` | 内容根据 `contain` 和 `none` 的效果进行缩放选择        |

| Class               | Properties                |
| ------------------- | ------------------------- |
| `object-contain`    | `object-fit: contain;`    |
| `object-cover`      | `object-fit: cover;`      |
| `object-fill`       | `object-fit: fill;`       |
| `object-none`       | `object-fit: none;`       |
| `object-scale-down` | `object-fit: scale-down;` |

```html
<div class="w-3/5 h-1/2">
  <img
    src="https://cdn.codepzj.cn/image/202410191713308.png"
    alt="添加请求头防止跨域"
    class="w-full h-full object-contain"
  />
</div>
```

### overflow 溢出

| Value     | Description                                                              |
| --------- | ------------------------------------------------------------------------ |
| `visible` | 内容超出元素边界时，内容会被显示出来，不会有滚动条。                     |
| `hidden`  | 内容超出元素边界时，会被裁剪掉，不会显示滚动条。                         |
| `scroll`  | 内容超出元素边界时，会始终显示滚动条，允许滚动查看全部内容。             |
| `auto`    | 根据内容是否超出元素边界来决定是否显示滚动条。超出时显示，未超出时隐藏。 |
| `clip`    | 内容超出元素边界时，会被剪切掉（类似于 `hidden`），但不使用滚动条。      |
| `inherit` | 从父元素继承 `overflow` 属性的值。                                       |
| `initial` | 设置为属性的默认值。                                                     |
| `unset`   | 继承父元素的 `overflow` 值，或者根据上下文决定是否隐藏溢出的内容。       |

| Class               | Properties            |
| ------------------- | --------------------- |
| `overflow-auto`     | `overflow: auto;`     |
| `overflow-hidden`   | `overflow: hidden;`   |
| `overflow-clip`     | `overflow: clip;`     |
| `overflow-visible`  | `overflow: visible;`  |
| `overflow-scroll`   | `overflow: scroll;`   |
| `overflow-x-auto`   | `overflow-x: auto;`   |
| `overflow-y-auto`   | `overflow-y: auto;`   |
| `overflow-x-hidden` | `overflow-x: hidden;` |
| `overflow-y-hidden` | `overflow-y: hidden;` |
| `overflow-x-scroll` | `overflow-x: scroll;` |
| `overflow-y-scroll` | `overflow-y: scroll;` |

```html
<div class="w-32 h-32 overflow-auto">
  <div class="w-48 h-48 bg-yellow-400"></div>
</div>
```

### positon 属性

| Class      | Properties            |
| ---------- | --------------------- |
| `static`   | `position: static;`   |
| `fixed`    | `position: fixed;`    |
| `absolute` | `position: absolute;` |
| `relative` | `position: relative;` |
| `sticky`   | `position: sticky;`   |

```html
<ul class="flex justify-center items-center fixed top-0 w-full">
  <li class="mx-4 bg-yellow-200">1</li>
  <li class="mx-4 bg-yellow-200">1</li>
  <li class="mx-4 bg-yellow-200">1</li>
  <li class="mx-4 bg-yellow-200">1</li>
  <li class="mx-4 bg-yellow-200">1</li>
  <li class="mx-4 bg-yellow-200">1</li>
</ul>
```

### position 的位置属性

| Class       | Properties                 |
| ----------- | -------------------------- |
| `inset-0`   | `inset: 0px;`              |
| `inset-x-0` | `left: 0px; right: 0px;`   |
| `inset-y-0` | `top: 0px; bottom: 0px;`   |
| `start-0`   | `inset-inline-start: 0px;` |
| `end-0`     | `inset-inline-end: 0px;`   |
| `top-0`     | `top: 0px;`                |
| `right-0`   | `right: 0px;`              |

### visibility 属性

| Class       | Properties              |
| ----------- | ----------------------- |
| `visible`   | `visibility: visible;`  |
| `invisible` | `visibility: hidden;`   |
| `collapse`  | `visibility: collapse;` |

{% folding  display:none和visbility:hidden的区别 color:yellow %}
display:none 会隐藏元素，并使其脱离文档流，不占据空间
visibility:hidden 也会隐藏元素，但是仍然占据原来的空间，不显示元素
{% endfolding %}

### z-index 属性

| Class    | Properties       |
| -------- | ---------------- |
| `z-0`    | `z-index: 0;`    |
| `z-10`   | `z-index: 10;`   |
| `z-20`   | `z-index: 20;`   |
| `z-30`   | `z-index: 30;`   |
| `z-40`   | `z-index: 40;`   |
| `z-50`   | `z-index: 50;`   |
| `z-auto` | `z-index: auto;` |

```html
<div class="z-10 h-20 w-20 bg-blue-600 relative hover:z-50"></div>
<div
  class="z-0 h-20 w-20 bg-green-600 relative bottom-10 left-10 hover:z-50"
></div>
```

{% note 注意
z-index 属性必须与定位属性 (position) 配合使用才能生效，并只对那些拥有 position 属性值为 relative、absolute、fixed 或 sticky 的元素有效
color:yellow %}

## 弹性盒子

### flex-basis 属性

| Class   | flex-basis     |
| ------- | -------------- |
| basis-0 | 0px            |
| basis-1 | 0.25rem (4px)  |
| basis-2 | 0.5rem (8px)   |
| basis-3 | 0.75rem (12px) |
| basis-4 | 1rem (16px)    |

```html
<div class="flex flex-row">
  <div class="basis-1/6" style="background-color: red;">01</div>
  <div class="basis-1/3" style="background-color: green;">02</div>
  <div class="basis-1/2" style="background-color: yellow;">03</div>
</div>
```

{% note 注意
`flex-basis:0`时代表初始分配子元素空间为0，跟随`flex-grow`的配置，若`flex-grow`为1，则均匀分配<br>
`flex-basis:auto`时代表根据子元素已有空间大小分配，随着屏幕尺寸大小对子元素进行伸缩
color:yellow %}

### flex-direction 属性

| Class            | Properties                      |
| ---------------- | ------------------------------- |
| flex-row         | flex-direction: row;            |
| flex-row-reverse | flex-direction: row-reverse;    |
| flex-col         | flex-direction: column;         |
| flex-col-reverse | flex-direction: column-reverse; |

```html
<div class="flex flex-col-reverse items-center">
  <div>1</div>
  <div>2</div>
  <div>3</div>
</div>
```

### flex-wrap 属性

> 用于控制弹性项目如何换行的实用程序。即 flex 布局中元素太多执行的换行操作，保证响应式布局

| Class             | Properties                 |
| ----------------- | -------------------------- |
| flex-wrap         | `flex-wrap: wrap;`         |
| flex-wrap-reverse | `flex-wrap: wrap-reverse;` |
| flex-nowrap       | `flex-wrap: nowrap;`       |

```html
<div class="flex flex-wrap">
  <p class="flex-auto max-w-96">
    计算机体系结构是计算机科学的一部分，涉及到计算机硬件组件如何组合以形成一个完整的计算系统。它定义了计算机的基本功能，包括处理器、内存、输入/输出设备以及它们如何协同工作。理解体系结构对于设计高效的计算机系统至关重要，它帮助我们优化性能和资源利用。
  </p>

  <p class="flex-auto max-w-96">
    处理器架构是计算机体系结构的核心部分。它包括中央处理单元（CPU）的设计，如指令集架构（ISA）和内部执行单元。现代处理器使用多核设计来提高处理能力，通过并行处理多个任务来加快计算速度。
  </p>

  <p class="flex-auto max-w-96">
    内存体系结构涉及到计算机如何存储和访问数据。主要包括主内存（RAM）和缓存（Cache）。缓存是一种高速度的存储器，用于减少访问内存的延迟。优化内存管理能够显著提高系统的整体性能。
  </p>

  <p class="flex-auto max-w-96">
    输入/输出（I/O）体系结构包括计算机如何与外部设备进行数据交换。它涉及到I/O端口、总线和控制器的设计。高效的I/O系统能够提升数据传输速度和系统的响应能力，对于各种应用至关重要。
  </p>

  <p class="flex-auto max-w-96">
    计算机体系结构的演变反映了技术进步和需求变化。从早期的单核处理器到现代的多核和超线程技术，体系结构不断进化以支持更高效的计算任务。理解这些变化有助于开发更先进的计算机系统。
  </p>
</div>
```

### flex 属性

> 用于控制弹性项目如何增大和缩小的实用程序。

| Class        | Properties        |
| ------------ | ----------------- |
| flex-1       | `flex: 1 1 0%;`   |
| flex-auto    | `flex: 1 1 auto;` |
| flex-initial | `flex: 0 1 auto;` |
| flex-none    | `flex: none;`     |

{% folding  flex:1和flex:auto的区别 color:yellow %}
flex:1 指的是**flex-grow:1,flex-shrink:1,flex-basis:0**初始分配子元素空间为 0，根据 flex-grow 属性给子元素均匀分配

flex:auto 指的是**flex-grow:1 flex-shrink:1 flex-basis:auto**初始子元素空间为默认空间大小，如 div 就是 100%，继承自定义 css 的宽度大小，可设置 max-width 控制元素大小设置响应式布局
{% endfolding %}

### grid column 属性

| Class       | Properties                                        |
| ----------- | ------------------------------------------------- |
| grid-cols-1 | grid-template-columns: repeat(1, minmax(0, 1fr)); |
| grid-cols-2 | grid-template-columns: repeat(2, minmax(0, 1fr)); |
| grid-cols-3 | grid-template-columns: repeat(3, minmax(0, 1fr)); |
| grid-cols-4 | grid-template-columns: repeat(4, minmax(0, 1fr)); |
| grid-cols-5 | grid-template-columns: repeat(5, minmax(0, 1fr)); |

```html
<div class="grid grid-cols-3 gap-4">
  <div class="bg-cyan-400">1</div>
  <div class="bg-yellow-400">2</div>
  <div class="bg-red-400">3</div>
  <div class="bg-green-400">4</div>
  <div class="bg-purple-400">5</div>
  <div class="bg-orange-400">6</div>
</div>
```

### grid column start/end 属性

> 用于控制元素在网格列之间的大小和放置方式的实用程序。col-span-2 代表占据两个格子的空间，以此类推

| Class        | Properties                      |
| ------------ | ------------------------------- |
| `col-auto`   | `grid-column: auto;`            |
| `col-span-1` | `grid-column: span 1 / span 1;` |
| `col-span-2` | `grid-column: span 2 / span 2;` |
| `col-span-3` | `grid-column: span 3 / span 3;` |
| `col-span-4` | `grid-column: span 4 / span 4;` |

```html
<div class="grid grid-cols-3 gap-4">
  <div class="w-1/3 h-10 background">1</div>
  <div class="col-span-2 h-10 background">2</div>
  <div class="col-span-3 h-10 background">3</div>
  <div class="w-1/3 h-10 background">4</div>
  <div class="w-1/3 h-10 background">5</div>
</div>
```

### grid row 属性

> 用于指定网格布局中的行的实用程序。（类似 grid-cols-xx）

| Class         | Properties                                       |
| ------------- | ------------------------------------------------ |
| `grid-rows-1` | `grid-template-rows: repeat(1, minmax(0, 1fr));` |
| `grid-rows-2` | `grid-template-rows: repeat(2, minmax(0, 1fr));` |
| `grid-rows-3` | `grid-template-rows: repeat(3, minmax(0, 1fr));` |
| `grid-rows-4` | `grid-template-rows: repeat(4, minmax(0, 1fr));` |

```html
<div class="grid grid-rows-3 grid-flow-col gap-4">
  <div class="background">1</div>
  <div class="background">2</div>
  <div class="background">3</div>
  <div class="background">4</div>
  <div class="background">5</div>
  <div class="background">6</div>
  <div class="background">7</div>
</div>
```

{% note 注意
当使用`grid-rows-xx`的时候，需要往class里面多加一个`grid-flow-col`属性<br>
原因是`grid-auto-flow`默认属性是`row`，是按照行排列的，现在应该改成按列排布
color:yellow %}

### grid row start/end 属性

> 用于控制元素大小和在网格行之间放置方式的实用程序。

| Class        | Properties                   |
| ------------ | ---------------------------- |
| `row-auto`   | `grid-row: auto;`            |
| `row-span-1` | `grid-row: span 1 / span 1;` |
| `row-span-2` | `grid-row: span 2 / span 2;` |
| `row-span-3` | `grid-row: span 3 / span 3;` |
| `row-span-4` | `grid-row: span 4 / span 4;` |

```html
<div class="grid grid-rows-3 grid-flow-col gap-4">
  <div class="background">1</div>
  <div class="background">2</div>
  <div class="background">3</div>
  <div class="background row-span-2">4</div>
  <div class="background">5</div>
  <div class="background">6</div>
  <div class="background">7</div>
  <div class="background">8</div>
  <div class="background">9</div>
</div>
```

### grid auto flow 属性

> 用于控制如何自动放置网格中的元素的实用程序。

| Class               | Properties                    |
| ------------------- | ----------------------------- |
| grid-flow-row       | grid-auto-flow: row;          |
| grid-flow-col       | grid-auto-flow: column;       |
| grid-flow-dense     | grid-auto-flow: dense;        |
| grid-flow-row-dense | grid-auto-flow: row dense;    |
| grid-flow-col-dense | grid-auto-flow: column dense; |

### gap 属性

> 用于控制网格和弹性框项目之间的间距的实用程序。

| Class     | Properties            |
| --------- | --------------------- |
| gap-0     | gap: 0px;             |
| gap-x-0   | column-gap: 0px;      |
| gap-y-0   | row-gap: 0px;         |
| gap-px    | gap: 1px;             |
| gap-x-px  | column-gap: 1px;      |
| gap-y-px  | row-gap: 1px;         |
| gap-0.5   | gap: 0.125rem;        |
| gap-x-0.5 | column-gap: 0.125rem; |
| gap-y-0.5 | row-gap: 0.125rem;    |

```html
<div class="grid grid-cols-3 gap-x-4 gap-y-8">
  <div class="background">1</div>
  <div class="background">2</div>
  <div class="background">3</div>
  <div class="background">4</div>
  <div class="background">5</div>
  <div class="background">6</div>
</div>
```

{% note 注意
`gap`属性用于控制弹性盒子中子元素中的间距，一般适用于flex和grid布局
color:yellow %}

### justify 属性

> 用于控制弹性项目和网格项目如何沿容器主轴定位的实用程序。

| Class           | Properties                      |
| --------------- | ------------------------------- |
| justify-normal  | justify-content: normal;        |
| justify-start   | justify-content: flex-start;    |
| justify-end     | justify-content: flex-end;      |
| justify-center  | justify-content: center;        |
| justify-between | justify-content: space-between; |
| justify-around  | justify-content: space-around;  |

### align 属性

> 用于控制弹性项目和网格项目如何沿容器横轴定位的实用程序。

| Class          | CSS Property             |
| -------------- | ------------------------ |
| items-start    | align-items: flex-start; |
| items-end      | align-items: flex-end;   |
| items-center   | align-items: center;     |
| items-baseline | align-items: baseline;   |
| items-stretch  | align-items: stretch;    |

## 间距

### padding 属性

> 元素的内边距

| Class | CSS Property                                |
| ----- | ------------------------------------------- |
| p-0   | padding: 0px;                               |
| px-0  | padding-left: 0px; <br> padding-right: 0px; |
| py-0  | padding-top: 0px; <br> padding-bottom: 0px; |
| ps-0  | padding-inline-start: 0px;                  |
| pe-0  | padding-inline-end: 0px;                    |
| pt-0  | padding-top: 0px;                           |
| pr-0  | padding-right: 0px;                         |

### margin 属性

> 元素外边距

| Class | CSS Property                              |
| ----- | ----------------------------------------- |
| m-0   | margin: 0px;                              |
| mx-0  | margin-left: 0px; <br> margin-right: 0px; |
| my-0  | margin-top: 0px; <br> margin-bottom: 0px; |
| ms-0  | margin-inline-start: 0px;                 |
| me-0  | margin-inline-end: 0px;                   |
| mt-0  | margin-top: 0px;                          |
| mr-0  | margin-right: 0px;                        |

## 尺寸

### width 属性

| Class    | Properties       |
| -------- | ---------------- |
| w-0      | width: 0px;      |
| w-px     | width: 1px;      |
| w-0.5    | width: 0.125rem; |
| w-1      | width: 0.25rem;  |
| w-1.5    | width: 0.375rem; |
| w-2      | width: 0.5rem;   |
| w-full   | width: 100%;     |
| w-screen | width: 100vw;    |

### min-width 属性

| Class      | Properties          |
| ---------- | ------------------- |
| min-w-0    | min-width: 0px;     |
| min-w-1    | min-width: 0.25rem; |
| min-w-2    | min-width: 0.5rem;  |
| min-w-3    | min-width: 0.75rem; |
| min-w-4    | min-width: 1rem;    |
| min-w-full | min-width: 100%;    |

### max-width 属性

| Class     | Properties           |
| --------- | -------------------- |
| max-w-0   | max-width: 0px;      |
| max-w-px  | max-width: 1px;      |
| max-w-0.5 | max-width: 0.125rem; |
| max-w-1   | max-width: 0.25rem;  |
| max-w-1.5 | max-width: 0.375rem; |
| max-w-2   | max-width: 0.5rem;   |

### height 属性

| Class    | Properties        |
| -------- | ----------------- |
| h-0      | height: 0px;      |
| h-px     | height: 1px;      |
| h-0.5    | height: 0.125rem; |
| h-1      | height: 0.25rem;  |
| h-1.5    | height: 0.375rem; |
| h-2      | height: 0.5rem;   |
| h-full   | height: 100%;     |
| h-screen | height: 100vh;    |

### min-height 属性

| Class   | Properties           |
| ------- | -------------------- |
| min-h-0 | min-height: 0px;     |
| min-h-1 | min-height: 0.25rem; |
| min-h-2 | min-height: 0.5rem;  |
| min-h-3 | min-height: 0.75rem; |
| min-h-4 | min-height: 1rem;    |

### max-height 属性

| Class     | Properties            |
| --------- | --------------------- |
| max-h-0   | max-height: 0px;      |
| max-h-px  | max-height: 1px;      |
| max-h-0.5 | max-height: 0.125rem; |
| max-h-1   | max-height: 0.25rem;  |
| max-h-1.5 | max-height: 0.375rem; |
| max-h-2   | max-height: 0.5rem;   |

### size 属性

| Class     | Properties                             |
| --------- | -------------------------------------- |
| size-0    | width: 0px; height: 0px;               |
| size-px   | width: 1px; height: 1px;               |
| size-4    | width: 1rem; height: 1rem;             |
| size-1/2  | width: 50%; height: 50%;               |
| size-1/3  | width: 33.333333%; height: 33.333333%; |
| size-2/3  | width: 66.666667%; height: 66.666667%; |
| size-full | width: 100%; height: 100%;             |

## 排版

### font

#### font-family 属性

| Class      | Properties                                                                                                                      |
| ---------- | ------------------------------------------------------------------------------------------------------------------------------- |
| font-sans  | font-family: ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji" |
| font-serif | font-family: ui-serif, Georgia, Cambria, "Times New Roman", Times, serif                                                        |
| font-mono  | font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace                 |

{% folding  有衬线，无衬线以及等宽字体的区别 color:yellow %}
有衬线：字体结尾有比分，如 宋体，楷体等
无衬线：字体比较圆滑，如 Arial
等宽：所有字体宽度相同，如 Consolas
{% endfolding %}

#### font-size 属性

| Class     | Font Size | Line Height |
| --------- | --------- | ----------- |
| text-xs   | 0.75rem   | 1rem        |
| text-sm   | 0.875rem  | 1.25rem     |
| text-base | 1rem      | 1.5rem      |
| text-lg   | 1.125rem  | 1.75rem     |
| text-xl   | 1.25rem   | 1.75rem     |

#### font-family 属性

| Class      | Property            |
| ---------- | ------------------- |
| italic     | font-style: italic; |
| not-italic | font-style: normal; |

#### font-weight 属性

| Class           | Property          |
| --------------- | ----------------- |
| font-thin       | font-weight: 100; |
| font-extralight | font-weight: 200; |
| font-light      | font-weight: 300; |
| font-normal     | font-weight: 400; |
| font-medium     | font-weight: 500; |
| font-semibold   | font-weight: 600; |
| font-bold       | font-weight: 700; |

### text

#### text-align 属性

| Class        | Property             |
| ------------ | -------------------- |
| text-left    | text-align: left;    |
| text-center  | text-align: center;  |
| text-right   | text-align: right;   |
| text-justify | text-align: justify; |
| text-start   | text-align: start;   |
| text-end     | text-align: end;     |

#### text-color 属性

| Class            | Property                   |
| ---------------- | -------------------------- |
| text-inherit     | color: inherit;            |
| text-current     | color: currentColor;       |
| text-transparent | color: transparent;        |
| text-black       | color: rgb(0, 0, 0);       |
| text-white       | color: rgb(255, 255, 255); |
| text-slate-50    | color: rgb(248, 250, 252); |
| text-slate-100   | color: rgb(241, 245, 249); |
| text-slate-200   | color: rgb(226, 232, 240); |
| text-slate-300   | color: rgb(203, 213, 225); |

#### text-decoration 属性

| Class        | Property                       |
| ------------ | ------------------------------ |
| underline    | text-decoration: underline;    |
| overline     | text-decoration: overline;     |
| line-through | text-decoration: line-through; |
| no-underline | text-decoration: none;         |

#### text-indent 属性

| Class      | Property               |
| ---------- | ---------------------- |
| indent-0   | text-indent: 0px;      |
| indent-px  | text-indent: 1px;      |
| indent-0.5 | text-indent: 0.125rem; |
| indent-1   | text-indent: 0.25rem;  |
| indent-1.5 | text-indent: 0.375rem; |
| indent-2   | text-indent: 0.5rem;   |
| indent-2.5 | text-indent: 0.625rem; |
| indent-3   | text-indent: 0.75rem;  |
| indent-3.5 | text-indent: 0.875rem; |
| indent-4   | text-indent: 1rem;     |
| indent-5   | text-indent: 1.25rem;  |
| indent-6   | text-indent: 1.5rem;   |
| indent-7   | text-indent: 1.75rem;  |
| indent-8   | text-indent: 2rem;     |

#### line-height 属性

| Class     | Property              |
| --------- | --------------------- |
| leading-3 | line-height: 0.75rem; |
| leading-4 | line-height: 1rem;    |
| leading-5 | line-height: 1.25rem; |

#### 伪类 content 属性

| Class        | Property       |
| ------------ | -------------- |
| content-none | content: none; |

**设置伪元素的内容**
使用 content-[" "] 实用程序以及 before 和变体修饰符来设置和伪元素 after 的内容。

```html
<div>
  大家好，这是<a
    href="https://codepzj.cn"
    class="text-sky-400 after:content-['↗']"
    target="_blank"
    >我的博客</a
  >
</div>
```

## 背景

### background

#### background-color 熟性

> 用于控制元素背景颜色的实用程序。

| Class            | Properties                            |
| ---------------- | ------------------------------------- |
| `bg-inherit`     | `background-color: inherit;`          |
| `bg-current`     | `background-color: currentColor;`     |
| `bg-transparent` | `background-color: transparent;`      |
| `bg-black`       | `background-color: rgb(0 0 0);`       |
| `bg-white`       | `background-color: rgb(255 255 255);` |
| `bg-slate-50`    | `background-color: rgb(248 250 252);` |
| `bg-slate-100`   | `background-color: rgb(241 245 249);` |

**在属性后面可以添加透明度**

```html
// 代表opacity为0.5
<div class="w-full h-full bg-blue-700/50"></div>
```

#### background-repeat 属性

> 在一个元素中设置了 background-image 属性，如果 image 的尺寸小于该元素的尺寸，就会在元素中的 x，y 轴方向拓展图片

| Class             | Property                        |
| ----------------- | ------------------------------- |
| `bg-repeat`       | `background-repeat: repeat;`    |
| `bg-no-repeat`    | `background-repeat: no-repeat;` |
| `bg-repeat-x`     | `background-repeat: repeat-x;`  |
| `bg-repeat-y`     | `background-repeat: repeat-y;`  |
| `bg-repeat-round` | `background-repeat: round;`     |
| `bg-repeat-space` | `background-repeat: space;`     |

## 边框

### border

#### border-radius 属性

| Class          | Properties                 |
| -------------- | -------------------------- |
| `rounded-none` | `border-radius: 0px;`      |
| `rounded-sm`   | `border-radius: 0.125rem;` |
| `rounded`      | `border-radius: 0.25rem;`  |
| `rounded-md`   | `border-radius: 0.375rem;` |
| `rounded-lg`   | `border-radius: 0.5rem;`   |
| `rounded-xl`   | `border-radius: 0.75rem;`  |

#### border-width 属性

| Class      | Properties           |
| ---------- | -------------------- |
| `border-0` | `border-width: 0px;` |
| `border-2` | `border-width: 2px;` |
| `border-4` | `border-width: 4px;` |
| `border-8` | `border-width: 8px;` |
| `border`   | `border-width: 1px;` |

#### border-color 属性

| Class                | Properties                        |
| -------------------- | --------------------------------- |
| `border-inherit`     | `border-color: inherit;`          |
| `border-current`     | `border-color: currentColor;`     |
| `border-transparent` | `border-color: transparent;`      |
| `border-black`       | `border-color: rgb(0 0 0);`       |
| `border-white`       | `border-color: rgb(255 255 255);` |

#### border-style 属性

| Class           | Properties              |
| --------------- | ----------------------- |
| `border-solid`  | `border-style: solid;`  |
| `border-dashed` | `border-style: dashed;` |
| `border-dotted` | `border-style: dotted;` |
| `border-double` | `border-style: double;` |
| `border-hidden` | `border-style: hidden;` |
| `border-none`   | `border-style: none;`   |

```html
<div
  class="w-80 h-80 rounded-full bg-blue-400 border-2 border-dashed border-black"
></div>
```

## 效果

### box-shadow 属性

| Class        | Properties                                                                         |
| ------------ | ---------------------------------------------------------------------------------- |
| shadow-sm    | `box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);`                                       |
| shadow       | `box-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);`       |
| shadow-md    | `box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);`    |
| shadow-lg    | `box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);`  |
| shadow-xl    | `box-shadow: 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1);` |
| shadow-2xl   | `box-shadow: 0 25px 50px -12px rgb(0 0 0 / 0.25);`                                 |
| shadow-inner | `box-shadow: inset 0 2px 4px 0 rgb(0 0 0 / 0.05);`                                 |
| shadow-none  | `box-shadow: 0 0 #0000;`                                                           |

### box-shadow-color 属性

> 设置 box-shadow 阴影的颜色

| Class              | Properties                         |
| ------------------ | ---------------------------------- |
| shadow-inherit     | `--tw-shadow-color: inherit;`      |
| shadow-current     | `--tw-shadow-color: currentColor;` |
| shadow-transparent | `--tw-shadow-color: transparent;`  |
| shadow-black       | `--tw-shadow-color: #000;`         |
| shadow-white       | `--tw-shadow-color: #fff;`         |
| shadow-slate-50    | `--tw-shadow-color: #f8fafc;`      |
| shadow-slate-100   | `--tw-shadow-color: #f1f5f9;`      |

```html
<div
  class="bg-slate-700 w-40 h-40 ml-8 mt-8 shadow-2xl rounded-xl shadow-gray-400 hover:scale-105"
></div>
```

### opacity 属性

> 控制元素的透明度

| Class      | Properties       |
| ---------- | ---------------- |
| opacity-0  | `opacity: 0;`    |
| opacity-5  | `opacity: 0.05;` |
| opacity-10 | `opacity: 0.1;`  |
| opacity-15 | `opacity: 0.15;` |
| opacity-20 | `opacity: 0.2;`  |

{% note 注意
opacity为1代表完全不透明
color:yellow %}

## 过渡和动画

### transaction

> 实现元素属性的平滑过渡效果，比如颜色、大小或位置的渐变。

| Class              | Properties                                                                                                                                                |
| ------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------- |
| transition-none    | transition-property: none;                                                                                                                                |
| transition-all     | transition-property: all;                                                                                                                                 |
|                    | transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);                                                                                                 |
|                    | transition-duration: 150ms;                                                                                                                               |
| transition         | transition-property: color, background-color, border-color, text-decoration-color, fill, stroke, opacity, box-shadow, transform, filter, backdrop-filter; |
|                    | transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);                                                                                                 |
|                    | transition-duration: 150ms;                                                                                                                               |
| transition-colors  | transition-property: color, background-color, border-color, text-decoration-color, fill, stroke;                                                          |
|                    | transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);                                                                                                 |
|                    | transition-duration: 150ms;                                                                                                                               |
| transition-opacity | transition-property: opacity;                                                                                                                             |
|                    | transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);                                                                                                 |
|                    | transition-duration: 150ms;                                                                                                                               |
| transition-shadow  | transition-property: box-shadow;                                                                                                                          |
|                    | transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);                                                                                                 |
|                    | transition-duration: 150ms;                                                                                                                               |

```html
<button
  class="rounded-md transition-all ease-in-out duration-1000 bg-blue-300 p-5 m-5 hover:bg-cyan-500"
>
  button
</button>
```

{% folding  ease-in-out的作用 color:yellow %}
在 TailwindCSS 中，ease-in-out 是一个用于设置过渡动画的时间函数（timing function）的实用类。它会使元素的过渡动画在开始和结束时变得更平滑。具体来说，ease-in-out 是 CSS transition-timing-function 属性的一个预设值。

CSS 中的 ease-in-out 时间函数会使过渡动画在开始和结束时加速和减速，使动画更自然。它的具体效果是：
**Ease-in**: 动画开始时比较慢，加速过渡。
**Ease-out**: 动画结束时比较慢，减速过渡。
{% endfolding %}

### duration 属性

> 设置动画过渡时间，单位是 ms

| Class        | Properties                  |
| ------------ | --------------------------- |
| duration-0   | transition-duration: 0s;    |
| duration-75  | transition-duration: 75ms;  |
| duration-100 | transition-duration: 100ms; |
| duration-150 | transition-duration: 150ms; |
| duration-200 | transition-duration: 200ms; |

### ease 属性

> 设置元素动画效果缓入缓出

| Class       | Properties                                                |
| ----------- | --------------------------------------------------------- |
| ease-linear | transition-timing-function: linear;                       |
| ease-in     | transition-timing-function: cubic-bezier(0.4, 0, 1, 1);   |
| ease-out    | transition-timing-function: cubic-bezier(0, 0, 0.2, 1);   |
| ease-in-out | transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1); |

{% note 注意
ease-in 缓慢进入<br>
ease-out 缓慢出去<br>
ease-in-out 缓入缓出
color:yellow %}

### delay 属性

> 控制 css 动画转换的时延

| Class     | Properties               |
| --------- | ------------------------ |
| delay-0   | transition-delay: 0s;    |
| delay-75  | transition-delay: 75ms;  |
| delay-100 | transition-delay: 100ms; |
| delay-150 | transition-delay: 150ms; |

{% folding delay和duration的区别 color:yellow %}
delay 指的是在过渡开始之前的延迟时间，而 duration 是过渡效果持续的时间。简单来说，delay 是等待过渡开始的时间，duration 是过渡完成的时间。例如，如果 delay 设置为 100ms，duration 设置为 300ms，那么元素会在 100ms 后开始过渡，并且过渡将持续 300ms。
{% endfolding %}

### animation 属性

#### animate-spin 属性

> 作用是旋转动画

```html
<button
  type="button"
  class="inline-flex items-center px-4 py-2 font-semibold leading-6 text-sm shadow rounded-md text-white bg-indigo-500 hover:bg-indigo-400 transition ease-in-out duration-150 cursor-not-allowed"
>
  <svg
    class="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
  >
    <circle
      class="opacity-25"
      cx="12"
      cy="12"
      r="10"
      stroke="currentColor"
      stroke-width="4"
    ></circle>
    <path
      class="opacity-75"
      fill="currentColor"
      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
    ></path>
  </svg>
  Processing...
</button>
```

#### animate-pin 属性

> 使元素缩放并像雷达波或水波纹一样消失

```html
<span class="relative inline-flex">
  <button
    type="button"
    class="inline-flex items-center px-4 py-2 font-semibold leading-6 text-sm shadow rounded-md text-sky-500 bg-white dark:bg-slate-800 transition ease-in-out duration-150 cursor-not-allowed ring-1 ring-slate-900/10 dark:ring-slate-200/20"
    disabled=""
  >
    <font style="vertical-align: inherit;"
      ><font style="vertical-align: inherit;"> 交易 </font></font
    >
  </button>
  <span class="flex absolute h-3 w-3 top-0 right-0 -mt-1 -mr-1">
    <span
      class="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"
    ></span>
    <span class="relative inline-flex rounded-full h-3 w-3 bg-sky-500"></span>
  </span>
</span>
```

#### animate-pulse 属性

> 脉冲，实用程序以使元素逐渐淡入淡出 - 对于骨架加载器之类的东西很有用

```html
<div
  class="border border-blue-300 shadow rounded-md p-4 max-w-sm w-full mx-auto"
>
  <div class="animate-pulse flex space-x-4">
    <div class="rounded-full bg-slate-700 h-10 w-10"></div>
    <div class="flex-1 space-y-6 py-1">
      <div class="h-2 bg-slate-700 rounded"></div>
      <div class="space-y-3">
        <div class="grid grid-cols-3 gap-4">
          <div class="h-2 bg-slate-700 rounded col-span-2"></div>
          <div class="h-2 bg-slate-700 rounded col-span-1"></div>
        </div>
        <div class="h-2 bg-slate-700 rounded"></div>
      </div>
    </div>
  </div>
</div>
```

#### animate-bounce 属性

> 控制元素上下横跳

```html
<svg
  class="animate-bounce transition duration-1000 w-6 h-6 hover:animate-none"
  xmlns="http://www.w3.org/2000/svg"
  width="128"
  height="128"
  viewBox="0 0 24 24"
>
  <path
    fill="currentColor"
    d="M6 10.5v3.75q0 .325.213.538T6.75 15t.538-.213t.212-.537v-4.5q0-.325-.213-.537T6.75 9h-1q-.325 0-.537.213T5 9.75t.213.538t.537.212zM9.5 15H12q.425 0 .713-.288T13 14v-4q0-.425-.288-.712T12 9H9.5q-.425 0-.712.288T8.5 10v4q0 .425.288.713T9.5 15m.5-1.5v-3h1.5v3zm5.5-.75l1.55 1.975q.05.075.55.275q.425 0 .625-.387t-.075-.738L16.75 12l1.425-1.9q.275-.35.075-.725T17.6 9q-.175 0-.312.075t-.238.2L15.5 11.25v-1.5q0-.325-.212-.538T14.75 9t-.537.213T14 9.75v4.5q0 .325.213.538t.537.212t.538-.213t.212-.537zM5 21q-.825 0-1.412-.587T3 19V5q0-.825.588-1.412T5 3h14q.825 0 1.413.588T21 5v14q0 .825-.587 1.413T19 21z"
  />
</svg>
```
