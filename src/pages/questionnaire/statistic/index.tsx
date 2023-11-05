import React, { FC } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Result, Spin } from 'antd'
import useLoadQuestionnaireData from '../../../hooks/useLoadQuestionnaireData'
import styles from './index.module.scss'
import useGetQEditorInfo from '../../../hooks/useGetQEditorInfo'
import { useTitle } from 'ahooks'

const Statistic: FC = () => {
  const nav = useNavigate()
  const { loading } = useLoadQuestionnaireData()
  const { pageInfo } = useGetQEditorInfo()
  const { isPublished, title } = pageInfo

  useTitle(`问卷统计 - ${title}`)

  if (loading)
    return (
      <Spin>
        <div className={styles.loading}></div>
      </Spin>
    )

  const UnPublishedElement = (
    <div className={styles['un-published']}>
      <Result
        status="warning"
        title="该问卷尚未发布"
        extra={
          <Button type="primary" onClick={() => nav(-1)}>
            返回
          </Button>
        }
      />
    </div>
  )

  return isPublished ? (
    <div className={styles.container}>
      <div className={styles.header}>头部</div>
      <div className={styles['content-wrapper']}>
        <div className={styles.content}>
          <div className={styles.left}>左边</div>
          <div className={styles.main}>中间</div>
          <div className={styles.right}>右边</div>
        </div>
      </div>
    </div>
  ) : (
    UnPublishedElement
  )
}

export default Statistic
