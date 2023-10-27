import React, { FC } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Login: FC = () => {
  const nav = useNavigate()
  const onLogin = () => {
    nav('/')
  }
  return (
    <div>
      <p>Login</p>
      <button onClick={onLogin}>登录</button>
      <Link to="/register">注册</Link>
    </div>
  )
}

export default Login
