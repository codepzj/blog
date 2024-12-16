document.addEventListener("DOMContentLoaded", function () {
  // 控制台信息
  console.log(
    "%c Theme Stellar Version 1.29.1 浩瀚星河祝您每天开心 %c",
    "color:#fff;background:linear-gradient(90deg,#6a5acd,#87cefa);padding:5px 10px;",
    "color:#000;background:linear-gradient(90deg,#87cefa,#ffffff);padding:5px 10px;"
  );
});

// 代码块折叠
const openText =
  '<span class="bounce"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-double-down" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M1.646 6.646a.5.5 0 0 1 .708 0L8 12.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"/><path fill-rule="evenodd" d="M1.646 2.646a.5.5 0 0 1 .708 0L8 8.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"/></svg></span>';
const closeText =
  '<span class="bounce"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-double-up" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M7.646 2.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1-.708.708L8 3.707 2.354 9.354a.5.5 0 1 1-.708-.708l6-6z"/><path fill-rule="evenodd" d="M7.646 6.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1-.708.708L8 7.707l-5.646 5.647a.5.5 0 0 1-.708-.708l6-6z"/></svg><i class="fa-solid fa-angles-up fa-beat-fade"></i></span>';

const codeElements = document.querySelectorAll(".highlight table");

codeElements.forEach(async (code, index) => {
  let codeCopyOver = null;

  code.id = `CodeBlock${index + 1}`;

  // Check code block height
  if (code.scrollHeight > 500) {
    code.classList.add("code-collapsed");
    const codeCopyDiv = document.createElement("div");
    codeCopyDiv.classList.add("CodeCloseDiv");
    code.after(codeCopyDiv);

    codeCopyOver = document.createElement("button");
    codeCopyOver.classList.add("CodeClose");
    codeCopyOver.innerHTML = openText;
    codeCopyDiv.appendChild(codeCopyOver);

    codeCopyOver.addEventListener("click", () => {
      if (code.classList.contains("code-collapsed")) {
        code.classList.replace("code-collapsed", "code-expanded");
        codeCopyOver.innerHTML = closeText;
      } else {
        code.classList.replace("code-expanded", "code-collapsed");
        codeCopyOver.innerHTML = openText;
      }
    });
  }
});
// 页面载入时间
if (window.PerformanceObserver) {
  const observer = new PerformanceObserver((list) => {
    for (const entry of list.getEntries()) {
      if (entry.entryType === "navigation" && entry.loadEventEnd > 0) {
        document.querySelector(".load-time").innerHTML = `${(
          entry.duration / 1000
        ).toFixed(2)}`;
      }
    }
  });

  observer.observe({ type: "navigation", buffered: true });
}

const domain = window.location.host;
const aiSummaryText = document.getElementById("chatgpt");
const AI_SUMMARY_STATUS_KEY = "aisummaryStatus";

//初始化设置配置
const initSetting = () => {
  const aisummaryStatus = window.localStorage.getItem(AI_SUMMARY_STATUS_KEY);

  if (aisummaryStatus === null)
    window.localStorage.setItem(AI_SUMMARY_STATUS_KEY, false);
  if (aiSummaryText)
    aiSummaryText.innerText = aisummaryStatus === "true" ? "已启用" : "已禁用";
};

// 文章辅助AI
function toggleAISummaryStatus() {
  const aisummaryStatus = window.localStorage.getItem(AI_SUMMARY_STATUS_KEY);
  const newStatus = aisummaryStatus === "true" ? "false" : "true";
  window.localStorage.setItem(AI_SUMMARY_STATUS_KEY, newStatus);
  aiSummaryText.innerText = newStatus === "true" ? "已启用" : "已禁用";
  hud.toast(newStatus === "true" ? "已启用文章辅助AI" : "已禁用文章辅助AI");
}

function cleanCache() {
  localStorage.clear();
  document.cookie = "";
  location.reload();
}

document.addEventListener("DOMContentLoaded", initSetting);