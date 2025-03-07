/*
 * @Author: hrh
 * @Date: 2023-03-24 16:24:04
 * @Last Modified by: hrh
 * @Last Modified time: 2023-04-18 18:57:25
 */
import type { ResultData } from "./interface";
import { ResultEnum, RequestEnum } from "@/enums/httpEnum";
/**
 * 根据访问路径和data生成key
 * @param path 路径
 * @param data 请求数据
 */
const createKey = (path: string, data: any) => `${JSON.stringify(data)}${path}`;

//储存request请求map
const requestList: Map<string, UniApp.RequestTask> = new Map();
let baseUrl: string = import.meta.env.VITE_APP_BASE_PREFIX;
// 获取域名
if (import.meta.env.VITE_USER_NODE_ENV === "production") baseUrl += import.meta.env.VITE_APP_BASE_URL;
const requestHttp = async <T>(options: UniApp.RequestOptions): Promise<ResultData<T>> => {
  uni.showLoading({
    title: "加载中",
    mask: true
  });
  return new Promise((resolve, reject) => {
    //生成key
    const requestKey = createKey(options.url, options.data);
    const requestClose = uni.request({
      ...options,
      url: `${baseUrl}${options.url}`,
      timeout: options.timeout || 6000,
      success: (res: any) => {
        // 请求成功后处理逻辑
        uni.hideLoading();
        if (options.responseType) {
          // 可转base64
          // const base64 = uni.arrayBufferToBase64(res.data);
          // const data: any = `data:image/png;base64,${base64}`;
          resolve({
            code: 1,
            data: res.data,
            msg: "ok"
          });
        } else if (res?.data?.code === ResultEnum.SUCCESS) {
          resolve(res.data);
        } else if (res?.data?.code === ResultEnum.OVERDUE) {
          uni.showToast({
            title: res.data.message || "登录过期",
            icon: "none"
          });
        } else {
          uni.showToast({
            title: res.data.message || "服务错误",
            icon: "none",
            duration: 2500
          });
          reject(res?.data);
        }
      },
      fail: err => {
        uni.hideLoading();
        reject(err);
      },
      complete: () => {
        requestList.delete(requestKey);
      }
    });
    //先关闭上一个同路径同参数请求
    requestList.get(requestKey)?.abort();
    //存储请求
    requestList.set(requestKey, requestClose);
  });
};
export default {
  GET: <T>(options: UniApp.RequestOptions): Promise<ResultData<T>> => {
    return requestHttp({ ...options, method: RequestEnum.GET });
  },
  POST: <T>(options: UniApp.RequestOptions): Promise<ResultData<T>> => {
    return requestHttp({ ...options, method: RequestEnum.POST });
  }
};
