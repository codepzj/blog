function changeProgress(state) {
  // 更新进度条
  function updateProgress(loadedResources) {
  progress = Math.round((loadedResources / totalResources) * 100);
  // console.log('加载完成度：',progress,'%')
  // progressBar.value = progress;
  document.querySelector('.loader').style.setProperty('--width', progress + '%');
  document.querySelector('.loader-text').textContent = progress + '%';
}
switch (state) {
   //开启进度条
   case "start":
   //获取页面所有资源
  const resources = document.querySelectorAll('script, link');// 获取图片、脚本和链接资源
  window.totalResources = resources.length; // 获取资源总数
  window.loadedResources = 0;//已加载完成的资源数
  window.progress = 0;// 进度值
  window.progressBar = document.getElementById('progressBar');
  // console.log("resources:",resources)
  
  resources.forEach((resource) => {//遍历元素添加load监听事件
      resource.addEventListener('load', () => {
      loadedResources++;
      // console.log('加载完成的资源数量：',loadedResources)
      //更新进度条
      updateProgress(loadedResources);
      });
  
  });
  break;
//结束进度条
case "end":
  updateProgress(totalResources);
  // document.getElementById("eloading").style.setProperty('min-height', '0');
  document.querySelector('.loader').style.setProperty('--width', '100%');
  document.querySelector('.loader-text').textContent = 'ヾ(≧▽≦*)o 完成！';
  setTimeout(() => {
      document.getElementById("eloading").style.display = "none";
  } , 500);
  break;
default:
  break;
}
}


//dom构建完成
document.addEventListener('DOMContentLoaded', function () {
  console.log("[Loader]dom构建完成")
  // 是否启用加载动画
  loaderdisabled = localStorage.getItem("loader.disabled");
  if (loaderdisabled) {
      document.getElementById("eloading").style.display = "none";
      return
  } else {
      //页面渲染完成
      addEventListener("load", function () {
          console.log('[Loader]页面加载完成');
          changeProgress("end");//结束进度条，
      })
  }
  changeProgress("start");//开启进度条
})
