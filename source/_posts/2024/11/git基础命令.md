---
title: git基础命令
tags: [git]
categories: [技术分享]
permalink: posts/23.html
poster:
  topic: null
  headline: git基础命令
  caption: null
  color: null
date: 2024-11-02 23:51:59
updated: 2024-11-02 23:51:59
topic: git
excerpt: 本教程介绍了一些git的基本命令，包括版本控制、提交、回退、合并等。
references:
---

本教程会介绍一些 git 的基本命令，包括版本控制、提交、回退、合并等。

## 添加到暂存区

```bash
git add . # 添加所有文件
git add <file> # 添加指定文件
```

## 停止追踪某个文件

{% box %}
适用于文件已经 add 处于暂存区，但是在 gitignore 中排除的情况，就需要使用这个命令。
{% endbox %}

```bash
git rm --cached newfile
```

## 提交到本地仓库

```bash
git commit -m "commit message"
```

## 查看提交记录

```bash
git log --oneline --graph --all
```

## 查看当前分支

```bash
git branch
```

## 添加远程分支

```bash
git remote add origin <url> # https 和 ssh 均可
git remote -v # 查看远程仓库
```

## 提交到远程仓库

```bash
git push origin <branch>:<remote-branch>
```

{% box %}
第一个 branch 指的是本地分支，第二个 branch 指的是远程分支。
{% endbox %}

## 拉取远程仓库

```bash
git pull origin <remote-branch>:<branch>
```

{% box %}
同理，第一个 branch 指的是远程分支，第二个 branch 指的是本地分支。
{% endbox %}

## 合并分支

```bash
git merge <branch>
```

{% folding git merge 的前提 open: false %}
当前处于 main 分支，现在需求是将最新的 dev 分支合并，合并的前提是 dev 与 main 分支的均来源于同一个祖先节点。

```txt
         [*]
          |
      [origin]
        /    \
    [dev]    [main]
       |        |
   [commit1]    |
       |         |
   [commit2]    |
       |         |
    [merge] <----|
```

{% endfolding %}
