---
title: hexo-theme-stellar常用标签组件
tags: [stellar]
categories: [技术分享]
permalink: posts/2.html
excerpt: 本文介绍了hexo-theme-stellar主题的标签用法。
poster:
  topic: null
  headline: hexo-theme-stellar常用标签组件
  caption: null
  color: null
date: 2024-08-27 00:33:33
updated: 2024-08-27 00:33:33
topic:
description:

references:
---

## emoji 表情包

| 表情 | 索引 | 表情 | 索引 | 表情 | 索引 |
| --- | --- | --- | --- | --- | --- |
| {% emoji blobcat ablobcatheart %}  | ablobcatheart | {% emoji blobcat ablobcatheartbroken %}  | ablobcatheartbroken | {% emoji blobcat blobcatheart %}  | blobcatheart |
| {% emoji blobcat blobcatheartpride %}  | blobcatheartpride | {% emoji blobcat blobcatlove %}  | blobcatlove | {% emoji blobcat blobcatkissheart %}  | blobcatkissheart |
| {% emoji blobcat blobcatsnuggle %}  | blobcatsnuggle | {% emoji blobcat comfyuee %}  | comfyuee | {% emoji blobcat comfyslep %}  | comfyslep |
| {% emoji blobcat blobcatcomfysweat %}  | blobcatcomfysweat | {% emoji blobcat blobcatcomftears %}  | blobcatcomftears | {% emoji blobcat blobcatfacepalm %}  | blobcatfacepalm |
| {% emoji blobcat blobcat0_0 %}  | blobcat0_0 | {% emoji blobcat blobcatangry %}  | blobcatangry | {% emoji blobcat blobbanhammerr %}  | blobbanhammerr |
| {% emoji blobcat blobcatt %}  | blobcatt | {% emoji blobcat blobcatblush %}  | blobcatblush | {% emoji blobcat blobcatcoffee %}  | blobcatcoffee |
| {% emoji blobcat blobcatcry %}  | blobcatcry | {% emoji blobcat blobcatdead %}  | blobcatdead | {% emoji blobcat blobcatdied %}  | blobcatdied |
| {% emoji blobcat blobcatdisturbed %}  | blobcatdisturbed | {% emoji blobcat blobcatfearful %}  | blobcatfearful | {% emoji blobcat blobcatfingerguns %}  | blobcatfingerguns |
| {% emoji blobcat blobcatflip %}  | blobcatflip | {% emoji blobcat blobcatflower %}  | blobcatflower | {% emoji blobcat blobcatgay %}  | blobcatgay |
| {% emoji blobcat blobcatgooglycry %}  | blobcatgooglycry | {% emoji blobcat blobcatneutral %}  | blobcatneutral | {% emoji blobcat blobcatopenmouth %}  | blobcatopenmouth |
| {% emoji blobcat blobcatsadreach %}  | blobcatsadreach | {% emoji blobcat blobcatscared %}  | blobcatscared | {% emoji blobcat blobcatnomblobcat %}  | blobcatnomblobcat |
| {% emoji blobcat blobcatpresentred %}  | blobcatpresentred | {% emoji blobcat blobcatread %}  | blobcatread | {% emoji blobcat blobcatsipsweat %}  | blobcatsipsweat |
| {% emoji blobcat blobcatsnapped %}  | blobcatsnapped | {% emoji blobcat blobcatthink %}  | blobcatthink | {% emoji blobcat blobcattriumph %}  | blobcattriumph |
| {% emoji blobcat blobcatumm %}  | blobcatumm | {% emoji blobcat blobcatverified %}  | blobcatverified | {% emoji blobcat blobcatbox %}  | blobcatbox |
| {% emoji blobcat blobcatcaged %}  | blobcatcaged | {% emoji blobcat blobcatgooglytrash %}  | blobcatgooglytrash | {% emoji blobcat blobcatheadphones %}  | blobcatheadphones |
| {% emoji blobcat blobcathighfive %}  | blobcathighfive | {% emoji blobcat blobcatmelt %}  | blobcatmelt | {% emoji blobcat blobcatmeltthumb %}  | blobcatmeltthumb |
| {% emoji blobcat blobcatnotlikethis %}  | blobcatnotlikethis | {% emoji blobcat blobcatsaitama %}  | blobcatsaitama | {% emoji blobcat blobcatyandere %}  | blobcatyandere |
| {% emoji blobcat blobcatpeek2 %}  | blobcatpeek2 | {% emoji blobcat blobcatpeekaboo %}  | blobcatpeekaboo | {% emoji blobcat blobcatphoto %}  | blobcatphoto |
| {% emoji blobcat ablobcatattentionreverse %}  | ablobcatattentionreverse | {% emoji blobcat ablobcatreachrev %}  | ablobcatreachrev | {% emoji blobcat ablobcatwave %}  | ablobcatwave |
| {% emoji blobcat blobcatalt %}  | blobcatalt | {% emoji blobcat blobcatpolice %}  | blobcatpolice | {% emoji blobcat blobcatshocked %}  | blobcatshocked |
| {% emoji blobcat ablobcatrainbow %}  | ablobcatrainbow |  |  |  |  |

