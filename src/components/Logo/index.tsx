import React, { FC, useEffect, useState } from 'react'
import { Space, Typography } from 'antd'
import { FormOutlined } from '@ant-design/icons'
import styles from './index.module.scss'
import { Link } from 'react-router-dom'
import useGetUserInfo from '../../hooks/useGetUserInfo'
import { PN_HOME, PN_MANAGE_INDEX } from '../../router'

const { Title } = Typography
const Logo: FC = () => {
  const { username } = useGetUserInfo()
  const [pathname, setPathname] = useState(PN_HOME)

  useEffect(() => {
    setPathname(username ? PN_MANAGE_INDEX : PN_HOME)
  }, [username])

  return (
    <div className={styles.container}>
      <Link to={pathname}>
        <Space>
          <Title>
            <FormOutlined />
          </Title>
          <Title>问卷系统</Title>
        </Space>
      </Link>
    </div>
  )
}

export default Logo
