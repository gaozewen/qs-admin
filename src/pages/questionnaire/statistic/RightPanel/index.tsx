import { useRequest } from 'ahooks'
import { Spin, Typography } from 'antd'
import React, { FC, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import { getComponentConfigByType } from '@/components/QEditorComponents'
import { getComponentStatisticService } from '@/services/statistic'

import styles from './index.module.scss'

const { Title } = Typography

type PropsType = {
  selectedCompId: string
  selectedCompType: string
}

const RightPanel: FC<PropsType> = props => {
  const { selectedCompId, selectedCompType } = props
  const { id } = useParams()
  const [statistic, setStatistic] = useState([])
  const { StatisticComponent } = getComponentConfigByType(selectedCompType) || {}

  const { loading, run } = useRequest(
    async (questionnaireId, componentId) =>
      await getComponentStatisticService(questionnaireId, componentId),
    {
      manual: true,
      onSuccess(result) {
        setStatistic(result.statistic)
      },
    }
  )

  useEffect(() => {
    if (selectedCompId && StatisticComponent) {
      run(id, selectedCompId)
    }
  }, [selectedCompId])

  const genStatisticElem = () => {
    if (!selectedCompId) return <div style={{ textAlign: 'center' }}>未选中组件</div>

    if (loading)
      return (
        <Spin spinning={loading}>
          <div style={{ marginTop: '24vh' }}></div>
        </Spin>
      )

    if (StatisticComponent) {
      return <StatisticComponent statistic={statistic} />
    }

    return <div style={{ textAlign: 'center' }}>该组件无图表统计</div>
  }

  return (
    <div className={styles['right-panel']}>
      <Title level={3} style={{ margin: '12px 0 12px 12px' }}>
        图表统计
      </Title>
      <div>{genStatisticElem()}</div>
    </div>
  )
}

export default RightPanel
