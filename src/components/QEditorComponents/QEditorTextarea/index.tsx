import { Input, Typography } from 'antd'
import React, { FC } from 'react'

import QEditorTextareaPropsComponent from './QEditorTextareaPropsComponent'

const { Paragraph } = Typography
const { TextArea } = Input

export type QEditorTextareaPropsType = {
  title?: string
  placeholder?: string
  onChange?: (newProps: QEditorTextareaPropsType) => void
  disabled?: boolean
}

// 默认值
export const Q_EDITOR_TEXTAREA_DEFAULT_PROPS: QEditorTextareaPropsType = {
  title: '多行输入框标题',
  placeholder: '请输入...',
}

const QEditorTextarea: FC<QEditorTextareaPropsType> = (props: QEditorTextareaPropsType) => {
  const { title, placeholder } = { ...Q_EDITOR_TEXTAREA_DEFAULT_PROPS, ...props }

  return (
    <div>
      <Paragraph strong>{title}</Paragraph>
      <div>
        <TextArea placeholder={placeholder} />
      </div>
    </div>
  )
}

export const QEditorTextareaConfig = {
  title: '多行输入框',
  type: 'textarea',
  Component: QEditorTextarea,
  PropsComponent: QEditorTextareaPropsComponent,
  defaultProps: Q_EDITOR_TEXTAREA_DEFAULT_PROPS,
}

export default QEditorTextarea
