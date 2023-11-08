import { Checkbox, Form, Input, Select } from 'antd'
import React, { FC, useEffect } from 'react'

import { QEditorTitlePropsType } from '.'

const QEditorTitlePropsComponent: FC<QEditorTitlePropsType> = (props: QEditorTitlePropsType) => {
  const { text, level, isCenter, onChange, disabled } = props
  const [form] = Form.useForm()

  useEffect(() => {
    // 监听 props 变化同步更新表单组件的值
    form.setFieldsValue({ text, level, isCenter })
  }, [text, level, isCenter])

  const onValuesChange = (_: any, values: any) => {
    if (onChange) {
      onChange(values)
    }
  }

  return (
    <Form
      layout="vertical"
      initialValues={{ text, level, isCenter }}
      form={form}
      onValuesChange={onValuesChange}
      disabled={disabled}
    >
      <Form.Item
        label="标题内容"
        name="text"
        rules={[{ required: true, message: '请输入标题内容' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item label="层级" name="level">
        <Select
          options={[
            { value: 1, text: 1 },
            { value: 2, text: 2 },
            { value: 3, text: 3 },
          ]}
        />
      </Form.Item>
      <Form.Item
        name="isCenter"
        // 由于 checkbox 没有 value 属性，而是 checked 来控制是否选中，所以这里用 checked 来代替 value 属性
        valuePropName="checked"
      >
        <Checkbox>居中显示</Checkbox>
      </Form.Item>
    </Form>
  )
}

export default QEditorTitlePropsComponent
