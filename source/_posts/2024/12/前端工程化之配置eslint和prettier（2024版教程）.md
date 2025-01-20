---
title: 前端工程化之配置eslint和prettier（2024版教程）
tags: [前端工程化]
categories: [技术分享]
permalink: posts/41.html
excerpt: 如何正确配置eslint和prettier插件，让前端工程化，规范项目开发（2024年教程）
poster:
  topic: null
  headline: 前端工程化之配置eslint和prettier（2024版教程）
  caption: null
  color: null
date: 2024-12-12 13:39:14
updated: 2024-12-12 13:39:14
topic:
banner:
references:
---

在现代前端开发中，代码质量和一致性是至关重要的。为此，ESLint 和 Prettier 成为了开发者的得力助手。本文将介绍如何在 Vue 项目中配置 ESLint 和 Prettier，以确保代码的语法正确性和格式统一性。

## 安装 ESLint

首先，我们需要在项目中安装 ESLint。可以通过以下命令完成：

{% copy pnpm install eslint --save-dev prefix:$ %}

接着，使用 ESLint 的初始化命令生成配置文件：

{% copy npx eslint --init prefix:$ %}

在初始化过程中，您会被询问一系列问题以确定您的项目设置。以下是推荐的回答：

```bash
? How would you like to use ESLint? ...
> To check syntax only ✔
> To check syntax and find problems

? What type of modules does your project use? ...
> JavaScript modules (import/export) ✔
  CommonJS (require/exports)
  None of these

? Which framework does your project use? ...
  React
> Vue.js ✔
  None of these

? Does your project use TypeScript? ...
> No
  Yes

Where does your code run?...
(Press <space>to select,<a>to toggle all,<i>to invert selection)
Browser ✔
Node

√ Would you like to install them now? · No / Yes
? Which package manager do you want to use? ...
  npm
  yarn
> pnpm ✔
  bun
```

在项目根目录下，您会看到一个 `eslint.config.js` 文件。接下来，我们需要对其进行额外的配置，以适应 Vue.js 的开发需求。以下是一个示例配置：

```js
import globals from "globals";
import pluginVue from "eslint-plugin-vue";

/** @type {import('eslint').Linter.Config[]} */
export default [
  { files: ["**/*.{js,mjs,cjs,vue}"] },
  { languageOptions: { globals: globals.browser } },
  ...pluginVue.configs["flat/essential"],
  {
    rules: {
      "vue/multi-word-component-names": "off", // 禁用 vue/multi-word-component-names 规则
    },
  },
];
```

在这个配置中，我们禁用了 `vue/multi-word-component-names` 规则，以允许使用单词组件名称。

## 安装 Prettier

接下来，我们需要安装 Prettier，以确保代码格式的一致性。使用以下命令安装：

{% copy pnpm install --save-dev --save-exact prettier prefix:$ %}

在项目根目录下，创建一个 `.prettierrc.js` 文件，并添加以下配置：

```js
export default {
  printWidth: 80, // 每行代码长度（默认80）
  tabWidth: 2, // 每个tab相当于多少个空格（默认2）
  useTabs: false, // 是否使用tab进行缩进（默认false）
  singleQuote: false, // 使用单引号（默认false）
  semi: true, // 声明结尾使用分号(默认true)
  trailingComma: "es5", // 多行使用拖尾逗号（默认none）
  bracketSpacing: true, // 对象字面量的大括号间使用空格（默认true）
  jsxBracketSameLine: false, // 多行JSX中的>放置在最后一行的结尾，而不是另起一行（默认false）
  arrowParens: "avoid", // 只有一个参数的箭头函数的参数是否带圆括号（默认avoid）
};
```

## 添加脚本

在`package.json`下添加

```json
"scripts": {
  "dev": "vite",
  "build": "vite build",
  "preview": "vite preview",
  "lint": "npx eslint src/ --fix && npx prettier --write src/" // 添加lint脚本
},
```

现在，您可以使用以下命令来检查和格式化您的代码：

{% copy pnpm lint prefix:$ %}

## 效果展示

![eslint和prettier规范化效果1](https://image.codepzj.cn/image/202412121408985.png)

![eslint和prettier规范化效果2](https://image.codepzj.cn/image/202412121408096.png)

## 总结

通过上述步骤，您已经成功在 Vue 项目中配置了 ESLint 和 Prettier。这将帮助您保持代码的高质量和一致性，减少潜在的错误并提升开发效率。随着项目的增长，保持代码风格的一致性将变得尤为重要，因此强烈建议在团队中推广使用 ESLint 和 Prettier。
