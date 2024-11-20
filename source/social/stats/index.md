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
