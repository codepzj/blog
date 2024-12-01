---
abbrlink: ''
banner: null
categories:
- - 技术分享
date: '2024-12-01T06:50:29.587432+00:00'
excerpt: 升级1panel中openresty版本，让网站使用http3协议，加快网站速度。
permalink: posts/34.html
poster: '"topic":null,"headline":升级1panel中openresty版本，让网站使用http3协议，加快网站速度。,"caption":null,"color":null'
references:
- '[在 1Panel 升级 OpenResty 以启用 HTTP/3 的支持](https://blog.zhenxin.me/operations/1panel-http3.html)'
tags:
- http3
- 1panel
title: 1panel绕过限制，使用http3传输
topic: null
updated: '2024-12-01T14:54:55.900+08:00'
---
http3使用的**QUIC**传输协议（基于 UDP），对比http2，有以下优点：

1. 改善了连接建立时间，因为TCP是有连接的，在信息发送前得三次握手；而UDP是无连接的，可直接发送数据给UDP。
2. 使用更加灵活的控制阻塞算法，TCP丢包需要重传，导致头阻塞问题，而QUIC让每个数据流都有独立的序列号，这样一个流中的数据包丢失不会影响其他流的传输。
3. 使用的加密套件TLS1.3更安全

[什么是 HTTP/3？](https://www.cloudflare.com/zh-cn/learning/performance/what-is-http3/)

言归正传，1panel开启http3需要nginx和openresty版本在1.25及以上，小于该版本协议使用的http2。

但是1panel的最新官方应用商店的openresty的版本为1.21，不满足开启http3，那我们该怎么办呢？

{% box color:red %}

操作前请记得备份，安全第一！！！

{% endbox %}

## 取消WAF配置

因为1panel的openresty绑定在一起，本人亲测强行更新openresty版本会导致openresty启动异常。

打开`/opt/1panel/apps/openresty/openresty/conf/nginx.conf`

在大约34行的位置处：

```nginx
# include /usr/local/openresty/1pwaf/data/conf/waf.conf; 
```

把这行给注释掉

## 修改openresty版本

打开`/opt/1panel/apps/openresty/openresty/docker-compose.yml`

修改openresty版本为**1.27.1.1-0-focal**

![修改openresty版本](https://image.codepzj.cn/image/202412011410039.png)

### 重建应用

打开已安装，点击重建按钮

![重建应用](https://image.codepzj.cn/image/202412011414561.png)

或者执行：

```yaml
docker-compose down && docker-compose up -d
```

这样也是可以的

## 配置http3

然后打开网站的配置文件，添加以下几行

```nginx
listen 443 quic reuseport ;
listen [::]:443 quic reuseport ; # 如果支持ipv6
```

上述是静态网站，如果是反向代理，继续添加这2行

```nginx
add_header Alt-Svc 'h3=":443"; ma=86400'; 
add_header Strict-Transport-Security "max-age=63072000; includeSubdomains; preload"; 
```

添加响应头，告知客户端关于备用服务的信息（Alt-Svc）以及强制使用安全连接的策略（Strict-Transport-Security）。

## 网站实测

### 打开`https://http3.wcode.net/`检测

![http3在线测试](https://image.codepzj.cn/image/202412011425119.png)

还提供了一个http3的徽标，**确实挺不错的**

<a href="https://http3.wcode.net/?q=haohanxinghe.com" target="_blank">
    <img src="https://http3.wcode.net/badges/http3.svg?host=haohanxinghe.com" alt="" style="max-width: 100%; height: 24px;"/>
</a>

### 控制台实测

请不要开🪜

![控制台实测](https://image.codepzj.cn/image/202412011429751.png)

可以看到，大多数都是支持**h3**的

### 使用PageSpeed检测

PC端速度提升了一丢丢，而移动端性能提升显著

![PC端检测报告](https://image.codepzj.cn/image/202412011439508.png)

![移动端检测报告](https://image.codepzj.cn/image/202412011438628.png)

移动端的渲染时间比PC端慢很多🤣

今天就到这吧。。。
