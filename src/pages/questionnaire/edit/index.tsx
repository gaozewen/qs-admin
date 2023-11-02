import React, { FC } from 'react'
import styles from './index.module.scss'
import QEditorCanvas from '../../../components/QEditorComponents/QEditorCanvas'
import useLoadQuestionnaireData from '../../../hooks/useLoadQuestionnaireData'
import { Spin } from 'antd'

const Edit: FC = () => {
  const { loading } = useLoadQuestionnaireData()
  return (
    <div className={styles.container}>
      <div className={styles.header}>头部</div>
      <div className={styles['content-wrapper']}>
        <div className={styles.content}>
          <div className={styles.left}></div>
          <div className={styles.main}>
            <div className={styles['canvas-wrapper']}>
              <Spin spinning={loading}>
                <div className={styles.canvas}>{!loading && <QEditorCanvas />}</div>
              </Spin>
            </div>
          </div>
          <div className={styles.right}></div>
        </div>
      </div>
    </div>
  )
}

export default Edit
