const umami = {
  src: "https://umami.codepzj.cn/script.js",
  "data-website-id": "e6fdc7c7-3ad4-446e-9606-135abe5cc035"
};

const domain = window.location.hostname;
const umamiText = document.getElementById("umami");
const aiSummaryText = document.getElementById("chatgpt");
const BLOG_DOMAIN = "blog.codepzj.cn";
const UMAMI_STATUS_KEY = "umamiStatus";
const AI_SUMMARY_STATUS_KEY = "aisummaryStatus";

document.addEventListener("DOMContentLoaded", function () {
  const umamiStatus = window.localStorage.getItem(UMAMI_STATUS_KEY);
  const aisummaryStatus = window.localStorage.getItem(AI_SUMMARY_STATUS_KEY);

  if (domain === BLOG_DOMAIN) {
    if (umamiStatus === null) enableUmami()
  } else {
    disableUmami();
  }
  if (umamiText) umamiText.innerText = (umamiStatus === 'true' ? "已启用" : "已禁用");
  if (aisummaryStatus === null) window.localStorage.setItem(AI_SUMMARY_STATUS_KEY, false);
  if (aiSummaryText) aiSummaryText.innerText = aisummaryStatus === 'true' ? "已启用" : "已禁用";
});

function enableUmami() {
  if (!document.querySelector(`script[src="${umami.src}"]`)) {
    const script = document.createElement("script");
    script.src = umami.src;
    script.setAttribute("data-website-id", umami["data-website-id"]);
    script.defer = true;
    document.body.appendChild(script);
  }
  updateUmamiStorage(true);
}

function disableUmami() {
  const umamiScript = document.querySelector(`script[src="${umami.src}"]`);
  if (umamiScript) umamiScript.remove();
  updateUmamiStorage(false);
}

function updateUmamiStorage(enable) {
  window.localStorage.setItem(UMAMI_STATUS_KEY, enable);
}

function toggleUmamiStatus() {
  if (domain !== BLOG_DOMAIN) {
    hud.toast("非博客页面，无法修改Umami统计状态");
    return;
  }
  const umamiStatus = window.localStorage.getItem(UMAMI_STATUS_KEY);
  if (umamiStatus === 'true') {
    disableUmami()
    umamiText.innerText = "已禁用";
  }
  else {
    enableUmami()
    umamiText.innerText = "已启用";
  }
  hud.toast(umamiStatus === 'true' ? "已禁用Umami统计" : "已启用Umami统计");
}

function toggleAISummaryStatus() {
  const aisummaryStatus = window.localStorage.getItem(AI_SUMMARY_STATUS_KEY);
  const newStatus = aisummaryStatus === 'true' ? 'false' : 'true';
  window.localStorage.setItem(AI_SUMMARY_STATUS_KEY, newStatus);
  aiSummaryText.innerText = newStatus === 'true' ? "已启用" : "已禁用";
  hud.toast(newStatus === 'true' ? "已启用文章辅助AI" : "已禁用文章辅助AI");
}
