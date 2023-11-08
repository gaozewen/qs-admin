import { Layout, Spin } from 'antd'
import React, { FC } from 'react'
import { Outlet } from 'react-router-dom'

import Logo from '@/components/Logo'
import UserInfo from '@/components/UserInfo'
import useAutoNavigate from '@/hooks/useAutoNavigate'
import useLoadUserData from '@/hooks/useLoadUserData'

import styles from './index.module.scss'

const { Header, Footer, Content } = Layout

const MainLayout: FC = () => {
  const { loadingUserData } = useLoadUserData()
  useAutoNavigate(loadingUserData)

  return (
    <Layout>
      <Header className={styles.header}>
        <div className={styles.left}>
          <Logo />
        </div>
        <div className={styles.right}>
          <UserInfo />
        </div>
      </Header>
      <Content className={styles.main}>
        {loadingUserData ? (
          <Spin>
            <div className={styles.main}></div>
          </Spin>
        ) : (
          <Outlet />
        )}
      </Content>
      <Footer className={styles.footer}>问卷系统 &copy;2023 - present. Created by 高泽文</Footer>
    </Layout>
  )
}

export default MainLayout
