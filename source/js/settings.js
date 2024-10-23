const umami = {
  "src": "https://umami.codepzj.cn/script.js",
  "data-website-id": "e6fdc7c7-3ad4-446e-9606-135abe5cc035"
}
const domian = window.location.hostname
const umamiText = document.getElementById('umami')
document.addEventListener("DOMContentLoaded", function () {
  
  let umamiStatus = window.localStorage.getItem("umamiStatus")
  if (domian === "blog.codepzj.cn"){
    if (umamiStatus === null) {
      enableUmami()
    } else if (umamiStatus === 'true') {
      enableUmami()
      
    } else {
      disableUmami()
    }
  }else{
    if(document.querySelector(`script[src="${umami.src}"]`)){
      disableUmami()
    }
  }

})
function enableUmami() {
  let script = document.createElement("script")
  script.setAttribute("src", umami["src"])
  script.setAttribute("data-website-id", umami["data-website-id"])
  script.defer = true
  document.body.appendChild(script)
  updateUmamiStorage(true)
  umamiText.innerText = "已启用"
}
function disableUmami() {
  document.querySelector(`script[src="${umami.src}"]`).remove()
  updateUmamiStorage(false)
  umamiText.innerText = "已禁用"
}
function updateUmamiStorage(enable) {
  if(domian !== "blog.codepzj.cn"){
    hud.toast("非博客页面，无法修改Umami统计状态")
    throw new Error("非博客页面，无法修改Umami统计状态")
  }
  window.localStorage.setItem("umamiStatus", enable)
  umamiText.innerText = enable ? "已启用" : "已禁用"
}
function toggleUmamiStatus() {
  if (window.localStorage.getItem("umamiStatus") === 'true') {
    disableUmami()
    hud.toast("已禁用Umami统计")
  } else {
    enableUmami()
    hud.toast("已启用Umami统计")
  }
}