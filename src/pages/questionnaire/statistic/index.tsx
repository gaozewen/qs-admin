import React, { FC } from 'react'
import useLoadQuestionnaireData from '../../../hooks/useLoadQuestionnaireData'
import { Spin } from 'antd'

const Statistic: FC = () => {
  const { loading } = useLoadQuestionnaireData()

  return loading ? <Spin /> : <div>数据统计页</div>
}

export default Statistic
