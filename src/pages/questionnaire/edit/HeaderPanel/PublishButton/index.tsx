import { useRequest } from 'ahooks'
import { Button, message } from 'antd'
import React, { FC } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import useGetQEditorInfo from '@/hooks/useGetQEditorInfo'
import { PN_QUESTIONNAIRE_STATISTIC } from '@/router'
import { updateQuestionnaireService } from '@/services/questionnaire'

const PublishButton: FC = () => {
  const { id = '' } = useParams()
  const { componentList, pageInfo } = useGetQEditorInfo()
  const nav = useNavigate()

  const { loading, run } = useRequest(
    async () => {
      await updateQuestionnaireService(id, { ...pageInfo, componentList, isPublish: true })
    },
    {
      manual: true,
      onSuccess() {
        message.success('发布成功')
        // 跳转到数据统计页
        nav(`${PN_QUESTIONNAIRE_STATISTIC}/${id}`)
      },
    }
  )

  const onPublish = () => {
    if (!id) {
      message.error('问卷 ID 丢失无法发布')
      return
    }
    // TODO: 发布前需要校验数据完整性，若果不完整，默认指引用户修改第一处校验错误，n+1 处错误则在第二次用户点击发布时再做指引
    run()
  }

  return (
    <Button type="primary" loading={loading} onClick={onPublish}>
      发布
    </Button>
  )
}

export default PublishButton
