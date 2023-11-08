import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons'
import { nanoid } from '@reduxjs/toolkit'
import { Button, Checkbox, Form, Input, Space } from 'antd'
import React, { FC, useEffect } from 'react'

import { QEditorCheckboxItemType, QEditorCheckboxPropsType } from '.'

const QEditorCheckboxPropsComponent: FC<QEditorCheckboxPropsType> = (
  props: QEditorCheckboxPropsType
) => {
  const { title, list, isVertical, onChange, disabled } = props
  const [form] = Form.useForm()

  useEffect(() => {
    // 监听 props 变化同步更新表单组件的值
    form.setFieldsValue({ title, list, isVertical })
  }, [title, list, isVertical])

  const onValuesChange = (_: any, values: any) => {
    values.list = values.list.map((item: QEditorCheckboxItemType) => {
      if (item == null) return { text: '', value: nanoid() }
      if (item.value == null || item.value == '') return { ...item, value: nanoid() }
      return item
    })

    if (onChange) {
      onChange(values)
    }
  }

  return (
    <Form
      layout="vertical"
      initialValues={{ title, list, isVertical }}
      form={form}
      onValuesChange={onValuesChange}
      disabled={disabled}
    >
      <Form.Item label="标题" name="title" rules={[{ required: true, message: '请输入标题' }]}>
        <Input placeholder="请输入多选标题..." />
      </Form.Item>

      <Form.Item label="选项" style={{ marginBottom: 0 }}>
        <Form.List name="list">
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name }, index) => (
                <Space key={key} align="baseline">
                  <Form.Item name={[name, 'checked']} valuePropName="checked">
                    <Checkbox />
                  </Form.Item>
                  <Form.Item
                    name={[name, 'text']}
                    rules={[
                      { required: true, message: '请输入选项文字' },
                      ({ getFieldValue }) => ({
                        validator(_, text) {
                          const list = getFieldValue('list')
                          // 记录 text 相同的个数:
                          // 当 text 有值时，预期为 1
                          // 当 text 为''时，预期为 0
                          let num = 0
                          list.forEach((item: QEditorCheckboxItemType) => {
                            if (text && item.text === text) num++
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
                  {index > 1 && (
                    <MinusCircleOutlined
                      style={{
                        opacity: disabled ? 0.2 : 1,
                        cursor: disabled ? 'not-allowed' : 'pointer',
                      }}
                      onClick={() => {
                        if (disabled) return
                        remove(name)
                      }}
                    />
                  )}
                </Space>
              ))}
              <Form.Item>
                <Button
                  onClick={() => add({ text: '', value: '', checked: false })}
                  type="link"
                  block
                  icon={<PlusOutlined />}
                >
                  添加选项
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>
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

export default QEditorCheckboxPropsComponent
