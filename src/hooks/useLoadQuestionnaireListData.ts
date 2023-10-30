import { useRequest } from 'ahooks'
import { useSearchParams } from 'react-router-dom'
import { C_LIST_SEARCH_PARAM_KEY } from '../constant'
import { getQuestionnaireListService } from '../services/questionnaire'
type Options = {
  isStar: boolean
  isDeleted: boolean
}
const useLoadQuestionnaireListData = (opt?: Partial<Options>) => {
  const { isStar, isDeleted } = opt || {}
  const [searchParams] = useSearchParams()

  const { loading, data, error } = useRequest(
    async () => {
      const keyword = searchParams.get(C_LIST_SEARCH_PARAM_KEY) || ''
      const data = await getQuestionnaireListService({ keyword, isStar, isDeleted })
      return data
    },
    {
      // 只要查询参数改变，则自动重新执行上面的函数
      refreshDeps: [searchParams],
    }
  )

  return { loading, data, error }
}

export default useLoadQuestionnaireListData
