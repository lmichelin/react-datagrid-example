import clsx from 'clsx'
import { Dispatch, ReactNode, SetStateAction, useCallback } from 'react'
import styles from './HeaderCell.module.scss'

export type SortedColumn = { id: string; direction: 'ASC' | 'DESC' }

const HeaderCell = <RowType extends Record<string, ReactNode>>({
  columnId,
  title,
  sortedColumn,
  setSortedColumn,
  compareFunction,
}: {
  columnId: string
  title?: string
  sortedColumn?: SortedColumn
  setSortedColumn: Dispatch<SetStateAction<SortedColumn | undefined>>
  compareFunction?: (a: RowType, b: RowType) => number
}) => {
  const changeSorting = useCallback(() => {
    setSortedColumn(previousColumn => {
      if (previousColumn?.id !== columnId) return { id: columnId, direction: 'ASC' }
      else if (previousColumn.direction === 'ASC') return { id: columnId, direction: 'DESC' }
      return undefined
    })
  }, [columnId, setSortedColumn])

  const isColumnSortedAscending = sortedColumn?.id === columnId && sortedColumn.direction === 'DESC'
  const isColumnSortedDescending = sortedColumn?.id === columnId && sortedColumn.direction === 'ASC'

  return (
    <th className={clsx(compareFunction !== undefined && styles.sortableTableHeader)} onClick={changeSorting}>
      <div className={styles.headerCell}>
        <span>{title}</span>
        {compareFunction !== undefined && (
          <div className={styles.sortArrows}>
            {!isColumnSortedDescending && (
              <div className={clsx(styles.arrowUp, isColumnSortedAscending && styles.activeArrow)} />
            )}
            {!isColumnSortedAscending && (
              <div className={clsx(styles.arrowDown, isColumnSortedDescending && styles.activeArrow)} />
            )}
          </div>
        )}
      </div>
    </th>
  )
}

export default HeaderCell
