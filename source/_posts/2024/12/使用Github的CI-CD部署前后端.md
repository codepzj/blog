---
title: 使用Github的CI/CD部署前后端
tags: [docker, github, ci/cd]
categories: [技术分享]
permalink: posts/45.html
excerpt: 使用Github的CI/CD部署前后端，自动发布包到docker镜像仓库，将前端打包文件推送到服务器，自动监视docker镜像最新版本并拉取
poster:
  topic: null
  headline: 使用Github的CI/CD部署前后端
  caption: null
  color: null
date: 2024-12-31 22:54:20
updated: 2024-12-31 22:54:20
topic:
banner:
references:
---

## 前端 ci 配置

```yaml
name: deploy-hexo-blog
on:
  push:
    branches: [main]
  workflow_dispatch:

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      # Install Node.js
      - name: install nodejs
        uses: actions/setup-node@v3.4.1
        with:
          node-version: "20.12.0"

      # Use pnpm package manager
      - name: use pnpm
        run: npm i -g pnpm && pnpm config set registry https://registry.npmmirror.com

      # Install dependencies
      - name: install packages
        run: pnpm install --no-frozen-lockfile

      # Build the Hexo project
      - name: build
        run: pnpm run build

      # Deploy the project to the server
      - name: deploy to server
        uses: appleboy/scp-action@master
        with:
          host: ${{ secrets.REMOTE_HOST }}
          username: ${{ secrets.REMOTE_USER }}
          password: ${{ secrets.REMOTE_PASSWORD }}
          port: ${{ secrets.REMOTE_PORT }}
          source: "dist/"
          target: ${{ secrets.REMOTE_TARGET }}
```

## 后端 ci 配置

```yaml
name: Build Logsphere and Push Docker Image

on:
  push:
    branches:
      - main # 当推送到 main 分支时触发
  pull_request:
    branches:
      - main # 当提交 PR 到 main 分支时触发

jobs:
  build:
    runs-on: ubuntu-latest # 使用最新的 Ubuntu 环境

    steps:
      - name: Check out repository
        uses: actions/checkout@v4 # 检出代码

      - name: Set up Docker Buildx
        uses: docker/setup-buildx-action@v2 # 设置 Docker Buildx，支持多平台构建

      - name: Cache Docker layers
        uses: actions/cache@v2 # 缓存 Docker 镜像构建的层
        with:
          path: /tmp/.buildx-cache
          key: ${{ runner.os }}-buildx-${{ github.sha }}
          restore-keys: |
            ${{ runner.os }}-buildx-

      - name: Log in to Docker Hub
        uses: docker/login-action@v2 # 登录 Docker Hub
        with:
          username: ${{ secrets.DOCKER_USERNAME }} # 使用 GitHub Secrets 存储的 Docker 用户名
          password: ${{ secrets.DOCKER_PASSWORD }} # 使用 GitHub Secrets 存储的 Docker 密码

      - name: Build Docker image
        run: |
          docker build -t codepzj/logsphere-server:${{ github.sha }} .  # 基于 commit SHA 打标签
          docker tag codepzj/logsphere-server:${{ github.sha }} codepzj/logsphere-server:latest

      - name: Push Docker images to Docker Hub
        run: |
          docker push codepzj/logsphere-server:${{ github.sha }}  # 推送 SHA 标签
          docker push codepzj/logsphere-server:latest  # 推送 latest 标签
```

服务器自动监控 docker 镜像版本

> 使用 watchover 镜像

```bash
docker run -d --name watchtower --restart always -v /var/run/docker.sock:/var/run/docker.sock containrrr/watchtower --cleanup logsphere-server -i 600
```
