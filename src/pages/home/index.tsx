import { Button, Typography } from 'antd'
import React, { FC } from 'react'
import { useNavigate } from 'react-router-dom'

import useGetUserInfo from '@/hooks/useGetUserInfo'
import { PN_LOGIN, PN_MANAGE_INDEX } from '@/router'

import styles from './index.module.scss'

const { Title, Paragraph } = Typography

const Home: FC = () => {
  const nav = useNavigate()
  const { username } = useGetUserInfo()

  const onStart = () => {
    // 已登陆
    if (username) {
      nav(PN_MANAGE_INDEX)
      return
    }
    // 未登陆
    nav(PN_LOGIN)
  }

  return (
    <div className={styles.container}>
      <div className={styles.info}>
        <Title>问卷调查 | 在线投票</Title>
        <Paragraph>已累计创建问卷 188 份，发放问卷 88 份，收到答卷 988 份</Paragraph>
        <div>
          <Button type="primary" onClick={onStart}>
            开始使用
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Home
