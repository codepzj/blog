---
wiki: explore
menu_id: explore
title: windows相关问题
updated: 2024-8-18 00:00:00
excerpt: windows相关问题及解决方案。
---

{% folders %}

<!-- folder id_rsa Load key: Permission denied 的解决方法 -->

```shell
C:\Users\pzj>echo %USERNAME%
Administrator

C:\Users\pzj>icacls "C:\Users\pzj\.ssh\id_rsa" /inheritance:r /grant:r "Administrator:(R)"
processed file: C:\Users\pzj\.ssh\id_rsa
Successfully processed 1 files; Failed processing 0 files

C:\Users\pzj>ssh -T git@github.com
Hi codepzj! You've successfully authenticated, but GitHub does not provide shell access.
```

{% endfolders %}
