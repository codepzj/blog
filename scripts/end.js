"use strict";

// code block copy
hexo.extend.injector.register("head_end", function () {
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
        transition: 0.5s ease-in-out;
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
        color: var(--text-p1);
      }

      .loader-text-below {
        display: block;
        position: absolute;
        top: 55%;
        left: 50%;
        transform: translate(-50%, -50%);
        color: var(--text-p1);
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
    <script src="/vendor/js/load.js"></script>
  `;
});
