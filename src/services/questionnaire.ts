import ajax, { ResDataType } from './ajax'

export const getQuestionnaireService = async (id: string): Promise<ResDataType> => {
  const url = `/api/questionnaire/${id}`
  const data = (await ajax.get(url)) as ResDataType
  return data
}
