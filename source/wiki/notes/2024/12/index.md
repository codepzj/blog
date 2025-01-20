---
wiki: notes
title: 2024/12
updated: 2024-12-1 00:00:00
excerpt: 2024年12月份的代码笔记，记录学习过程中遇到的难题以及解决问题的思路与方案。
---

{% folders %}

<!-- folder wsl安装ubuntu -->

查看可安装镜像
{% copy wsl --list online prefix:$ %}

```txt
NAME                            FRIENDLY NAME
Ubuntu                          Ubuntu
Debian                          Debian GNU/Linux
kali-linux                      Kali Linux Rolling
Ubuntu-18.04                    Ubuntu 18.04 LTS
Ubuntu-20.04                    Ubuntu 20.04 LTS
Ubuntu-22.04                    Ubuntu 22.04 LTS
Ubuntu-24.04                    Ubuntu 24.04 LTS
OracleLinux_7_9                 Oracle Linux 7.9
OracleLinux_8_7                 Oracle Linux 8.7
OracleLinux_9_1                 Oracle Linux 9.1
openSUSE-Leap-15.6              openSUSE Leap 15.6
SUSE-Linux-Enterprise-15-SP5    SUSE Linux Enterprise 15 SP5
SUSE-Linux-Enterprise-15-SP6    SUSE Linux Enterprise 15 SP6
openSUSE-Tumbleweed             openSUSE Tumbleweed
```

直接安装
{% copy wsl --install -d Ubuntu-24.04 prefix:$ %}

查看可安装镜像
{% copy wsl --list prefix:$ %}

```txt
适用于 Linux 的 Windows 子系统分发:
docker-desktop-data (默认)
docker-desktop
Ubuntu-24.04
```

设置`Ubuntu-24.04`为默认
{% copy wsl --set-default Ubuntu-24.04 prefix:$ %}

<!-- folder gin中匹配路由`*`和`:`的区别 -->

```go
/find/user 这种可以接收到路由（带/）
pg.GET("/find/*id", ProgramApi.ProgramFindAll) # /user

/find/6  这种接收参数
pg.GET("/find/:id", ProgramApi.ProgramFindAll) # "6"
```

<!-- folder pinia持久化存储的原理 -->

将对象序列化成 json 存储到 session 和 localstorge 里面，每次修改或获取值都通过 setItem 和 getItem 完成。

<!-- folder cookie在前后端的交互是怎么样的 -->

用户登录，后端往浏览器置入`cookie`，在用户发起请求的时候会校验请求头`token`或者`cookie`中的`jwt`加密字符串，一般前端会使用`pinia`把登录后返回的用户信息存储起来。
退出登录，要让`pinia`持久化数据失效，同时向后端发起清空 cookie 的操作。
cookie 应该设置`HttpOnly`让前端无法直接访问，防止一些跨站脚本的攻击。

<!-- folder a标签的target参数分析 -->

```html
target: "_self",指的是在当前页打开 target: "_blank",指的是在新的标签页打开
```

<!-- folder 数据库允许root用户远程登录 -->

```bash
mysql> SELECT Host, User FROM mysql.user WHERE User = 'root';
+-----------+------+
| Host      | User |
+-----------+------+
| localhost | root |
+-----------+------+
1 row in set (0.00 sec)

mysql> CREATE USER 'root'@'%' IDENTIFIED BY 'pzj20162116';
Query OK, 0 rows affected (0.01 sec)

mysql> GRANT ALL PRIVILEGES ON *.* TO 'root'@'%' WITH GRANT OPTION;
Query OK, 0 rows affected (0.00 sec)

mysql> flush privileges;
Query OK, 0 rows affected (0.00 sec)

mysql> SELECT Host, User FROM mysql.user WHERE User = 'root';
+-----------+------+
| Host      | User |
+-----------+------+
| %         | root |
| localhost | root |
+-----------+------+
2 rows in set (0.00 sec)
```

<!-- folder vue3设置@别名可点击跳转 -->

在项目根目录新建`jsconfig.json`:

```json jsconfig.json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"]
    },
    "target": "ES6",
    "allowSyntheticDefaultImports": true
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules"]
}
```

<!-- folder gin中ShouldBind传参传默认值，切记不要使用required -->

在 gin 里面，有 c.ShouldBind 这个方法，常用于绑定结构体，如果你设置 json 字段为`required`（即必填），就算你填了对应的零值（即默认值），shouldbind 会认为你没填，就会绑定失败。

所以如果传参包含默认值，对应的 json 字段不应该设置为 required，比如说金额（int），默认为 0，我没买东西，传参为 0，设定 required 是无法识别的，会误认为你没有传参。

<!-- folder jsdliver有缓存怎么强制清除 -->

假如说你的 cdn 地址是这样

https://cdn.jsdelivr.net/gh/user/repo@version/file

那么使用如下地址

https://purge.jsdelivr.net/gh/user/repo@version/file

```json
{
  "id": "oBCXlFgXNJdiqwIb",
  "status": "finished",
  "timestamp": "2024-12-18T06:20:53.917Z",
  "paths": {
    "/gh/codepzj/fonts@main/QianMoKai/result.css": {
      "throttled": false,
      "providers": {
        "CF": true,
        "FY": true
      }
    }
  }
}
```
返回如下结果就说明刷新成功。

{% endfolders %}
