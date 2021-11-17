import { Dispatch, Key, memo, ReactNode, SetStateAction } from 'react'
import HeaderCell, { SortedColumn } from '../HeaderCell'
import styles from './Table.module.scss'

const Table = <ColumnId extends string, RowType extends Record<string, ReactNode>>({
  columns,
  dataRows,
  renderCell,
  sortedColumn,
  setSortedColumn,
}: {
  columns: Readonly<{ id: ColumnId; title?: string; compareFunction?: (a: RowType, b: RowType) => number }[]>
  dataRows: (RowType & { id: Key })[]
  renderCell?: (id: ColumnId, value: RowType) => ReactNode
  sortedColumn?: SortedColumn
  setSortedColumn: Dispatch<SetStateAction<SortedColumn | undefined>>
}) => {
  return (
    <table className={styles.table}>
      <thead>
        <tr>
          {columns.map(({ id, title, compareFunction }) => (
            <HeaderCell key={id} columnId={id} {...{ title, sortedColumn, setSortedColumn, compareFunction }} />
          ))}
        </tr>
      </thead>
      <tbody>
        {dataRows.map(row => (
          <tr key={row.id}>
            {columns.map(({ id }) => (
              <td key={id}>{renderCell?.(id, row) ?? row[id]}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default memo(Table) as typeof Table // https://github.com/DefinitelyTyped/DefinitelyTyped/issues/37087#issuecomment-656596623
