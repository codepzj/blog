---
title: gin向浏览器SetCookie失效踩坑
tags: [golang, cookie]
categories: [技术分享]
permalink: posts/38.html
excerpt: 记录一次gin向浏览器SetCookie失效踩坑记录，最后发现在c.JSON前调用SetCookie才能将Cookie真正的置入浏览器
poster:
  topic: null
  headline: gin向浏览器SetCookie失效踩坑
  caption: null
  color: null
date: 2024-12-06 14:18:32
updated: 2024-12-06 14:18:32
topic:
cover: https://image.codepzj.cn/image/202412111410543.png
references:
---

项目在做 JWT 鉴权的时候，发现 SetCookie 一直无法置入浏览器中，就很操蛋，然后折腾了很久，被自己蠢哭了。

## Axios

一开始我以为是 axios 的问题：

```js
const request = axios.create({
  baseURL: "http://localhost:8080/",
  timeout: 5000,
  withCredentials: true,
});
```

我已经允许 axios 发请求的时候携带 Cookie 了，反复测试，发现没有问题

## SameSite

在网上查阅资料提到了 SameSite 问题，其实就是服务端对携带 Cookie 请求的限制

{% folders %}

<!-- folder SameSite的作用 -->

1. **SameSite=Strict**
   - 浏览器仅在同一站点的请求中发送 Cookie。
   - 如果用户从外部站点跳转到当前站点，Cookie 将不会被发送。
   - 适用于需要最大程度的安全性并防止跨站请求伪造（CSRF）的情况。
2. **SameSite=Lax**
   - 默认值（如果没有设置 `SameSite` 时）。它在同一站点的请求中始终发送 Cookie，但对于一些安全级别较低的请求（例如从外部站点的 GET 请求），它也会发送 Cookie。
   - 对于跨站的某些请求（比如链接点击），会发送 Cookie，但 POST 请求等不会发送 Cookie。
   - 适用于需要一定安全性且希望允许某些跨站请求的情况。
3. **SameSite=None**
   - 允许在所有情况下发送 Cookie，包括跨站请求。为了允许 Cookie 在跨域请求中发送，你必须同时设置 `Secure` 属性为 `true`，确保只通过 HTTPS 传输。
   - 适用于需要跨站请求时发送 Cookie 的场景，比如跨域认证、第三方 API 调用等。

{% endfolders %}

```go
const (
	SameSiteDefaultMode SameSite = iota + 1
	SameSiteLaxMode
	SameSiteStrictMode
	SameSiteNoneMode
)
```

```go
c.SetSameSite(4)
```

Cookies marked with `SameSite=None` must also be marked with `Secure` to allow setting them in a cross-site context. This behavior protects user data from being sent over an insecure connection.

Resolve this issue by updating the attributes of the cookie:

- Specify `SameSite=None` and `Secure` if the cookie is intended to be set in cross-site contexts. Note that only cookies sent over HTTPS may use the `Secure` attribute.
- Specify `SameSite=Strict` or `SameSite=Lax` if the cookie should not be set by cross-site requests.

设置 `SameSite=None` 时，**必须同时设置 `Secure`**，以确保 Cookie 只能通过 HTTPS 发送。

开发环境这样设置是不可行的，因为是 http 环境

## Cors

检查了一下 Cors 中间件：

```go
func Cors() gin.HandlerFunc {
	return func(c *gin.Context) {
		method := c.Request.Method
		origin := c.Request.Header.Get("Origin")
		c.Header("Access-Control-Allow-Origin", origin)
		c.Header("Access-Control-Allow-Headers", "Content-Type,AccessToken,X-CSRF-Token, Authorization, Token,X-Token,X-User-Id")
		c.Header("Access-Control-Allow-Methods", "POST, GET, OPTIONS,DELETE,PUT")
		c.Header("Access-Control-Expose-Headers", "Content-Length, Access-Control-Allow-Origin, Access-Control-Allow-Headers, Content-Type, New-Token, New-Expires-At")
		c.Header("Access-Control-Allow-Credentials", "true")

		// 放行所有OPTIONS方法
		if method == "OPTIONS" {
			c.AbortWithStatus(http.StatusNoContent)
		}
		// 处理请求
		c.Next()
	}
}
```

感觉也没什么问题

## 逻辑

最后，使用 ApiFox 测试了一下，接口返回的也没有 Cookie

然后我就怀疑是不是逻辑出错了，果不其然

```go
func (ua *UserApi) UserLogin(c *gin.Context) {
    var u user.UserModel
    if err := c.ShouldBindJSON(&u); err != nil {
       response.FailWithMessage("用户参数不合法", c)
       return
    }

    if usrService.FindUser(u) {
       token, _ := utils.GenerateToken(u.Account)
       response.Ok(c)
       utils.SetToken(c, token, int(72*time.Hour.Seconds()))
       return
    }
    response.FailWithMessage("用户尚未注册", c)
}
```

调用 `c.JSON()` 之后设置 Cookie，导致 Cookie 无效。因为 `c.JSON()` 方法会立即写入响应并结束请求的处理流程，因此在此之后的任何操作（如设置 Cookie）都不会生效。

所以得在 `c.JSON()` 前调用 SetCookie 才能将 Cookie 真正的置入浏览器！！！

犯这种低级错误，心里五味杂陈，而且这个问题我几个月前遇到过一次，也是弄了好久，当时没有记录下来，导致如今依旧踩雷，特此记录一下。
