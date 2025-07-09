---
title: 部署oracle数据库并配置
tags: [oracle, docker]
categories: [技术分享]
permalink: posts/6.html
excerpt: 本文介绍了如何用docker配置使用Oracle-19c版本.
poster:
  topic: null
  headline: 部署oracle数据库并配置
  caption: null
  color: null
date: 2024-09-02 15:54:23
updated: 2024-09-02 15:54:23
topic:
description:

references:
---

## 本地配置

使用**oracle-19c**的版本了，从官网下载，然后按照如下配置

- [windows 配置 oracle 教程](https://blog.csdn.net/Milogenius/article/details/135751410)
- [windows 删除 oracle 教程](https://blog.csdn.net/weixin_44430514/article/details/131682550)

## 服务器配置

### 配置 docker-compose.yml

```bash
docker pull truevoly/oracle-12c
# 新建一个oracle文件夹
mkdir /www/oracle
cd /www/oracle
# 新建数据挂载目录
touch docker-compose.yml
mkdir data
# 修改权限
chmod -R a+w data
```

{% note 注意
不修改权限会出现[bug](https://github.com/MaksymBilenko/docker-oracle-12c/issues/116)，所以务必确保你的data目录可读可写
color:yellow %}

将下面的内容写入到`docker-compose.yml`中

```yaml
version: "3.8"

services:
  oracle-service:
    image: truevoly/oracle-12c
    container_name: oracle-12c
    ports:
      - "5502:8080"
      - "1521:1521"
    volumes:
      - ./data:/u01/app/oracle
    restart: always
```

### docker 容器启动

```bash
docker-compose up -d
```

## 连接数据库

### 命令行连接

```bash
# 进入容器
docker exec -it oracle-12c /bin/bash
# 连接数据库
sqlplus system
# 输入用户令牌
oracle
```

### web 端连接

oracle 的 web 端已被我部署在公网上，[**预览地址**](https://oracle.codepzj.cn/em)

登录的账号和密码，如有需要，请联系博主

该网址需要 flash 环境，在 github 上面我找到一个绿色的 flash 环境浏览器，如果没有 flash 环境请自行安装。

{% link https://github.com/Mzying2001/CefFlashBrowser icon:https://github.com/favicon.ico %}

### navicat 连接

请参考如下 github 仓库：

{% link https://github.com/MaksymBilenko/docker-oracle-12c icon:https://github.com/favicon.ico %}

![navicat连接](https://cdn.codepzj.cn/image/202410191648259.png)
