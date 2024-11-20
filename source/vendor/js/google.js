// 异步加载 Google Analytics 脚本
(function () {
  const script = document.createElement('script');
  script.async = true;
  script.src = 'https://www.googletagmanager.com/gtag/js?id=G-2X1EZ99HL9';
  document.head.appendChild(script);

  script.onload = () => {
    // 初始化数据层
    window.dataLayer = window.dataLayer || [];
    function gtag() { dataLayer.push(arguments); }

    // 初始化 gtag.js
    gtag('js', new Date());

    // 配置 Google Analytics
    gtag('config', 'G-2X1EZ99HL9', {
      // 启用 IP 匿名化
      'anonymize_ip': true,

      // 使用第一方 Cookie
      'cookie_flags': 'SameSite=None;Secure',

      // 避免跨域 Cookie 使用
      'allow_google_signals': false,
    });
  };

  script.onerror = () => {
    console.error('Failed to load Google Analytics script.');
  };
})();
