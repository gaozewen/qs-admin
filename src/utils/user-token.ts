/**
 * @description 存储/获取 user token
 * @author 高泽文
 */

const KEY = 'USER_TOKEN'

export const setToken = (token: string) => {
  localStorage.setItem(KEY, token)
}

export const getToken = () => {
  return localStorage.getItem(KEY)
}

export const removeToken = () => {
  return localStorage.removeItem(KEY)
}
