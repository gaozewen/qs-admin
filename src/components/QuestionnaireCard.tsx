import React, { FC, useState } from 'react'
import { Button, Divider, Modal, Popconfirm, Space, Tag, message } from 'antd'
import styles from './QuestionnaireCard.module.scss'
import {
  CopyOutlined,
  DeleteOutlined,
  EditOutlined,
  ExclamationCircleOutlined,
  LineChartOutlined,
  StarFilled,
  StarOutlined,
} from '@ant-design/icons'
import { Link, useNavigate } from 'react-router-dom'
import { PN_QUESTIONNAIRE_EDIT, PN_QUESTIONNAIRE_STATISTIC } from '../router'
import { Questionnaire } from '../@types/questionnaire'
import { useRequest } from 'ahooks'
import { updateQuestionnaireService } from '../services/questionnaire'

const QuestionnaireCard: FC<Questionnaire> = (props: Questionnaire) => {
  const { _id, title, isStar, isPublished, answerCount, createdAt } = props
  const nav = useNavigate()

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

  const onDuplicate = () => {
    message.success('复制成功')
  }
  const onDelete = () => {
    Modal.confirm({
      title: '确定要删除该问卷吗？',
      icon: <ExclamationCircleOutlined />,
      okText: '确定',
      cancelText: '取消',
      onOk: () => {
        message.success('删除成功')
      },
    })
  }
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
              <Button type="text" size="small" icon={<CopyOutlined />}>
                复制
              </Button>
            </Popconfirm>

            <Button type="text" size="small" icon={<DeleteOutlined />} onClick={onDelete}>
              删除
            </Button>
          </Space>
        </div>
      </div>
    </div>
  )
}

export default QuestionnaireCard
