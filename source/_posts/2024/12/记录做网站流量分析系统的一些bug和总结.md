---
title: 记录做网站流量分析系统的一些bug和总结
tags: [gin, vue, tailwindcss, mysql, docker, nginx]
categories: [项目分析]
permalink: posts/44.html
excerpt: "网站流量分析系统，是我模仿umami做的一个练手的项目,可获取用户的访问来源，访问次数，访问延时，ip 定位等等"
poster:
  topic: null
  headline: 记录做网站流量分析系统的一些bug和总结
  caption: null
  color: null
date: 2024-12-24 12:35:32
updated: 2024-12-24 12:35:32
topic:
cover: https://cdn.codepzj.cn/image/202412241258165.png
references:
---

## 前言

网站流量分析系统，是我模仿`umami`做的一个练手的项目，实现的功能非常有限，但是勉强能用。它的本质是往一个网站添加一个 script 脚本，向远程服务器发送请求，获取用户的访问来源，访问次数，访问延时，ip 定位等等。功能在持续开发中...

效果大概长这样：
![网站流量分析系统效果1](https://cdn.codepzj.cn/image/202412241305835.png)

![网站流量分析系统效果2](https://cdn.codepzj.cn/image/202412241258165.png)

![网站流量分析系统效果3](https://cdn.codepzj.cn/image/202412241309797.png)

## 项目中的 bug 和解决方案（持续更新中）

### golang 中的 switch case

switch case 中 case 匹配多个值

❌ 错误写法

```go
switch tm.Type {
case "pageview" || "pageStayTime":
    return global.LS_DB.Create(&tm).Error
}
```

✔ 正确写法

```go
switch tm.Type {
case "pageview", "pageStayTime":
    return global.LS_DB.Create(&tm).Error
}
```

### 动态显示侧边栏和导航栏

网上教程：错误的

```js
{
    path: "/login",
    name: "Login",
    component: Login,
    meta: {
      NotSidebar: true, // 登录页面不显示侧边栏
      NotNavbar: true, // 登录页面不显示导航栏
    },
  },
  {
    path: "/register",
    name: "Register",
    component: Register,
    meta: {
      NotSidebar: true, // 登录页面不显示侧边栏
      NotNavbar: true, // 登录页面不显示导航栏
    },
  },
```

![image-20241219082415713](https://cdn.codepzj.cn/image/202412190824589.png)

![image-20241219082444811](https://cdn.codepzj.cn/image/202412190824873.png)

做法是错误的，只是依靠`$route`的响应式将子组件取消挂载，虽然用了`v-if`,实际上还是调用了子组件的钩子函数，只是挂载完之后，`$route`获取到的 meta 变了，子组件又被注销了。子组件是侧边栏，需要从后端调取动态路由，退出登录就会触发无限跳转登录页的错误，在登录页无法跳转到注册页。

正确做法是在在父组件使用 watch 来监听路由的变化，因为路由变化一般在父组件挂载完成之后，所以在父组件使用 v-if 判断是否需要渲染子组件。

```html
<template>
  <n-config-provider>
    <n-message-provider>
      <div class="px-4">
        <n-layout>
          <n-layout-header><Navbar v-if="showNavBar"></Navbar></n-layout-header>
          <n-layout-content content-style="padding: 24px;">
            <div v-if="showSideBar">
              <n-space vertical>
                <n-layout has-sider>
                  <n-layout-sider
                    bordered
                    collapse-mode="width"
                    :collapsed-width="64"
                    :collapsed="collapsed"
                    :width="240"
                    show-trigger
                    @collapse="collapsed = true"
                    @expand="collapsed = false"
                  >
                    <Sidebar></Sidebar>
                  </n-layout-sider>
                  <n-layout class="ml-8">
                    <router-view></router-view>
                  </n-layout>
                </n-layout>
              </n-space>
            </div>

            <div class="w-full" v-else>
              <router-view></router-view>
            </div>
          </n-layout-content>
          <n-layout-footer class="fixed bottom-0 left-0">
            <span class="px-8"
              ><strong>本站是开源项目Logsphere的演示站</strong>
            </span>
          </n-layout-footer>
        </n-layout>
      </div>
    </n-message-provider>
  </n-config-provider>
</template>
<script setup>
  import Navbar from "@/components/Navbar.vue";
  import Sidebar from "@/components/Sidebar.vue";
  import { watch, onMounted } from "vue";
  import { useRoute } from "vue-router";

  const route = useRoute();

  const NavName = ["Register", "Login"];
  const SideName = ["Register", "Login", "Profile"];
  const showNavBar = ref(false);
  const showSideBar = ref(false);
  const collapsed = ref(false);

  const screenWidth = ref(window.innerWidth);

  const handleResize = () => {
    screenWidth.value = window.innerWidth;
  };

  onMounted(() => {
    window.addEventListener("resize", handleResize);
  });

  watch(
    () => route.name,
    (name) => {
      const isRL = NavName.includes(name);
      const isRR = SideName.includes(name);
      showNavBar.value = !isRL;
      showSideBar.value = !isRR;
    }
  );

  watch(
    screenWidth,
    (width) => {
      collapsed.value = width < 768;
    },
    {
      immediate: true,
    }
  );
</script>
<style lang="scss">
  @use "styles/main.scss" as *;
</style>
```

### nginx 添加跨域请求

```nginx
add_header 'Access-Control-Allow-Origin' $http_origin;
add_header 'Access-Control-Allow-Methods' 'GET, POST, PUT, DELETE, OPTIONS';
add_header 'Access-Control-Allow-Headers' 'Content-Type, Authorization, X-Requested-With';
add_header Access-Control-Allow-Credentials true always;
if ($request_method = 'OPTIONS' ) {
  return 204;
}
```

### 导航栏多端数据不同步问题

得每次加载页面从后端重新获取用户信息数据，存到 pinia 中

{% box %}
功能持续开发中，bug 肯定也很多，解决方案也会实时更新，走一步看一步吧
{% endbox %}
