import React, { FC } from 'react'
import { Input, Typography } from 'antd'
import QEditorInputPropsComponent from './QEditorInputPropsComponent'

const { Paragraph } = Typography

export type QEditorInputPropsType = {
  title?: string
  placeholder?: string
  onChange?: (newProps: QEditorInputPropsType) => void
  disabled?: boolean
}

// 默认值
export const Q_EDITOR_INPUT_DEFAULT_PROPS: QEditorInputPropsType = {
  title: '输入框标题',
  placeholder: '请输入',
}

const QEditorInput: FC<QEditorInputPropsType> = (props: QEditorInputPropsType) => {
  const { title, placeholder } = { ...Q_EDITOR_INPUT_DEFAULT_PROPS, ...props }

  return (
    <div>
      <Paragraph strong>{title}</Paragraph>
      <div>
        <Input placeholder={placeholder}></Input>
      </div>
    </div>
  )
}

export const QEditorInputConfig = {
  title: '输入框',
  type: 'input',
  Component: QEditorInput,
  PropsComponent: QEditorInputPropsComponent,
  defaultProps: Q_EDITOR_INPUT_DEFAULT_PROPS,
}

export default QEditorInput
