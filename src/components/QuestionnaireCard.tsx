import React, { FC } from 'react'
import { Button, Divider, Space, Tag } from 'antd'
import styles from './QuestionnaireCard.module.scss'
import {
  CopyOutlined,
  DeleteOutlined,
  EditOutlined,
  LineChartOutlined,
  StarFilled,
  StarOutlined,
} from '@ant-design/icons'
import { Link, useNavigate } from 'react-router-dom'
import { PN_QUESTIONNAIRE_EDIT, PN_QUESTIONNAIRE_STATISTIC } from '../router'

type PropsType = {
  _id: string
  title: string
  isStar: boolean
  isPublished: boolean
  answerCount: number
  createdAt: string
}

const QuestionnaireCard: FC<PropsType> = (props: PropsType) => {
  const { _id, title, isStar, isPublished, answerCount, createdAt } = props
  const nav = useNavigate()
  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <div className={styles.left}>
          <Link to={`${isPublished ? PN_QUESTIONNAIRE_STATISTIC : PN_QUESTIONNAIRE_EDIT}/${_id}`}>
            <Space>
              {isStar && <StarFilled />}
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
            <Button type="text" size="small" icon={<StarOutlined />}>
              {isStar ? '取消标星' : '标星'}
            </Button>
            <Button type="text" size="small" icon={<CopyOutlined />}>
              复制
            </Button>
            <Button type="text" size="small" icon={<DeleteOutlined />}>
              删除
            </Button>
          </Space>
        </div>
      </div>
    </div>
  )
}

export default QuestionnaireCard
