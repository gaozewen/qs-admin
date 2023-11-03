import { FC } from 'react'
import { QEditorInputConfig, QEditorInputPropsType } from './QEditorInput'
import { QEditorTitleConfig, QEditorTitlePropsType } from './QEditorTitle'
import { QEditorParagraphConfig, QEditorParagraphPropsType } from './QEditorParagraph'
import { QEditorInfoConfig, QEditorInfoPropsType } from './QEditorInfo'
import { QEditorTextareaConfig, QEditorTextareaPropsType } from './QEditorTextarea'

// 所有组件统一的 Props 类型定义
export type QEditorComponentPropsType =
  | QEditorTitlePropsType
  | QEditorInputPropsType
  | QEditorParagraphPropsType
  | QEditorInfoPropsType
  | QEditorTextareaPropsType

// 所有组件统一的类型定义
export type QEditorComponentType =
  | FC<QEditorTitlePropsType>
  | FC<QEditorInputPropsType>
  | FC<QEditorParagraphPropsType>
  | FC<QEditorInfoPropsType>
  | FC<QEditorTextareaPropsType>

// 所有组件统一的 Config 类型定义
export type QEditorComponentConfigType = {
  title: string
  type: string
  defaultProps: QEditorComponentPropsType
  Component: QEditorComponentType
  PropsComponent: QEditorComponentType
}

// 所有组件的配置列表
const QEditorComponentConfigList: QEditorComponentConfigType[] = [
  QEditorTitleConfig,
  QEditorInputConfig,
  QEditorParagraphConfig,
  QEditorInfoConfig,
  QEditorTextareaConfig,
]

// 根据组件类型获取相应的组件配置
export const getComponentConfigByType = (componentType: string) => {
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
]
