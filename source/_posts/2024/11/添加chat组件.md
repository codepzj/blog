---
title: 添加chat组件
tags: [stellar]
categories: [技术分享]
permalink: posts/26.html
excerpt: 本文介绍如何添加chat组件，以及感谢且听风吟和星日语，感谢他们提供的思路。
poster:
  topic: null
  headline: 添加chat组件
  caption: null
  color: null
date: 2024-11-10 20:53:03
updated: 2024-11-10 20:53:03
topic:
banner:
references:
  - "[Chat小组件](https://weekdaycare.cn/posts/chat-plugin/)"
  - "[博客测试](https://stellar.listentothewind.cn/blog/2023-09-22-%E6%B5%8B%E8%AF%95/#chat)"
---

## 前言

{% box color:yellow %}
chat 组件，我参考了且听风吟和星日语大佬的博客，感谢他们提供的思路。
{% endbox %}

## 效果展示

{% tabs active:1 align:center %}

<!-- tab qq -->

{% chat style:qq title:古诗词小游戏 time:21:16 %}

<!-- chatcell user:user1 -->

君不见黄河之水天上来，奔流到海不复回。

<!-- chatcell user:user2 align:right -->

君不见高堂明镜悲白发，朝如青丝暮成雪。

<!-- chatcell user:user2 align:right -->

人生得意须尽欢，莫使金樽空对月。

<!-- chatcell user:user1 -->

天生我材必有用，千金散尽还复来。

<!-- chatcell user:user1 -->

