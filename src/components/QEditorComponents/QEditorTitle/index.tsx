import React, { FC } from 'react'
import { QEditorTitlePropsType, Q_EDITOR_TITLE_DEFAULT_PROPS } from './types'
import { Typography } from 'antd'

const { Title } = Typography

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
          marginBottom: 0,
        }}
      >
        {text}
      </Title>
    </div>
  )
}

export default QEditorTitle
