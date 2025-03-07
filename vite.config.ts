import { defineConfig, loadEnv } from "vite";
import uni from "@dcloudio/vite-plugin-uni";
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [uni()],
  resolve: {
    alias: [{ find: "@", replacement: "./src" }]
  },
  css: {
    preprocessorOptions: {
      scss: {}
    }
  },
  // 代理
  server: {
    port: 8080,
    // https: true,
    //disabledHostCheck:true,
    proxy: {
      "/base": {
        target: loadEnv("development", "./").VITE_APP_BASE_URL,
        changeOrigin: true,
        rewrite: path => path.replace(/^\/base/, "/base")
      }
    }
  }
});
