import {
  CopyOutlined,
  DeleteOutlined,
  EditOutlined,
  ExclamationCircleOutlined,
  LineChartOutlined,
  StarFilled,
  StarOutlined,
} from '@ant-design/icons'
import { useRequest } from 'ahooks'
import { Button, Divider, message, Modal, Popconfirm, Space, Tag } from 'antd'
import React, { FC, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { PN_QUESTIONNAIRE_EDIT, PN_QUESTIONNAIRE_STATISTIC } from '@/router'
import { duplicateQuestionnaireService, updateQuestionnaireService } from '@/services/questionnaire'
import { Questionnaire } from '@/types'

import styles from './index.module.scss'

const QuestionnaireCard: FC<Questionnaire> = (props: Questionnaire) => {
  const { _id, title, isStar, isPublished, answerCount, createdAt } = props
  const nav = useNavigate()

  // 标星 取消标星 逻辑
  const [isStarState, setIsStarState] = useState(isStar)
  const toggleIsStarState = !isStarState
  const { loading: toggleStarLoading, run: onToggleStar } = useRequest(
    async () => {
      const data = await updateQuestionnaireService(_id, { isStar: toggleIsStarState })
      return data
    },
    {
      manual: true,
      onSuccess: () => {
        setIsStarState(toggleIsStarState)
        message.success(`${toggleIsStarState ? '标星' : '取消标星'}成功`)
      },
    }
  )

  // 复制逻辑
  const { loading: duplicateLoading, run: onDuplicate } = useRequest(
    async () => {
      const data = await duplicateQuestionnaireService(_id)
      return data
    },
    {
      manual: true,
      onSuccess: result => {
        const { id } = result || {}
        if (id) {
          nav(`${PN_QUESTIONNAIRE_EDIT}/${id}`)
          message.success('复制成功')
        }
      },
    }
  )

  // 删除逻辑
  const [isDeletedState, setIsDeletedState] = useState(false)
  const { loading: deleteLoading, run: onDelete } = useRequest(
    async () => {
      const data = await updateQuestionnaireService(_id, { isStar: toggleIsStarState })
      return data
    },
    {
      manual: true,
      onSuccess: () => {
        setIsDeletedState(true)
        message.success('删除成功')
      },
    }
  )
  const confirmDelete = () => {
    Modal.confirm({
      title: '确定要删除该问卷吗？',
      icon: <ExclamationCircleOutlined />,
      okText: '确定',
      cancelText: '取消',
      onOk: onDelete,
    })
  }

  if (isDeletedState) return null

  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <div className={styles.left}>
          <Link to={`${isPublished ? PN_QUESTIONNAIRE_STATISTIC : PN_QUESTIONNAIRE_EDIT}/${_id}`}>
            <Space>
              {isStarState && <StarFilled />}
              {title}
            </Space>
          </Link>
        </div>
        <div className={styles.right}>
          <Space>
            {isPublished ? <Tag color="green">已发布</Tag> : <Tag>未发布</Tag>}

            <span>答卷:{answerCount}</span>

            <span>{createdAt}</span>
          </Space>
        </div>
      </div>
      <Divider style={{ margin: '12px' }} />
      <div className={styles['button-container']}>
        <div className={styles.left}>
          <Space>
            <Button
              type="text"
              size="small"
              icon={<EditOutlined />}
              onClick={() => nav(`${PN_QUESTIONNAIRE_EDIT}/${_id}`)}
            >
              编辑问卷
            </Button>
            <Button
              type="text"
              size="small"
              icon={<LineChartOutlined />}
              onClick={() => nav(`${PN_QUESTIONNAIRE_STATISTIC}/${_id}`)}
              disabled={!isPublished}
            >
              问卷统计
            </Button>
          </Space>
        </div>
        <div className={styles.right}>
          <Space>
            <Button
              type="text"
              size="small"
              icon={<StarOutlined />}
              loading={toggleStarLoading}
              onClick={onToggleStar}
            >
              {isStarState ? '取消标星' : '标星'}
            </Button>

            <Popconfirm
              title="确定要复制该问卷吗？"
              okText="确定"
              cancelText="取消"
              onConfirm={onDuplicate}
            >
              <Button type="text" size="small" icon={<CopyOutlined />} loading={duplicateLoading}>
                复制
              </Button>
            </Popconfirm>

            <Button
              type="text"
              size="small"
              icon={<DeleteOutlined />}
              loading={deleteLoading}
              onClick={confirmDelete}
            >
              删除
            </Button>
          </Space>
        </div>
      </div>
    </div>
  )
}

export default QuestionnaireCard
