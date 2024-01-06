/*
 * @Author: hrh 
 * @Date: 2023-03-24 16:24:04 
 * @Last Modified by: hrh
 * @Last Modified time: 2023-04-18 17:35:34
 */
export interface Result {
  code: 0 | 1,
  msg: string
}
export interface ResultData<T> extends Result {
  data: T
}
export interface RequestConfig extends Request {

}
export interface PageSize {
  page: number,
  size: number
}
// 图片文件
export interface fileInfo {
  name: string | undefined
  extname: string | undefined
  url: string
}
/**
 * @description:namespace 命名空间解决命名冲突
 */
// 公共模块
export namespace index {
  export interface GetProvider {
    service: "oauth" | "share" | "payment" | "push"
  }
  export interface GetUniLongin {
    provider: "weixin" | "qq" | "sinaweibo" | "xiaomi" | "apple" | "univerify" | undefined
  }
  export interface GetDecryptPhoneNumber {
    detail: {
      code: string
    }
  }
}
// 首页模块
export namespace Home {

}
// 应用模块
export namespace Apply {

}
// 账单模块
export namespace Bill {
}
// 我的模块
export namespace My {

}