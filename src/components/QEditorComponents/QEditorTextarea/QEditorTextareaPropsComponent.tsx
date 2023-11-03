import React, { FC, useEffect } from 'react'
import { QEditorTextareaPropsType } from '.'
import { Form, Input } from 'antd'

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
    >
      <Form.Item label="标题" name="title" rules={[{ required: true, message: '请输入标题' }]}>
        <Input disabled={disabled} />
      </Form.Item>
      <Form.Item label="Placeholder" name="placeholder">
        <Input disabled={disabled} />
      </Form.Item>
    </Form>
  )
}

export default QEditorTextareaPropsComponent
