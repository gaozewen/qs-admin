import React, { FC } from 'react'
import useLoadQuestionnaireData from '../../../hooks/useLoadQuestionnaireData'
import { Spin } from 'antd'

const Statistic: FC = () => {
  const { loading, questionnaireData } = useLoadQuestionnaireData()

  return (
    <Spin spinning={loading} tip="加载中">
      <p>{JSON.stringify(questionnaireData)}</p>
    </Spin>
  )
}

export default Statistic
