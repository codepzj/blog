---
title: js中的值传递和引用传递
tags: [javascript]
categories: [技术分享]
permalink: posts/14.html
excerpt: 本文详细介绍了JavaScript中的值传递和引用传递的区别。
poster:
  topic: null
  headline: js中的值传递和引用传递
  caption: null
  color: null
date: 2024-10-08 12:18:00
updated: 2024-10-08 12:18:00
topic:
references:
---

## 前言

js 中的值传递和引用传递是一个很重要的概念，也是很多面试题的考察点，本文将详细介绍 js 中的值传递和引用传递的区别，以及如何在实际开发中使用这两种传递方式。这个概念很简单，但是实际开发中很多人都容易混淆。

## 值传递

值传递指的是重新开辟一块内存空间，将旧变量值复制到新的内存空间中，新变量和旧变量就互不影响了。在 js 中，基本数据类型（number、string、boolean、null、undefined、symbol）都是值传递。

```javascript
let a = 1;
let b = a;
b = 2;
console.log(a); // 1
console.log(b); // 2
```

## 引用传递

指的是新变量的内存地址指向旧变量的内存地址，它们共享同一块内存空间，修改其中一个变量的值，另一个变量的值也会发生变化。在 js 中，引用数据类型（object、array、function）都是引用传递。

```javascript
let a = { name: "张三" };
let b = a;
b.name = "李四";
console.log(a, b); // { name: "李四" }, { name: "李四" }
a.name = "王五";
console.log(a, b); // { name: "王五" }, { name: "王五" }
```

## 练习题

{% folders %}

<!-- folder 题目1 -->

{% tabs active:2 align:center %}

<!-- tab module.js -->

```js module.js
export let a = 1;
export function increase() {
  a++;
}
```

<!-- tab main.js -->

```js main.js
import { a, increase } from "./module.js";
console.log(a);
increase();
console.log(a);
```

{% endtabs %}
{% folding 答案 open:false %}
具名导入的变量都是引用传递，所以 `a` 的值会发生变化。

```js 结果
1 2
```

{% endfolding %}

<!-- folder 题目2 -->

```js main.js
const testFunc = () => {
  let a = 1;
  let obj = { name: "pzj" };
  let changeVars = () => {
    a++;
    obj.name = "codepzj";
  };
  return {
    a,
    obj,
    changeVars,
  };
};

const { a, obj, changeVars } = testFunc();
console.log(a, obj);
changeVars();
console.log(a, obj);
```

{% folding 答案 open:false %}
`a` 是基本数据类型，所以是值传递，`obj` 是引用数据类型，所以是引用传递。

```js 结果
1 { name: "pzj" }
1 { name: "codepzj" }
```

{% endfolding %}
{% endfolders %}

## 总结

基本数据类型（number、string、boolean、null、undefined、symbol）是值传递，引用数据类型（object、array、function）是引用传递。具名导入的变量都是引用传递。
