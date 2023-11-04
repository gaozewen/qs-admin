import React, { ChangeEvent, FC, useEffect, useState } from 'react'
import { Input } from 'antd'
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import { C_LIST_SEARCH_PARAM_KEY } from '../../constant'

const { Search } = Input

const ListSearch: FC = () => {
  const [value, setValue] = useState('')
  const nav = useNavigate()
  const { pathname } = useLocation()
  const [searchParams] = useSearchParams()

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value)
  }

  const onSearch = (val: string) => {
    // 跳转到对应的页面，并增加 url 参数
    nav({
      pathname,
      search: `${C_LIST_SEARCH_PARAM_KEY}=${val}`,
    })
  }

  useEffect(() => {
    // 获取 url 参数，并设置到 input value
    const urlValue = searchParams.get(C_LIST_SEARCH_PARAM_KEY) || ''
    setValue(urlValue)
  }, [searchParams])

  return (
    <Search
      size="large"
      allowClear
      placeholder="请输入关键字"
      value={value}
      onChange={onChange}
      onSearch={onSearch}
      style={{ width: '260px' }}
    />
  )
}

export default ListSearch
