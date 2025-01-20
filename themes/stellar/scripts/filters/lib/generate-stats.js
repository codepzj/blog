const fs = require('fs');
const path = require('path');
const moment = require('moment');

function generateStats(hexo) {
  const posts = hexo.locals.get('posts');

  const monthlyCount = {};
  const dailyCount = {}; // 新增按天统计
  const tagCount = {};
  const categoryCount = {};

  posts.forEach(post => {
    const month = moment(post.date).format('YYYY-MM');
    const day = moment(post.date).format('YYYY-MM-DD'); // 按天统计
    monthlyCount[month] = (monthlyCount[month] || 0) + 1;
    dailyCount[day] = (dailyCount[day] || 0) + 1;

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

  const sortedDailyCount = Object.entries(dailyCount)
    .sort((a, b) => a[0].localeCompare(b[0])) // 按键（即日期）排序
    .map(([date, count]) => [date, count]); // 转换为数组格式，适合热力图

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
    dailyCount: sortedDailyCount, // 添加热力图所需数据
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