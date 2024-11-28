var qexo_talks = [];
var talk_page = 1;
var qexoFormatTime = function () {
  var format = arguments[0] !== void 0 ? arguments[0] : "";
  var num = arguments[1] !== void 0 ? arguments[1] : new Date().getTime();
  format = format || "YYYY-mm-dd HH:MM:SS";
  var ret, date, renum;
  if (num.toString().length == 10) {
    date = new Date(parseInt(num) * 1000);
  } else {
    date = new Date(parseInt(num));
  }
  var opt = {
    Y: date.getFullYear().toString(),
    m: (date.getMonth() + 1).toString(),
    d: date.getDate().toString(),
    H: date.getHours().toString(),
    M: date.getMinutes().toString(),
    S: date.getSeconds().toString(),
  };
  for (var k in opt) {
    ret = new RegExp("(" + k + "+)").exec(format);
    if (ret) {
      renum = ret[1].length == 1 ? opt[k] : opt[k].padStart(ret[1].length, "0");
      format = format.replace(ret[1], renum);
    }
  }
  return format;
};

function likeQexoTalk(id, url, domid, limit) {
  var uri = url + "/pub/like_talk/";
  var ajax;
  try {
    ajax = new XMLHttpRequest();
  } catch (e) {
    try {
      ajax = new ActiveXObject("Msxml2.XMLHTTP");
    } catch (e) {
      try {
        ajax = new ActiveXObject("Microsoft.XMLHTTP");
      } catch (e) {
        alert("糟糕,你的浏览器不能上传文件!");
        return false;
      }
    }
  }
  ajax.open("post", uri, true);
  ajax.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  ajax.onreadystatechange = function () {
    if (ajax.readyState == 4) {
      if (ajax.status == 200) {
        var res = JSON.parse(ajax.response);
        if (res["status"]) {
          for (var i = 0; i < qexo_talks.length; i++) {
            if (qexo_talks[i]["id"] == id) {
              if (res["action"]) {
                qexo_talks[i]["like"]++;
                qexo_talks[i]["liked"] = true;
              } else {
                qexo_talks[i]["like"]--;
                qexo_talks[i]["liked"] = false;
              }
              var html = '<div class="qexot-list">';
              for (var i = 0; i < qexo_talks.length; i++) {
                html += generateQexoTalkItem(
                  qexo_talks[i]["id"],
                  qexo_talks[i]["content"],
                  qexoFormatTime(
                    "YYYY-mm-dd HH:MM:SS",
                    Number(qexo_talks[i]["time"])
                  ),
                  qexo_talks[i]["tags"].join(", "),
                  qexo_talks[i]["like"],
                  qexo_talks[i]["liked"],
                  url,
                  domid,
                  limit
                );
              }
              html += "</div>";
              if (document.getElementById("qexot-more")) {
                html +=
                  '<center id="qexot-more"><div class="qexot-more" onclick="showQexoTalks(\'' +
                  domid +
                  "','" +
                  url +
                  "','" +
                  limit +
                  "',true)\">加载更多</div></center>";
              }
              document.getElementById(domid).innerHTML = html;
              break;
            }
          }
        } else {
          console.log(res["data"]["msg"]);
        }
      } else {
        console.log("点赞失败! 网络错误");
      }
    }
  };
  ajax.send("id=" + id);
}

