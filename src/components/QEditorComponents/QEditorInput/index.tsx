import React, { FC } from 'react'
import { Input, Typography } from 'antd'

const { Paragraph } = Typography

export type QEditorInputPropsType = {
  title?: string
  placeholder?: string
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

export default QEditorInput
