import { useTitle } from 'ahooks'
import { Button, Result, Spin } from 'antd'
import React, { FC, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import useGetQEditorInfo from '@/hooks/useGetQEditorInfo'
import useLoadQuestionnaireData from '@/hooks/useLoadQuestionnaireData'

import HeaderPanel from './HeaderPanel'
import styles from './index.module.scss'
import LeftPanel from './LeftPanel'
import MainPanel from './MainPanel'
import RightPanel from './RightPanel'

const Statistic: FC = () => {
  const [selectedCompId, setSelectedCompId] = useState('')
  const [selectedCompType, setSelectedCompType] = useState('')
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
      <HeaderPanel />
      <div className={styles['content-wrapper']}>
        <div className={styles.content}>
          <div className={styles.left}>
            <LeftPanel
              selectedCompId={selectedCompId}
              setSelectedCompId={setSelectedCompId}
              setSelectedCompType={setSelectedCompType}
            />
          </div>
          <div className={styles.main}>
            <MainPanel
              selectedCompId={selectedCompId}
              setSelectedCompId={setSelectedCompId}
              setSelectedCompType={setSelectedCompType}
            />
          </div>
          <div className={styles.right}>
            <RightPanel selectedCompId={selectedCompId} selectedCompType={selectedCompType} />
          </div>
        </div>
      </div>
    </div>
  ) : (
    UnPublishedElement
  )
}

export default Statistic
