import { Form, Input } from 'antd'
import React, { FC, useEffect } from 'react'

import { QEditorTextareaPropsType } from '.'

const QEditorTextareaPropsComponent: FC<QEditorTextareaPropsType> = (
  props: QEditorTextareaPropsType
) => {
  const { title, placeholder, onChange, disabled } = props
  const [form] = Form.useForm()

  useEffect(() => {
    // 监听 props 变化同步更新表单组件的值
    form.setFieldsValue({ title, placeholder })
  }, [title, placeholder])

  const onValuesChange = (_: any, values: any) => {
    if (onChange) {
      onChange(values)
    }
  }

  return (
    <Form
      layout="vertical"
      initialValues={{ title, placeholder }}
      form={form}
      onValuesChange={onValuesChange}
      disabled={disabled}
    >
      <Form.Item label="标题" name="title" rules={[{ required: true, message: '请输入标题' }]}>
        <Input />
      </Form.Item>
      <Form.Item label="Placeholder" name="placeholder">
        <Input />
      </Form.Item>
    </Form>
  )
}

export default QEditorTextareaPropsComponent
