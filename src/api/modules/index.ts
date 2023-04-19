/*
 * @Author: hrh 
 * @Date: 2023-03-27 11:12:52 
 * @Last Modified by: hrh
 * @Last Modified time: 2023-04-07 19:05:26
 */
import type { index } from "@/api/interface";
import request from "@/api"
// 获取服务供应商
export function getProviderApi(data: index.GetProvider) {
  return new Promise((resolve, reject) => {
    // #ifndef H5
    uni.getProvider({
      service: data.service,
      success: ({
        provider
      }) => {
        resolve(provider[0])
      }, fail: (err) => {
        reject(err)
      }
    });
    // #endif
  })
}
// uniapp登录凭证
export function getUniLonginApi(data: index.GetUniLongin) {
  // #ifndef H5
  return new Promise((resolve, reject) => {
    uni.login({
      provider: data.provider,
      success: ({ code }) => {
        console.log('uniapp登录凭证', code);
        resolve(code)
      }, fail: (err) => {
        reject(err)
      }
    });
  })
  // #endif
}
// 用户授权获取code（手机号）
export function getDecryptPhoneNumberApi(data: index.GetDecryptPhoneNumber) {
  return new Promise((resolve, reject) => {
    if (data?.detail?.code) {
      const res = data?.detail
      resolve(res)
    } else {
      //拒绝授权后弹出一些提示  
      uni.showToast({
        title: '请点击授权进行登录',
        icon: 'none'
      })
      reject('已拒绝授权')
    }
  })
}

