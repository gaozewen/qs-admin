import React, { FC, useEffect } from 'react'
import { Form, Input } from 'antd'
import useGetQEditorInfo from '../../../../../hooks/useGetQEditorInfo'
import { useDispatch } from 'react-redux'
import { resetPageInfoAction } from '../../../../../store/qEditorReducer'

const { TextArea } = Input

const PageSettings: FC = () => {
  const { pageInfo } = useGetQEditorInfo()
  const { title, desc, js, css } = pageInfo
  const [form] = Form.useForm()
  const dispatch = useDispatch()

  useEffect(() => {
    form.setFieldsValue({ title, desc, js, css })
  }, [title, desc, js, css])

  const onValuesChange = (_: any, values: any) => {
    dispatch(resetPageInfoAction(values))
  }

  return (
    <Form
      layout="vertical"
      initialValues={{ title, desc, js, css }}
      form={form}
      onValuesChange={onValuesChange}
    >
      <Form.Item label="问卷标题" name="title" rules={[{ required: true, message: '请输入标题' }]}>
        <Input placeholder="请输入标题..." />
      </Form.Item>

      <Form.Item label="问卷描述" name="desc">
        <TextArea placeholder="请输入问卷描述..." />
      </Form.Item>

      <Form.Item label="样式代码" name="css">
        <TextArea placeholder="请输 CSS 样式代码..." />
      </Form.Item>

      <Form.Item label="脚本代码" name="js">
        <TextArea placeholder="请输 JS 样式代码..." />
      </Form.Item>
    </Form>
  )
}

export default PageSettings
