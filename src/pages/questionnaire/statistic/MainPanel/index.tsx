import React, { FC, useEffect, useRef, useState } from 'react'
import { Spin, Table, Tooltip, Typography } from 'antd'
import { useParams } from 'react-router-dom'
import { useRequest } from 'ahooks'
import { ColumnsType } from 'antd/es/table'
import { Reference } from 'rc-table'
import styles from './index.module.scss'
import { getStatisticListService } from '../../../../services/statistic'
import { getVisibleComponentList } from '../../../../store/utils'
import { ComponentInfoType } from '../../../../store/qEditorReducer'
import useGetQEditorInfo from '../../../../hooks/useGetQEditorInfo'

const { Title } = Typography

type PropsType = {
  selectedCompId: string
  setSelectedCompId: (id: string) => void
  setSelectedCompType: (type: string) => void
}

const MainPanel: FC<PropsType> = props => {
  const { selectedCompId, setSelectedCompId, setSelectedCompType } = props
  const { id = '' } = useParams()
  const [total, setTotal] = useState(0)
  const [list, setList] = useState([])
  const tableRef = useRef<Reference>(null)
  const { componentList } = useGetQEditorInfo()

  const { loading } = useRequest(
    async () => {
      return await getStatisticListService(id, { page: 1, pageSize: 10 })
    },
    {
      onSuccess(result) {
        const { total, list } = result
        setTotal(total)
        setList(list)
      },
    }
  )

  const getColumnWidthByCompType = (type: string) => {
    if (['input', 'radio'].includes(type)) {
      return 158
    }

    // if (['textarea', 'checkbox'].includes(type)) {
    //   return 200
    // }

    return 200
  }

  const tableColumns: ColumnsType<{ [key: number]: any }> = [
    {
      title: '答卷ID',
      dataIndex: '_id',
      key: '_id',
      fixed: 'left',
      width: 80,
      ellipsis: {
        showTitle: false,
      },
      render: (text: string) => (
        <Tooltip placement="topLeft" title={text}>
          {text}
        </Tooltip>
      ),
    },
    ...(getVisibleComponentList(componentList) || [])
      .filter((compInfo: ComponentInfoType) => {
        // 表格只展示用户填写的信息
        return !['info', 'title', 'paragraph'].includes(compInfo.type)
      })
      .map((compInfo: ComponentInfoType) => {
        return {
          title: (
            <div
              onClick={() => {
                setSelectedCompId(compInfo.fe_id)
                setSelectedCompType(compInfo.type)
              }}
              style={{
                cursor: 'pointer',
                color: compInfo.fe_id === selectedCompId ? '#1890ff' : 'inherit',
              }}
            >
              {compInfo.title}
            </div>
          ),
          dataIndex: compInfo.fe_id,
          key: compInfo.fe_id,
          width: getColumnWidthByCompType(compInfo.type),
          ellipsis: {
            showTitle: false,
          },
          render: (text: string) => (
            <Tooltip placement="topLeft" title={text}>
              {text}
            </Tooltip>
          ),
        }
      }),
  ]

  const scrollX = tableColumns.reduce((total, cur) => total + parseInt(String(cur.width || 0)), 0)

  useEffect(() => {
    if (tableRef.current) {
      console.log('gzw====>tableRef.current', tableRef.current)
      console.log('gzw====>nativeElement', tableRef.current.nativeElement)
      console.log('gzw====>scrollTo', tableRef.current.scrollTo)
      // tableRef.current.scrollTo({ index: 9 })
      tableRef.current.nativeElement.scrollLeft = 1300
    }
  }, [selectedCompId])

  const TableElement = (
    <>
      <Table
        ref={tableRef}
        columns={tableColumns}
        dataSource={list}
        pagination={false}
        rowKey="_id"
        // 550 是 10 条数据所对应的表格高度（不连表头）
        // scroll={{ x: scrollX, y: 550 }}
        scroll={{ x: scrollX, y: 250 }}
      />
    </>
  )

  return (
    <div className={styles['left-panel']}>
      {loading ? (
        <div style={{ textAlign: 'center', marginTop: 188 }}>
          <Spin />
        </div>
      ) : (
        <>
          <Title level={3} style={{ margin: '12px 0 12px 12px' }}>{`答卷数量：${total}`}</Title>
          {TableElement}
        </>
      )}
    </div>
  )
}

export default MainPanel
