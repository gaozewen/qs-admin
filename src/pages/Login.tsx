import React, { FC, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Button, Checkbox, Form, Input, Space, Typography, message } from 'antd'
import { UserAddOutlined } from '@ant-design/icons'
import styles from './Login.module.scss'
import { Link } from 'react-router-dom'
import { useRequest } from 'ahooks'
import { loginService } from '../services/user'
import { PN_REGISTER } from '../router'
import { setToken } from '../utils/user-token'
import { loginReducer } from '../store/userReducer'

const { Title } = Typography

type ValuesType = {
  username: string
  password: string
  remember: boolean
}

const KEY_USERNAME = 'username'
const KEY_PASSWORD = 'password'

const rememberAccount = (username: string, password: string) => {
  localStorage.setItem(KEY_USERNAME, username)
  localStorage.setItem(KEY_PASSWORD, password)
}

const deleteAccountFromLocalStorage = () => {
  localStorage.removeItem(KEY_USERNAME)
  localStorage.removeItem(KEY_PASSWORD)
}

const getAccountFromLocalStorage = () => {
  return {
    username: localStorage.getItem(KEY_USERNAME),
    password: localStorage.getItem(KEY_PASSWORD),
  }
}

const Login: FC = () => {
  const [form] = Form.useForm()

  const dispatch = useDispatch()

  useEffect(() => {
    const { username, password } = getAccountFromLocalStorage()
    form.setFieldsValue({ username, password })
  }, [])

  const { run: onLogin, loading } = useRequest(
    async (username: string, password: string) => {
      return await loginService(username, password)
    },
    {
      manual: true,
      async onSuccess(result) {
        const { token = '', username, nickname } = result
        // 存储 token
        setToken(token)
        dispatch(loginReducer({ username, nickname }))
        message.success('登录成功')
        // 使用 useAutoNavigate 控制登录后的路由跳转 nav(PN_MANAGE_INDEX)
      },
    }
  )

  const onFinish = (values: ValuesType) => {
    const { username, password } = values || {}
    onLogin(username, password)
    if (values.remember) {
      rememberAccount(username, password)
    } else {
      deleteAccountFromLocalStorage()
    }
  }

  return (
    <div className={styles.container}>
      <div>
        <Space>
          <Title level={2}>
            <UserAddOutlined />
          </Title>
          <Title level={2}>用户登录</Title>
        </Space>
      </div>
      <div>
        <Form
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ remember: true }}
          form={form}
          onFinish={onFinish}
        >
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

          <Form.Item name="remember" valuePropName="checked" wrapperCol={{ offset: 6, span: 16 }}>
            <Checkbox>记住我</Checkbox>
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 6, span: 16 }}>
            <Space>
              <Button type="primary" htmlType="submit" loading={loading}>
                登录
              </Button>
              <Link to={PN_REGISTER}>注册新用户</Link>
            </Space>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}

export default Login
