import React, { FC } from 'react'
import { Outlet } from 'react-router-dom'
import { Spin } from 'antd'
import useLoadUserData from '../hooks/useLoadUserData'
import styles from './QuestionnaireLayout.module.scss'
import useAutoNavigate from '../hooks/useAutoNavigate'

const QuestionnaireLayout: FC = () => {
  const { loadingUserData } = useLoadUserData()
  useAutoNavigate(loadingUserData)

  return (
    <>
      <div>QuestionnaireLayout header</div>
      <div>
        {loadingUserData ? (
          <Spin>
            <div className={styles.main}></div>
          </Spin>
        ) : (
          <Outlet />
        )}
      </div>
      <div>QuestionnaireLayout footer</div>
    </>
  )
}

export default QuestionnaireLayout
