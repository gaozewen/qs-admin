import { useParams } from 'react-router-dom'
import { getQuestionnaireService } from '../services/questionnaire'
import { useRequest } from 'ahooks'

const useLoadQuestionnaireData = () => {
  const { id = '' } = useParams()
  const fn = async () => {
    return await getQuestionnaireService(id)
  }
  const { loading, data, error } = useRequest(fn)

  return { loading, data, error }
}

export default useLoadQuestionnaireData
