"use strict";

// 在 <body> 开始处插入加载动画
hexo.extend.injector.register("body_start", function () {
  return `
    <div class="spinner" id="eloading">
      <!-- 加载提示文字 -->
      <span class="loader-text">加载中...</span>
      <!-- 加载进度条 -->
      <div class="loader"></div>
      <!-- 手动关闭加载提示 -->
      <span class="loader-text-below" onclick="document.getElementById('eloading').style.display='none'">
        不想等待可以点我关掉
      </span>
    </div>
  `;
});
