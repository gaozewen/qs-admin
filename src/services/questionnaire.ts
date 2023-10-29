import ajax, { ResDataType } from './ajax'

// 获取单个问卷信息
export const getQuestionnaireService = async (id: string): Promise<ResDataType> => {
  const url = `/api/questionnaire/${id}`
  const data = (await ajax.get(url)) as ResDataType
  return data
}

// 创建问卷
export const createQuestionnaireService = async (): Promise<ResDataType> => {
  const url = `/api/questionnaire`
  const data = (await ajax.post(url)) as ResDataType
  return data
}
