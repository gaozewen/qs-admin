import type { Meta, StoryObj } from '@storybook/react'

import QEditorParagraph from '@/components/QEditorComponents/QEditorParagraph'

const meta = {
  title: 'QEditor/QEditorParagraph',
  component: QEditorParagraph,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof QEditorParagraph>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}

export const SetProps: Story = {
  args: {
    text: 'hello',
    isCenter: true,
  },
}

export const BreakLine: Story = {
  args: {
    text: 'hello\nhello\nhello',
  },
}
