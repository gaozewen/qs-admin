import { Button } from 'antd'
import React, { FC, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Typography } from 'antd'
import { PN_MANAGE_INDEX } from '../../router'
import styles from './index.module.scss'

const { Title, Paragraph } = Typography

const Home: FC = () => {
  const nav = useNavigate()

  useEffect(() => {
    fetch('/api/test')
      .then(res => res.json())
      .then(data => console.log(data))
  }, [])

  return (
    <div className={styles.container}>
      <div className={styles.info}>
        <Title>问卷调查 | 在线投票</Title>
        <Paragraph>已累计创建问卷 188 份，发放问卷 88 份，收到答卷 988 份</Paragraph>
        <div>
          <Button type="primary" onClick={() => nav(PN_MANAGE_INDEX)}>
            开始使用
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Home
