import React from 'react'
import { render, screen } from '@testing-library/react'
import QEditorTitle from '.'

test('默认属性', () => {
  // 渲染组件
  render(<QEditorTitle />)
  const h = screen.getByText('一行标题')
  // 断言，元素在 document 里
  expect(h).toBeInTheDocument()
})

test('传入属性', () => {
  render(<QEditorTitle text="hello" level={2} isCenter={true} />)

  // 测试 hello 属性
  const h = screen.getByText('hello')
  expect(h).toBeInTheDocument()

  // 测试 level 属性
  expect(h.matches('h2')).toBeTruthy()

  // 测试 isCenter 属性
  const style = h.style
  expect(style.textAlign).toBe('center')
})
