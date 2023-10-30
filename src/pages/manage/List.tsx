import React, { FC } from 'react'
import { useTitle } from 'ahooks'
import { Empty, Spin, Typography } from 'antd'
import styles from './common.module.scss'
import QuestionnaireCard from '../../components/QuestionnaireCard'
import ListSearch from '../../components/ListSearch'
import { Questionnaire } from '../../@types/questionnaire'
import useLoadQuestionnaireListData from '../../hooks/useLoadQuestionnaireListData'

const { Title } = Typography

const List: FC = () => {
  useTitle('问卷系统 - 我的问卷')

  const { loading, data } = useLoadQuestionnaireListData()
  const { list = [], total = 0 } = (data || {}) as { list: Questionnaire[]; total: number }
  console.log('total', total)

  return (
    <>
      <div className={styles.header}>
        <div className={styles.left}>
          <Title level={3} style={{ margin: '0 0 24px 0' }}>
            我的问卷
          </Title>
        </div>
        <div className={styles.right}>
          <ListSearch />
        </div>
      </div>
      <div className={styles.content}>
        {loading && (
          <div style={{ textAlign: 'center' }}>
            <Spin spinning={loading} />
          </div>
        )}
        {!loading &&
          list.length > 0 &&
          list.map((item: Questionnaire) => <QuestionnaireCard key={item._id} {...item} />)}
        {!loading && list.length === 0 && <Empty description="暂无数据" />}
      </div>
      <div className={styles.footer}>loadMore.. 上滑加载更多</div>
    </>
  )
}

export default List
