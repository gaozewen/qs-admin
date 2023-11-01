import { useLocation, useNavigate } from 'react-router-dom'
import useGetUserInfo from './useGetUserInfo'
import { useEffect } from 'react'
import { PN_LOGIN, PN_MANAGE_INDEX, isLoginOrRegisterRouter, isNotNeedLogin } from '../router'

// 根据不同情况处理当前页面路由的自动跳转
const useAutoNavigate = (loadingUserData: boolean) => {
  const { pathname } = useLocation()
  const { username } = useGetUserInfo()
  const nav = useNavigate()

  useEffect(() => {
    // 还在加载用户数据则不处理
    if (loadingUserData) return

    // 已登陆
    if (username) {
      // 如果当前路由是登录或注册页时，跳转我的问卷页
      if (isLoginOrRegisterRouter(pathname)) nav(PN_MANAGE_INDEX)
      return
    }

    // 未登录
    // 如果当前路由不需要登录，则不处理
    if (isNotNeedLogin(pathname)) return
    // 如果当前路由需要登录，则自动跳转登录页
    nav(PN_LOGIN)
  }, [loadingUserData, username, pathname])
}

export default useAutoNavigate
