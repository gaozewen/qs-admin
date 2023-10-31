import React, { FC } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useRequest } from 'ahooks'
import { UserOutlined } from '@ant-design/icons'
import { Button, Space } from 'antd'
import { PN_LOGIN } from '../router'
import { getUserInfoService } from '../services/user'
import { removeToken } from '../utils/user-token'

const UserInfo: FC = () => {
  const { data } = useRequest(getUserInfoService)
  const { username, nickname } = data || {}
  const nav = useNavigate()

  const onLogout = () => {
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
