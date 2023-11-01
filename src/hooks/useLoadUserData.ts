import { useRequest } from 'ahooks'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { getUserInfoService } from '../services/user'
import { loginReducer } from '../store/userReducer'
import useGetUserInfo from './useGetUserInfo'

// 当 store 中用户信息不存在，则从后端加载用户信息
const useLoadUserData = () => {
  const dispatch = useDispatch()
  const [loadingUserData, setLoadingUserData] = useState<boolean>(true)

  const { run: load } = useRequest(getUserInfoService, {
    manual: true,
    onSuccess(result) {
      const { username, nickname } = result
      // 后端 errno 报错，未返回 data 数据，username 不存在
      if (!username) return
      // data 数据正常返回, username 存在
      dispatch(loginReducer({ username, nickname }))
    },
    onFinally() {
      setLoadingUserData(false)
    },
  })

  // 判断当前 store 中是否已存在用户信息
  const { username } = useGetUserInfo()
  useEffect(() => {
    // 正在向后端加载数据的话，即使 username 变化也不做处理
    if (username) {
      setLoadingUserData(false)
      return
    }
    // store 中用户信息不存在，则请求后端数据进行加载
    load()
  }, [username])

  return { loadingUserData }
}

export default useLoadUserData
