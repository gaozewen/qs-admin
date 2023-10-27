import { Button } from 'antd'
import React, { FC } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Home: FC = () => {
  const nav = useNavigate()
  const onNavToLogin = () => {
    // nav('/login')
    nav({
      pathname: '/login',
      search: 'b=21',
    })
  }

  return (
    <div>
      <p>Home</p>
      <div>
        <Button onClick={onNavToLogin}>登录</Button>
        <Link to="/register?a=10">注册</Link>
      </div>
    </div>
  )
}

export default Home
