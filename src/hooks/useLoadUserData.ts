import { useRequest } from 'ahooks'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { getUserInfoService } from '../services/user'
import { loginReducer } from '../store/userReducer'
import useGetUserInfo from './useGetUserInfo'

// 当 store 中用户信息不存在，则从后端加载用户信息
const useLoadUserData = () => {
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(true)

  const { run: load } = useRequest(getUserInfoService, {
    manual: true,
    onSuccess(result) {
      const { username, nickname } = result
      dispatch(loginReducer({ username, nickname }))
    },
    onFinally() {
      setLoading(false)
    },
  })

  // 判断当前 store 中是否已存在用户信息
  const { username } = useGetUserInfo()
  useEffect(() => {
    if (username) {
      setLoading(false)
      return
    }
    // store 中用户信息不存在，则请求后端数据进行加载
    load()
  }, [username])

  return { loading }
}

export default useLoadUserData
