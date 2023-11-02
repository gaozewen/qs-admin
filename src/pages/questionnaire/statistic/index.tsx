import React, { FC } from 'react'
import useLoadQuestionnaireData from '../../../hooks/useLoadQuestionnaireData'
import { Spin } from 'antd'

const Statistic: FC = () => {
  const { loading } = useLoadQuestionnaireData()

  return <Spin spinning={loading} tip="加载中"></Spin>
}

export default Statistic
