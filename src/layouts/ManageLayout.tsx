import React, { FC } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { BarsOutlined, DeleteOutlined, PlusOutlined, StarOutlined } from '@ant-design/icons'
import styles from './ManageLayout.module.scss'
import { Button, Divider, Space } from 'antd'
import { PN_MANAGE_LIST, PN_MANAGE_STAR, PN_MANAGE_TRASH } from '../router'

const ManageLayout: FC = () => {
  const nav = useNavigate()
  const { pathname } = useLocation()
  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <Space direction="vertical">
          <Button type="primary" size="large" icon={<PlusOutlined />}>
            新建问卷
          </Button>
          <Divider style={{ borderColor: 'transparent' }} />
          <Button
            type={pathname.startsWith(PN_MANAGE_LIST) ? 'default' : 'text'}
            size="large"
            icon={<BarsOutlined />}
            onClick={() => nav(PN_MANAGE_LIST)}
          >
            我的问卷
          </Button>
          <Button
            type={pathname.startsWith(PN_MANAGE_STAR) ? 'default' : 'text'}
            size="large"
            icon={<StarOutlined />}
            onClick={() => nav(PN_MANAGE_STAR)}
          >
            星标问卷
          </Button>
          <Button
            type={pathname.startsWith(PN_MANAGE_TRASH) ? 'default' : 'text'}
            size="large"
            icon={<DeleteOutlined />}
            onClick={() => nav(PN_MANAGE_TRASH)}
          >
            回收站
          </Button>
        </Space>
      </div>
      <div className={styles.right}>
        <Outlet />
      </div>
    </div>
  )
}

export default ManageLayout
