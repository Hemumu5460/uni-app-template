import { ref, reactive } from "vue"
import type { SlidePageProps } from "@/types";

export function useUserInfo(hookData?: any) {
  return {
  }
}

// 下拉刷新/滑动分页事件
export function useSlidePage(props: SlidePageProps) {
  const triggered = ref<boolean | string>(false)
  // start 自定义下拉刷新事件
  const onPulling = (e: boolean) => {
    triggered.value = true
  }
  // 完成下拉
  const onRefresh = () => {
    props.list.length = 0
    props.getList(1)
    setTimeout(() => {
      triggered.value = false
    }, 1000)
  }
  // 刷新被复位
  const onRestore = () => {
    triggered.value = "restore" // 需要重置
    console.log("onRestore")
  }
  // 刷新被中止
  const onAbort = () => {
    console.log("onAbort")
  }
  // 滚动到底部
  const scrolltolower = () => {
    const { page } = props.pagination

    if (Math.ceil(props.total.value / 10) > page) {
      props.pagination.page++
      props.getList()
    }
  }
  return {
    triggered, onPulling, onRefresh, onRestore, onAbort, scrolltolower
  }
}