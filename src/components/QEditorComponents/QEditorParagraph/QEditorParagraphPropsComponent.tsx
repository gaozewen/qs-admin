import React, { FC, useEffect } from 'react'
import { QEditorParagraphPropsType } from '.'
import { Checkbox, Form, Input } from 'antd'

const { TextArea } = Input

const QEditorParagraphPropsComponent: FC<QEditorParagraphPropsType> = (
  props: QEditorParagraphPropsType
) => {
  const { text, isCenter, onChange, disabled } = props
  const [form] = Form.useForm()

  useEffect(() => {
    // 监听 props 变化同步更新表单组件的值
    form.setFieldsValue({ text, isCenter })
  }, [text, isCenter])

  const onValuesChange = (_: any, values: any) => {
    if (onChange) {
      onChange(values)
    }
  }

  return (
    <Form
      layout="vertical"
      initialValues={{ text, isCenter }}
      form={form}
      onValuesChange={onValuesChange}
      disabled={disabled}
    >
      <Form.Item
        label="段落内容"
        name="text"
        rules={[{ required: true, message: '请输入段落内容' }]}
      >
        <TextArea />
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

export default QEditorParagraphPropsComponent
