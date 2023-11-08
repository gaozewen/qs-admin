import { Radio, Space, Typography } from 'antd'
import React, { FC } from 'react'

const { Paragraph } = Typography
export type QEditorRadioOptionType = {
  text: string
  value: string
}

export type QEditorRadioPropsType = {
  title?: string
  options?: QEditorRadioOptionType[]
  value?: string
  isVertical?: boolean
  onChange?: (newProps: QEditorRadioPropsType) => void
  disabled?: boolean
}

// 默认值
export const Q_EDITOR_RADIO_DEFAULT_PROPS: QEditorRadioPropsType = {
  title: '单选标题',
  options: [
    { text: '选项1', value: 'item1' },
    { text: '选项2', value: 'item2' },
    { text: '选项3', value: 'item3' },
  ],
  // 默认选中
  value: '',
  isVertical: false,
}

const QEditorRadio: FC<QEditorRadioPropsType> = (props: QEditorRadioPropsType) => {
  const { title, options, value, isVertical } = { ...Q_EDITOR_RADIO_DEFAULT_PROPS, ...props }

  return (
    <div>
      <Paragraph strong>{title}</Paragraph>
      <div>
        <Radio.Group value={value}>
          <Space direction={isVertical ? 'vertical' : 'horizontal'}>
            {options?.map(opt => (
              <Radio key={opt.value} value={opt.value}>
                {opt.text}
              </Radio>
            ))}
          </Space>
        </Radio.Group>
      </div>
    </div>
  )
}

export default QEditorRadio
