const umami = {
  "src": "https://umami.codepzj.cn/script.js",
  "data-website-id": "e6fdc7c7-3ad4-446e-9606-135abe5cc035"
}
const domain = window.location.hostname
const umamiText = document.getElementById('umami')
document.addEventListener("DOMContentLoaded", function () {

  let umamiStatus = window.localStorage.getItem("umamiStatus")
  if (domain === "blog.codepzj.cn") {
    if (umamiStatus === null || umamiStatus === 'true') {
      enableUmami()
    } else {
      disableUmami()
    }
  } else {
    disableUmami()
  }

})
function enableUmami() {
  if (!document.querySelector(`script[src="${umami.src}"]`)) {
    let script = document.createElement("script")
    script.setAttribute("src", umami["src"])
    script.setAttribute("data-website-id", umami["data-website-id"])
    script.defer = true
    document.body.appendChild(script)
  }
  updateUmamiStorage(true)
  umamiText.innerText = "已启用"
}

function disableUmami() {
  const umamiScript = document.querySelector(`script[src="${umami.src}"]`)
  if (umamiScript) {
    umamiScript.remove()
  }
  updateUmamiStorage(false)
  umamiText.innerText = "已禁用"
}

function updateUmamiStorage(enable) {
  window.localStorage.setItem("umamiStatus", enable)
  umamiText.innerText = enable ? "已启用" : "已禁用"
}

function toggleUmamiStatus() {
  if (domain !== "blog.codepzj.cn") {
    hud.toast("非博客页面，无法修改Umami统计状态")
    return
  }
  const umamiStatus = window.localStorage.getItem("umamiStatus");
  umamiStatus === 'true' ? disableUmami() : enableUmami();
  hud.toast(umamiStatus === 'true' ? "已禁用Umami统计" : "已启用Umami统计");
}