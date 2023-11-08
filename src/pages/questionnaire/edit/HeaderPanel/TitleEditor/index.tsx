import { EditOutlined } from '@ant-design/icons'
import { Button, Input, Space, Typography } from 'antd'
import React, { ChangeEvent, FC, useState } from 'react'
import { useDispatch } from 'react-redux'

import useGetQEditorInfo from '@/hooks/useGetQEditorInfo'
import { changePageTitleAction } from '@/store/qEditorReducer'

const { Title } = Typography

const TitleEditor: FC = () => {
  const { pageInfo } = useGetQEditorInfo()
  const { title } = pageInfo
  const [isEditing, setIsEditing] = useState(false)
  const dispatch = useDispatch()

  const onClick = () => {
    setIsEditing(true)
  }

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newTitle = event.target.value.trim()
    dispatch(changePageTitleAction(newTitle))
  }

  const onBlur = () => {
    setIsEditing(false)
  }

  if (isEditing)
    return (
      <Input
        value={title}
        placeholder="请输入标题..."
        onChange={onChange}
        onPressEnter={onBlur}
        onBlur={onBlur}
      />
    )

  return (
    <Space>
      {title ? <Title>{title}</Title> : <span style={{ color: '#bfbfbf' }}>请输入问卷标题...</span>}
      <Button type="text" icon={<EditOutlined />} onClick={onClick} />
    </Space>
  )
}

export default TitleEditor
