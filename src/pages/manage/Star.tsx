import React, { FC } from 'react'
import { useTitle } from 'ahooks'
import { Empty, Typography, Spin } from 'antd'
import styles from './common.module.scss'
import QuestionnaireCard from '../../components/QuestionnaireCard'
import ListSearch from '../../components/ListSearch'
import useLoadQuestionnaireListData from '../../hooks/useLoadQuestionnaireListData'
import { Questionnaire } from '../../@types/questionnaire'
import QSPagination from '../../components/QSPagination'

const { Title } = Typography

const Star: FC = () => {
  useTitle('问卷系统 - 星标问卷')

  const { loading, data } = useLoadQuestionnaireListData({ isStar: true })
  const { list = [], total = 0 } = (data || {}) as { list: Questionnaire[]; total: number }
  console.log('list', list)

  return (
    <>
      <div className={styles.header}>
        <div className={styles.left}>
          <Title level={3} style={{ margin: '0 0 24px 0' }}>
            星标问卷
          </Title>
        </div>
        <div className={styles.right}>
          <ListSearch />
        </div>
      </div>

      <Spin spinning={loading} size="large">
        <div className={styles.content}>
          {list.length > 0 &&
            list.map((item: Questionnaire) => <QuestionnaireCard key={item._id} {...item} />)}
          {!loading && list.length === 0 && <Empty description="暂无数据" />}
        </div>
        <div className={styles.footer}>{list.length > 0 && <QSPagination total={total} />}</div>
      </Spin>
    </>
  )
}

export default Star
