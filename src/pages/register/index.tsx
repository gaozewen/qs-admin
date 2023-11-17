import { UserAddOutlined } from '@ant-design/icons'
import { useRequest } from 'ahooks'
import { Button, Form, Input, message, Space, Typography } from 'antd'
import React, { FC } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { PN_LOGIN } from '@/router'
import { registerService } from '@/services/user'
import { rememberAccount } from '@/utils/account'

import styles from './index.module.scss'

const { Title } = Typography

type ValuesType = {
  username: string
  password: string
  confirm: string
  nickname: string
}

const Register: FC = () => {
  const nav = useNavigate()
  const { run: onRegister, loading } = useRequest(
    async (username: string, password: string, nickname: string) => {
      return await registerService(username, password, nickname)
    },
    {
      manual: true,
      onSuccess(result = {}) {
        const { username, password } = result
        rememberAccount(username, password)
        message.success('注册成功')
        nav(PN_LOGIN)
      },
    }
  )

  const onFinish = (values: ValuesType) => {
    const { username, password, nickname } = values
    onRegister(username, password, nickname)
  }

  return (
    <div className={styles.container}>
      <div>
        <Space>
          <Title level={2}>
            <UserAddOutlined />
          </Title>
          <Title level={2}>注册新用户</Title>
        </Space>
      </div>
      <div>
        <Form labelCol={{ span: 6 }} wrapperCol={{ span: 16 }} onFinish={onFinish}>
          <Form.Item
            label="用户名"
            name="username"
            rules={[
              { required: true, message: '请输入用户名' },
              { type: 'string', min: 5, max: 20, message: '字符长度在 5-20 之间' },
              { pattern: /^\w+$/, message: '只能是字母数字下划线' },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="密码"
            name="password"
            rules={[{ required: true, message: '请输入密码' }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            label="确认密码"
            name="confirm"
            // password 变化会触发 confirm 的校验
            dependencies={['password']}
            rules={[
              { required: true, message: '请输入密码' },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) return Promise.resolve()
                  else return Promise.reject(new Error('两次密码不一致'))
                },
              }),
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item label="昵称" name="nickname">
            <Input />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 6, span: 16 }}>
            <Space>
              <Button type="primary" htmlType="submit" loading={loading}>
                注册
              </Button>
              <Link to={PN_LOGIN}>有账户，去登录</Link>
            </Space>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}

export default Register
