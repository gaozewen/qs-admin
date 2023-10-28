import React, { FC, useState } from 'react'
import { useTitle } from 'ahooks'
import { Empty, Typography } from 'antd'
import styles from './common.module.scss'
import QuestionnaireCard from '../../components/QuestionnaireCard'

const { Title } = Typography

const mockListData = Array(8)
  .fill('mock')
  .map((item, index) => ({
    _id: `q${index}`,
    title: `问卷${index}`,
    isPublished: [true, false][index % 2],
    isStar: true,
    answerCount: index % 5,
    createdAt: `10月2${index}日 1${index}:4${index}`,
  }))

const Star: FC = () => {
  useTitle('问卷系统 - 星标问卷')
  const [list] = useState(mockListData)

  return (
    <>
      <div className={styles.header}>
        <div className={styles.left}>
          <Title level={3} style={{ margin: '0 0 24px 0' }}>
            星标问卷
          </Title>
        </div>
        <div className={styles.right}>搜索</div>
      </div>
      <div className={styles.content}>
        {list.length > 0 ? (
          list.map(item => <QuestionnaireCard key={item._id} {...item} />)
        ) : (
          <Empty description="暂无数据" />
        )}
      </div>
      <div className={styles.footer}>分页</div>
    </>
  )
}

export default Star
