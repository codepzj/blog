---
menu_id: social
title: 我的说说 & 记录生活
leftbar: social, recent
rightbar: latest_comment
updated: 2024-08-20 00:00:00
excerpt: 博客的说说页面，包含Github，Telegram
---

{% box %}
这里是我发牢骚的地方，也是我记录生活的地方 😃😃
{% endbox %}
{% tabs active:1 align:center %}

<!-- tab Github -->

{% timeline api:https://api.github.com/repos/codepzj/blog/issues %}
{% endtimeline %}

<!-- tab Telegram -->

{% timeline api:https://tgtalk.codepzj.cn/?cid=0&tag=talk&usetgclassification=true type:memos avatar:/assets/images/avatar.jpg %}
{% endtimeline %}

{% endtabs %}
