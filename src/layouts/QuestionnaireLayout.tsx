import React, { FC } from 'react'
import { Outlet } from 'react-router-dom'
import { Spin } from 'antd'
import useLoadUserData from '../hooks/useLoadUserData'
import styles from './QuestionnaireLayout.module.scss'

const QuestionnaireLayout: FC = () => {
  const { loading } = useLoadUserData()
  return (
    <>
      <div>QuestionnaireLayout header</div>
      <div>
        {loading ? (
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
