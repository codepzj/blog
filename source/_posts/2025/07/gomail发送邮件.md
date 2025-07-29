---
title: gomail发送邮件
tags: [golang]
categories: [技术分享]
permalink: posts/48.html
excerpt: "Gomail 是是一款简单高效的邮件发送工具，可用于发送文本，图像，word，pdf 等多种复杂格式，并且基于 smtp 服务器"
poster:
  topic: null
  headline: null
  caption: null
  color: null
date: 2025-07-29 10:13:46
updated: 2025-07-29 10:13:46
topic:
banner:
references:
---

> Gomail 是是一款简单高效的邮件发送工具，可用于发送文本，图像，word，pdf 等多种复杂格式，并且基于 smtp 服务器

Gomail 支持：

- 附件
- 嵌入图像
- HTML 和文本模板
- 特殊字符的自动编码
- SSL 和 TLS
- 使用同一个 smtp 连接发送多封电子邮件

## 安装

```bash
go get gopkg.in/gomail.v2
```

## 示例

下面是以发送 qq 邮件为示例

```go
func SendEmail(from string, to string, text string, smtpHost string, smtpPort int, secretKey string) {
	m := gomail.NewMessage()
	m.SetHeader("From", from)
	m.SetHeader("To", to)
	m.SetBody("text/plain", text)

	// 连接smtp服务器
	d := gomail.NewDialer(smtpHost, smtpPort, from, secretKey)

	// 发送邮件
	if err := d.DialAndSend(m); err != nil {
		fmt.Println("发送邮件失败", err.Error())
		return
	}
	fmt.Println("发送邮件成功")
}
```

希望这对你有帮助
