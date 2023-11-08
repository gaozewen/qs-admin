import { useRequest } from 'ahooks'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'

import { getQuestionnaireService } from '@/services/questionnaire'
import { resetQEditorAction } from '@/store/qEditorReducer'

const useLoadQuestionnaireData = () => {
  const { id = '' } = useParams()
  const dispatch = useDispatch()
  // 默认 loading 为 true
  const [loading, setLoading] = useState(true)
  // ajax 获取问卷数据
  const { error, run } = useRequest(
    async (id: string) => {
      return await getQuestionnaireService(id)
    },
    {
      manual: true,
      onSuccess: result => {
        // 根据后端返回的问卷数据来设置 redux 中的 qEditor
        if (!result) return
        const { componentList = [], title = '', desc = '', js = '', css = '', isPublished } = result
        let selectedId = ''
        if (componentList && componentList.length > 0) {
          // 默认选中第一个组件
          selectedId = componentList[0].fe_id
        }
        dispatch(
          resetQEditorAction({
            componentList,
            selectedId,
            copiedComponentInfo: null,
            pageInfo: {
              title,
              desc,
              js,
              css,
              isPublished,
            },
          })
        )
      },
      onFinally: () => {
        setLoading(false)
      },
    }
  )

  useEffect(() => {
    run(id)
  }, [id])

  return { loading, error }
}

export default useLoadQuestionnaireData
