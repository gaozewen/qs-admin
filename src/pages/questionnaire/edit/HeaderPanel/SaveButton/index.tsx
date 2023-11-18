import { useDebounceEffect, useKeyPress, useRequest } from 'ahooks'
import { Button, message } from 'antd'
import React, { FC, useRef } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import useGetQEditorInfo from '@/hooks/useGetQEditorInfo'
import { updateQuestionnaireService } from '@/services/questionnaire'

const SaveButton: FC = () => {
  const { id = '' } = useParams()
  const nav = useNavigate()
  const { componentList, pageInfo } = useGetQEditorInfo()

  // 为了避免第一次进入编辑问卷页时因 redux 中的 componentList 和 pageInfo 由于获取接口数据变更而触发的一次无效的 patch
  const isFirstSaveRef = useRef(true)

  const onSaveHandler = async () => {
    if (!id) return
    if (isFirstSaveRef.current) {
      isFirstSaveRef.current = false
      return
    }
    await updateQuestionnaireService(id, { ...pageInfo, componentList })
  }

  const { loading, run: onSave } = useRequest(onSaveHandler, {
    manual: true,
    onSuccess() {
      message.success('保存成功')
      nav(-1)
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
