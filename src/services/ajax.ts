import { message } from 'antd'
import axios from 'axios'

import { getToken } from '@/utils/user-token'

/**
 * @description 配置 axios 基本功能
 */
const instance = axios.create({
  timeout: 10 * 1000,
})

// request 拦截：每次请求都带上 token
instance.interceptors.request.use(
  config => {
    // JWT
    config.headers.token = getToken()
    return config
  },
  error => Promise.reject(error)
)

// response 拦截：统一处理 errno 和 msg
instance.interceptors.response.use(
  res => {
    const resData = (res.data || {}) as ResType
    const { errno, data, msg } = resData

    if (errno !== 0) {
      if (errno === 3 || errno === 4) {
        // JWT token 过期或未设置
        return {}
      }

      if (msg) {
        message.error(msg)
      }
      // 后端错误代码直接返回空
      return {}
    }

    // 这里需要是 any 类型
    return data as any
  },
  err => {
    // 主动处理请求状态码，防止 UI 交互卡死
    const status = err.response.status
    switch (status) {
      case 404:
        message.error('请求的服务器资源不存在')
        break
      case 403:
        message.error('权限不足，请联系管理员')
        break
      default:
        message.error(`服务器故障请联系开发[${status}]`)
        break
    }
    return {}
  }
)

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
