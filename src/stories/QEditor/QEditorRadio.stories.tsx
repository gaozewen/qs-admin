import type { Meta, StoryObj } from '@storybook/react'

import QEditorRadio from '@/components/QEditorComponents/QEditorRadio'

const meta = {
  title: 'QEditor/QEditorRadio',
  component: QEditorRadio,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof QEditorRadio>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}

export const SetProps: Story = {
  args: {
    title: 'hello',
    options: [
      { value: 'v1', text: 't1' },
      { value: 'v2', text: 't2' },
      { value: 'v3', text: 't3' },
    ],
    value: 'v1',
    isVertical: true,
  },
}
