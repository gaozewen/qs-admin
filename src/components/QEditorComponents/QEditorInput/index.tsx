import React, { FC } from 'react'
import { QEditorInputPropsType, Q_EDITOR_INPUT_DEFAULT_PROPS } from './types'
import { Input, Typography } from 'antd'

const { Paragraph } = Typography

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
