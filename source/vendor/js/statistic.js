function loadStatistic(e) {
  var t = e + "/pub/statistic/";

  function qexoInner(a, b) {
    if (document.getElementById(a)) document.getElementById(a).innerHTML = b;
  }

  function qexoFailed() {
    var j = ["qexo-site-uv", "qexo-site-pv", "qexo-page-pv"];
    for (var i = 0; i < j.length; i++) qexoInner(j[i], "请求失败");
  }

  fetch(t, {
    referrerPolicy: "no-referrer-when-downgrade",
  }).then(
    function (res) {
      if (res.ok) {
        res.json().then(function (e) {
          if (e.status) {
            qexoInner("qexo-site-uv", e.site_uv);
            qexoInner("qexo-site-pv", e.site_pv);
            qexoInner("qexo-page-pv", e.page_pv);
          } else {
            console.log(e.error);
            qexoFailed();
          }
        });
      } else {
        qexoFailed();
      }
    },
    function (ex) {
      console.log("站点统计失败! 网络错误");
      qexoFailed();
    }
  );
}
