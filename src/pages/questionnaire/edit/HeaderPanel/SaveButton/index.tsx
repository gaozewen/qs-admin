import { useKeyPress, useRequest } from 'ahooks'
import { Button, message } from 'antd'
import React, { FC } from 'react'
import { useParams } from 'react-router-dom'
import { updateQuestionnaireService } from '../../../../../services/questionnaire'
import useGetQEditorInfo from '../../../../../hooks/useGetQEditorInfo'

const SaveButton: FC = () => {
  const { id = '' } = useParams()
  const { componentList, pageInfo } = useGetQEditorInfo()
  const { loading, run: onSave } = useRequest(
    async () => {
      if (!id) return
      await updateQuestionnaireService(id, { ...pageInfo, componentList })
    },
    {
      manual: true,
      onSuccess() {
        message.success('保存成功')
      },
    }
  )

  useKeyPress(['ctrl.s', 'meta.s'], (event: KeyboardEvent) => {
    event.preventDefault()
    if (!loading) onSave()
  })

  return (
    <Button loading={loading} onClick={onSave}>
      保存
    </Button>
  )
}

export default SaveButton
