import { LeftOutlined } from '@ant-design/icons'
import { Button, Space } from 'antd'
import React, { FC } from 'react'
import { useNavigate } from 'react-router-dom'

import styles from './index.module.scss'
import PublishButton from './PublishButton'
import SaveButton from './SaveButton'
import TitleEditor from './TitleEditor'
import Toolbar from './Toolbar'

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
            <TitleEditor />
          </Space>
        </div>
        <div className={styles.main}>
          <Toolbar />
        </div>
        <div className={styles.right}>
          <Space>
            <SaveButton />
            <PublishButton />
          </Space>
        </div>
      </div>
    </div>
  )
}

export default HeaderPanel
