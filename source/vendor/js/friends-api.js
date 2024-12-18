function qexo_friend_api(id, url, reCaptcha = "") {
  qexo_url = url;
  Qexo_reCaptcha_Key = reCaptcha;
  var loadStyle =
    '<div class="qexo_loading"><div class="qexo_part"><div style="display: flex; justify-content: center"><div class="qexo_loader"><div class="qexo_inner one"></div><div class="qexo_inner two"></div><div class="qexo_inner three"></div></div></div></div><p style="text-align: center;">友链申请加载中...</p></div>';
  document.getElementById(id).className = "friend-api";
  document.getElementById(id).innerHTML = loadStyle;
  document.getElementById(id).innerHTML =
    '<center><p>请填写友链信息并提交申请</p><div class="friend-api"><style>input.qexo-friend-input {flex: 1; width: 95%; padding: 0.625rem; margin: 0.5rem 0; border-radius: 0.375rem; color: var(--text-p1); border: 1px solid rgba(0, 0, 0, 0.1);}</style><input type="text" id="qexo_friend_name" class="qexo-friend-input" placeholder="网站名" required><br><input type="text" id="qexo_friend_brief" class="qexo-friend-input" placeholder="网站简介" required><br><input type="url" id="qexo_friend_website" class="qexo-friend-input" placeholder="网址" required><br><input type="url" id="qexo_friend_logo" class="qexo-friend-input" placeholder="头像" required><br><button type="button" class="qexo-friend-button" id="qexo-friend-btn" onclick="friend_api()" style="background-color: #007bff; color: white; border: none; padding: 0.5rem 1rem; border-radius: 0.375rem; cursor: pointer; margin-top: 1em;">申请</button></div></center><br>';
}

async function friend_api() {
  const btn = document.getElementById("qexo-friend-btn");
  btn.innerHTML = "提交中...";
  btn.disabled = true; // 禁用按钮防止重复提交

  const name = document.getElementById("qexo_friend_name").value.trim();
  const introduction = document
    .getElementById("qexo_friend_brief")
    .value.trim();
  const website = document.getElementById("qexo_friend_website").value.trim();
  const logo = document.getElementById("qexo_friend_logo").value.trim();

  // 验证输入
  const validationError = validateInputs(name, website, logo);
  if (validationError) {
    showError(btn, validationError);
    return;
  }

  const body = {
    name,
    url: website,
    image: logo,
    description: introduction,
  };

  const uri = `${qexo_url}/pub/ask_friend/`;
  const data = new URLSearchParams(body).toString();

  fetch(uri, {
    method: "POST",
    body: data,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  })
    .then((response) => {
      if (response.ok) {
        response.json().then((res) => {
          handleResponse(btn, res);
        });
      } else {
        showError(btn, "网络异常！");
      }
    })
    .catch(() => {
      showError(btn, "请求失败，请稍后重试");
    });
}

function validateInputs(name, website, logo) {
  if (!name) return "网站名不能为空";
  const urlPattern = /^(https?:\/\/[^\s/$.?#].[^\s]*)$/i; // URL 正则表达式
  if (!urlPattern.test(website)) return "请填写有效的网址";
  if (!urlPattern.test(logo)) return "请填写有效的头像网址";
  return null; // 没有错误
}

function showError(btn, message) {
  btn.style.backgroundColor = "#f5365c";
  btn.innerHTML = message;
  btn.disabled = false; // 重新启用按钮
}

function handleResponse(btn, res) {
  btn.style.backgroundColor = res.status ? "#2dce89" : "#f5365c";
  btn.innerHTML = res.status
    ? "提交成功，请等待确认！"
    : "申请失败: " + res.msg;

  if (res.status) {
    // 清空输入框
    document.getElementById("qexo_friend_name").value = "";
    document.getElementById("qexo_friend_brief").value = "";
    document.getElementById("qexo_friend_website").value = "";
    document.getElementById("qexo_friend_logo").value = "";

    btn.disabled = true; // 提交成功后禁用按钮
  } else {
    btn.disabled = false; // 重新启用按钮
  }
}