### 语法

```text
{% emoji [source] name [height:1.75em] %}
```

### 用法

```text
{% emoji 爱你 height:2em %}
{% emoji tieba 滑稽 height:2em %}
{% emoji blobcat ablobcatheart %}
{% emoji blobcat blobcatangry %}
{% emoji blobcat blobcatflower %}
```

### 效果


{% emoji blobcat ablobcatheart %}
{% emoji blobcat blobcatangry %}
{% emoji blobcat blobcatflower %}

## icon 图标标签

### 语法/用法

```text
{% icon solar:planet-bold-duotone %} # 直接使用icons.yml默认图标
{% icon https://image.codepzj.cn/image/202410192142540.png %} # 使用外联图标
{% icon ph:seal-question-fill color:green %} # 使用样式
```

### 效果

{% icon solar:planet-bold-duotone %}
{% icon https://image.codepzj.cn/image/202410192142540.png %}
{% icon ph:seal-question-fill color:green %}

## mark 标记标签

### 语法/用法

```text
# 支持多彩标记
{% mark 默认 %}
{% mark 红 color:red %}
{% mark 橙 color:orange %}
{% mark 黄 color:yellow %}
{% mark 绿 color:green %}
{% mark 青 color:cyan %}
{% mark 蓝 color:blue %}
{% mark 紫 color:purple %}
{% mark 亮 color:light %}
{% mark 暗 color:dark %}
{% mark 警告 color:warning %}
{% mark 错误 color:error %}
```

### 效果

{% mark 默认 %}
{% mark 红 color:red %}
{% mark 橙 color:orange %}
{% mark 黄 color:yellow %}
{% mark 绿 color:green %}
{% mark 青 color:cyan %}
{% mark 蓝 color:blue %}
{% mark 紫 color:purple %}
{% mark 亮 color:light %}
{% mark 暗 color:dark %}
{% mark 警告 color:warning %}
{% mark 错误 color:error %}

## hashtag 标签

### 语法/用法

如果没有指定颜色，且没有设置默认颜色，则随机取一个颜色

```text
{% hashtag Stellar https://xaoxuu.com/wiki/stellar/ %}
{% hashtag Hexo https://hexo.io/ %}
{% hashtag GitHub https://github.com/xaoxuu/ %}
{% hashtag Gitea https://git.xaox.cc/ color:green %}
```

### 效果

{% hashtag GitHub https://github.com %}
{% hashtag Gitee https://gitee.com %}
{% hashtag DockerHub https://hub.docker.com %}

## image 图片标签

### 语法

```text
{% image src [description] [download:bool/string] [width:px] [padding:px] [bg:hex] [fancybox:bool/string] %}
```

```text
src:图片地址
description:图片描述
download:href # 下载地址，设置此值后鼠标放在图片上会显示下载地址，如果下载地址为图片地址，可以设置为 true
width:200px # 图片宽度
padding:16px # 图片四周填充宽度
bg:'#ffffff' # 图片区域背景颜色，16进制
fancybox:href # fancybox 放大地址，设置此值后会调用该链接放大，如果放大地址为图片地址，可以设置为 true
```

### 用法

```text
{% image https://image.codepzj.cn/image/202410192146575.gif 小猫摇KFC download:true width:200px %}
{% image https://image.codepzj.cn/image/202410192148722.gif 调试css的狼狈样子 download:true width:200px padding:16px %}
```

### 效果

{% image https://image.codepzj.cn/image/202410192146575.gif download:true width:200px %}
{% image https://image.codepzj.cn/image/202410192148722.gif 调试 css 的狼狈样子 download:true width:200px padding:16px %}

## quot 引用

### 语法/用法

```text
{% quot Stellar 是迄今为止最好用的主题 %}
{% quot 热门话题 icon:hashtag %}
{% quot 特别引用 icon:default %}
{% quot prefix:solar:planet-bold-duotone 这是一个 icons.yml 配置的示例 %}
```

### 效果

{% quot Stellar 是迄今为止最好用的主题 %}
{% quot 热门话题 icon:hashtag %}
{% quot 特别引用 icon:default %}
{% quot prefix:solar:planet-bold-duotone 这是一个 icons.yml 配置的示例 %}

## poetry 诗词

### 语法/用法

```text
{% poetry 游山西村 author:陆游 footer:诗词节选 %}
莫笑农家腊酒浑，丰年留客足鸡豚。
**山重水复疑无路，柳暗花明又一村。**
箫鼓追随春社近，衣冠简朴古风存。
从今若许闲乘月，拄杖无时夜叩门。
{% endpoetry %}
```

### 效果

{% poetry 观沧海 author:曹操 footer:诗词节选 %}
东临碣石，以观沧海。
水何澹澹，山岛竦峙。
树木丛生，百草丰茂。
秋风萧瑟，洪波涌起。
**日月之行，若出其中；**
**星汉灿烂，若出其里。**
幸甚至哉，歌以咏志。
{% endpoetry %}

## paper 纸张标签

### 语法/用法

```text
{% paper style:underline title:六国论 author:苏洵 date:宋 footer:节选 %}

<!-- paragraph -->
六国破灭，非兵不利，战不善，弊在赂秦。赂秦而力亏，破灭之道也。或曰：六国互丧，率赂秦耶？曰：不赂者以赂者丧。盖失强援，不能独完。故曰：弊在赂秦也。

<!-- paragraph -->
秦以攻取之外，小则获邑，大则得城。较秦之所得，与战胜而得者，其实百倍；诸侯之所亡，与战败而亡者，其实亦百倍。则秦之所大欲，诸侯之所大患，固不在战矣。思厥先祖父，暴霜露，斩荆棘，以有尺寸之地。子孙视之不甚惜，举以予人，如弃草芥。今日割五城，明日割十城，然后得一夕安寝。起视四境，而秦兵又至矣。然则诸侯之地有限，暴秦之欲无厌，奉之弥繁，侵之愈急。故不战而强弱胜负已判矣。至于颠覆，理固宜然。古人云：“以地事秦，犹抱薪救火，薪不尽，火不灭。”此言得之。

<!-- paragraph -->
齐人未尝赂秦，终继五国迁灭，何哉？与嬴而不助五国也。五国既丧，齐亦不免矣。燕赵之君，始有远略，能守其土，义不赂秦。是故燕虽小国而后亡，斯用兵之效也。至丹以荆卿为计，始速祸焉。赵尝五战于秦，二败而三胜。后秦击赵者再，李牧连却之。洎牧以谗诛，邯郸为郡，惜其用武而不终也。且燕赵处秦革灭殆尽之际，可谓智力孤危，战败而亡，诚不得已。向使三国各爱其地，齐人勿附于秦，刺客不行，良将犹在，则胜负之数，存亡之理，当与秦相较，或未易量。

<!-- paragraph -->
呜呼！以赂秦之地封天下之谋臣，以事秦之心礼天下之奇才，并力西向，则吾恐秦人食之不得下咽也。悲夫！有如此之势，而为秦人积威之所劫，日削月割，以趋于亡。为国者无使为积威之所劫哉！

<!-- paragraph -->
夫六国与秦皆诸侯，其势弱于秦，而犹有可以不赂而胜之之势。苟以天下之大，下而从六国破亡之故事，是又在六国下矣。
{% endpaper %}
```

### 效果

{% paper style:underline title:六国论 author:苏洵 date:宋 %}

<!-- paragraph -->

六国破灭，非兵不利，战不善，弊在赂秦。赂秦而力亏，破灭之道也。或曰：六国互丧，率赂秦耶？曰：不赂者以赂者丧。盖失强援，不能独完。故曰：弊在赂秦也。

<!-- paragraph -->

秦以攻取之外，小则获邑，大则得城。较秦之所得，与战胜而得者，其实百倍；诸侯之所亡，与战败而亡者，其实亦百倍。则秦之所大欲，诸侯之所大患，固不在战矣。思厥先祖父，暴霜露，斩荆棘，以有尺寸之地。子孙视之不甚惜，举以予人，如弃草芥。今日割五城，明日割十城，然后得一夕安寝。起视四境，而秦兵又至矣。然则诸侯之地有限，暴秦之欲无厌，奉之弥繁，侵之愈急。故不战而强弱胜负已判矣。至于颠覆，理固宜然。古人云：“以地事秦，犹抱薪救火，薪不尽，火不灭。”此言得之。

<!-- paragraph -->

齐人未尝赂秦，终继五国迁灭，何哉？与嬴而不助五国也。五国既丧，齐亦不免矣。燕赵之君，始有远略，能守其土，义不赂秦。是故燕虽小国而后亡，斯用兵之效也。至丹以荆卿为计，始速祸焉。赵尝五战于秦，二败而三胜。后秦击赵者再，李牧连却之。洎牧以谗诛，邯郸为郡，惜其用武而不终也。且燕赵处秦革灭殆尽之际，可谓智力孤危，战败而亡，诚不得已。向使三国各爱其地，齐人勿附于秦，刺客不行，良将犹在，则胜负之数，存亡之理，当与秦相较，或未易量。

<!-- paragraph -->

呜呼！以赂秦之地封天下之谋臣，以事秦之心礼天下之奇才，并力西向，则吾恐秦人食之不得下咽也。悲夫！有如此之势，而为秦人积威之所劫，日削月割，以趋于亡。为国者无使为积威之所劫哉！

<!-- paragraph -->

夫六国与秦皆诸侯，其势弱于秦，而犹有可以不赂而胜之之势。苟以天下之大，下而从六国破亡之故事，是又在六国下矣。
{% endpaper %}

## reel 卷轴标签

### 语法/用法

```text
{% reel 滕王阁序 author:王勃 date:重九日 footer:节选 %}
时维九月，序属三秋。
潦水尽而寒潭清，烟光凝而暮山紫。
俨骖騑于上路，访风景于崇阿。
临帝子之长洲，得天人之旧馆。
层峦耸翠，上出重霄；
飞阁流丹，下临无地。
鹤汀凫渚，穷岛屿之萦回；
桂殿兰宫，即冈峦之体势。
{% endreel %}
```

### 效果

{% reel 滕王阁序 author:王勃 date:重九日 footer:节选 %}
时维九月，序属三秋。
潦水尽而寒潭清，烟光凝而暮山紫。
俨骖騑于上路，访风景于崇阿。
临帝子之长洲，得天人之旧馆。
层峦耸翠，上出重霄；
飞阁流丹，下临无地。
鹤汀凫渚，穷岛屿之萦回；
桂殿兰宫，即冈峦之体势。
{% endreel %}

## note 备注块

### 语法

```text
{% note [title] content [color:color] %}
```

### 用法

```text
{% note **程序员黑话**

那个bug没问题啊，你再试试<br>

实际：刚偷偷改完这个bug<br>

使用场景：当非技术部门的同事给技术报问题的时候，技术可能在想“你个傻X会用吗”，当真的发现是自己的bug，会默默改掉，然后给出上边的答复，让非技术部门的人觉得什么也没发生过。
color:red %}
```

{% note 一共支持 12 种颜色，可以满足几乎所有的需求了。
color 可设置 red、orange、amber、yellow、green、cyan、blue、purple、light、dark、warning、error 几种取值。
%}

### 效果

{% note 程序员黑话

那个 bug 没问题啊，你再试试 <br> <br>

实际：刚偷偷改完这个 bug <br> <br>

使用场景：当非技术部门的同事给技术报问题的时候，技术可能在想“你个傻 X 会用吗”，当真的发现是自己的 bug，会默默改掉，然后给出上边的答复，让非技术部门的人觉得什么也没发生过。
color:green %}

## link 链接卡片

### 语法

```text
{% link href [title] [icon:src] [desc:true/false] %}
```

### 用法

```text
{% link https://www.baidu.com 百度 icon:https://www.baidu.com/favicon.ico %}
```

### 效果

{% link https://www.baidu.com 百度 icon:https://www.baidu.com/favicon.ico %}

{% link https://github.com Github icon:https://github.com/favicon.ico %}

## button 按钮

### 语法

```text
{% button text url [icon:key/src] [color:color] [size:xs] %}
```

### 用法

```text
{% button vue3文档 https://cn.vuejs.org icon:https://vueschool.io/images/banners/assets/CERTIFICATES/logo.svg color:yellow size:s %}
```

### 效果

{% button vue3 文档 https://cn.vuejs.org icon:https://vueschool.io/images/banners/assets/CERTIFICATES/logo.svg color:yellow size:s %}

## okr 目标管理

### 语法/用法

```text
{% okr o1 %}

2024年的小目标：独立开发一个商城系统
来自2025年的复盘：已《基本》实现目标 {% emoji blobcat blobcatflower %}

<!-- okr kr1 percent:0.9 -->
学习vue3和golang的基本语法
- element-plus的使用
- gorm的使用

<!-- okr kr2 percent:0 status:off_track -->
开发商城购物前台

<!-- okr kr3 percent:0 status:unfinished -->
开发商城管理后台

<!-- okr kr4 status:at_risk -->
开发、测试和发布
大概率完不成了。。。

{% endokr %}
```

### 效果

{% okr o1 %}

2024 年的小目标：独立开发一个商城系统
来自 2025 年的复盘：已《基本》实现目标 {% emoji blobcat blobcatflower %}

<!-- okr kr1 percent:0.9 -->

学习 vue3 和 golang 的基本语法

- element-plus 的使用
- gorm 的使用

<!-- okr kr2 percent:0 status:off_track -->

开发商城购物前台

<!-- okr kr3 percent:0 status:unfinished -->

开发商城管理后台

<!-- okr kr4 status:at_risk -->

开发、测试和发布
大概率完不成了。。。

{% endokr %}

## copy 复制行

### 语法/用法

```text
{% copy curl -sSL https://resource.fit2cloud.com/1panel/package/quick_start.sh %}
{% copy curl -sSL https://resource.fit2cloud.com/1panel/package/quick_start.sh prefix:$ %}
{% copy git:https aceld/golang %}
{% copy git:ssh aceld/golang %}
{% copy git:gh aceld/golang %}
```

### 效果

{% copy curl -sSL https://resource.fit2cloud.com/1panel/package/quick_start.sh %}
{% copy curl -sSL https://resource.fit2cloud.com/1panel/package/quick_start.sh prefix:$ %}
{% copy git:https aceld/golang %}
{% copy git:ssh aceld/golang %}
{% copy git:gh aceld/golang %}

## radio 单选

### 语法/用法

```text
{% radio color:red 未勾选的单选框 %}
{% radio checked:true color:green 已勾选的单选框 %}
```

### 效果

{% radio color:red 未勾选的单选框 %}
{% radio checked:true color:green 已勾选的单选框 %}

## checkbox 复选

### 语法/用法

```text
{% checkbox 普通的没有勾选的复选框 %}
{% checkbox checked:true 普通的已勾选的复选框 %}
{% checkbox symbol:plus color:green checked:true 显示为加号的绿色的已勾选的复选框 %}
{% checkbox symbol:minus color:yellow checked:true 显示为减号的黄色的已勾选的复选框 %}
{% checkbox symbol:times color:red checked:true 显示为乘号的红色的已勾选的复选框 %}
```

### 效果

{% checkbox 普通的没有勾选的复选框 %}
{% checkbox checked:true 普通的已勾选的复选框 %}
{% checkbox symbol:plus color:green checked:true 显示为加号的绿色的已勾选的复选框 %}
{% checkbox symbol:minus color:yellow checked:true 显示为减号的黄色的已勾选的复选框 %}
{% checkbox symbol:times color:red checked:true 显示为乘号的红色的已勾选的复选框 %}

## audio 音频标签

### 语法/用法

```text
{% audio type:2 netease:1856385686 autoplay:0 %}
```

```text
type:2/0 # 歌曲/歌单 # 不设置默认为2歌曲模式<br>
netease:xxx # 歌曲/歌单 id ，具体 id 在网易云网页版的网址链接中寻找<br>
autoplay:1/0 # 自动播放/手动播放 # 不设置默认0手动播放<br>
```

### 效果

{% audio type:2 netease:30375354 autoplay:0 %}

## video 视频标签

### 语法/用法

```text
{% video bilibili:BV1BK411L7DJ width:80% autoplay:0 %}
```

### 效果

{% video bilibili:BV1BK411L7DJ width:80% autoplay:0 %}

## navbar 导航栏

### 语法/用法

```text
{% navbar active:/wiki/ [文章](/) [项目](/wiki/) [留言](#comments) [GitHub](https://github.com/codepzj) %}
```

### 效果

{% navbar active:/wiki/ [文章](/) [项目](/wiki/) [留言](#comments) [GitHub](https://github.com/codepzj) %}

## frame 设备框架

### 语法/用法

```text
{% frame iphone11 img:https://xaoxuu.com/assets/wiki/prohud/toast/demo-loading.png video:https://xaoxuu.com/assets/wiki/prohud/toast/demo-loading.mp4 focus:top %}
```

### 效果

{% frame iphone11 img:https://xaoxuu.com/assets/wiki/prohud/toast/demo-loading.png video:https://xaoxuu.com/assets/wiki/prohud/toast/demo-loading.mp4 focus:top %}

## 文本修饰标签集

### 语法/用法

```text
- 这是 {% psw 密码 %} 标签
- 这是 {% u 下划线 %} 标签
- 这是 {% emp 着重号 %} 标签
- 这是 {% wavy 波浪线 %} 标签
- 这是 {% del 删除线 %} 标签
- 这是 {% sup 上角标 color:red %} 标签
- 这是 {% sub 下角标 %} 标签
- 这是 {% kbd 键盘样式 %} 标签，试一试：{% kbd Ctrl %} + {% kbd S %}
```

### 效果

- 这是 {% psw 密码 %} 标签
- 这是 {% u 下划线 %} 标签
- 这是 {% emp 着重号 %} 标签
- 这是 {% wavy 波浪线 %} 标签
- 这是 {% del 删除线 %} 标签
- 这是 {% sup 上角标 color:red %} 标签
- 这是 {% sub 下角标 %} 标签
- 这是 {% kbd 键盘样式 %} 标签，试一试：{% kbd Ctrl %} + {% kbd S %}

## 静态时间线

### 语法/用法

```text
{% timeline %}
<!-- node 2024 年 8 月 28 日 -->
逐渐熟悉 **Stellar** 标签的用法
<!-- node 2024 年 8 月 18 日 -->
初步建站，使用的 hexo-theme-stellar 主题
{% endtimeline %}
```

### 效果

{% timeline %}

<!-- node 2024 年 8 月 28 日 -->

逐渐熟悉 **Stellar** 标签的用法

<!-- node 2024 年 8 月 18 日 -->

初步建站，使用的 hexo-theme-stellar 主题
{% endtimeline %}

## md 渲染外部 markdown 文件

### 语法/用法

```text
{% md https://cdn.jsdmirror.com/gh/codepzj/AIContentSummaryCuteen/README.md %}
```

### 效果

{% md https://cdn.jsdmirror.com/gh/codepzj/AIContentSummaryCuteen/README.md %}

## ghcard 卡片

### 语法/用法

```text
{% ghcard codepzj %}
{% ghcard codepzj/AKGraph %}
```

### 效果

{% ghcard codepzj theme:dark %}
{% ghcard codepzj/AKGraph theme:dark %}

## toc 文档目录树

### 语法

```text
{% toc wiki:xxx [open:true] title %}
```

### 用法

```text
{% toc wiki:niuke open:true 牛客 %}
```

### 效果

{% toc wiki:niuke open:true 牛客 %}

## folding 折叠容器

### 语法

```text
{% folding title [codeblock:bool] [open:bool] [color:color] %}
content
{% endfolding %}
```

### 用法

```text
{% folding 这是一段js代码 open:false color:blue %}

代码块...

{% endfolding %}
```

### 效果

{% folding 这是一段 js 代码 open:false color:blue %}

```js
console.log(555);
```

{% endfolding %}

## folders 多个折叠容器聚合

### 语法/用法

```text
{% folders %}
<!-- folder 题目1 -->
这是答案1
<!-- folder 题目2 -->
这是答案2
<!-- folder 题目3 -->
这是答案3
{% endfolders %}
```

### 效果

{% folders %}

<!-- folder 题目1 -->

这是答案 1

<!-- folder 题目2 -->

这是答案 2

<!-- folder 题目3 -->

这是答案 3
{% endfolders %}

## tabs 分栏容器

### 语法/用法

```text
{% tabs active:2 align:center %}
<!-- tab 图片 -->
图片
<!-- tab 代码块 -->
代码块
{% endtabs %}
```

### 效果

{% tabs active:2 align:center %}

<!-- tab 图片 -->

{% image https://xaoxuu.com/assets/wiki/stellar/icon.svg width:100px %}

<!-- tab 代码块 -->

```go
func main(){
  fmt.Println("666")
}
```

{% endtabs %}

## grid 网格分区容器

### 语法/用法

```text
{% grid %}
<!-- cell -->
{% image https://image.codepzj.cn/image/202410192149538.jpeg %}
<!-- cell -->
The Galactic Center is the rotational center of the Milky Way galaxy. Its central massive object is a supermassive black hole of about 4 million solar masses, which is called Sagittarius A*. Its mass is equal to four million suns. The center is located 25,800 light years away from Earth.

> Ōwhiro Bay, Wellington, New Zealand
> Published on May 31, 2022
> SONY, ILCE-6000
> Free to use under the Unsplash License

{% endgrid %}
```

### 效果

{% grid %}

<!-- cell -->

{% image https://image.codepzj.cn/image/202410192149538.jpeg %}

<!-- cell -->

The Galactic Center is the rotational center of the Milky Way galaxy. Its central massive object is a supermassive black hole of about 4 million solar masses, which is called Sagittarius A\*. Its mass is equal to four million suns. The center is located 25,800 light years away from Earth.

> Ōwhiro Bay, Wellington, New Zealand
> Published on May 31, 2022
> SONY, ILCE-6000
> Free to use under the Unsplash License

{% endgrid %}