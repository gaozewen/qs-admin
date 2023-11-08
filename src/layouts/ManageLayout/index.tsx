import { BarsOutlined, DeleteOutlined, PlusOutlined, StarOutlined } from '@ant-design/icons'
import { useRequest } from 'ahooks'
import { Button, Divider, message, Space } from 'antd'
import React, { FC } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'

import { PN_MANAGE_INDEX, PN_MANAGE_STAR, PN_MANAGE_TRASH, PN_QUESTIONNAIRE_EDIT } from '@/router'
import { createQuestionnaireService } from '@/services/questionnaire'

import styles from './index.module.scss'

const ManageLayout: FC = () => {
  const nav = useNavigate()
  const { pathname } = useLocation()

  const { loading, run: onCreate } = useRequest(createQuestionnaireService, {
    manual: true,
    onSuccess: result => {
      const { id } = result || {}
      if (id) {
        nav(`${PN_QUESTIONNAIRE_EDIT}/${id}`)
        message.success('创建成功')
      }
    },
  })

  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <Space direction="vertical">
          <Button
            type="primary"
            size="large"
            icon={<PlusOutlined />}
            loading={loading}
            onClick={onCreate}
          >
            新建问卷
          </Button>
          <Divider style={{ borderColor: 'transparent' }} />
          <Button
            type={pathname.startsWith(PN_MANAGE_INDEX) ? 'default' : 'text'}
            size="large"
            icon={<BarsOutlined />}
            onClick={() => nav(PN_MANAGE_INDEX)}
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
