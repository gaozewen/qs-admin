import ajax, { ResDataType } from './ajax'

type SearchOptions = {
  keyword: string
  isStar: boolean
  isDeleted: boolean
  page: number
  pageSize: number
}

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

// 获取问卷列表
export const getQuestionnaireListService = async (
  // Partial 意识是只要有这个类型中的一部分就行，类似于 ?
  opt: Partial<SearchOptions> = {}
): Promise<ResDataType> => {
  const url = `/api/questionnaire`
  // /api/questionnaire?a=1&b=2 ====> { a: 1, b: 2 }
  const data = (await ajax.get(url, { params: opt })) as ResDataType
  return data
}

// 更新单个问卷
export const updateQuestionnaireService = async (
  id: string,
  body: { [key: string]: any }
): Promise<ResDataType> => {
  const url = `/api/questionnaire/${id}`
  const data = (await ajax.patch(url, body)) as ResDataType
  return data
}

// 复制问卷
export const duplicateQuestionnaireService = async (id: string): Promise<ResDataType> => {
  const url = `/api/questionnaire/duplicate/${id}`
  const data = (await ajax.post(url)) as ResDataType
  return data
}
