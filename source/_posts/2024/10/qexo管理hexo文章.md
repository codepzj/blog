---
abbrlink: ''
categories:
- 技术分享
date: '2024-10-22T11:47:18+00:00'
description: null
excerpt: 本文介绍了使用Docker部署Qexo来搭建hexo博客的后台。
permalink: posts/21.html
poster:
  caption: null
  color: null
  headline: qexo管理hexo文章
  topic: null
references: null
tags:
- qexo
title: qexo管理hexo文章
topic: null
updated: '2024-12-02T01:44:01.899+08:00'
---
## 前言

**Qexo** 是一个快速、强大、美观的在线**静态博客编辑器**，使用的 Django 和 Bootstrap 框架开发，使用 GPL3.0 开源协议，支持**Vercel 部署**和**本地部署**。

今天我们使用 docker 来部署 Qexo 来搭建 hexo 博客的后台。如果您需要使用 vercel 部署或者本地部署，可参阅官方文档。

官方文档中，使用本地部署（服务器部署）的方案，其实是开发环境下的。

```bash
pip3 install -r requirements.txt
python3 manage.py makemigrations
python3 manage.py migrate
python3 manage.py runserver 0.0.0.0:8000 --noreload
```

假如说服务器宕机了，那么这个进程就会停止了，再次重启服务器，这个管理后台就打不开了，因为这个进程已经被杀死了。通过查阅 Django 官方文档，使用的是 WSGI 与 Nginx 服务器的方式部署，我觉得操作起来非常麻烦，WSGI 设置为开机自启才能保证网站在服务器重启之后自动运行。最后，我选择了使用 Docker 部署 Qexo。

## 快速开始

```bash
mkdir /www/qexo -p
cd /www/qexo
mkdir build
cd build
```

新建一个 `qexo`文件夹，用于存放 qexo 的应用程序以及构建镜像所需的配置文件（build 文件夹），先进入 build 文件夹，新增三个文件，分别是 `Dockerfile`， `configs.py`，`run.sh`

### Dockerfile

```yaml
FROM python:3.11.3-alpine
# 维护者信息
LABEL maintainer="codepzj"
# 设置生产模式环境变量
# ENV APP_ENV production
# pipy源设置
RUN pip config set global.index-url https://mirrors.cloud.tencent.com/pypi/simple/
# 设置时区
RUN sed -i 's/dl-cdn.alpinelinux.org/mirrors.aliyun.com/g' /etc/apk/repositories && \
    apk --no-cache add tzdata && \
    cp /usr/share/zoneinfo/Asia/Shanghai /etc/localtime && \
    apk --no-cache del tzdata && \
    apk --no-cache add git && \
    mkdir /app
# 设置工作目录
WORKDIR /app
# 拷贝数据
RUN git clone -b dev https://github.com/Qexo/Qexo.git .
# 安装依赖
RUN pip install --upgrade pip
RUN pip install -r requirements.txt
# 拷贝启动脚本
COPY . /app/
RUN chmod +x /app/run.sh
# 暴露端口
EXPOSE 8000
# 挂载目录
VOLUME ["/app/db", "/app/data"]
# 启动django
ENTRYPOINT ["/bin/sh", "/app/run.sh"]

```

### configs.py

```python
import pymysql
import os

DOMAINS = "*"
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': os.path.join('/app/db', 'db.sqlite3'),
    }
}
```

我们这里使用 `Sqlite`数据库进行部署，这是一个文件数据库，主要是方便，这只是一个管理后台，并不需要过多的请求，所以直接使用文件数据库即可。

### run.sh

```bash
#!/bin/bash

python3 manage.py makemigrations
python3 manage.py migrate
python3 manage.py runserver 0.0.0.0:8000 --noreload
```

### 打包镜像

```bash
docker build -t qexo .
```

使用这条命令打包 qexo 镜像，同时我把镜像上传到了 github，直接使用即可，不需要担心任何问题，有需要的自取。

{% link https://github.com/users/codepzj/packages/container/package/qexo qexo镜像 icon:https://github.com/favicon.ico %}

### docker-compose.yaml 启动 qexo 容器

在 `www/qexo`下新建一个 `docker-compose.yaml`文件

```yaml
version: "3.9"
services:
  qexo:
    image: "ghcr.io/codepzj/qexo:latest"
    volumes:
      - "./data/blog:/app/data"
      - "./data/qexo/db:/app/db"
      - "/etc/localtime:/etc/localtime:ro"
      - "/etc/timezone:/etc/timezone:ro"
    ports:
      - "8000:8000"
    container_name: qexo
```

在 `www/qexo`目录下执行 `docker-compose up -d`即可运行 qexo 容器

服务器的话可以使用 ip 地址+端口号进行访问，也可以通过 Nginx 反代使用域名访问 Qexo 管理后台。

## 效果预览

![效果预览](https://image.codepzj.cn/image/fc80dc890c2974468d94223767f5751c.png)
