import React, { FC, useState } from 'react'
import { useTitle } from 'ahooks'
import { Empty, Typography, Table, Tag } from 'antd'
import styles from './common.module.scss'
import { StarFilled, StarOutlined } from '@ant-design/icons'
import { ColumnsType } from 'antd/es/table'

const { Title } = Typography

interface DataType {
  _id: string
  title: string
  isPublished: boolean
  isStar: boolean
  answerCount: number
  createdAt: string
}

const mockListData = Array(18)
  .fill('mock')
  .map((item, index) => ({
    _id: `q${index}`,
    title: `问卷${index}`,
    isPublished: [true, false][index % 2],
    isStar: [true, false][index % 2],
    answerCount: index % 5,
    createdAt: `10月2${index}日 1${index}:4${index}`,
  }))

const Star: FC = () => {
  useTitle('问卷系统 - 回收站')
  const [list] = useState(mockListData)

  // 一定要定义 Typescript 类型才可以使用 align 等属性
  const tableColumns: ColumnsType<DataType> = [
    {
      title: '标题',
      dataIndex: 'title',
      align: 'center',
      // key: 'title', // 循环列的 key ，他会默认取 dataIndex 的值
    },
    {
      title: '是否发布',
      dataIndex: 'isPublished',
      align: 'center',
      render: (isPublished: boolean) =>
        isPublished ? <Tag color="green">已发布</Tag> : <Tag>未发布</Tag>,
    },
    {
      title: '是否标星',
      dataIndex: 'isStar',
      align: 'center',
      render: (isStar: boolean) =>
        isStar ? (
          <StarFilled style={{ color: '#1677ff' }} />
        ) : (
          <StarOutlined style={{ color: '#1677ff' }} />
        ),
    },
    {
      title: '答卷数',
      dataIndex: 'answerCount',
      align: 'center',
    },
    {
      title: '创建时间',
      dataIndex: 'createdAt',
      align: 'center',
    },
  ]

  return (
    <>
      <div className={styles.header}>
        <div className={styles.left}>
          <Title level={3} style={{ margin: '0 0 24px 0' }}>
            回收站
          </Title>
        </div>
        <div className={styles.right}>搜索</div>
      </div>
      <div className={styles.content}>
        {list.length > 0 ? (
          <Table rowKey="_id" columns={tableColumns} dataSource={list} pagination={false} />
        ) : (
          <Empty description="暂无数据" />
        )}
      </div>
      <div className={styles.footer}>分页</div>
    </>
  )
}

export default Star
