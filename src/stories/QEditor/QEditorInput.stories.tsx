import type { Meta, StoryObj } from '@storybook/react'
import QEditorInput from '../../components/QEditorComponents/QEditorInput'

const meta = {
  title: 'QEditor/QEditorInput',
  component: QEditorInput,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof QEditorInput>

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
