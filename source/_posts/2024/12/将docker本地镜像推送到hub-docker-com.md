---
title: 将docker本地镜像推送到hub.docker.com
tags: [docker]
categories: [技术分享]
permalink: posts/39.html
excerpt: "注册DockerHub 帐号登录，创建仓库，使用docker login登录仓库，再使用docker tag改名，最后docker push推送到DockerHub当中"
poster:
  topic: null
  headline: 将docker本地镜像推送到hub.docker.com
  caption: null
  color: null
date: 2024-12-07 18:54:15
updated: 2024-12-07 18:54:15
topic:
banner:
references:
---

## 参考文档

- [Docker ID accounts](https://docs.docker.com/docker-id/)
- [Docker Hub Quickstart](https://docs.docker.com/docker-hub/)
- [Repositories](https://docs.docker.com/docker-hub/repos/)

## 1.注册 docker hub 帐号登录，创建 repository 仓库

![注册](https://image.codepzj.cn/image/202412071855290.png)

## 2.准备推送的镜像

选择其中的一种方式生成镜像

- 构建镜像

  ```bash
  docker build -t <image-name> .
  ```

- 对已经存在的镜像再加标签（取别名）
  ```bash
  docker tag <existing-image> <hub-user>/<repo-name>[:<tag>]
  ```

## 3.在 docker 宿主机登录 dockerhub

```bash
C:\Users\pzj>docker login
Failed to start web-based login - falling back to command line login...

Log in with your Docker ID or email address to push and pull images from Docker Hub. If you don't have a Docker ID, head over to https://hub.docker.com/ to create one.
You can log in with your password or a Personal Access Token (PAT). Using a limited-scope PAT grants better security and is required for organizations using SSO. Learn more at https://docs.docker.com/go/access-tokens/

Username: codepzj
Password:

Login Succeeded
```

docker login 省略登录地址，默认是 `hub.docker.com`

## 4.推送镜像

```bash
docker push <hub-user>/<repo-name>:<tag>
```

默认向`hub.docker.com`推送。所以镜像名中也没有以仓库域名开头来命名。

## 示例

- 操作日志

  ```bash
  C:\Users\pzj>docker login
  Failed to start web-based login - falling back to command line login...

  Log in with your Docker ID or email address to push and pull images from Docker Hub. If you don't have a Docker ID, head over to https://hub.docker.com/ to create one.
  You can log in with your password or a Personal Access Token (PAT). Using a limited-scope PAT grants better security and is required for organizations using SSO. Learn more at https://docs.docker.com/go/access-tokens/

  Username: codepzj
  Password:

  Login Succeeded

  C:\Users\pzj>docker ps
  CONTAINER ID   IMAGE            COMMAND                  CREATED       STATUS       PORTS                    NAMES
  7fdcdf8d9920   html2md:latest   "docker-entrypoint.s…"   2 hours ago   Up 2 hours   0.0.0.0:3031->3031/tcp   html2md

  C:\Users\pzj>docker images
  REPOSITORY             TAG       IMAGE ID       CREATED       SIZE
  html2md                latest    ad9da6667caa   2 hours ago   1.32GB
  ghcr.io/codepzj/qexo   latest    f58c43f851e2   5 days ago    254MB

  C:\Users\pzj>docker tag html2md codepzj/html2md:1.0

  C:\Users\pzj>docker push codepzj/html2md:1.0
  The push refers to repository [docker.io/codepzj/html2md]
  b3c7b342dae3: Pushed
  47389b1e7363: Pushed
  4a27e69489f4: Pushed
  af392e0adf37: Pushed
  a0d7aa7696a1: Pushed
  6b473f54d3b7: Pushed
  4fc0d2d9bba9: Pushed
  68d2102e7b65: Pushed
  0d5f5a015e5d: Mounted from library/node
  3c777d951de2: Mounted from library/node
  f8a91dd5fc84: Mounted from library/node
  cb81227abde5: Mounted from library/node
  e01a454893a9: Mounted from library/node
  c45660adde37: Mounted from library/node
  fe0fb3ab4a0f: Mounted from library/node                                    f1186e5061f2: Mounted from library/node
  b2dba7477754: Mounted from library/node
  1.0: digest: sha256:acb71605002f339ae87fa6e27f9c6a5d6ab230035b86fca7e5f4b5f6d78474dc size: 3891
  ```

- 查看 dockerhub 控制台
  ![查看dockerhub控制台](https://image.codepzj.cn/image/202412071855284.png)
- 拉取镜像
  ```bash
  docker pull codepzj/html2md
  ```
