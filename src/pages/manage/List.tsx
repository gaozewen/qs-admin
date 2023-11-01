import React, { FC, useEffect, useMemo, useRef, useState } from 'react'
import { useDebounceFn, useRequest, useTitle } from 'ahooks'
import { Empty, Spin, Typography } from 'antd'
import styles from './common.module.scss'
import QuestionnaireCard from '../../components/QuestionnaireCard'
import ListSearch from '../../components/ListSearch'
import { Questionnaire } from '../../types'
import { useSearchParams } from 'react-router-dom'
import { getQuestionnaireListService } from '../../services/questionnaire'
import { C_LIST_PAGE_SIZE, C_LIST_SEARCH_PARAM_KEY } from '../../constant'

const { Title } = Typography

const List: FC = () => {
  useTitle('问卷系统 - 我的问卷')

  // 是累计的 list 数据
  const [list, setList] = useState<Questionnaire[]>([])
  const [page, setPage] = useState<number>(1)
  const [total, setTotal] = useState<number>(0)
  // 需要用到 url 中的 keyword
  const [searchParams] = useSearchParams()
  // 是否是第一次加载页面
  const [isFirstLoaded, setIsFirstLoaded] = useState<boolean>(true)
  // 是否需要加载更多
  const isNeedLoadMore = total > list.length
  // url 上的 keyword
  const keyword = searchParams.get(C_LIST_SEARCH_PARAM_KEY) || ''

  // 正式获取后端加载更多数据
  const { run: onLoadMore, loading } = useRequest(
    async () => {
      const data = await getQuestionnaireListService({
        page,
        pageSize: C_LIST_PAGE_SIZE,
        keyword,
      })
      return data
    },
    {
      // 需要手动触发 run 函数
      manual: true,
      onSuccess(result) {
        const { list: resList, total: resTotal } = result as {
          list: Questionnaire[]
          total: number
        }
        setList(list.concat(resList))
        setTotal(resTotal)
        setPage(page + 1)
      },
    }
  )

  // 尝试加载更多需要做防抖处理
  const loadMoreDomRef = useRef<HTMLDivElement>(null)
  const { run: tryLoadMore } = useDebounceFn(
    () => {
      const element = loadMoreDomRef.current
      if (element == null) return
      // 判断该元素是否在屏幕底部完全露出
      const domRect = element.getBoundingClientRect()
      if (domRect == null) return
      const { bottom } = domRect
      if (bottom <= window.innerHeight) {
        // 获取后端数据
        onLoadMore()
        setIsFirstLoaded(false)
      }
    },
    { wait: 1000 }
  )

  const initPageData = () => {
    setPage(1)
    setTotal(0)
    setList([])
    setIsFirstLoaded(true)
    tryLoadMore()
  }

  // 当页面第一次加载 或 url 参数（keyword）变化时触发
  useEffect(() => {
    initPageData()
  }, [keyword])

  useEffect(() => {
    if (isNeedLoadMore) {
      window.addEventListener('scroll', tryLoadMore)
    }
    return () => {
      window.removeEventListener('scroll', tryLoadMore)
    }
  }, [searchParams, isNeedLoadMore])

  const LoadMoreContentElement = useMemo(() => {
    if (isFirstLoaded || loading) return <Spin />
    if (total === 0) return <Empty description="暂无数据" />
    if (!isNeedLoadMore) return <span>到底了~</span>
    return <Spin />
  }, [isFirstLoaded, loading, isNeedLoadMore])

  return (
    <>
      <div className={styles.header}>
        <div className={styles.left}>
          <Title level={3} style={{ margin: '0 0 24px 0' }}>
            我的问卷
          </Title>
        </div>
        <div className={styles.right}>
          <ListSearch />
        </div>
      </div>

      <div className={styles.content}>
        {list.length > 0 &&
          list.map((item: Questionnaire) => <QuestionnaireCard key={item._id} {...item} />)}
      </div>

      <div className={styles.footer}>
        <div ref={loadMoreDomRef}>{LoadMoreContentElement}</div>
      </div>
    </>
  )
}

export default List
