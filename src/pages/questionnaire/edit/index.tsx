import React, { FC } from 'react'
import { Spin } from 'antd'
import { useDispatch } from 'react-redux'
import { useTitle } from 'ahooks'
import styles from './index.module.scss'
import MainCanvas from './MainCanvas'
import LeftPanel from './LeftPanel'
import RightPanel from './RightPanel'
import HeaderPanel from './HeaderPanel'
import useGetQEditorInfo from '../../../hooks/useGetQEditorInfo'
import useLoadQuestionnaireData from '../../../hooks/useLoadQuestionnaireData'
import { changeSelectedIdAction } from '../../../store/qEditorReducer'

const Edit: FC = () => {
  const dispatch = useDispatch()
  const { loading } = useLoadQuestionnaireData()
  const { pageInfo } = useGetQEditorInfo()
  const { title } = pageInfo
  useTitle(`问卷编辑 - ${title}`)

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
              {loading ? (
                <div style={{ textAlign: 'center', marginTop: 188 }}>
                  <Spin />
                </div>
              ) : (
                <MainCanvas />
              )}
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
