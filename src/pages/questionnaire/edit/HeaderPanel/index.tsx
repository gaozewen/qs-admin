import React, { FC } from 'react'
import { Button, Space, Typography } from 'antd'
import { LeftOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'
import styles from './index.module.scss'
import Toolbar from './Toolbar'

const { Title } = Typography

const HeaderPanel: FC = () => {
  const nav = useNavigate()
  return (
    <div className={styles['header-wrapper']}>
      <div className={styles.header}>
        <div className={styles.left}>
          <Space>
            <Button type="link" icon={<LeftOutlined />} onClick={() => nav(-1)}>
              返回
            </Button>
            <Title>问卷标题</Title>
          </Space>
        </div>
        <div className={styles.main}>
          <Toolbar />
        </div>
        <div className={styles.right}>
          <Space>
            <Button>保存</Button>
            <Button type="primary">发布</Button>
          </Space>
        </div>
      </div>
    </div>
  )
}

export default HeaderPanel