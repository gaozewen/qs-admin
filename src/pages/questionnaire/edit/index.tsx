import React, { FC } from 'react'
import styles from './index.module.scss'
import QEditorCanvas from '../../../components/QEditorComponents/QEditorCanvas'
import useLoadQuestionnaireData from '../../../hooks/useLoadQuestionnaireData'
import { Spin } from 'antd'
import { useDispatch } from 'react-redux'
import { changeSelectedIdAction } from '../../../store/qEditorReducer'

const Edit: FC = () => {
  const { loading } = useLoadQuestionnaireData()
  const dispatch = useDispatch()

  const onClearSelectedId = () => {
    dispatch(changeSelectedIdAction(''))
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>头部</div>
      <div className={styles['content-wrapper']}>
        <div className={styles.content}>
          <div className={styles.left}></div>
          <div className={styles.main} onClick={onClearSelectedId}>
            <div className={styles['canvas-wrapper']}>
              <div className={styles.canvas}>
                {loading ? (
                  <div style={{ textAlign: 'center', marginTop: 188 }}>
                    <Spin />
                  </div>
                ) : (
                  <QEditorCanvas />
                )}
              </div>
            </div>
          </div>
          <div className={styles.right}></div>
        </div>
      </div>
    </div>
  )
}

export default Edit
