import ajax, { ResDataType } from './ajax'

type SearchOptions = {
  page: number
  pageSize: number
}

// 获取统计列表
export const getStatisticListService = async (
  questionnaireId: string,
  opt: SearchOptions
): Promise<ResDataType> => {
  const url = `/api/statistic/${questionnaireId}`
  const data = (await ajax.get(url, { params: opt })) as ResDataType
  return data
}
