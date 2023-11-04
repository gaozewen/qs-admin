import { useDebounceEffect, useKeyPress, useRequest } from 'ahooks'
import { Button, message } from 'antd'
import React, { FC } from 'react'
import { useParams } from 'react-router-dom'
import { updateQuestionnaireService } from '../../../../../services/questionnaire'
import useGetQEditorInfo from '../../../../../hooks/useGetQEditorInfo'

const SaveButton: FC = () => {
  const { id = '' } = useParams()
  const { componentList, pageInfo } = useGetQEditorInfo()
  const onSaveHandler = async () => {
    if (!id) return
    await updateQuestionnaireService(id, { ...pageInfo, componentList })
  }
  const { loading, run: onSave } = useRequest(onSaveHandler, {
    manual: true,
    onSuccess() {
      message.success('保存成功')
    },
  })

  useKeyPress(['ctrl.s', 'meta.s'], (event: KeyboardEvent) => {
    event.preventDefault()
    if (!loading) onSave()
  })

  // 自动保存（监听要保存数据的变化，使用防抖 1s 保存一次增加用户体验同时减轻服务器压力）
  useDebounceEffect(
    () => {
      // 直接使用，因为不需要 loading 和 toast
      onSaveHandler()
    },
    [pageInfo, componentList],
    { wait: 1000 }
  )

  return (
    <Button loading={loading} onClick={onSave}>
      保存
    </Button>
  )
}

export default SaveButton
