import type { Meta, StoryObj } from '@storybook/react'

import QEditorInfo from '@/components/QEditorComponents/QEditorInfo'

const meta = {
  title: 'QEditor/QEditorInfo',
  component: QEditorInfo,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof QEditorInfo>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}

export const SetProps: Story = {
  args: {
    title: 'hello',
    desc: 'world',
  },
}

export const DescBreakLine: Story = {
  args: {
    title: 'hello',
    desc: 'world\nworld\nworld', // 换行
  },
}
