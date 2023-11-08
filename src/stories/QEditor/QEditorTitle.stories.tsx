import type { Meta, StoryObj } from '@storybook/react'
import QEditorTitle from '../../components/QEditorComponents/QEditorTitle'

const meta = {
  title: 'QEditor/QEditorTitle',
  component: QEditorTitle,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof QEditorTitle>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}

export const SetProps: Story = {
  args: {
    text: 'hello',
    level: 2,
    isCenter: true,
  },
}
