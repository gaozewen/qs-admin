import React, { FC, useEffect } from 'react'
import { QEditorInfoPropsType } from '.'
import { Form, Input } from 'antd'

const { TextArea } = Input

const QEditorInfoPropsComponent: FC<QEditorInfoPropsType> = (props: QEditorInfoPropsType) => {
  const { title, desc, onChange, disabled } = props
  const [form] = Form.useForm()

  useEffect(() => {
    // 监听 props 变化同步更新表单组件的值
    form.setFieldsValue({ title, desc })
  }, [title, desc])

  const onValuesChange = (_: any, values: any) => {
    if (onChange) {
      onChange(values)
    }
  }

  return (
    <Form
      layout="vertical"
      initialValues={{ title, desc }}
      form={form}
      onValuesChange={onValuesChange}
      disabled={disabled}
    >
      <Form.Item
        label="问卷标题"
        name="title"
        rules={[{ required: true, message: '请输入问卷标题' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item label="问卷描述" name="desc">
        <TextArea />
      </Form.Item>
    </Form>
  )
}

export default QEditorInfoPropsComponent
