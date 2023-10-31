import ajax, { ResDataType } from './ajax'

// 获取用户信息
export const getUserInfoService = async (): Promise<ResDataType> => {
  const url = `/api/user/info`
  const data = (await ajax.get(url)) as ResDataType
  return data
}

// 注册用户
export const registerService = async (
  username: string,
  password: string,
  nickname?: string
): Promise<ResDataType> => {
  const url = `/api/user/register`
  const body = { username, password, nickname: nickname || username }
  const data = (await ajax.post(url, body)) as ResDataType
  return data
}

// 登录
export const loginService = async (username: string, password: string): Promise<ResDataType> => {
  const url = `/api/user/login`
  const body = { username, password }
  const data = (await ajax.post(url, body)) as ResDataType
  return data
}
