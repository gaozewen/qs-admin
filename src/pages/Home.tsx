import React, { FC } from 'react'
import { useNavigate } from 'react-router-dom'

const Home: FC = () => {
  const nav = useNavigate()
  const onNavToLogin = () => {
    nav('/login')
  }

  return (
    <div>
      <p>Home</p>
      <div>
        <button onClick={onNavToLogin}>登录</button>
      </div>
    </div>
  )
}

export default Home
