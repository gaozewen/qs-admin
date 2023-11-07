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

// 获取单个组件的统计数据汇总
export const getComponentStatisticService = async (
  questionnaireId: string,
  componentId: string
): Promise<ResDataType> => {
  const url = `/api/statistic/${questionnaireId}/${componentId}`
  const data = (await ajax.get(url)) as ResDataType
  return data
}
