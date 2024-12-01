---
title: 数据统计
date: 2024-11-11 13:10:57
leftbar: social, recent
rightbar: toc
---

### Blog Heatmap

<div id="heatmapChart" style="width: 100%; height: 200px; margin: 0 auto; border-radius: 10px; padding: 10px; background-color: #ffffff; box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);"></div>

### Monthly Article Statistics

<div id="monthlyChart" style="width: 100%; height: 250px; margin: 0 auto; border-radius: 10px; padding: 10px; background-color: #ffffff; box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);"></div>

### Tag Statistics

<div id="tagsChart" style="width: 100%; height: 250px; margin: 0 auto; border-radius: 10px; padding: 10px; background-color: #ffffff; box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);"></div>

### Category Statistics

<div id="categoriesChart" style="width: 100%; height: 250px; margin: 0 auto; border-radius: 10px; padding: 10px; background-color: #ffffff; box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);"></div>

<script src="https://cdn.jsdelivr.net/npm/echarts@5.5.1/dist/echarts.min.js"></script>

<script>
  fetch('/stats.json')
    .then(response => response.json())
    .then(data => {
      const { dailyCount, monthlyCount, topTags, topCategories } = data;

      // Heatmap
      const heatmapChart = echarts.init(document.getElementById('heatmapChart'));
      heatmapChart.setOption({
        tooltip: {
          position: 'top',
          formatter: params => `${params.value[0]}: ${params.value[1]} Articles`
        },
        visualMap: {
          min: 0,
          max: Math.max(...dailyCount.map(item => item[1])),
          calculable: true,
          orient: 'horizontal', // Horizontal layout
          right: '5%',           // Move to right side
          bottom: '5%',          // Move to bottom
          inRange: { color: ['#FFEFD5', '#FFA07A', '#FF4500'] }
        },
        calendar: {
          top: '20%',
          left: 'center',
          range: new Date().getFullYear(),
          cellSize: 12.5, // Square cells
          splitLine: { lineStyle: { color: '#E0E0E0', width: 1 } },
          itemStyle: { borderWidth: 1, borderColor: '#E0E0E0' },
          dayLabel: { firstDay: 1, fontSize: 12, color: '#333', show: false },
          monthLabel: { fontSize: 12, color: '#555' }
        },
        series: [
          {
            type: 'heatmap',
            coordinateSystem: 'calendar',
            data: dailyCount
          }
        ]
      });

      // Monthly Article Statistics - Line and Area Chart
      const monthlyChart = echarts.init(document.getElementById('monthlyChart'));
      monthlyChart.setOption({
        xAxis: {
          type: 'category',
          data: Object.keys(monthlyCount),
          axisLabel: { fontSize: 12 }
        },
        yAxis: {
          type: 'value',
          splitLine: { lineStyle: { type: 'dashed', color: '#ccc' } }
        },
        series: [{
          name: 'Articles',
          type: 'line',
          data: Object.values(monthlyCount),
          smooth: true,
          lineStyle: { color: '#5470C6', width: 2 },
          itemStyle: { color: '#5470C6' },
          areaStyle: { color: 'rgba(84, 112, 198, 0.4)' },
          animationDuration: 1000
        }]
      });

      // Tag Statistics
      const tagsChart = echarts.init(document.getElementById('tagsChart'));
      tagsChart.setOption({
        tooltip: { trigger: 'item', formatter: '{b}: {c} ({d}%)' },
        series: [{
          type: 'pie',
          radius: '60%',
          data: topTags.map(tag => ({ name: tag.name, value: tag.count })),
          label: {
            position: 'outside',
            formatter: '{b}\n{c} ({d}%)',
            fontSize: 12
          },
          color: ['#5470C6', '#91CC75', '#FAC858', '#EE6666', '#73C0DE', '#3BA272', '#FC8452', '#9A60B4'],
          animationDuration: 1000
        }],
        legend: {
          bottom: '0',
          left: 'center',
          data: topTags.map(tag => tag.name),
          textStyle: { fontSize: 12 }
        }
      });

      // Category Statistics - Horizontal Bar Chart
      const categoriesChart = echarts.init(document.getElementById('categoriesChart'));
      categoriesChart.setOption({
        xAxis: {
          type: 'value',
          splitLine: { lineStyle: { type: 'dashed', color: '#ccc' } }
        },
        yAxis: {
          type: 'category',
          data: topCategories.map(category => category.name).reverse(),
          axisLabel: { fontSize: 12 }
        },
        series: [{
          name: 'Category Count',
          type: 'bar',
          data: topCategories.map(category => category.count).reverse(),
          label: {
            show: true,
            position: 'right',
            fontSize: 12
          },
          itemStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
              { offset: 0, color: '#91CC75' },
              { offset: 1, color: '#73C0DE' }
            ])
          },
          animationDuration: 1000
        }]
      });
    })
    .catch(error => console.error('Error fetching stats data:', error));
</script>
