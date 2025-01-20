---
title: hexo博客接入免费GPT
tags: [chatgpt, hexo]
categories: [技术分享]
permalink: posts/12.html
excerpt: 本文讲述了作者在hexo博客中接入GPT的过程。
poster:
  topic: null
  headline: hexo博客接入免费GPT
  caption: null
  color: null
date: 2024-10-01 20:41:09
updated: 2024-10-01 20:41:09
topic:
references:
---

一直想要在 hexo 博客中接入 GPT，以此生成文章摘要，结果 bing 搜索发现这些 gpt 接入服务都需要付费，比如很多站点都在使用的 **TianLiGPT**

{% link https://docs_s.tianli0.top/ TianLiGPT icon:https://docs_s.tianli0.top/img/logo.png %}

明码标价写着**PostChat 会员享无限摘要额度，18 元/月，128 元/年**

但是这对于我来说，实在是太贵了，128 块钱我都能每年租一台配置为 2 核 2G4M 带宽的服务器了 {% emoji blobcat blobcatdead %}

所以重点来了，我决定**用 TianLiGPT 的模板，重写这个 gpt 接口，实现 gpt 生成文章摘要自由！**

### 第一步、修改主题配置文件

首先，来到主题配置文件：`_config.stellar.yml`

直接在最后插入以下代码:

```yml
plugins: _config.stellar.yml
  ...
  tianli_gpt:
    enable: true
    js: /js/chatgpt.js
    field: post
    interface:
      name: 文章摘要
      introduce: "我是文章辅助AI，点击下方的按钮，让我生成本文简介"
      version: OpenAI
      button: ["介绍自己", "生成摘要"]
```

### 第二步、注入自定义 GPT 的 js 文件

然后在`themes/stellar/source/js`下新建`chatgpt.js`文件，写入

```js
function ChucklePostAI(config) {
  // 获取要插入 AI 的文章容器
  function getArticleContainer() {
    let container = null;
    if (!config.auto_mount && config.el) {
      container = document.querySelector(
        config.el || "#post #article-container"
      );
    }
    return container || findLargestContentElement();
  }

  // 计算一个元素的子元素的数量
  function countChildElements(element) {
    let count = 1;
    Array.from(element.children).forEach((child) => {
      count += countChildElements(child);
    });
    return count;
  }

  // 检查一个元素是否应被排除（如 iframe、footer 等）
  function shouldExcludeElement(element) {
    const tagBlacklist = ["IFRAME", "FOOTER", "HEADER", "BLOCKQUOTE"];
    const classBlacklist = ["aplayer", "comment"];
    return (
      tagBlacklist.includes(element.tagName) ||
      Array.from(element.classList).some((className) =>
        classBlacklist.some((cls) => className.includes(cls))
      )
    );
  }

  // 查找内容最多的 DOM 元素
  function findLargestContentElement() {
    const rootElement = findRootElement();
    return findLargestElementInTree(rootElement);
  }

  // 查找内容最多的根元素
  function findRootElement() {
    const elementsToCheck = [document.body];
    let rootElement = null;
    let maxCount = 0;

    while (elementsToCheck.length > 0) {
      const element = elementsToCheck.shift();
      if (shouldExcludeElement(element)) continue;

      const childCount = countChildElements(element);
      if (childCount > maxCount) {
        maxCount = childCount;
        rootElement = element;
      }

      Array.from(element.children).forEach((child) => {
        elementsToCheck.push(child);
      });
    }
    return rootElement;
  }

  // 查找最大的 DOM 元素
  function findLargestElementInTree(rootElement) {
    const weightMap = { H1: 1.5, H2: 1, H3: 0.5, P: 1 };
    let maxWeight = 0;
    let largestElement = null;

    function calculateWeight(element) {
      if (shouldExcludeElement(element)) return;
      let elementWeight = Array.from(element.children).reduce(
        (weight, child) => {
          return weight + (weightMap[child.tagName] || 0);
        },
        0
      );

      if (elementWeight > maxWeight) {
        maxWeight = elementWeight;
        largestElement = element;
      }

      Array.from(element.children).forEach(calculateWeight);
    }

    calculateWeight(rootElement);
    return largestElement;
  }

  // 创建并插入 AI 的 UI 元素
  function createAIElement() {
    const aiContainer = document.createElement("div");
    aiContainer.className = "post-ai";
    aiContainer.id = "post-ai";
    aiContainer.style.cssText = `
      margin: 30px 0;
    `;
    const aiInterface = {
      name: "文章辅助AI",
      introduce: "我是文章辅助AI，点击下方的按钮，让我生成本文简介",
      version: "gpt-3.5-turbo-16k",
      buttons: ["介绍自己", "生成摘要"],
      ...config.interface,
    };

    aiContainer.innerHTML = `
      <div class="ai-title">
        <div class="ai-title-text">${aiInterface.name}</div>
        <div class="ai-Toggle">切换简介</div>
        <div class="ai-speech-box">
          <div class="ai-speech-content"></div>
        </div>
        <div class="ai-tag">${aiInterface.version}</div>
      </div>
      <div class="ai-explanation">${aiInterface.name}初始化中...</div>
      <div class="ai-btn-box">
        ${aiInterface.buttons
          .map((btn) => `<div class="ai-btn-item">${btn}</div>`)
          .join("")}
      </div>
    `;

    bindButtonEvents(aiContainer);

    const articleContainer = getArticleContainer();
    if (articleContainer) {
      articleContainer.insertBefore(aiContainer, articleContainer.firstChild);
    }
    disableButtons(aiContainer); // 禁用按钮
    generateSummary(aiContainer); // 初始化时生成文章摘要
  }

  // 绑定按钮事件
  function bindButtonEvents(aiContainer) {
    const generateIntroductionButton = aiContainer.querySelector(
      ".ai-btn-item:first-child"
    );
    const generateSummaryButton = aiContainer.querySelector(
      ".ai-btn-item:last-child"
    );

    generateIntroductionButton.addEventListener("click", () => {
      disableButtons(aiContainer); // 禁用按钮
      displaySummary(
        "我是文章辅助AI，使用的OpenAI的GPT-3.5-turbo-16k模型。点击下方的按钮，让我生成本文简介。",
        aiContainer
      );
    });

    generateSummaryButton.addEventListener("click", () => {
      disableButtons(aiContainer); // 禁用按钮
      generateSummary(aiContainer); // 将 aiContainer 传递给 generateSummary
    });
  }

  // 禁用所有按钮
  function disableButtons(aiContainer) {
    const buttons = aiContainer.querySelectorAll(".ai-btn-item");
    buttons.forEach((button) => {
      button.disabled = true;
      button.style.pointerEvents = "none"; // 禁用点击事件
      button.style.opacity = "0.5"; // 调整按钮的透明度
    });
  }

  // 启用所有按钮
  function enableButtons(aiContainer) {
    const buttons = aiContainer.querySelectorAll(".ai-btn-item");
    buttons.forEach((button) => {
      button.disabled = false;
      button.style.pointerEvents = "auto"; // 允许点击事件
      button.style.opacity = "1"; // 恢复按钮的透明度
    });
  }

  // 生成文章摘要
  async function generateSummary(aiContainer) {
    const content = getArticleContent();
    const apiKey = "sk-xxxxxx"; // 请替换为你的实际 API KEY
    const requestBody = {
      model: "gpt-3.5-turbo-16k",
      messages: [
        {
          role: "system",
          content:
            "请为下面的内容生成摘要，以本文讲述了开头，不要出现任何与文章无关的内容。",
        },
        { role: "user", content: content },
      ],
      temperature: 0,
    };

    try {
      const response = await fetch("https://free.gpt.ge/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        throw new Error("网络响应不是 OK");
      }

      const data = await response.json();
      displaySummary(data.choices[0].message.content, aiContainer);
      console.log("摘要生成成功:", data.choices[0].message.content);
    } catch (error) {
      console.error("请求失败:", error);
    }
  }

  // 获取文章内容
  function getArticleContent() {
    const articleContainer = getArticleContainer();
    return articleContainer ? articleContainer.innerText : ""; // 获取文章的文本内容
  }

  // 显示生成的摘要（添加打字机效果）
  function displaySummary(summary, aiContainer) {
    const aiSpeechContent = document.querySelector(".ai-explanation");
    if (aiSpeechContent) {
      aiSpeechContent.innerText = ""; // 清空之前的内容
      typeWriterEffect(aiSpeechContent, summary, 15, aiContainer); // 逐字显示摘要
    }
  }

  // 打字机效果
  function typeWriterEffect(element, text, delay, aiContainer) {
    let index = 0;
    function type() {
      if (index < text.length) {
        element.innerText += text.charAt(index);
        index++;
        setTimeout(type, delay);
      } else {
        enableButtons(aiContainer); // 打字效果结束后启用按钮
      }
    }
    type();
  }

  // 初始化函数
  function initialize() {
    createAIElement();
  }

  initialize();
}
```

### 第三步、前往 GitHub 获取公益 ApiKey

{% link https://free.gpt.ge/github FreeGPT公益ApiKey icon:https://github.com/favicon.ico %}

获取了 ApiKey 之后，请填入上方代码的 apiKey 当中，apiKey 请您妥善保管，如果弄丢了，请到该页面重新生成即可

然后现在你就可以愉快的白嫖文章摘要了，美滋滋 {% emoji blobcat ablobcatheart %}
