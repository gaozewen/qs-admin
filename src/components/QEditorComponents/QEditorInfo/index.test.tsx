import { render, screen } from '@testing-library/react'
import React from 'react'

import QEditorInfo from '.'

test('默认属性', () => {
  // 渲染组件
  render(<QEditorInfo />)
  const h = screen.getByText('问卷标题')
  // 断言，元素在 document 里
  expect(h).toBeInTheDocument()
})

test('传入属性', () => {
  render(<QEditorInfo title="hello" desc="world" />)

  const h = screen.getByText('hello')
  expect(h).toBeInTheDocument()

  const p = screen.getByText('world')
  expect(p).toBeInTheDocument()
})

test('多行文字', () => {
  render(<QEditorInfo desc={'a\nb\nc'} />)

  const span = screen.getByText('a')
  expect(span).toBeInTheDocument()

  expect(span).toHaveTextContent('a')
  // 被换行了
  expect(span).not.toHaveTextContent('ab')
})
