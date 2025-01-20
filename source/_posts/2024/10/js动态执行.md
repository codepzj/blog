---
title: js动态执行
tags: [javascript]
categories: [技术分享]
permalink: posts/16.html
excerpt: 本文讲述了eval和setTimeout的不同用法及异步和同步特性。
poster:
  topic: null
  headline: js动态执行
  caption: null
  color: null
date: 2024-10-09 12:03:22
updated: 2024-10-09 12:03:22
topic:
references:
---

js 动态执行，传入字符串，执行字符串中的代码

`eval`可以去除字符串中的引号，执行代码是同步的，使用的局部变量
`setTimeout`第一个参数可以传入字符串，会被当作代码来执行，是异步的，使用的全局变量
{% folders %}

<!-- folder index.html -->

```html
<script src="app.js"></script>
```

<!-- folder app.js -->

```js
let a = 1;
function exec1(code) {
  var a = 2;
  eval(code);
}

function exec2(code) {
  setTimeout(code);
}

exec1("console.log(a);");
exec2("console.log(a);");
console.log("sync");
```

<!-- folder 结果 -->

```plaintext
2 sync 1
```

{% endfolders %}
