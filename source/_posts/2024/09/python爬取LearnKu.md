---
title: python爬取LearnKu
tags: [python, 爬虫]
categories: [技术分享]
permalink: posts/11.html
excerpt: 该Python脚本可用于爬取LearnKu社区的文档并保存到本地。
poster:
  topic: null
  headline: python爬取LearnKu
  caption: null
  color: null
date: 2024-09-27 23:23:50
updated: 2024-09-27 23:23:50
topic:
description:

references:
---

分享一个 python 脚本，可用于爬取 LearnKu 社区的优质文档，存储到本地，供己学习

```python
import os
import time

import requests
from lxml import etree

BASEDIR = r"C:\Users\pzj\Desktop\go入门指南"  # 保存地址

base_url = "https://learnku.com/docs/the-way-to-go"  # 文档基地址

url = "https://learnku.com/docs/the-way-to-go/book-intro/3560"  # 侧边栏第一章节第一个子页面的url(如前言)

content_length = 22  # 文章侧边栏目录的数量

if __name__ == "__main__":
    content = requests.get(url).text
    tree = etree.HTML(content)
    for i in range(3, 3 + content_length):

        # 获取标题
        title = tree.xpath("/html/body/div[2]/div[%s]/div[1]/text()" % i)
        title = title[0].strip()

        # 获取md链接
        a_link = tree.xpath("/ html / body / div[2] / div[%s] / div[2] / a/@href" % i)

        droptitle_list = list(
            map(
                lambda x: x.strip().split(".")[-1].strip(),
                tree.xpath("/html/body/div[2]/div[%s]/div[2]/a/div/text()" % i),
            )
        )
        md_urls = list(map(lambda x: base_url + "/" + x.split("/")[-1] + ".md", a_link))

        # 保存文件
        md_dir = os.path.join(BASEDIR, title)
        folder = os.path.exists(md_dir)
        if not folder:
            os.makedirs(md_dir)
        for j in range(len(md_urls)):
            md_text = requests.get(md_urls[j]).text
            md_file = os.path.join(md_dir, str(j + 1) + "." + droptitle_list[j] + ".md")
            with open(md_file, "w", encoding="utf-8") as f:
                f.write(md_text)
            print(md_file + " 爬取成功")
            time.sleep(0.5)
```
