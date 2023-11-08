import React from 'react'
import { render, screen } from '@testing-library/react'

import QEditorTextarea from './'

test('默认属性', () => {
  render(<QEditorTextarea />)

  const p = screen.getByText('多行输入框标题')
  expect(p).toBeInTheDocument()

  const textarea = screen.getByPlaceholderText('请输入...')
  expect(textarea).toBeInTheDocument()
})

test('传入属性', () => {
  render(<QEditorTextarea title="hello" placeholder="world" />)

  const p = screen.getByText('hello')
  expect(p).toBeInTheDocument()

  const textarea = screen.getByPlaceholderText('world')
  expect(textarea).toBeInTheDocument()
})
