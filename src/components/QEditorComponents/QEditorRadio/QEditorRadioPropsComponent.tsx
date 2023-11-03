import React, { FC, useEffect } from 'react'
import { QEditorOptionType, QEditorRadioPropsType } from '.'
import { Button, Checkbox, Form, Input, Select, Space } from 'antd'
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons'
import { nanoid } from '@reduxjs/toolkit'

const QEditorRadioPropsComponent: FC<QEditorRadioPropsType> = (props: QEditorRadioPropsType) => {
  const { title, options, value, isVertical, onChange, disabled } = props
  const [form] = Form.useForm()

  useEffect(() => {
    // 监听 props 变化同步更新表单组件的值
    form.setFieldsValue({ title, options, value, isVertical })
  }, [title, options, value, isVertical])

  const onValuesChange = (_: any, values: any) => {
    values.options = values.options.map((opt: QEditorOptionType) => {
      if (opt == null) return { text: '', value: nanoid() }
      if (opt.value == null || opt.value == '') return { ...opt, value: nanoid() }
      return opt
    })

    if (onChange) {
      onChange(values)
    }
  }

  return (
    <Form
      layout="vertical"
      initialValues={{ title, options, value, isVertical }}
      form={form}
      onValuesChange={onValuesChange}
      disabled={disabled}
    >
      <Form.Item label="标题" name="title" rules={[{ required: true, message: '请输入标题' }]}>
        <Input />
      </Form.Item>

      <Form.Item label="选项" style={{ marginBottom: 0 }}>
        <Form.List name="options">
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name }, index) => (
                <Space key={key} align="baseline">
                  <Form.Item
                    name={[name, 'text']}
                    rules={[
                      { required: true, message: '请输入选项文字' },
                      ({ getFieldValue }) => ({
                        validator(_, text) {
                          const options = getFieldValue('options')
                          // 记录 text 相同的个数:
                          // 当 text 有值时，预期为 1
                          // 当 text 为''时，预期为 0
                          let num = 0
                          options.forEach((opt: QEditorOptionType) => {
                            if (text && opt.text === text) num++
                          })
                          //
                          if (num <= 1) return Promise.resolve()
                          else return Promise.reject(new Error('和其他选项重复了'))
                        },
                      }),
                    ]}
                  >
                    <Input placeholder="请输入选项文字..." />
                  </Form.Item>
                  {index > 1 && <MinusCircleOutlined onClick={() => remove(name)} />}
                </Space>
              ))}
              <Form.Item>
                <Button onClick={() => add()} type="link" block icon={<PlusOutlined />}>
                  添加选项
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>
      </Form.Item>

      <Form.Item label="默认选中" name="value">
        <Select
          options={[{ label: '不选中', value: '' }].concat(
            (options || []).map(opt => ({ label: opt.text, value: opt.value }))
          )}
        />
      </Form.Item>

      <Form.Item
        name="isVertical"
        // 由于 checkbox 没有 value 属性，而是 checked 来控制是否选中，所以这里用 checked 来代替 value 属性
        valuePropName="checked"
      >
        <Checkbox>竖向排列</Checkbox>
      </Form.Item>
    </Form>
  )
}

export default QEditorRadioPropsComponent
