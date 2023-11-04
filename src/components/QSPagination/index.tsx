import { Pagination } from 'antd'
import React, { FC, useEffect, useState } from 'react'
import { C_LIST_PAGE_SIZE, C_LIST_PAGE_PARAM_KEY, C_LIST_PAGE_SIZE_PARAM_KEY } from '../../constant'
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom'

type PropType = {
  total: number
}

const QSPagination: FC<PropType> = (props: PropType) => {
  const { total } = props
  const [current, setCurrent] = useState(1)
  const [pageSize, setPageSize] = useState(C_LIST_PAGE_SIZE)
  const [searchParams] = useSearchParams()
  const nav = useNavigate()
  const { pathname } = useLocation()

  useEffect(() => {
    // 将 url 中参数同步到 Pagination 组件中
    const urlPage = parseInt(searchParams.get(C_LIST_PAGE_PARAM_KEY) || '') || 1
    const urlPageSize =
      parseInt(searchParams.get(C_LIST_PAGE_SIZE_PARAM_KEY) || '') || C_LIST_PAGE_SIZE
    setCurrent(urlPage)
    setPageSize(urlPageSize)
  }, [searchParams])

  const pageChangeHandler = (page: number, pageSize: number) => {
    // 页码改变时同步改变 url 参数
    searchParams.set(C_LIST_PAGE_PARAM_KEY, page.toString())
    searchParams.set(C_LIST_PAGE_SIZE_PARAM_KEY, pageSize.toString())
    nav(
      {
        pathname,
        search: searchParams.toString(),
      },
      { replace: true }
    )
  }

  return (
    <Pagination current={current} total={total} pageSize={pageSize} onChange={pageChangeHandler} />
  )
}

export default QSPagination
