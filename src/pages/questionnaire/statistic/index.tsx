import React, { FC } from 'react'
import useLoadQuestionnaireData from '../../../hooks/useLoadQuestionnaireData'
import { Spin } from 'antd'

const Statistic: FC = () => {
  const { loading, data } = useLoadQuestionnaireData()

  return (
    <Spin spinning={loading} tip="加载中">
      <p>{JSON.stringify(data)}</p>
    </Spin>
  )
}

export default Statistic
