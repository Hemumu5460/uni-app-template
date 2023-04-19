/*
 * @Author: hrh 
 * @Date: 2023-04-12 11:18:27 
 * @Last Modified by: hrh
 * @Last Modified time: 2023-04-18 19:24:02
 */
// 节流
export function throttle(fn: Function, time: number = 500) {
  //把变量存到闭包里
  let isLace = true
  return function () {
    //为false的时候return
    if (!isLace) return
    isLace = false
    setTimeout(() => {
      fn(...arguments)
      isLace = true
    }, time)
  }
}
// 防抖
export function stabilization(fn: Function, date: number = 500) {
  //清除上一个执行的定时器
  let time: any = null
  return function () {
    clearInterval(time)
    time = setTimeout(() => {
      fn(...arguments)
    }, date)
  }
}
// 百分位
export function percentile(num: number | string) {
  if (!Number(num)) return num
  let i = (num.toString()).split('.')
  if (isNaN(i[0] as unknown as number)) {
    return
  }
  return i[0].toString().replace(/\B(?=(\d{3})+$)/g, ',') + '.' + i[1]
}