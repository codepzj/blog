---
title: 1panel绕过限制，使用http3传输
tags: [1panel, http3]
categories: [技术分享]
permalink: posts/34.html
excerpt: 1panel的最新官方应用商店的openresty的版本为1.21，不满足开启 http31panel升级1panel中openresty版本，让网站使用http3协议，加快网站速度。
poster:
  topic: null
  headline: 1panel绕过限制，使用http3传输
  caption: null
  color: null
date: 2024-12-01 14:53:03
updated: 2024-12-01 14:53:03
topic:
banner:
references:
  - "[在 1Panel 升级 OpenResty 以启用 HTTP/3 的支持](https://blog.zhenxin.me/operations/1panel-http3.html)"
---

http3 使用的**QUIC**传输协议（基于 UDP），对比 http2，有以下优点：

1. 改善了连接建立时间，因为 TCP 是有连接的，在信息发送前得三次握手；而 UDP 是无连接的，可直接发送数据给服务端。
2. 使用更加灵活的控制阻塞算法，TCP 丢包需要重传，导致头阻塞问题，而 QUIC 让每个数据流都有独立的序列号，这样一个流中的数据包丢失不会影响其他流的传输。
3. 使用的加密套件 TLS1.3 更安全

[什么是 HTTP/3？](https://www.cloudflare.com/zh-cn/learning/performance/what-is-http3/)

言归正传，1panel 开启 http3 需要 nginx 和 openresty 版本在 1.25 及以上，小于该版本协议使用的 http2。

但是 1panel 的最新官方应用商店的 openresty 的版本为 1.21，不满足开启 http3，那我们该怎么办呢？

{% box color:red %}

操作前请记得备份，安全第一！！！

{% endbox %}

## 取消 WAF 配置

因为 1panel 的 openresty 绑定在一起，本人亲测强行更新 openresty 版本会导致 openresty 启动异常。

打开`/opt/1panel/apps/openresty/openresty/conf/nginx.conf`

在大约 34 行的位置处：

```nginx
# include /usr/local/openresty/1pwaf/data/conf/waf.conf;
```

把这行给注释掉

## 修改 openresty 版本

打开`/opt/1panel/apps/openresty/openresty/docker-compose.yml`

修改 openresty 版本为**1.27.1.1-0-focal**

![修改openresty版本](https://cdn.codepzj.cn/image/202412011410039.png)

### 重建应用

打开已安装，点击重建按钮

![重建应用](https://cdn.codepzj.cn/image/202412011414561.png)

或者执行：

```yaml
docker-compose down && docker-compose up -d
```

这样也是可以的

## 防火墙放行

```bash
sudo ufw allow 443/udp
```

## 配置 http3

然后打开网站的配置文件，添加以下几行

```nginx
listen 443 quic reuseport ;
listen [::]:443 quic reuseport ; # 如果支持ipv6
```

上述是静态网站，如果是反向代理，继续添加这 2 行

```nginx
add_header Alt-Svc 'h3=":443"; ma=86400';
add_header Strict-Transport-Security "max-age=63072000; includeSubdomains; preload";
```

添加响应头，告知客户端关于备用服务的信息（Alt-Svc）以及强制使用安全连接的策略（Strict-Transport-Security）。

## 网站实测

### 打开`https://http3.wcode.net/`检测

![http3在线测试](https://cdn.codepzj.cn/image/202412011425119.png)

还提供了一个 http3 的徽标，**确实挺不错的**

<a href="https://http3.wcode.net/?q=codepzj.cn" target="_blank">
    <img src="https://http3.wcode.net/badges/http3.svg?host=codepzj.cn" alt="" style="max-width: 100%; height: 24px;"/>
</a>

### 控制台实测

请不要开 🪜

![控制台实测](https://cdn.codepzj.cn/image/202412011429751.png)

可以看到，大多数都是支持**h3**的

### 使用 PageSpeed 检测

PC 端速度提升了一丢丢，而移动端性能提升显著

![PC端检测报告](https://cdn.codepzj.cn/image/202412011439508.png)

![移动端检测报告](https://cdn.codepzj.cn/image/202412011438628.png)

移动端的渲染时间比 PC 端慢很多 🤣

今天就到这吧。。。
