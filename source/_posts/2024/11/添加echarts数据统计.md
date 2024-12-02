---
title: 添加echarts数据统计
tags: [stellar, echarts]
categories: [技术分享]
permalink: posts/27.html
excerpt: 本文讲述了添加echarts数据统计组件的方法。
poster:
  topic: null
  headline: 添加echarts数据统计
  caption: null
  color: null
date: 2024-11-11 13:56:49
updated: 2024-11-11 13:56:49
topic:
banner:
references:
---

## 前言

添加 echarts 数据统计，[效果展示](/social/stats/)

## 具体实现

### 安装依赖

{% copy pnpm i moment prefix:$ %}

### 核心代码

#### 生成统计数据的脚本

新建`themes/stellar/scripts/filters/lib/generate-stats.js`

```js generate-stats.js
const fs = require('fs');
const path = require('path');
const moment = require('moment');

function generateStats(hexo) {
  const posts = hexo.locals.get('posts');

  const monthlyCount = {};
  const tagCount = {};
  const categoryCount = {};

  posts.forEach(post => {
    const month = moment(post.date).format('YYYY-MM');
    monthlyCount[month] = (monthlyCount[month] || 0) + 1;

    post.tags.data.forEach(tag => {
      tagCount[tag.name] = (tagCount[tag.name] || 0) + 1;
    });

    post.categories.data.forEach(category => {
      categoryCount[category.name] = (categoryCount[category.name] || 0) + 1;
    });
  });

  const sortedMonthlyCount = Object.fromEntries(
    Object.entries(monthlyCount)
      .sort((a, b) => a[0].localeCompare(b[0])) // 按键（即月份）排序
  );

  const topTags = Object.entries(tagCount)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 8)
    .map(([name, count]) => ({ name, count }));

  const topCategories = Object.entries(categoryCount)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([name, count]) => ({ name, count }));

  const data = {
    monthlyCount: sortedMonthlyCount,
    topTags,
    topCategories
  };
  const isDevelopment = hexo.env.cmd === 'server';
  const outputDir = isDevelopment ? hexo.source_dir : hexo.public_dir;
  const outputPath = path.join(outputDir, 'stats.json');
  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  fs.writeFileSync(outputPath, JSON.stringify(data, null, 2));
}

module.exports = { generateStats };
```

#### 注册生成统计数据的脚本

在`themes/stellar/scripts/filters/index.js`下添加一条记录

```js
hexo.extend.filter.register("after_generate", () =>
  require("./lib/generate-stats").generateStats(hexo)
);
```

#### 新建一个stats页面

直接向文件写入以下代码

```html
---
title: 数据统计
date: 2024-11-11 13:10:57
leftbar: social, recent
---

### 文章统计

<div id="monthlyChart" style="width: 85%; height: 350px; margin: 0 auto;"></div>

### 标签统计

<div id="tagsChart" style="width: 85%; height: 350px; margin: 0 auto;"></div>

### 分类统计

<div id="categoriesChart" style="width: 85%; height: 350px; margin: 0 auto;"></div>

<script src="https://cdn.jsdelivr.net/npm/echarts@5.5.1/dist/echarts.min.js"></script>

<script>
  // 使用 Ajax 获取 JSON 文件
  fetch('/stats.json')
    .then(response => response.json())
    .then(data => {
      const { monthlyCount, topTags, topCategories } = data;

      // 渲染每月发布文章数图表（折线图）
      const monthlyChart = echarts.init(document.getElementById('monthlyChart'));
      monthlyChart.setOption({
        xAxis: { type: 'category', data: Object.keys(monthlyCount) },
        yAxis: { type: 'value' },
        series: [{
          type: 'line',
          data: Object.values(monthlyCount),
          smooth: true,
          lineStyle: { color: '#5470C6' },
          itemStyle: { color: '#5470C6' },
          animationDuration: 1000
        }],
        grid: { containLabel: true, left: 'center', width: '80%' }
      });

      // 渲染标签出现次数图表（饼图）
      const tagsChart = echarts.init(document.getElementById('tagsChart'));
      tagsChart.setOption({
        tooltip: { trigger: 'item' },
        series: [{
          type: 'pie',
          radius: '50%',
          data: topTags.map(tag => ({ name: tag.name, value: tag.count })),
          label: { formatter: '{b}: {c} ({d}%)' },
          color: ['#5470C6', '#91CC75', '#FAC858', '#EE6666', '#73C0DE', '#3BA272', '#FC8452', '#9A60B4'],
          animationDuration: 1000
        }],
        grid: { containLabel: true, left: 'center', width: '80%' }
      });

      // 渲染分类出现次数图表（横向柱状图），添加数值标注
      const categoriesChart = echarts.init(document.getElementById('categoriesChart'));
      categoriesChart.setOption({
        xAxis: { type: 'value' },
        yAxis: { type: 'category', data: topCategories.map(category => category.name).reverse() },
        series: [{
          type: 'bar',
          data: topCategories.map(category => category.count).reverse(),
          label: {
            show: true,
            position: 'right',
            formatter: '{c}', // 显示数值
            fontSize: 12,
            fontFamily: 'Arial'
          },
          itemStyle: {
            color: new echarts.graphic.LinearGradient(1, 0, 0, 0, [
              { offset: 0, color: '#73C0DE' },
              { offset: 1, color: '#5470C6' }
            ]),
            emphasis: {
              color: new echarts.graphic.LinearGradient(1, 0, 0, 0, [
                { offset: 0, color: '#EE6666' },
                { offset: 1, color: '#FC8452' }
              ])
            }
          },
          animationDuration: 1000
        }],
        grid: { containLabel: true, left: 'center', width: '80%' }
      });
    })
    .catch(error => console.error('Error fetching stats data:', error));
</script>
```

如果尚不清楚可以去[主题日志](/update/)查看
