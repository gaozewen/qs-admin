import { useParams } from 'react-router-dom'
import { getQuestionnaireService } from '../services/questionnaire'
import { useRequest } from 'ahooks'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { resetQEditorAction } from '../store/qEditorReducer'

const useLoadQuestionnaireData = () => {
  const { id = '' } = useParams()
  const dispatch = useDispatch()

  // ajax 获取问卷数据
  const { loading, data, error, run } = useRequest(
    async (id: string) => {
      return await getQuestionnaireService(id)
    },
    {
      manual: true,
    }
  )

  useEffect(() => {
    // 根据后端返回的问卷数据来设置 redux 中的 qEditor
    if (!data) return
    const { componentList = [] } = data
    let selectedId = ''
    if (componentList && componentList.length > 0) {
      // 默认选中第一个组件
      selectedId = componentList[0].fe_id
    }
    dispatch(resetQEditorAction({ componentList, selectedId }))
  }, [data])

  useEffect(() => {
    run(id)
  }, [id])

  return { loading, error }
}

export default useLoadQuestionnaireData
