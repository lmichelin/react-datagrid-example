import clsx from 'clsx'
import keyBy from 'lodash/keyBy'
import { Key, ReactNode, useMemo, useState } from 'react'
import { normalizeForSearch } from '../../services/stringHelpers'
import { SortedColumn } from './components/HeaderCell'
import SearchBar from './components/SearchBar'
import Table from './components/Table'
import styles from './DataGrid.module.scss'

export const getDefaultStringCompareFunction =
  <T extends string>(key: T) =>
  (a: Record<T, string>, b: Record<T, string>) =>
    a[key].localeCompare(b[key])

const DataGrid = <ColumnId extends string, RowType extends Record<string, ReactNode>>({
  columns,
  dataRows,
  renderCell,
  className,
}: {
  columns: Readonly<{ id: ColumnId; title?: string; compareFunction?: (a: RowType, b: RowType) => number }[]>
  dataRows: (RowType & { id: Key })[]
  renderCell?: (id: ColumnId, value: RowType) => ReactNode
  className?: string
}) => {
  const [searchText, setSearchText] = useState('')
  const [sortedColumn, setSortedColumn] = useState<SortedColumn>()

  const indexedColumns = useMemo(() => keyBy(columns, 'id'), [columns])

  const fiteredAndSortedData = useMemo(() => {
    const filteredData = dataRows.filter(row =>
      normalizeForSearch(JSON.stringify(row)).includes(normalizeForSearch(searchText)),
    )

    if (sortedColumn === undefined) return filteredData

    const compareFunction = indexedColumns[sortedColumn.id].compareFunction

    if (compareFunction === undefined) return filteredData

    return sortedColumn.direction === 'ASC'
      ? filteredData.sort(compareFunction)
      : filteredData.sort(compareFunction).reverse()
  }, [dataRows, sortedColumn, indexedColumns, searchText])

  return (
    <div className={clsx(styles.container, className)}>
      <SearchBar onChange={setSearchText} resultsCount={fiteredAndSortedData.length} />
      <div className={styles.tableContainer}>
        <Table dataRows={fiteredAndSortedData} {...{ columns, renderCell, sortedColumn, setSortedColumn }} />
      </div>
    </div>
  )
}

export default DataGrid
