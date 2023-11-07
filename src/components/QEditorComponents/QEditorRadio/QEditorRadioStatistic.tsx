import React, { FC } from 'react'
import { Pie, PieConfig } from '@ant-design/plots'

export type QEditorRadioStatisticPropsType = {
  statistic: { name: string; count: number }[]
}

const QEditorRadioStatistic: FC<QEditorRadioStatisticPropsType> = props => {
  const { statistic: data = [] } = props
  const config: PieConfig = {
    appendPadding: 10,
    data,
    angleField: 'count',
    colorField: 'name',
    radius: 0.8,
    label: {
      type: 'inner',
      offset: '-8%',
      content: '{name} {percentage}',
    },
    interactions: [
      {
        type: 'pie-legend-active',
      },
      {
        type: 'element-active',
      },
    ],
    legend: {
      layout: 'horizontal',
      position: 'bottom',
    },
  }

  return <Pie {...config} />
}

export default QEditorRadioStatistic
