---
menu_id: social
title: 我的说说 & 记录生活

leftbar: social, recent
rightbar: latest_comment
updated: 2024-08-20 00:00:00
---

{% box %}
这里是我发牢骚的地方，也是我记录生活的地方 😃😃
{% endbox %}
{% tabs active:2 align:center %}

<!-- tab Github -->

{% timeline api:https://api.github.com/repos/codepzj/blog/issues %}
{% endtimeline %}

<!-- tab Telegram -->

{% timeline api:https://tgtalk.codepzj.cn/?cid=0&tag=talk&usetgclassification=true type:memos avatar:/assets/images/avatar.webp %}
{% endtimeline %}

<!-- tab Qexo -->

<div id="qexot" class="tag-plugin timeline"></div>
<script src="/vendor/js/qexo_talk.js"></script>
<link rel="stylesheet" href="/vendor/css/qexo_talk.css">
<script>showQexoTalks("qexot", "https://qexo.codepzj.cn", 10)</script>

{% endtabs %}
