import React, { FC, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { getQuestionnaireService } from '../../../services/questionnaire'

const Edit: FC = () => {
  const { id = '' } = useParams()

  useEffect(() => {
    // useEffect 没办法直接执行 async 函数，所以这么处理
    const fn = async () => {
      const data = await getQuestionnaireService(id)
      console.log('data', data)
    }
    fn()
  }, [])

  return <p>Edit {id}</p>
}

export default Edit