function generateQexoTalkItem(
  id,
  content,
  time,
  tags,
  _like,
  liked,
  url,
  domid,
  limit
) {
  tags = tags ? "#" + tags : "";
  var like = liked
    ? '<a class="qexot-like item" onclick="likeQexoTalk(\'' +
      id +
      "', '" +
      url +
      "', '" +
      domid +
      "', '" +
      limit +
      '\')"><svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" fill="red">\n    <path transform="scale(0.03,0.03)"\n      d="M0 190.9V185.1C0 115.2 50.52 55.58 119.4 44.1C164.1 36.51 211.4 51.37 244 84.02L256 96L267.1 84.02C300.6 51.37 347 36.51 392.6 44.1C461.5 55.58 512 115.2 512 185.1V190.9C512 232.4 494.8 272.1 464.4 300.4L283.7 469.1C276.2 476.1 266.3 480 256 480C245.7 480 235.8 476.1 228.3 469.1L47.59 300.4C17.23 272.1 .0003 232.4 .0003 190.9L0 190.9z"\n    /></svg> ' +
      _like +
      "</a>"
    : '<a class="qexot-like item" onclick="likeQexoTalk(\'' +
      id +
      "', '" +
      url +
      "', '" +
      domid +
      "', '" +
      limit +
      '\')">\n    <svg xmlns="http://www.w3.org/2000/svg" height="16" width="16">\n    <path\n      transform="scale(0.03,0.03)"\n      d="M244 84L255.1 96L267.1 84.02C300.6 51.37 347 36.51 392.6 44.1C461.5 55.58 512 115.2 512 185.1V190.9C512 232.4 494.8 272.1 464.4 300.4L283.7 469.1C276.2 476.1 266.3 480 256 480C245.7 480 235.8 476.1 228.3 469.1L47.59 300.4C17.23 272.1 0 232.4 0 190.9V185.1C0 115.2 50.52 55.58 119.4 44.1C164.1 36.51 211.4 51.37 244 84C243.1 84 244 84.01 244 84L244 84zM255.1 163.9L210.1 117.1C188.4 96.28 157.6 86.4 127.3 91.44C81.55 99.07 48 138.7 48 185.1V190.9C48 219.1 59.71 246.1 80.34 265.3L256 429.3L431.7 265.3C452.3 246.1 464 219.1 464 190.9V185.1C464 138.7 430.4 99.07 384.7 91.44C354.4 86.4 323.6 96.28 301.9 117.1L255.1 163.9z"\n    ></path></svg> ' +
      _like +
      "</a>";
  var html =
    '<div class="timenode">\n  <div class="header"><time class="qexot-datatime" datetime="' +
    time +
    '">' +
    time +
    '</time>\n        </div>\n  <div class="body">\n    ' +
    content +
    '\n   <div class="footer">\n <div class="flex left"><a class="qexot-tags">' +
    tags +
    "&nbsp;&nbsp;</a>\n  </div>" +
    '<div class="flex right">' +
    like +
    "</div></div></div></div>";
  return html;
}

function showQexoTalks(id, url) {
  var limit = arguments[2] !== void 0 ? arguments[2] : 5;
  var more = arguments[3] !== void 0 ? arguments[3] : false;
  if (more) {
    document.getElementById("qexot-more").innerHTML = "";
  } else {
    document.getElementById(id).innerHTML =
      '<div class="qexo_loading"><div class="qexo_part"><div style="display: flex; justify-content: center"><div class="qexo_loader"><div class="qexo_inner one"></div><div class="qexo_inner two"></div><div class="qexo_inner three"></div></div></div></div><p style="text-align: center; display: block">说说加载中...</p></div>';
  }
  var uri = url + "/pub/talks/?page=" + talk_page + "&limit=" + limit;
  var ajax;
  try {
    ajax = new XMLHttpRequest();
  } catch (e) {
    try {
      ajax = new ActiveXObject("Msxml2.XMLHTTP");
    } catch (e) {
      try {
        ajax = new ActiveXObject("Microsoft.XMLHTTP");
      } catch (e) {
        alert("糟糕,你的浏览器不能上传文件!");
        return false;
      }
    }
  }
  ajax.open("get", uri, true);
  ajax.setRequestHeader("Content-Type", "text/plain");
  ajax.onreadystatechange = function () {
    if (ajax.readyState == 4) {
      if (ajax.status == 200) {
        var res = JSON.parse(ajax.response);
        if (res["status"]) {
          qexo_talks = qexo_talks.concat(res["data"]);
          var html = '<div class="qexot-list">';
          for (var i = 0; i < qexo_talks.length; i++) {
            html += generateQexoTalkItem(
              qexo_talks[i]["id"],
              qexo_talks[i]["content"],
              qexoFormatTime(
                "YYYY-mm-dd HH:MM:SS",
                Number(qexo_talks[i]["time"])
              ),
              qexo_talks[i]["tags"].join(", "),
              qexo_talks[i]["like"],
              qexo_talks[i]["liked"],
              url,
              id,
              limit
            );
          }
          html += "</div>";
          if (res["count"] > qexo_talks.length) {
            html +=
              '<center id="qexot-more"><div class="qexot-more" onclick="showQexoTalks(\'' +
              id +
              "','" +
              url +
              "','" +
              limit +
              "',true)\">加载更多</div></center>";
          }
          document.getElementById(id).innerHTML = html;
          talk_page++;
        } else {
          console.log(res["data"]["msg"]);
        }
      } else {
        console.log("说说获取失败! 网络错误");
      }
    }
  };
  ajax.send(null);
}
