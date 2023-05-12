# 项目技术栈

uniapp ： vue3 + ts + vite + pinia + sass

#### 克隆

1. git clone git@gitee.com:He_5460/uni-app-template.git

#### 启动教程

1.  npm run install/yarn
2.  npm run dev:h5/yarn dev:h5
3.  其他启动命令查看 package.json 文件

其他插件：

- uni_ui:官方提供的简易 ui 库

# git 提交规范 [相关文章](https://juejin.cn/post/6844903606815064077)

- type: commit 的类型
- feat: 新特性
- fix: 修改问题
- refactor: 代码重构
- docs: 文档修改
- style: 代码格式修改, 注意不是 css 修改
- test: 测试用例修改
- chore: 其他修改, 比如构建流程, 依赖管理.
- scope: commit 影响的范围, 比如: route, component, utils, build...
- subject: commit 的概述, 建议符合 [50/72 formatting](https://link.juejin.cn/?target=https%3A%2F%2Flink.zhihu.com%2F%3Ftarget%3Dhttps%253A%2F%2Fstackoverflow.com%2Fquestions%2F2290016%2Fgit-commit-messages-50-72-formatting)
- body: commit 具体修改内容, 可以分为多行, 建议符合 [50/72 formatting](https://link.juejin.cn/?target=https%3A%2F%2Flink.zhihu.com%2F%3Ftarget%3Dhttps%253A%2F%2Fstackoverflow.com%2Fquestions%2F2290016%2Fgit-commit-messages-50-72-formatting)
- footer: 一些备注, 通常是 BREAKING CHANGE 或修复的 bug 的链接.

# 环境变量

不同环境的请求接口放在项目根目录的 config 下，会根据不同的打包命令使用不同的接口，详细命令看 package.json
development 开发调试
test 为外网测试
production 为正式环境

# 组件

- up-files 二次封装 上传文件 组件，统一处理 图片上传

# 项目结构

```bash
├─.env.test                 # 环境变量
├─.env.development
├─.env.production
├─.gitignore
├─index.html
├─package-lock.json
├─package.json
├─README.md
├─tsconfig.json             # ts配置
├─vite.config.ts            # vite配置
├─src
| ├─App.vue
| ├─env.d.ts
| ├─main.ts
| ├─manifest.json
| ├─pages.json
| ├─shime-uni.d.ts
| ├─uni.scss
| ├─api
| | ├─interface
| | | └─index.ts
| | ├─modules
| | | └─index.ts
| | └─index.ts
| ├─components              # 组件    ui组件放在base下面 业务组件放在components下
| | └─up-files
| |   └─up-files.vue
| ├─config                  # 配置文件
| ├─enums                   # 元组文件hooks
| ├─hooks                   # 全局hooks
| | └─index.ts
| ├─pages                   # 路由页面
| | ├─apply
| | | ├─hooks.ts
| | | └─index.vue
| | ├─bill
| | | ├─hooks.ts
| | | └─index.vue
| | ├─home
| | | ├─hooks.ts
| | | └─index.vue
| | └─my
| |   ├─hooks.ts
| |   └─index.vue
| ├─static                  # 静态文件管理
| | ├─css                   # css/scss文件
| | ├─image                 # 图片
| | └─logo.png
| ├─store                   # 数据管理
| | ├─interface
| | | └─indexx.ts
| | └─indexx.ts
| └─types                   # 全局ts类型
|   └─index.ts
└───utils                   # 工具存放
    └─index.ts
```

# 修改组件样式

```css
.home {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  ::v-deep .uni-navbar {
    width: 100vw;
  }
}
```

# 编写组件

方式一 template 模式

```ts
<script setup lang="ts">
import { computed, watch } from "vue";
const props = defineProps({
  title: { type: String, default: "Vue" },
  likes: { type: Number, default: 1 },
});
const newTile = computed(() => "hello" + props.title);
watch(
  () => props.likes,
  (newValue) => {
    console.log(newValue);
  }
);
</script>
<template>
  <view>
    <text>
      {{ newTile }}
    </text>
  </view>
</template>
```

方式二 render 模式（小程序不支持）

```ts
<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  props: {
    title: {
      type: String,
      default: "vue",
    },
  },
  setup(props) {
    // return <view>1111</view>;
  },
});
</script>
```

# 注册组件（easycom 模式）

[文档](https://uniapp.dcloud.io/collocation/pages.html#easycom)

- 第一步在 src/components/组件名/组件名.vue 的方式编写组件

# style 标签中使用 js 变量

```js
<script setup>
const theme = {
  color: "red";
}
</script >
  /* or */
<script >
export default {
  data() {
    return {
      color: 'red'
    }
  }
}
</script >
```

```css
page {
  color: v-bind(color);
  /* or */
  color: v-bind("theme.color");
}
```
