import { Typography } from 'antd'
import React, { FC } from 'react'

import QEditorTitlePropsComponent from './QEditorTitlePropsComponent'

const { Title } = Typography

export type QEditorTitlePropsType = {
  text?: string
  level?: 1 | 2 | 3 | 4 | 5
  isCenter?: boolean
  onChange?: (newProps: QEditorTitlePropsType) => void
  disabled?: boolean
}

// 默认值
export const Q_EDITOR_TITLE_DEFAULT_PROPS: QEditorTitlePropsType = {
  text: '一行标题',
  level: 1,
  isCenter: false,
}

const QEditorTitle: FC<QEditorTitlePropsType> = (props: QEditorTitlePropsType) => {
  const { text = '', level = 1, isCenter = false } = { ...Q_EDITOR_TITLE_DEFAULT_PROPS, ...props }

  const genFontSize = (level: number) => {
    if (level === 1) return '24px'
    if (level === 2) return '20px'
    if (level === 3) return '16px'
    return '16px'
  }
  return (
    <div>
      <Title
        level={level}
        style={{
          textAlign: isCenter ? 'center' : 'start',
          fontSize: genFontSize(level),
          margin: 0,
        }}
      >
        {text}
      </Title>
    </div>
  )
}

export const QEditorTitleConfig = {
  title: '标题',
  type: 'title',
  Component: QEditorTitle,
  PropsComponent: QEditorTitlePropsComponent,
  defaultProps: Q_EDITOR_TITLE_DEFAULT_PROPS,
}

export default QEditorTitle
