/**
 * @description 存储/获取 username password
 * @author 高泽文
 */

const KEY_USERNAME = 'username'
const KEY_PASSWORD = 'password'

export const rememberAccount = (username: string, password: string) => {
  localStorage.setItem(KEY_USERNAME, username)
  localStorage.setItem(KEY_PASSWORD, password)
}

export const deleteAccountFromLocalStorage = () => {
  localStorage.removeItem(KEY_USERNAME)
  localStorage.removeItem(KEY_PASSWORD)
}

export const getAccountFromLocalStorage = () => {
  return {
    username: localStorage.getItem(KEY_USERNAME),
    password: localStorage.getItem(KEY_PASSWORD),
  }
}
