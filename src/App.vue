<script setup lang="ts">
  import { onLaunch, onShow, onHide } from "@dcloudio/uni-app"
  onLaunch(() => {
    console.log("App onLaunch")
  })
  onShow(() => {
    console.log("App Show")
  })
  onHide(() => {
    console.log("App Hide")
  })
  console.log(import.meta.env)
</script>
<style lang="scss">
  @import "./static/css/mixin.scss";
  view,
  scroll-view {
    box-sizing: border-box;
  }
  /*每个页面公共css */
  page {
    box-sizing: border-box;
    font-size: $uni-font-size-base;
    // padding: 0 12px;
    background: $uni-bg-color;
    // #ifdef MP-WEIXIN
    width: calc(100%);
    height: calc(100%);
    // #endif
  }
</style>
