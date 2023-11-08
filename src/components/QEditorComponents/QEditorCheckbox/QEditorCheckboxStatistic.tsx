import type { ColumnConfig } from '@ant-design/plots'
import { Column } from '@ant-design/plots'
import React, { FC } from 'react'

export type QEditorCheckboxStatisticPropsType = {
  statistic: { name: string; count: number }[]
}

const QEditorCheckboxStatistic: FC<QEditorCheckboxStatisticPropsType> = props => {
  const { statistic: data = [] } = props

  const config: ColumnConfig = {
    padding: [58, 0, 40, 0],
    data,
    xField: 'name',
    yField: 'count',
    label: {
      // 可手动配置 label 数据标签位置
      position: 'middle',
      // 'top', 'bottom', 'middle',
      // 配置样式
      style: {
        fill: '#FFFFFF',
        opacity: 0.6,
      },
    },
    xAxis: {
      label: {
        autoHide: true,
        autoRotate: false,
      },
    },
    meta: {
      count: {
        alias: '人数',
      },
    },
  }
  return <Column {...config} />
}

export default QEditorCheckboxStatistic
