---
title: 1panel部署gitea和act runner
tags: [gitea]
categories: [技术分享]
permalink: posts/7.html
poster:
  topic: null
  headline: 1panel部署gitea和act runner
  caption: null
  color: null
date: 2024-09-15 00:55:13
topic:
description:
banner: /assets/banner/gitea.jpg
references:
  - "[Gitea Actions 搭建](https://www.seepine.com/git/gitea/actions/)"
  - "[使用 Docker 部署 Gitea Actions 的 Runner](https://dusays.com/723/)"
---

## 前言

gitea 是一个支持 git 托管、代码审查、团队协作、软件包注册和 CI/CD 的开源项目，与 GitHub、Bitbucket 和 GitLab 类似。该文档将介绍如何使用 1panel 来搭建 gitea，拥有属于自己的私有 git 仓库。

**优势：**

- {% mark 简单易用 %}：零门槛，线上快速获取和安装，使用体验好。
- {% mark 卓越性能 %}：采用 Go 语言编写，资源占用小、运行速度快。
- {% mark 高可配置 %}：100+ 配置项，通过灵活的配置满足不同应用场景的需求。
- {% mark 安全稳定 %}：被⼴泛验证，39k+ GitHub Star、40 万+ 安装量、1000+ 贡献者。

## 快速开始

### 安装 gitea

首先打开 1panel 的界面，安装 gitea，数据库建议使用 postgresql

![gitea配置](https://image.codepzj.cn/image/202410191304803.png)

{% note 注意
ssh端口建议使用22端口，然后把原本服务器的端口给放出来，修改到其他端口上，否则后续在使用gitea的ssh方式操作代码会出现bug，一直报22端口未连接的错误，这是因为ssh协议默认使用的22端口，如果不使用22端口，使用了其他端口（如222端口），那么在使用ssh的方式在本地clone项目的时候，必须得指定端口
color:red %}

ssh 在本地连接 gitea，需在`~/.ssh/config`当中追加如下代码：

```config
Host gitea
  HostName gitea.example.com
  Port 222
  User root
  IdentityFile ~/.ssh/id_rsa
```

但是如果公司多个人使用的话，每个人都需要修改自己的本地配置文件，非常麻烦，还不如将端口修改成 22，这样的话就不需要修改 ssh 端口即可顺利连接 gitea 内部的 ssh 主机，对代码仓库进行操作。

然后根据自己所需的情况安装，如果是内网就使用 ip 地址，公网可以考虑域名，根据业务需求做决定。

等待 1panel 安装 gitea 容器成功并启动容器，根据容器暴露的 ip 地址和端口进行访问，当然你也可以通过 1panel 中的 openresty 进行访问，进入一个安装 gitea 的界面，端口不需要更改，因为之前已经根据 1panel 默认配置好了，你可以按需修改域名，邮箱，添加管理员账号的操作。

然后就出现一直给茶壶倒茶的画面，还挺好看，符合中国人喜欢喝茶的思想，等待大概 30 秒就成功了，接下来的操作和 github 无异，请读者们自行探索

### 安装 act runner

因为 gitea 没有集成这种 CI、CD 的工具，所以说要单独安装一个 act runner 实现持续集成、持续部署的功能。

![act runner配置](https://image.codepzj.cn/image/202410191955469.png)

token 需要在 gitea 平台处随机生成，[官方文档](https://docs.gitea.com/zh-cn/1.20/usage/actions/act-runner)

**获取注册令牌**
Runner 级别决定了从哪里获取注册令牌。

- {% mark 实例级别 %}：管理员设置页面，例如 <your_gitea.com>/admin/runners。
- {% mark 组织级别 %}：组织设置页面，例如 <your_gitea.com>/<org>/settings/runners。
- {% mark 存储库级别 %}：存储库设置页面，例如 <your_gitea.com>/<owner>/<repo>/settings/runners

然后下面的 Name 和 Label 自定义即可，注意这里有个坑，需点击下面的高级设置，修改`docker-compose.yaml`配置文件

```yaml
......
volumes:
  - ./data/config.yaml:/config.yaml
  - ./data/data:/data
  - ./data/cache:/root/.cache
  - /var/run/docker.sock:/var/run/docker.sock
environment:
  - CONFIG_FILE=/config.yaml # 取消注释
```

`config.yaml`在默认配置文件中被注释掉了，这个一定要加，不然 CI、CD 的时候没有 ubuntu-latest 镜像，使用如下方法生成`config.yaml`

{% copy docker run --entrypoint="" --rm -it gitea/act_runner:latest act_runner generate-config > config.yaml prefix:$ %}

然后再将`config.yaml`移动到`volumes`的对应的目录当中即可

再进入到 act_runner 所在目录，重建应用

```bash
docker-compose down && docker-compose up
```

查看日志

```bash
.runner is missing or not a regular file
level=info msg="Registering runner, arch=amd64, os=linux, version=v0.2.11."
level=warning msg="Labels from command will be ignored, use labels defined in config file."
level=debug msg="Successfully pinged the Gitea instance server"
level=info msg="Runner registered successfully."
SUCCESS
time="2024-10-19T13:19:48Z" level=info msg="Starting runner daemon"
time="2024-10-19T13:19:48Z" level=info msg="runner: linux, with version: v0.2.11, with labels: [ubuntu-latest ubuntu-22.04 ubuntu-20.04], declare successfully"
time="2024-10-19T13:19:48Z" level=info msg="task 1 repo is codepzj/test https://github.com https://repository.codepzj.cn"
```

![act runner配置成功](https://image.codepzj.cn/image/202410192123724.png)

如果出现以下日志和画面则代表 act runner 配置成功了

新建仓库，测试是否能够拥有 Github Action 的功能

在仓库根目录新建`.gitea/workflows/test.yaml`文件并写入：

```yaml
name: Gitea Actions Demo
run-name: ${{ gitea.actor }} is testing out Gitea Actions 🚀
on: [push]

jobs:
  Explore-Gitea-Actions:
    runs-on: ubuntu-latest
    steps:
      - run: echo "🎉 The job was automatically triggered by a ${{ gitea.event_name }} event."
      - run: echo "🐧 This job is now running on a ${{ runner.os }} server hosted by Gitea!"
      - run: echo "🔎 The name of your branch is ${{ gitea.ref }} and your repository is ${{ gitea.repository }}."
      - name: Check out repository code
        uses: actions/checkout@v4
      - run: echo "💡 The ${{ gitea.repository }} repository has been cloned to the runner."
      - run: echo "🖥️ The workflow is now ready to test your code on the runner."
      - name: List files in the repository
        run: |
          ls ${{ gitea.workspace }}
      - run: echo "🍏 This job's status is ${{ job.status }}."
```

提交并查看结果，进入 action 页面

![部署成功](https://image.codepzj.cn/image/202410192124253.png)

出现以下页面则说明配置成功，恭喜你 🎉🎉🎉

## 总结

通过上述步骤，你已经成功地在 1panel 中部署了 gitea 和 act runner，实现了一个私有的 Git 托管和 CI/CD 环境。整个过程从安装 gitea 开始，到配置 act Runner，最后测试 CI/CD 功能，覆盖了 gitea 的基本部署和持续集成的设置。
