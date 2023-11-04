import React, { FC } from 'react'
import { Outlet } from 'react-router-dom'
import { Spin } from 'antd'
import useLoadUserData from '../../hooks/useLoadUserData'
import styles from './index.module.scss'
import useAutoNavigate from '../../hooks/useAutoNavigate'

const QuestionnaireLayout: FC = () => {
  const { loadingUserData } = useLoadUserData()
  useAutoNavigate(loadingUserData)

  return (
    <div>
      {loadingUserData ? (
        <Spin>
          <div className={styles.main}></div>
        </Spin>
      ) : (
        <Outlet />
      )}
    </div>
  )
}

export default QuestionnaireLayout
