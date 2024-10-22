---
abbrlink: ''
banner: null
categories:
- - 技术分享
date: '2024-10-22T11:47:18.330622+00:00'
description: null
permalink: posts/21.html
poster: '"topic":null,"headline":qexo管理hexo文章,"caption":null,"color":null'
references: null
tags:
- qexo
title: 服务器部署Qexo
topic: null
updated: '2024-10-22T22:52:19.874+08:00'
---
## 前言

**Qexo** 是一个快速、强大、美观的在线**静态博客编辑器**，使用的Django和Bootstrap框架开发，使用 GPL3.0开源协议，支持**Vercel部署**和**本地部署**。

今天我们使用docker来部署Qexo来搭建hexo博客的后台。如果您需要使用vercel部署或者本地部署，可参阅官方文档。

官方文档中，使用本地部署（服务器部署）的方案，其实是开发环境下的。

```bash
pip3 install -r requirements.txt
python3 manage.py makemigrations
python3 manage.py migrate
python3 manage.py runserver 0.0.0.0:8000 --noreload
```

假如说服务器宕机了，那么这个进程就会停止了，再次重启服务器，这个管理后台就打不开了，因为这个进程已经被杀死了。通过查阅Django官方文档，使用的是WSGI与Nginx服务器的方式部署，我觉得操作起来非常麻烦，WSGI设置为开机自启才能保证网站在服务器重启之后自动运行。最后，我选择了使用Docker部署Qexo。

## 快速开始

```bash
mkdir /www/qexo -p
cd /www/qexo
mkdir build
cd build
```

新建一个 `qexo`文件夹，用于存放qexo的应用程序以及构建镜像所需的配置文件（build文件夹），先进入build文件夹，新增两个文件，分别是 `Dockerfile`和 `configs.py`

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
RUN git clone https://ghproxy.com/https://github.com/Qexo/Qexo.git /app
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
# 数据库配置
import pymysql,os

DOMAINS = ["127.0.0.1", "qexo.codepzj.cn", "45.207.197.140"]
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': os.path.join('/app/db' , 'db.sqlite3'),
    }
}
```

我们这里使用 `Sqlite`数据库进行部署，这是一个文件数据库，主要是方便，这只是一个管理后台，并不需要过多的请求，所以直接使用文件数据库即可。

### 打包镜像

```bash
docker build -t qexo .
```

使用这条命令打包qexo镜像，同时我把镜像上传到了github，有需要的自取。

{% link [https://github.com/codepzj/CefFlashBrowser](https://github.com/users/codepzj/packages/container/package/qexo) icon:https://github.com/favicon.ico %}

### docker-compose.yaml启动qexo容器

在 `www/qexo`下新建一个 `docker-compose.yaml`文件

```yaml
version: '3.9'
services:
    qexo:
        image: 'ghcr.io/codepzj/qexo:latest'
        volumes:
            - './data/blog:/app/data'
            - './data/qexo/db:/app/db'
            - '/etc/localtime:/etc/localtime:ro'
            - '/etc/timezone:/etc/timezone:ro'
        ports:
            - '8000:8000'
        container_name: qexo
```

在 `www/qexo`目录下执行 `docker-compose up -d`即可运行qexo容器

服务器的话可以使用ip地址+端口号进行访问，也可以通过Nginx反代使用域名访问Qexo管理后台。

## 效果预览

![效果预览](https://image.codepzj.cn/image/fc80dc890c2974468d94223767f5751c.png)
