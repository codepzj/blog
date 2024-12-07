---
wiki: notes
title: 2024/12
updated: 2024-12-1 00:00:00
excerpt: 2024年12月份的代码笔记，记录学习过程中遇到的难题以及解决问题的思路与方案。
---

{% folders %}

<!-- folder wsl安装ubuntu -->

查看可安装镜像
{% copy wsl --list online prefix:$ %}

```txt
NAME                            FRIENDLY NAME
Ubuntu                          Ubuntu
Debian                          Debian GNU/Linux
kali-linux                      Kali Linux Rolling
Ubuntu-18.04                    Ubuntu 18.04 LTS
Ubuntu-20.04                    Ubuntu 20.04 LTS
Ubuntu-22.04                    Ubuntu 22.04 LTS
Ubuntu-24.04                    Ubuntu 24.04 LTS
OracleLinux_7_9                 Oracle Linux 7.9
OracleLinux_8_7                 Oracle Linux 8.7
OracleLinux_9_1                 Oracle Linux 9.1
openSUSE-Leap-15.6              openSUSE Leap 15.6
SUSE-Linux-Enterprise-15-SP5    SUSE Linux Enterprise 15 SP5
SUSE-Linux-Enterprise-15-SP6    SUSE Linux Enterprise 15 SP6
openSUSE-Tumbleweed             openSUSE Tumbleweed
```

直接安装
{% copy wsl --install -d Ubuntu-24.04 prefix:$ %}

查看可安装镜像
{% copy wsl --list prefix:$ %}
```txt
适用于 Linux 的 Windows 子系统分发:
docker-desktop-data (默认)
docker-desktop
Ubuntu-24.04
```

设置`Ubuntu-24.04`为默认
{% copy wsl --set-default Ubuntu-24.04 prefix:$ %}

{% endfolders %}
