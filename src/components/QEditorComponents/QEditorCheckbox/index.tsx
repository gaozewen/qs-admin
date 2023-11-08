import React, { FC } from 'react'
import { Checkbox, Space, Typography } from 'antd'

const { Paragraph } = Typography
export type QEditorCheckboxItemType = {
  text: string
  value: string
  checked: boolean
}

export type QEditorCheckboxPropsType = {
  title?: string
  list?: QEditorCheckboxItemType[]
  isVertical?: boolean
  onChange?: (newProps: QEditorCheckboxPropsType) => void
  disabled?: boolean
}

// 默认值
export const Q_EDITOR_CHECKBOX_DEFAULT_PROPS: QEditorCheckboxPropsType = {
  title: '多选标题',
  list: [
    { text: '选项1', value: 'item1', checked: false },
    { text: '选项2', value: 'item2', checked: false },
    { text: '选项3', value: 'item3', checked: false },
  ],
  isVertical: false,
}

const QEditorCheckbox: FC<QEditorCheckboxPropsType> = (props: QEditorCheckboxPropsType) => {
  const { title, list, isVertical } = { ...Q_EDITOR_CHECKBOX_DEFAULT_PROPS, ...props }

  return (
    <div>
      <Paragraph strong>{title}</Paragraph>
      <div>
        <Space direction={isVertical ? 'vertical' : 'horizontal'}>
          {list?.map(item => (
            <Checkbox key={item.value} value={item.value} checked={item.checked}>
              {item.text}
            </Checkbox>
          ))}
        </Space>
      </div>
    </div>
  )
}

export default QEditorCheckbox
