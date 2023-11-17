/**
 * @description 存储/获取 user token
 * @author 高泽文
 */

const KEY = 'USER_TOKEN'
let TOKEN_CACHE = ''
export const setToken = (token: string) => {
  TOKEN_CACHE = token
  localStorage.setItem(KEY, token)
}

export const getToken = () => {
  if (TOKEN_CACHE) return TOKEN_CACHE
  TOKEN_CACHE = localStorage.getItem(KEY) || ''
  return TOKEN_CACHE
}

export const removeToken = () => {
  return localStorage.removeItem(KEY)
}
