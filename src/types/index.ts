import type { Ref } from "vue";
// 图片文件
export interface fileInfo {
  name: string | undefined
  extname: string | undefined
  url: string
}

// 滑动分页
export interface SlidePageProps {
  list: any[] // 数据列表
  pagination: pagination // 分页
  total: Ref<number>// 总数据
  getList: Function // 获取数据
}
// 分页
export interface pagination {
  page: number
  size: number
}
