import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { getQuestionnaireService } from '../services/questionnaire'

const useLoadQuestionnaireData = () => {
  const { id = '' } = useParams()
  const [loading, setLoading] = useState(true)
  const [questionnaireData, setQuestionnaireData] = useState({})

  useEffect(() => {
    const fn = async () => {
      const data = await getQuestionnaireService(id)
      setQuestionnaireData(data)
      setLoading(false)
    }
    fn()
  }, [])

  return { loading, questionnaireData }
}

export default useLoadQuestionnaireData
