function changeProgress(state) {
  function updateProgress(loadedResources) {
    progress = Math.round((loadedResources / totalResources) * 100);
    document
      .querySelector(".loader")
      .style.setProperty("--width", progress + "%");
    document.querySelector(".loader-text").textContent = progress + "%";
  }
  switch (state) {
    case "start":
      const resources = document.querySelectorAll("script, link");
      window.totalResources = resources.length;
      window.loadedResources = 0;
      window.progress = 0;
      window.progressBar = document.getElementById("progressBar");

      resources.forEach((resource) => {
        resource.addEventListener("load", () => {
          loadedResources++;
          updateProgress(loadedResources);
        });
      });
      break;
    case "end":
      updateProgress(totalResources);
      document.querySelector(".loader").style.setProperty("--width", "100%");
      document.querySelector(".loader-text").textContent = "ヾ(≧▽≦*)o 完成！";
      setTimeout(() => {
        document.getElementById("eloading").style.display = "none";
      }, 500);
      break;
    default:
      break;
  }
}

document.addEventListener("DOMContentLoaded", function () {
  changeProgress("start");
});

addEventListener("load", function () {
  changeProgress("end");
});