{% link https://github.com/codepzj/AKGraph 数据科学概论实验 icon:https://github.com/favicon.ico %}
{% endchat %}

<!-- tab wechat -->

{% chat style:wechat title:古诗词小游戏 time:21:16 %}

<!-- chatcell user:user1 -->

君不见黄河之水天上来，奔流到海不复回。

<!-- chatcell user:user2 align:right -->

君不见高堂明镜悲白发，朝如青丝暮成雪。

<!-- chatcell user:user2 align:right -->

人生得意须尽欢，莫使金樽空对月。

<!-- chatcell user:user1 -->

天生我材必有用，千金散尽还复来。

<!-- chatcell user:user1 -->

{% link https://github.com/codepzj/AKGraph 数据科学概论实验 icon:https://github.com/favicon.ico %}
{% endchat %}
{% endtabs %}

## 用法介绍

```txt
{% chat style:qq/wechat title:标题 time:时间 %}
<!-- chattip 2024年5月22日 21:43  -->
<!-- chatcell user:user1 -->
content1
<!-- chatcell user:user2 align:right -->
content2
{% endchat %}
```

{% box color:red %}
一定要有`users.yml`文件，否则会报错。
{% endbox %}
**对应效果**
{% chat style:wechat title:标题 time:时间 %}

<!-- chattip 2024年5月22日 21:43  -->
<!-- chatcell user:user1 -->

content1

<!-- chatcell user:user2 align:right -->

content2
{% endchat %}

## 具体实现

### 注册 chat 组件

在`themes/stellar/scripts/tags/index.js`下新增以下代码

```js
hexo.extend.tag.register("chat", require("./lib/chat")(hexo), true);
```

### 新增 chat.js

新建`themes/stellar/scripts/tags/lib/chat.js`，并写入以下代码

```js chat.js
"use strict";

module.exports = (ctx) =>
  function (args, content = "") {
    args = ctx.args.map(args, ["title", "time", "style"]);
    const users = ctx.theme.config.users;

    // 提取 chatTip 和 chatcell 内容
    const chatTipMatch = content.match(/<!-- chattip (.*?) -->/);
    const chatContentMatches = [
      ...content.matchAll(
        /<!-- chatcell user:(\w+)(?: align:(\w+))? -->\n([\s\S]*?)(?=<!--|$)/g
      ),
    ];

    // 将时间和内容赋值到 chat 对象
    const chat = {
      chatTip: chatTipMatch ? chatTipMatch[1] : "",
      chatContent: chatContentMatches.map((match) => ({
        user: match[1],
        align: match[2] || "left", // 如果 align 未指定，默认为 "left"
        words: match[3].trim(), // 获取 chatcell 标签下的文本内容
      })),
    };

    var el = `<div class="tag-plugin chat iphone11 ${args.style || "wechat"}">`;
    el += `<div class="device-image"></div>`;

    el += `<div class="status-bar">`;
    el += `<div class="left-items"><span class="time">${
      args.time || ""
    }</span></div>`;
    el += `<div class="right-items"><svg t="1725171674750" class="icon earphone" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="973" width="200" height="200"><path d="M320 960c-6.4 0-14.933333-4.266667-17.066667-10.666667-34.133333-53.333333-61.866667-153.6-74.666666-204.8-2.133333 0-6.4-2.133333-8.533334-4.266666-4.266667-4.266667-6.4-8.533333-6.4-14.933334 0-6.4-12.8-66.133333-23.466666-115.2-4.266667-23.466667-8.533333-44.8-12.8-61.866666l-6.4-4.266667c-12.8-6.4-19.2-19.2-19.2-34.133333v-115.2c0-14.933333 8.533333-27.733333 19.2-34.133334l40.533333-21.333333c6.4-2.133333 12.8-4.266667 19.2-4.266667h12.8c12.8 0 23.466667 6.4 29.866667 14.933334 8.533333-27.733333 32-46.933333 61.866666-46.933334h17.066667c81.066667 0 149.333333 66.133333 149.333333 149.333334s-68.266667 149.333333-149.333333 149.333333h-14.933333c-29.866667 0-55.466667-19.2-61.866667-46.933333l-6.4 6.4 10.666667 160c0 4.266667 0 8.533333-4.266667 12.8l68.266667 196.266666c4.266667 10.666667-2.133333 21.333333-10.666667 25.6-6.4 4.266667-8.533333 4.266667-12.8 4.266667z m-125.866667-452.266667l12.8 6.4c6.4 2.133333 8.533333 8.533333 10.666667 14.933334 2.133333 8.533333 4.266667 21.333333 6.4 34.133333v-12.8c0-10.666667 6.4-19.2 14.933333-21.333333v-21.333334c0-21.333333 17.066667-38.4 38.4-38.4h14.933334c12.8 0 21.333333 8.533333 21.333333 21.333334v49.066666c0 12.8 10.666667 21.333333 21.333333 21.333334h14.933334c59.733333 0 106.666667-49.066667 106.666666-106.666667s-46.933333-106.666667-106.666666-106.666667h-17.066667c-12.8 0-21.333333 10.666667-21.333333 21.333334v49.066666c0 12.8-8.533333 21.333333-21.333334 21.333334H277.333333c-21.333333 0-38.4-17.066667-38.4-38.4v-21.333334h-8.533333l-36.266667 19.2v108.8zM706.133333 742.4c-2.133333 0-6.4 0-8.533333-2.133333-10.666667-4.266667-14.933333-14.933333-10.666667-25.6l68.266667-196.266667c-2.133333-4.266667-4.266667-8.533333-4.266667-12.8l10.666667-160-6.4-6.4c-8.533333 27.733333-32 46.933333-61.866667 46.933333h-14.933333c-83.2 0-149.333333-68.266667-149.333333-149.333333s66.133333-149.333333 149.333333-149.333333h17.066667c29.866667 0 55.466667 19.2 61.866666 46.933333 6.4-8.533333 17.066667-14.933333 29.866667-14.933333h12.8c6.4 0 12.8 2.133333 19.2 4.266666l40.533333 21.333334c6.4 6.4 14.933333 19.2 14.933334 32v115.2c0 14.933333-8.533333 27.733333-19.2 34.133333l-6.4 2.133333c-4.266667 17.066667-8.533333 40.533333-12.8 64-8.533333 49.066667-21.333333 108.8-21.333334 115.2 0 6.4-4.266667 10.666667-6.4 14.933334-2.133333 2.133333-4.266667 4.266667-8.533333 4.266666-12.8 53.333333-40.533333 153.6-74.666667 204.8-6.4 6.4-12.8 10.666667-19.2 10.666667z m81.066667-433.066667c8.533333 2.133333 14.933333 10.666667 14.933333 21.333334v12.8c2.133333-12.8 4.266667-23.466667 6.4-34.133334 2.133333-6.4 4.266667-10.666667 10.666667-14.933333l12.8-6.4V179.2l-38.4-21.333333h-6.4v21.333333c0 21.333333-17.066667 38.4-38.4 38.4h-14.933333c-12.8 0-21.333333-8.533333-21.333334-21.333333V149.333333c0-12.8-10.666667-21.333333-21.333333-21.333333h-17.066667c-57.6 0-106.666667 46.933333-106.666666 106.666667s49.066667 106.666667 106.666666 106.666666h14.933334c12.8 0 21.333333-10.666667 21.333333-21.333333v-49.066667c0-12.8 8.533333-21.333333 21.333333-21.333333h14.933334c21.333333 0 38.4 17.066667 38.4 38.4v21.333333z" fill="#4BB9A9" p-id="974"></path></svg> <svg t="1725171785378" class="icon bluetooth" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1590" width="200" height="200"><path d="M561.066667 512l157.866666-134.4c4.266667-4.266667 8.533333-10.666667 8.533334-14.933333s-2.133333-12.8-8.533334-14.933334l-177.066666-149.333333c-6.4-6.4-17.066667-6.4-23.466667-4.266667-8.533333 4.266667-12.8 10.666667-12.8 19.2v251.733334l-168.533333-142.933334c-8.533333-8.533333-23.466667-6.4-32 2.133334-8.533333 8.533333-6.4 21.333333 2.133333 29.866666l187.733333 157.866667-187.733333 157.866667c-8.533333 8.533333-10.666667 21.333333-2.133333 29.866666 4.266667 4.266667 10.666667 6.4 17.066666 6.4 4.266667 0 10.666667-2.133333 14.933334-6.4l168.533333-142.933333V810.666667c0 8.533333 4.266667 17.066667 12.8 19.2 2.133333 2.133333 6.4 2.133333 8.533333 2.133333 6.4 0 10.666667-2.133333 14.933334-6.4l177.066666-149.333333c4.266667-4.266667 8.533333-10.666667 8.533334-14.933334s-2.133333-12.8-8.533334-14.933333L561.066667 512z m-12.8-251.733333l119.466666 102.4-119.466666 102.4v-204.8z m0 503.466666v-202.666666l119.466666 102.4-119.466666 100.266666z" fill="#4BB9A9" p-id="1591"></path></svg> <svg t="1725171737557" class="icon network" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1438" width="200" height="200"><path d="M486.4 746.666667h-85.333333V533.333333c0-23.466667 19.2-42.666667 42.666666-42.666666s42.666667 19.2 42.666667 42.666666v213.333334zM347.733333 746.666667h-85.333333v-128c0-23.466667 19.2-42.666667 42.666667-42.666667s42.666667 19.2 42.666666 42.666667v128zM622.933333 746.666667h-85.333333V448c0-23.466667 19.2-42.666667 42.666667-42.666667s42.666667 19.2 42.666666 42.666667v298.666667zM761.6 746.666667h-85.333333V320c0-23.466667 19.2-42.666667 42.666666-42.666667s42.666667 19.2 42.666667 42.666667v426.666667z" fill="#4BB9A9" p-id="1439"></path></svg> <svg t="1725171718141" class="icon wifi" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1283" width="200" height="200"><path d="M503.466667 810.666667l96-102.4c-25.6-25.6-59.733333-42.666667-96-42.666667s-72.533333 17.066667-96 42.666667l96 102.4zM503.466667 462.933333c-89.6 0-172.8 38.4-232.533334 102.4l76.8 81.066667c40.533333-42.666667 93.866667-68.266667 153.6-68.266667s115.2 25.6 153.6 68.266667l76.8-81.066667c-55.466667-64-136.533333-102.4-228.266666-102.4z" fill="#4BB9A9" p-id="1284"></path><path d="M503.466667 260.266667c-142.933333 0-273.066667 61.866667-366.933334 162.133333l76.8 81.066667c74.666667-78.933333 177.066667-128 290.133334-128 113.066667 0 215.466667 49.066667 290.133333 128l76.8-81.066667c-93.866667-100.266667-224-162.133333-366.933333-162.133333z" fill="#4BB9A9" p-id="1285"></path></svg> <svg t="1725171698168" class="icon battery" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1125" width="200" height="200"><path d="M704 682.666667H234.666667c-83.2 0-149.333333-66.133333-149.333334-149.333334v-42.666666c0-83.2 66.133333-149.333333 149.333334-149.333334h469.333333c83.2 0 149.333333 66.133333 149.333333 149.333334v42.666666c0 83.2-66.133333 149.333333-149.333333 149.333334zM234.666667 384c-59.733333 0-106.666667 46.933333-106.666667 106.666667v42.666666c0 59.733333 46.933333 106.666667 106.666667 106.666667h469.333333c59.733333 0 106.666667-46.933333 106.666667-106.666667v-42.666666c0-59.733333-46.933333-106.666667-106.666667-106.666667H234.666667z" fill="#4BB9A9" p-id="1126"></path><path d="M704 682.666667H234.666667c-83.2 0-149.333333-66.133333-149.333334-149.333334v-42.666666c0-83.2 66.133333-149.333333 149.333334-149.333334h469.333333c83.2 0 149.333333 66.133333 149.333333 149.333334v42.666666c0 83.2-66.133333 149.333333-149.333333 149.333334zM234.666667 384c-59.733333 0-106.666667 46.933333-106.666667 106.666667v42.666666c0 59.733333 46.933333 106.666667 106.666667 106.666667h469.333333c59.733333 0 106.666667-46.933333 106.666667-106.666667v-42.666666c0-59.733333-46.933333-106.666667-106.666667-106.666667H234.666667z" fill="#4BB9A9" p-id="1127"></path><path d="M153.6 539.733333v-55.466666c0-38.4 32-70.4 70.4-70.4h490.666667c38.4 0 70.4 32 70.4 70.4v55.466666c0 38.4-32 70.4-70.4 70.4h-490.666667c-38.4 0-70.4-32-70.4-70.4zM896 554.666667c-12.8 0-21.333333-8.533333-21.333333-21.333334v-42.666666c0-12.8 8.533333-21.333333 21.333333-21.333334s21.333333 8.533333 21.333333 21.333334v42.666666c0 12.8-8.533333 21.333333-21.333333 21.333334z" fill="#4BB9A9" p-id="1128"></path></svg></div>`;
    el += `</div>`;

    el += `<div class="navbar">`;

    el += `<div class="left-items">`;
    el += `<div class="back-btn"><svg t="1725176176548" class="icon back" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="992" width="200" height="200"><path d="M347.008 574.379a85.547 85.547 0 0 1 0-124.758l285.483-267.477a42.39 42.39 0 0 1 60.074 2.07c16.022 17.237 15.104 44.223-2.069 60.309L405.013 512l285.483 267.477c17.173 16.086 18.09 43.094 2.07 60.31a42.39 42.39 0 0 1-60.075 2.069L347.008 574.379z" p-id="993"></path></svg></div>`;
    el += `<div class="news-num">${
      chat.chatContent?.length || ""
    }</div><div class="title">${args.title || ""}</div>`;
    el += `</div>`;

    el += `<div class="right-items">`;
    el += `<div class="more-btn"><svg t="1725176222076" class="icon more" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1146" width="200" height="200"><path d="M106.667 170.667A42.667 42.667 0 0 1 149.333 128h725.334a42.667 42.667 0 1 1 0 85.333H149.333a42.667 42.667 0 0 1-42.666-42.666z m0 341.333a42.667 42.667 0 0 1 42.666-42.667h725.334a42.667 42.667 0 1 1 0 85.334H149.333A42.667 42.667 0 0 1 106.667 512z m0 341.333a42.667 42.667 0 0 1 42.666-42.666h725.334a42.667 42.667 0 1 1 0 85.333H149.333a42.667 42.667 0 0 1-42.666-42.667z" p-id="1147"></path></svg></div>`;
    el += `</div>`;

    el += `</div>`;

    el += `<div class="content">`;
    el += `<div class="chattip">${chat.chatTip}</div>`;
    for (let messageContent of chat.chatContent) {
      el += `<div class="chatcell ${
        messageContent?.align
      }"><div class="user-avatar"><img src=${
        users[messageContent?.user]?.avatar ||
        "https://gcore.jsdelivr.net/gh/cdn-x/placeholder@1.0.12/image/2659360.svg"
      } alt="avatar"></div><div class="user-main"><div class="header"><span class="label">${
        users[messageContent?.user]?.label?.text || ""
      }</span><span class="name">${
        users[messageContent?.user]?.name || ""
      }</span></div><div class="talk emoji">${
        messageContent?.words || ""
      }</div></div></div>`;
    }
    el += `</div>`;
    if (args.style === "qq") {
      el += `<div class="bottom"><div class="input"><div class="input-text"></div><div class="submit-btn">发送</div></div><div class="icons"><svg t="1725181743954" class="icon voice" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="12114" width="200" height="200"><path d="M511.546501 703.829938c125.165633 0 224.028344-98.86271 224.028344-224.028344V224.028344C735.574845 98.86271 636.712135 0 511.546501 0 387.287865 0 287.518158 98.86271 287.518158 224.028344v255.77325c0 125.165633 99.769708 224.028344 224.028343 224.028344zM351.914969 224.028344c0-89.792737 70.745793-159.631532 159.631532-159.631533 89.792737 0 160.53853 69.838795 160.53853 159.631533v255.77325c0 89.792737-70.745793 160.53853-160.53853 160.53853-88.88574 0-159.631532-70.745793-159.631532-160.53853V224.028344z" fill="#2c2c2c" p-id="12115"></path><path d="M896.113375 479.801594h-64.396812c0 175.957484-144.212578 320.170062-320.170062 320.170062S192.283437 655.759079 192.283437 479.801594H127.886625c0 201.35341 153.282551 364.612932 351.914969 380.938884v163.259522h64.396812V860.740478c197.725421-16.325952 351.914969-179.585474 351.914969-380.938884z" fill="#2c2c2c" p-id="12116"></path></svg> <svg t="1725181180856" class="icon photos" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4604" width="200" height="200"><path d="M340.7 309.9c22.5 0 43.7 9.2 59.8 25.9 16.4 17 25.4 39.5 25.4 63.4 0 49-38.2 88.9-85.2 88.9-46.9 0-85.1-40.1-85.1-89.3 0-24 9-46.5 25.3-63.3 16-16.5 37.2-25.6 59.8-25.6m0-40c-69.2 0-125.1 57.6-125.1 128.9 0 71.2 55.9 129.3 125.1 129.3 69.2 0 125.2-58 125.2-128.9 0-70.8-56-129.3-125.2-129.3z" p-id="4605"></path><path d="M753.1 895.1h-482c-53.5 0-104-20.6-142-58.1-7.9-7.7-8-20.4-0.2-28.3 7.7-7.9 20.4-8 28.3-0.2 30.6 30 71 46.6 114 46.6h482.1c89.6 0 162.6-72.9 162.6-162.6v-361c0-89.6-72.9-162.6-162.6-162.6H270.9c-89.6 0-162.6 72.9-162.6 162.6v299.1c0 11-9 20-20 20s-20-9-20-20V331.5c0-111.7 90.9-202.6 202.6-202.6h482.3c111.7 0 202.6 90.9 202.6 202.6v361.1c-0.1 111.6-91 202.5-202.7 202.5z" p-id="4606"></path><path d="M586.9 895.1H273.2c-47.9 0-94.2-17.2-130.6-48.4-6.6-5.7-10.6-13.7-11.2-22.5-0.6-8.9 2.5-17.8 8.4-24.4l112.3-126c17.5-19.7 42.7-30.9 69-30.9 26.3 0 51.5 11.3 69 31l137.3 154.2 59.5 67z m-412.5-74c28.1 22 62.9 34 98.7 34h224.7l-0.4-0.4-137.2-154.2c-9.9-11.2-24.2-17.6-39.2-17.6-14.9 0-29.2 6.4-39.1 17.6L174.4 821.1z" p-id="4607"></path><path d="M753.1 895.1H449.5l46.4-65.3L752 471.3c11-15.2 28.7-24.3 47.4-24.3h0.2c18.7 0.1 36.3 9.1 47.1 24.3l109 152.7v68.5c0 111.7-90.9 202.6-202.6 202.6z m-226.1-40h226.2c89.6 0 162.6-72.9 162.6-162.6v-55.7L814 494.5c-3.4-4.8-8.7-7.5-14.6-7.5h-0.1c-6 0-11.4 2.8-14.9 7.6L528.5 853l-1.5 2.1z" p-id="4608"></path></svg> <svg t="1725181229504" class="icon camera" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5778" width="200" height="200"><path d="M512 288c-124.8 0-224 99.2-224 224s99.2 224 224 224 224-99.2 224-224-99.2-224-224-224z m0 400c-96 0-176-80-176-176s80-176 176-176 176 80 176 176-80 176-176 176zM768 371.2a1.6 1.6 0 1 0 102.4 0 1.6 1.6 0 1 0-102.4 0z" fill="" p-id="5779"></path><path d="M864 224h-96l-22.4-67.2c-6.4-16-25.6-28.8-41.6-28.8H320c-19.2 0-35.2 12.8-41.6 28.8L256 224h-96c-54.4 0-96 41.6-96 96v448c0 54.4 44.8 96 96 96h704c54.4 0 96-41.6 96-96V320c0-54.4-41.6-96-96-96z m48 544c0 25.6-22.4 48-48 48H160c-25.6 0-48-22.4-48-48V320c0-25.6 22.4-48 48-48h131.2l9.6-32 22.4-64h377.6l22.4 64 9.6 32H864c25.6 0 48 22.4 48 48v448z" fill="" p-id="5780"></path></svg> <svg t="1725181292114" class="icon red-envelope" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="7925" width="200" height="200"><path d="M839.68 102.4c0-11.264-9.216-20.48-20.48-20.48-3.584 0-6.656 1.024-9.216 2.56-3.584-1.024-7.168-1.536-11.264-1.536H225.28c-4.096 0-7.68 0.512-11.264 1.536-2.56-1.536-5.632-2.56-9.216-2.56-11.264 0-20.48 9.216-20.48 20.48 0 5.12 0 10.752 0.512 15.872 0 1.536-0.512 3.584-0.512 5.632V901.12c0 22.528 18.432 40.96 40.96 40.96h573.44c22.528 0 40.96-18.432 40.96-40.96V123.392c0-2.048 0-3.584-0.512-5.632 0.512-4.608 0.512-10.24 0.512-15.36z m-41.984 20.992C786.944 271.36 663.04 388.608 512 388.608S237.056 271.872 226.304 123.392h571.392zM225.28 901.12V260.608c55.808 100.864 163.328 168.96 286.72 168.96s230.912-68.608 286.72-168.96V901.12H225.28z" p-id="7926"></path><path d="M595.968 550.4l-51.712 95.744c-2.048 3.584 0.512 7.68 4.608 7.68h52.736c7.68 0 13.824 6.144 13.824 13.824 0 7.68-6.144 13.824-13.824 13.824h-65.536c-3.072 0-5.12 2.048-5.12 5.12v33.792h75.776c7.68 0 13.824 6.144 13.824 13.824 0 7.68-6.144 13.824-13.824 13.824h-70.656c-3.072 0-5.12 2.048-5.12 5.12v53.76c0 9.728-7.68 17.408-17.408 17.408s-17.408-7.68-17.408-17.408v-53.76c0-3.072-2.048-5.12-5.12-5.12H417.792c-7.68 0-13.824-6.144-13.824-13.824 0-7.68 6.144-13.824 13.824-13.824h77.824v-33.792c0-3.072-2.048-5.12-5.12-5.12H422.912c-7.68 0-13.824-6.144-13.824-13.824 0-7.68 6.144-13.824 13.824-13.824h53.76c4.096 0 6.144-4.096 4.608-7.68l-51.2-95.744c-5.632-10.752 2.048-24.064 14.336-24.064h2.56c6.144 0 11.776 3.584 14.848 9.216l43.008 90.112c2.56 5.632 5.632 12.288 9.216 20.992h0.512c2.56-6.656 5.632-14.336 9.216-22.016l43.52-89.088c2.56-5.632 8.192-9.216 14.848-9.216 11.776 0 19.968 13.312 13.824 24.064z" p-id="7927"></path></svg> <svg t="1725182023098" class="icon smile" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="13177" width="200" height="200"><path d="M675.328 117.717333A425.429333 425.429333 0 0 0 512 85.333333C276.352 85.333333 85.333333 276.352 85.333333 512s191.018667 426.666667 426.666667 426.666667 426.666667-191.018667 426.666667-426.666667c0-56.746667-11.093333-112-32.384-163.328a21.333333 21.333333 0 0 0-39.402667 16.341333A382.762667 382.762667 0 0 1 896 512c0 212.074667-171.925333 384-384 384S128 724.074667 128 512 299.925333 128 512 128c51.114667 0 100.8 9.984 146.986667 29.12a21.333333 21.333333 0 0 0 16.341333-39.402667z m48.384 532.928A234.538667 234.538667 0 0 1 520.405333 768a234.538667 234.538667 0 0 1-203.264-117.333333 21.333333 21.333333 0 0 0-36.949333 21.333333 277.184 277.184 0 0 0 240.213333 138.666667c100.16 0 190.997333-53.546667 240.213334-138.666667a21.333333 21.333333 0 0 0-36.906667-21.333333zM341.333333 426.624c0-23.552 18.944-42.624 42.666667-42.624 23.573333 0 42.666667 19.157333 42.666667 42.624v42.752A42.538667 42.538667 0 0 1 384 512c-23.573333 0-42.666667-19.157333-42.666667-42.624v-42.752z m256 0c0-23.552 18.944-42.624 42.666667-42.624 23.573333 0 42.666667 19.157333 42.666667 42.624v42.752A42.538667 42.538667 0 0 1 640 512c-23.573333 0-42.666667-19.157333-42.666667-42.624v-42.752z" fill="#3D3D3D" p-id="13178"></path></svg> <svg t="1725181698540" class="icon more" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="10952" width="200" height="200"><path d="M882.2 355.6c-20.2-47.8-49.2-90.8-86.1-127.7-36.9-36.9-79.9-65.9-127.7-86.1-49.5-21-102.2-31.6-156.4-31.6s-106.9 10.6-156.4 31.6c-47.9 20.2-90.8 49.2-127.7 86.1-36.9 36.9-65.9 79.9-86.1 127.7-21 49.6-31.6 102.2-31.6 156.4s10.6 106.9 31.6 156.4c20.2 47.8 49.2 90.8 86.1 127.7 36.9 36.9 79.9 65.9 127.7 86.1 49.5 21 102.2 31.6 156.4 31.6s106.9-10.6 156.4-31.6c47.9-20.2 90.8-49.2 127.7-86.1 36.9-36.9 65.9-79.9 86.1-127.7 21-49.5 31.6-102.2 31.6-156.4s-10.6-106.9-31.6-156.4zM512 877.8c-201.7 0-365.8-164.1-365.8-365.8 0-201.7 164.1-365.8 365.8-365.8 201.7 0 365.8 164.1 365.8 365.8 0 201.7-164.1 365.8-365.8 365.8z" p-id="10953"></path><path d="M752.8 512.2c0 9.9-8.1 18-18 18H530.2v204.6c0 9.9-8.1 18-18 18s-18-8.1-18-18V530.2H289.6c-9.9 0-18-8.1-18-18s8.1-18 18-18h204.6V289.6c0-9.9 8.1-18 18-18s18 8.1 18 18v204.6h204.6c9.9 0 18 8 18 18z" p-id="10954"></path></svg></div></div>`;
    } else {
      el += `<div class="bottom"><svg t="1730482672119" class="icon voice" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6039" width="48" height="48"><path d="M513 959.5c-58.1 0-114.8-11-168.4-32.8-55.5-22.5-105.3-55.6-148.1-98.3-42.7-42.7-75.8-92.5-98.3-148C76.5 626.8 65.5 570.1 65.5 512c0-58.1 11-114.8 32.8-168.4 22.5-55.5 55.6-105.3 98.3-148 42.7-42.7 92.5-75.8 148-98.3C398.2 75.5 454.9 64.5 513 64.5s114.8 11 168.4 32.8c55.5 22.5 105.3 55.6 148 98.3 42.7 42.7 75.8 92.5 98.3 148 21.7 53.6 32.8 110.3 32.8 168.4 0 58.1-11 114.8-32.8 168.4-22.5 55.5-55.6 105.3-98.3 148-42.7 42.7-92.5 75.8-148 98.3-53.7 21.8-110.3 32.8-168.4 32.8z m0-839c-50.9 0-100.4 9.6-147.3 28.7-48.5 19.7-92.1 48.6-129.5 86-37.4 37.4-66.3 80.9-86 129.5-19 46.9-28.7 96.5-28.7 147.3 0 50.9 9.6 100.4 28.7 147.3 19.7 48.5 48.6 92.1 86 129.5 37.4 37.4 80.9 66.3 129.5 86 46.9 19 96.5 28.7 147.3 28.7 50.9 0 100.4-9.6 147.3-28.7 48.5-19.7 92.1-48.6 129.5-86 37.4-37.4 66.3-81 86-129.5 19-46.9 28.7-96.5 28.7-147.3s-9.6-100.4-28.7-147.3c-19.7-48.5-48.6-92.1-86-129.5-37.4-37.4-80.9-66.3-129.5-86-46.9-19-96.5-28.7-147.3-28.7z" fill="" p-id="6040"></path><path d="M569.1 764c-10.5-10.2-11.4-26.7-2.1-38 49.8-60.1 77-135.2 77-214 0-78.8-27.2-153.9-77-214-9.3-11.3-8.5-27.8 2.1-38 11.7-11.3 30.6-10.3 41 2.2C668.3 332.4 700 420 700 512s-31.7 179.6-89.9 249.8c-10.4 12.5-29.3 13.6-41 2.2zM450.7 649.7c-10-9.7-11.5-25.3-3.3-36.5 21.3-29.2 32.8-64.4 32.8-101.2s-11.5-71.9-32.8-101.2c-8.2-11.2-6.7-26.8 3.3-36.5 12.2-11.8 32.1-10.1 42 3.6 28.3 38.8 43.5 85.4 43.5 134.1 0 48.7-15.3 95.3-43.5 134.1-10 13.7-29.8 15.4-42 3.6zM349.3 551.8c-7.8-7.5-10.4-18.7-7.1-29 1.1-3.4 1.7-7.1 1.7-10.8 0-3.7-0.6-7.3-1.7-10.8-3.3-10.3-0.6-21.5 7.1-29 14.9-14.4 39.7-8.2 46.1 11.4 2.9 9 4.4 18.6 4.4 28.3s-1.5 19.3-4.4 28.3c-6.4 19.8-31.2 25.9-46.1 11.6z" fill="" p-id="6041"></path></svg><div class="input-text"></div><svg t="1730481816484" class="icon smile" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1014" width="48" height="48"><path d="M600.1 637h-36 36zM918.5 334.2c-22.6-53.4-55-101.5-96.2-142.7-41.2-41.2-89.2-73.6-142.7-96.2C624.2 71.9 565.5 60 504.8 60 444.2 60 385.4 71.9 330 95.3c-53.4 22.6-101.5 54.9-142.7 96.2-41.2 41.2-73.6 89.2-96.2 142.7C67.9 389.6 56 448.4 56 509c0 60.6 11.9 119.4 35.3 174.8 22.6 53.4 54.9 101.5 96.2 142.7 41.2 41.2 89.2 73.6 142.7 96.2C385.6 946.1 444.3 958 505 958c60.6 0 119.4-11.9 174.8-35.3 53.4-22.6 101.5-55 142.7-96.2 41.2-41.2 73.6-89.2 96.2-142.7C942.1 628.4 954 569.7 954 509c0-60.7-12.1-119.4-35.5-174.8zM504.9 893.1c-211.8 0-384.1-172.3-384.1-384.1s172.3-384.1 384.1-384.1S889 297.2 889 509 716.7 893.1 504.9 893.1z" p-id="1015"></path><path d="M348.4 439.4c31 0 56.2-25.1 56.2-56.2 0-31-25.1-56.2-56.2-56.2-31 0-56.2 25.1-56.2 56.2s25.2 56.2 56.2 56.2zM661.6 439.4c31 0 56.2-25.1 56.2-56.2 0-31-25.1-56.2-56.2-56.2-31 0-56.2 25.1-56.2 56.2 0.1 31.1 25.2 56.2 56.2 56.2zM751 547.8c0-9.3-7.6-16.8-17-16.8H276c-9.3 0-16.9 7.5-17 16.8v0.2c0 16.1 1.6 31.8 4.5 47C285.4 708.4 385.2 794 505 794s219.6-85.6 241.5-199c2.9-15.2 4.5-30.9 4.5-47v-0.2zM505 731c-84.8 0-156.1-57.7-176.9-136h353.8c-20.8 78.3-92.1 136-176.9 136z" p-id="1016"></path></svg> <svg t="1730481878865" class="icon more" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="949" width="48" height="48"><path d="M512 82.773333a426.666667 426.666667 0 1 0 426.666667 426.666667 426.666667 426.666667 0 0 0-426.666667-426.666667z m0 800.426667a374.186667 374.186667 0 1 1 373.76-374.186667A374.613333 374.613333 0 0 1 512 883.2z" fill="#333333" p-id="950"></path><path d="M705.28 482.986667h-166.4V324.693333a26.026667 26.026667 0 0 0-25.6-26.453333 26.026667 26.026667 0 0 0-26.026667 26.026667v158.72H319.573333a26.026667 26.026667 0 0 0 0 52.053333h166.4v158.293333a26.026667 26.026667 0 0 0 26.026667 26.453334 26.453333 26.453333 0 0 0 26.453333-26.026667v-158.72h167.253334a26.026667 26.026667 0 0 0 0-52.053333z" fill="#333333" p-id="951"></path></svg></div>`;
    }
    el += `</div>`;
    return el;
  };
```

### 新增 chat.styl

新建`themes/stellar/source/css/_components/tag-plugins/chat.styl`，并写入以下代码

```css chat.styl
.md-text
  .tag-plugin
    &.chat
      width 375px
      margin 1rem auto
      border-radius 8px
      background var(--chat-block)
      box-shadow rgba(0,0,0,.16) 0 1px 4px
      display flex
      flex-direction column
      height 658px
      width 320px
      overflow hidden
      &.iphone11
        width 312px
        height 658px
        border-radius 3em
        padding 1em
        position relative
        box-shadow unset
        & > .device-image
          background-image url("https://gcore.jsdelivr.net/gh/cdn-x/placeholder@1.0.4/frame/iphone11.svg")
          width 100%
          height 100%
          position absolute
          top 0
          left 0
          z-index 2
          background-repeat round

        & > .status-bar
          display flex
          margin .5em .7em
          justify-content space-between
          & > .left-items
            font-size .75rem
            width 5em
            display flex
            justify-content center
          & > .right-items
            display flex
            flex-direction row
            align-items center
            & > svg
              &.icon
                width 1.3em
                height 1.3em
                & > path
                  fill var(--text-p1)
        & > .bottom
          margin 0 .4em
          padding-bottom .75em
      & > .navbar
        display flex
        padding .3rem 0
        justify-content space-between
        z-index 4
        .left-items
          display flex
          align-items center
          .back-btn
            margin-left .2em
            .icon
              &.back
                width 1.3em
                height 1.3em
          .news-num
            background var(--chat-bg)
            border-radius 8px
            font-size .75em
            padding 0 4px
            margin-right 8px
            color var(--text-p2)
        .right-items
          & > .more-btn
            height 100%
            margin-right .5em
      & > .content
        background var(--chat-bg)
        overflow auto
        flex 1
        z-index 3
        overflow-x hidden
        & > div
          &:first-child
            margin-top 1em
        .chattip
          font-size .75rem
          color var(--text-p3)
          margin auto
          width fit-content
          margin-bottom 1em
        .chatcell
          margin 0 .5em
          margin-bottom 1em
          .user-avatar
            float left
            img
              width 32px
              height 32px
              border-radius 50%
          .user-main
            padding 0 .5em
            display flex
            flex-flow column
            .header
              line-height 1.5
              font-size 13px
              margin-bottom .5em
              overflow hidden
              position relative
              display flex
              flex-wrap wrap
              align-items center
              .label
                padding 0 2px
                color var(--theme-color)
                background var(--theme-color-opa)
                border-radius 2px
                margin-right 4px
                font-size calc(.75rem - .1rem)
                font-weight 600
              .name
                color var(--text-p3)
                font-size .75rem
            .talk
              width fit-content
              max-width calc(100% - 32px)
              background var(--chat-block)
              padding calc((32px - 1.3 * .875rem)/ 2) .5em
              border-radius 6px
              p
                font-size .875rem
                line-height 1.3
                margin 0
              & > .error-img-to-show
                min-width 100px
                min-height 100px
              &.link
                .link-card
                  background var(--chat-block)
                  box-shadow unset
                  transition unset
                  -webkit-transition unset
                  -moz-transition unset
                  -o-transition unset
                  &:hover
                    transform none
                    color var(--text-p3)
                  .top
                    margin .5em
                    max-width unset
                    span
                      white-space unset
                      font-size .875rem
                  .center
                    margin 0 .5em
                    column-gap .5em
                    display flex
                    align-self unset
                    .left
                      width calc(100% - 32px - .5em)
                      height 32px
                      .desc
                        -webkit-line-clamp 2
                    .right
                      flex 1
                  .bottom
                    margin .5em .5em .3em .5em
                    padding-top .3em
                    border-top 1px solid var(--chat-border)
                    display flex
                    align-items center
              &.voice
                display flex
                align-items center
                justify-content left
                padding 4.5px .5em
                cursor pointer
                .voice-btns
                  flex-shrink 0
                  svg
                    &.icon
                      width 1.3em
                      height 1.3em
                      & > path
                        fill var(--text-p1)
                canvas
                  &.voice-wave
                    margin 0 .5em
                div
                  &.voice-wave
                    height 1.2em
                    margin 0 .5em
                    display flex
                    justify-content center
                    align-items center
                    position relative
                    .play-line
                      position absolute
                      top -20%
                      left 0
                      height 140%
                      width 1px
                      background var(--text-p2)
                      content ""
                      opacity 0
                      &.active
                        opacity 1
                      &.back
                        transition transform .3s linear!important
                        -moz-transition transform .3s linear!important
                        -webkit-transition transform .3s linear!important
                        -o-transition transform .3s linear!important
                    span
                      &.voice-wave-item
                        background var(--text-p2)
                        width 2px
                        border-radius 2px
                        flex-shrink 0
                .voice-metas
                  font-size .875rem
                  display flex
                  flex-shrink 0
                  span
                    line-height 1
              &.video
                position relative
                line-height 0
                .video-btns
                  position absolute
                  top 0
                  left 0
                  width 100%
                  height 100%
                  svg
                    &.icon
                      width 3em
                      height 3em
                      & > path
                        fill var(--chat-video-button)
                video
                  width 100%
                  border-radius 6px
              &.file
                background 0 0!important
                display flex
                padding unset!important
                column-gap .3rem
                width calc(100% - 32px)
                cursor pointer
                & > .content
                  background var(--chat-block)
                  padding .5em
                  border-radius 6px
                  flex-grow 1
                  & > .top
                    display flex
                    align-items center
                    column-gap .5rem
                    & > .left
                      height 2.5rem
                      flex-grow 1
                      & > span
                        white-space unset
                        font-size .875rem
                        font-weight 500
                        color var(--text-p1)
                        overflow hidden
                        text-overflow ellipsis
                        max-width 100%
                        display -webkit-box
                        -webkit-box-orient vertical
                        -webkit-line-clamp 2
                        line-height calc(2.5rem / 2)
                    & > .right
                      height fit-content
                      & > svg
                        &.icon
                          height 2.5rem
                          width unset
                  & > .bottom
                    margin-top .5em
                    display flex
                    & > span
                      line-height .75rem
                & > .download-btn
                  display flex
                  align-items flex-end
                  & > svg
                    &.icon
                      height 1rem
                      width 1rem
                      padding .2em
                      border-radius 50%
                      background var(--chat-block)
                      & > path
                        fill var(--text-p1)
          &.right
            .user-avatar
              float right
            .user-main
              flex-flow row-reverse
              flex-wrap wrap
              .header
                flex-basis 100%
                justify-content flex-end
              .talk
                &.file
                  flex-direction row-reverse
      & > .bottom
        z-index 1
        padding-bottom .5em
        background var(--chat-bg)
        box-shadow rgba(0,0,0,.06) 0 1px 1px 0 inset
        .input
          display flex
          align-items center
          justify-content space-between
          margin 0 .5em
          margin-top .5em
          height 32px
          .input-text
            background var(--chat-block)
            border-radius 6px
            width calc(100% - 40px - .5em)
            height 100%
          .submit-btn
            padding 3px 6px
            background var(--theme-color-opa)
            border-radius 6px
            font-size .875rem
            color var(--theme-color)
        .icons
          margin 0 .5em
          display flex
          justify-content space-between
          margin-top .5em
          & > svg
            &.icon
              width 1.5em
              height 1.5em
              &.voice
                width 1.3em!important
                height 1.3em!important
              path
                fill var(--text-p2)
      &.person
        & > .content
          & > .chatcell
            & > .user-main
              min-height 32px
              justify-content center
              align-content unset
              & > .header
                display none
            &.right
              & > .user-main
                justify-content unset
                align-content center
      &.wechat
        &.iphone11
          background var(--chat-bg)
          & > .bottom
            padding-bottom .75rem
        & > .navbar
          background var(--chat-bg)
          box-shadow rgba(27,31,35,.02) 0 1px 0
          & > .left-items
            & > .news-num
              background var(--chat-news-num)
        & > .content
          & > .chatcell
            & > .user-avatar
              & > img
                border-radius 4px
            & > .user-main
              & > .header
                line-height 1
                margin-bottom .2em
                & > .label
                  display none
              & > .talk
                position relative
                border-radius 4px
                &:before
                  content ""
                  position absolute
                  left -2.5px
                  top 11px
                  width 10px
                  height 10px
                  border-radius 1.5px
                  transform rotate(-45deg)
                  background var(--chat-block)
                &.file
                  .download-btn
                    display none
            &.right
              & > .user-main
                & > .header
                  display none
                & > .talk
                  &:before
                    right -2px
                    left unset
        & > .bottom
          display flex
          align-items center
          justify-content space-between
          padding .5em
          column-gap .5em
          .input-text
            border-radius 4px
            flex-grow 1
            height 2rem
            background var(--chat-block)
          .icon
            height 1.5rem
            width 1.5rem
            & > path
              fill var(--text-p2)

.md-text .tag-plugin.chat.iphone11>.status-bar>.right-items>svg.icon.bluetooth,.md-text .tag-plugin.chat.iphone11>.status-bar>.right-items>svg.icon.earphone
  display none

.md-text .tag-plugin.chat.iphone11>.content,.md-text .tag-plugin.chat.iphone11>.navbar
  margin 0 .4em

.md-text .tag-plugin.chat>.navbar .left-items>.back-btn,.md-text .tag-plugin.chat>.navbar .right-items>.more-btn
  display flex
  align-items center

.md-text .tag-plugin.chat>.navbar .left-items>.back-btn>svg>path,.md-text .tag-plugin.chat>.navbar .right-items>.more-btn>svg>path
  fill var(--text-p1)

.md-text .tag-plugin.chat>.content .chatcell .user-main .talk.emoji,.md-text .tag-plugin.chat>.content .chatcell .user-main .talk.file,.md-text .tag-plugin.chat>.content .chatcell .user-main .talk.image,.md-text .tag-plugin.chat>.content .chatcell .user-main .talk.link,.md-text .tag-plugin.chat>.content .chatcell .user-main .talk.video
  background unset!important
  padding 0!important

.md-text .tag-plugin.chat>.content .chatcell .user-main .talk.link .link-card .bottom>span,.md-text .tag-plugin.chat>.content .chatcell .user-main .talk.link .link-card .bottom>svg
  height .8rem

.md-text .tag-plugin.chat>.content .chatcell .user-main .talk.video .video-btns .pause-btn,.md-text .tag-plugin.chat>.content .chatcell .user-main .talk.video .video-btns .play-btn
  align-items center
  justify-content center
  width 100%
  height 100%

.md-text .tag-plugin.chat.wechat>.content>.chatcell>.user-main>.talk.emoji:before,.md-text .tag-plugin.chat.wechat>.content>.chatcell>.user-main>.talk.image:before,.md-text .tag-plugin.chat.wechat>.content>.chatcell>.user-main>.talk.video:before
  display none

.md-text .tag-plugin.chat.wechat>.content>.chatcell>.user-main>.talk.emoji>img,.md-text .tag-plugin.chat.wechat>.content>.chatcell>.user-main>.talk.file>.content,.md-text .tag-plugin.chat.wechat>.content>.chatcell>.user-main>.talk.image>img,.md-text .tag-plugin.chat.wechat>.content>.chatcell>.user-main>.talk.link>.link-card,.md-text .tag-plugin.chat.wechat>.content>.chatcell>.user-main>.talk.video>video
  border-radius 4px

.md-text .tag-plugin.chat.wechat>.content>.chatcell.right>.user-main>.talk.md,.md-text .tag-plugin.chat.wechat>.content>.chatcell.right>.user-main>.talk.md:before,.md-text .tag-plugin.chat.wechat>.content>.chatcell.right>.user-main>.talk.voice,.md-text .tag-plugin.chat.wechat>.content>.chatcell.right>.user-main>.talk.voice:before
  background var(--chat-wechat-green)
```

### 修改 config.js

修改`themes/stellar/scripts/events/lib/config.js`，插入一段`users`的配置，之后一定要新建`_data/users.yml`文件，否则会报错

```js config.js
/**
 * 部分代码借鉴自 NexT:
 * https://github.com/next-theme/hexo-theme-next/blob/master/scripts/events/lib/config.js
 * Volantis:
 * https://github.com/volantis-x/hexo-theme-volantis/blob/master/scripts/events/lib/cdn.js
 */

"use strict";

const path = require("path");

module.exports = (ctx) => {
  const { cache, language_switcher } = ctx.theme.config;
  const warning = function (...args) {
    ctx.log.warn(
      `Since ${args[0]} is turned on, the ${args[1]} is disabled to avoid potential hazards.`
    );
  };

  if (cache && cache.enable && language_switcher) {
    warning("language_switcher", "caching");
    cache.enable = false;
  }

  if (cache && cache.enable && ctx.config.relative_link) {
    warning("caching", "`relative_link` option in Hexo `_config.yml`");
    ctx.config.relative_link = false;
  }
  // ctx.config.meta_generator = false;

  // merge data
  const data = ctx.locals.get("data");
  // merge widgets: 可覆盖删除的合并
  var widgets = ctx.render.renderSync({
    path: path.join(ctx.theme_dir, "_data/widgets.yml"),
    engine: "yaml",
  });
  if (data.widgets) {
    for (let i of Object.keys(data.widgets)) {
      let widget = data.widgets[i];
      if (widget == null || widget.length == 0) {
        // delete
        delete widgets[i];
      } else {
        // create
        if (widgets[i] == null) {
          widgets[i] = widget;
        } else {
          // merge
          for (let j of Object.keys(widget)) {
            widgets[i][j] = widget[j];
          }
        }
      }
    }
  }
  ctx.theme.config.widgets = widgets;

  var users = ctx.render.renderSync({
    path: path.join(ctx.source_dir, "_data/users.yml"),
    engine: "yaml",
  });
  if (data.users) {
    for (let i of Object.keys(data.users)) {
      let user = data.users[i];
      if (user == null || user.length == 0) {
        // delete
        delete users[i];
      } else {
        // create
        if (users[i] == null) {
          users[i] = user;
        } else {
          // merge
          for (let j of Object.keys(users)) {
            users[i][j] = user[j];
          }
        }
      }
    }
  }
  ctx.theme.config.users = users;

  // merge icons: 简单覆盖合并
  var icons = ctx.render.renderSync({
    path: path.join(ctx.theme_dir, "_data/icons.yml"),
    engine: "yaml",
  });
  if (data.icons) {
    icons = Object.assign({}, icons, data.icons);
  }
  ctx.theme.config.icons = icons;

  // default menu
  if (ctx.theme.config.menubar == undefined) {
    ctx.theme.config.menubar = {};
  }
};
```

### 添加 users.yml

新增`source/_data/users.yml`

```yaml users.yml
user1:
  name: 浩瀚星河
  avatar: https://haohanxinghe.com/assets/images/avatar.jpg
  label:
    text: 群主
user2:
  name: zjj
  avatar: https://image.codepzj.cn/image/202411102156995.png
  label:
    text: 闲鱼
```

感谢他们提供的思路，如果尚不清楚可以去[主题日志](/update/)查看
