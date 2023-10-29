import { message } from 'antd'
import axios from 'axios'

/**
 * @description 配置 axios 基本功能
 */
const instance = axios.create({
  timeout: 10 * 1000,
})

// response 拦截：统一处理 errno 和 msg
instance.interceptors.response.use(res => {
  const resData = (res.data || {}) as ResType
  const { errno, data, msg } = resData

  if (errno !== 0) {
    if (msg) {
      message.error(msg)
    }

    throw new Error(msg)
  }

  // 这里需要是 any 类型
  return data as any
})

const ajax = instance

export default ajax

export type ResType = {
  errno: number
  data?: ResDataType
  msg?: string
}

export type ResDataType = {
  [key: string]: any
}
