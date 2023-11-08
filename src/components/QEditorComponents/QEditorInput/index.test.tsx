import { render, screen } from '@testing-library/react'
import React from 'react'

import QEditorInput from './index'

test('默认属性', () => {
  render(<QEditorInput />)

  const p = screen.getByText('输入框标题')
  expect(p).toBeInTheDocument()

  const input = screen.getByPlaceholderText('请输入...')
  expect(input).toBeInTheDocument()
})

test('传入属性', () => {
  render(<QEditorInput title="hello" placeholder="world" />)

  const p = screen.getByText('hello')
  expect(p).toBeInTheDocument()

  const input = screen.getByPlaceholderText('world')
  expect(input).toBeInTheDocument()
})
