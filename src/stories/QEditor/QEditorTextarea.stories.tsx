import type { Meta, StoryObj } from '@storybook/react'
import QEditorTextarea from '../../components/QEditorComponents/QEditorTextarea'

const meta = {
  title: 'QEditor/QEditorTextarea',
  component: QEditorTextarea,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof QEditorTextarea>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}

export const SetProps: Story = {
  args: {
    title: 'Custom title',
    placeholder: 'Type here...',
  },
}
