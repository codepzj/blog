"use strict"

// code block copy
hexo.extend.injector.register("load", function () {
  return `
  <style>
    * {
      margin: 0;
      padding: 0;
    }
    /* From uiverse.io by @satyamchaudharydev */
    .spinner {
      width: 100%;
      min-height: 100vh;
      background-color: var(--site-bg) !important;
    }

    .loader {
      display: block;
      --height-of-loader: 4px;
      --loader-color: #6bb418;
      width: 130px;
      height: var(--height-of-loader);
      border-radius: 30px;
      background-color: rgba(0, 0, 0, 0.2);
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
    .loader-text {
      display: block;
      position: absolute;
      top: 45%;
      left: 50%;
      transform: translate(-50%, -50%);
      color: var(--text-p2);
    }
    .loader-text-below {
      display: block;
      position: absolute;
      top: 55%;
      left: 50%;
      transform: translate(-50%, -50%);
      color: var(--text-p2);
    }
    .loader::before {
      content: "";
      position: absolute;
      background: var(--loader-color);
      top: 0;
      left: 0;
      width: var(--width, 0%);
      height: 100%;
      border-radius: 30px;
      transition: width 0.5s ease-in-out;
    }
  </style>
  <div class="spinner" id="eloading"> 
    <span class="loader-text">加载中...</span>
    <div class="loader"></div>
    <span class="loader-text-below" onclick="document.getElementById('eloading').style.display='none'">不想等待可以点我关掉</span>
  </div>
  `
})