import { CopyOutlined, LeftOutlined, QrcodeOutlined } from '@ant-design/icons'
import { Button, message, Popover, Space, Tooltip, Typography } from 'antd'
import { QRCodeSVG } from 'qrcode.react'
import React, { FC, useMemo } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import useGetQEditorInfo from '@/hooks/useGetQEditorInfo'
import { PN_QUESTIONNAIRE_EDIT } from '@/router'
import { copyToClipboard } from '@/utils/clipboard'

import styles from './index.module.scss'

const { Title, Text } = Typography

const HeaderPanel: FC = () => {
  const nav = useNavigate()
  const { id } = useParams()
  const { pageInfo } = useGetQEditorInfo()
  const { title, isPublished } = pageInfo

  const LinkAndQRCode = useMemo(() => {
    if (!isPublished) return null

    // TODO 上生产需要修改 url
    const url = `http://localhost:3000/questionnaire/${id}`

    const onCopy = () => {
      copyToClipboard(url, () => {
        message.success('拷贝成功')
      })
    }

    return (
      <Space>
        <Text>答卷地址：{url}</Text>
        <Tooltip title="拷贝链接">
          <Button icon={<CopyOutlined />} onClick={onCopy} />
        </Tooltip>
        <Popover content={<QRCodeSVG value={url} size={150} />}>
          <Button icon={<QrcodeOutlined />} />
        </Popover>
      </Space>
    )
  }, [id, isPublished])

  return (
    <div className={styles['header-wrapper']}>
      <div className={styles.header}>
        <div className={styles.left}>
          <Space>
            <Button
              type="link"
              icon={<LeftOutlined />}
              onClick={() => {
                nav(-1)
              }}
            >
              返回
            </Button>

            <Title>{title}</Title>
          </Space>
        </div>
        <div className={styles.main}>{LinkAndQRCode}</div>
        <div className={styles.right}>
          <Button type="primary" onClick={() => nav(`${PN_QUESTIONNAIRE_EDIT}/${id}`)}>
            编辑问卷
          </Button>
        </div>
      </div>
    </div>
  )
}

export default HeaderPanel
