import { FC } from 'react'

import { QEditorCheckboxPropsType } from './QEditorCheckbox'
import { QEditorCheckboxConfig } from './QEditorCheckbox/config'
import { QEditorCheckboxStatisticPropsType } from './QEditorCheckbox/QEditorCheckboxStatistic'
import { QEditorInfoConfig, QEditorInfoPropsType } from './QEditorInfo'
import { QEditorInputConfig, QEditorInputPropsType } from './QEditorInput'
import { QEditorParagraphConfig, QEditorParagraphPropsType } from './QEditorParagraph'
import { QEditorRadioPropsType } from './QEditorRadio'
import { QEditorRadioConfig } from './QEditorRadio/config'
import { QEditorRadioStatisticPropsType } from './QEditorRadio/QEditorRadioStatistic'
import { QEditorTextareaConfig, QEditorTextareaPropsType } from './QEditorTextarea'
import { QEditorTitleConfig, QEditorTitlePropsType } from './QEditorTitle'

// 所有组件统一的 Props 类型定义
export type QEditorComponentPropsType = QEditorTitlePropsType &
  QEditorInputPropsType &
  QEditorParagraphPropsType &
  QEditorInfoPropsType &
  QEditorTextareaPropsType &
  QEditorRadioPropsType &
  QEditorCheckboxPropsType

// 所有组件统一的类型定义
export type QEditorComponentType =
  | FC<QEditorTitlePropsType>
  | FC<QEditorInputPropsType>
  | FC<QEditorParagraphPropsType>
  | FC<QEditorInfoPropsType>
  | FC<QEditorTextareaPropsType>
  | FC<QEditorRadioPropsType>
  | FC<QEditorCheckboxPropsType>

// 所有统计组件的类型定义
export type QEditorStatisticType =
  | FC<QEditorRadioStatisticPropsType>
  | FC<QEditorCheckboxStatisticPropsType>

// 所有组件统一的 Config 类型定义
export type QEditorComponentConfigType = {
  title: string
  type: string
  defaultProps: QEditorComponentPropsType
  Component: QEditorComponentType
  PropsComponent: QEditorComponentType
  StatisticComponent?: QEditorStatisticType
}

// 所有组件的配置列表
const QEditorComponentConfigList: QEditorComponentConfigType[] = [
  QEditorTitleConfig,
  QEditorInputConfig,
  QEditorParagraphConfig,
  QEditorInfoConfig,
  QEditorTextareaConfig,
  QEditorRadioConfig,
  QEditorCheckboxConfig,
]

// 根据组件类型获取相应的组件配置
export const getComponentConfigByType = (
  componentType: string
): QEditorComponentConfigType | undefined => {
  return QEditorComponentConfigList.find(item => item.type === componentType)
}

// 对所有组件配置进行分组
export const QEditorComponentConfigGroup = [
  {
    groupId: 'textGroup',
    groupName: '文本显示',
    configs: [QEditorInfoConfig, QEditorTitleConfig, QEditorParagraphConfig],
  },
  {
    groupId: 'inputGroup',
    groupName: '用户输入',
    configs: [QEditorInputConfig, QEditorTextareaConfig],
  },
  {
    groupId: 'chooseGroup',
    groupName: '用户选择',
    configs: [QEditorRadioConfig, QEditorCheckboxConfig],
  },
]
