import React, { FC } from 'react'
import { Link } from 'react-router-dom'
import { PN_LOGIN } from '../router'

const UserInfo: FC = () => {
  return (
    <>
      <Link to={PN_LOGIN}>登录</Link>
    </>
  )
}

export default UserInfo
