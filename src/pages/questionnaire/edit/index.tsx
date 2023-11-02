import React, { FC } from 'react'
import styles from './index.module.scss'
import MainCanvas from './MainCanvas'
import useLoadQuestionnaireData from '../../../hooks/useLoadQuestionnaireData'
import { Spin } from 'antd'
import { useDispatch } from 'react-redux'
import { changeSelectedIdAction } from '../../../store/qEditorReducer'
import LeftPanel from './LeftPanel'
import RightPanel from './RightPanel'
import HeaderPanel from './HeaderPanel'

const Edit: FC = () => {
  const { loading } = useLoadQuestionnaireData()
  const dispatch = useDispatch()

  const onClearSelectedId = () => {
    dispatch(changeSelectedIdAction(''))
  }

  return (
    <div className={styles.container}>
      <HeaderPanel />
      <div className={styles['content-wrapper']}>
        <div className={styles.content}>
          <div className={styles.left}>
            <LeftPanel />
          </div>
          <div className={styles.main} onClick={onClearSelectedId}>
            <div className={styles['canvas-wrapper']}>
              <div className={styles.canvas}>
                {loading ? (
                  <div style={{ textAlign: 'center', marginTop: 188 }}>
                    <Spin />
                  </div>
                ) : (
                  <MainCanvas />
                )}
              </div>
            </div>
          </div>
          <div className={styles.right}>
            <RightPanel />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Edit
