import React, { FC } from 'react'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { UserOutlined } from '@ant-design/icons'
import { Button, Space } from 'antd'
import { PN_LOGIN } from '../router'
import { removeToken } from '../utils/user-token'
import useGetUserInfo from '../hooks/useGetUserInfo'
import { logoutReducer } from '../store/userReducer'

const UserInfo: FC = () => {
  // 使用 redux 获取用户信息
  const { username, nickname } = useGetUserInfo()
  const dispatch = useDispatch()
  const nav = useNavigate()

  const onLogout = () => {
    // 清空 redux 中的 user 数据
    dispatch(logoutReducer())
    // 清除 token 的存储
    removeToken()
    nav(PN_LOGIN)
  }

  const UserInfo = (
    <>
      <span style={{ color: '#e8e8e8' }}>
        <Space>
          <UserOutlined />
          {nickname}
        </Space>
      </span>
      <Button type="link" onClick={onLogout}>
        退出
      </Button>
    </>
  )

  const Login = <Link to={PN_LOGIN}>登录</Link>

  return username ? UserInfo : Login
}

export default UserInfo
