---
wiki: explore
menu_id: explore
title: node相关问题
updated: 2024-8-18 00:00:00
excerpt: node相关问题及解决方案。
---

{% folders %}

<!-- folder 解决本地npm安装依赖时缓存错误 -->

{% box %}
npm ERR! A complete log of this run can be found in: C:\Users\pzj\AppData\Local\npm-cache_logs\2024-10-29T14_56_45_532Z-debug-0.log
{% endbox %}

```bash
npm cache clean --force
rm -rf node_modules package-lock.json
npm i
```

{% endfolders %}
