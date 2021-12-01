import { ReactNode, UIEvent, useCallback, useEffect, useMemo, useRef, useState } from 'react'

const DEFAULT_INFINITE_SCROLL_ROWS_NUMBER = 100

const isElementOverflown = ({ clientWidth, clientHeight, scrollWidth, scrollHeight }: HTMLDivElement) => {
  return scrollHeight > clientHeight || scrollWidth > clientWidth
}

const isElementScrolledToBottom = ({ offsetHeight, scrollTop, scrollHeight }: HTMLDivElement) => {
  return offsetHeight + scrollTop >= scrollHeight
}

const useInfiniteScroll = <RowType extends Record<string, ReactNode>>({
  dataRows,
  infiniteScrollRowsNumber = DEFAULT_INFINITE_SCROLL_ROWS_NUMBER,
}: {
  dataRows: RowType[]
  infiniteScrollRowsNumber?: number
}) => {
  const initialNumberOfRows = Math.min(infiniteScrollRowsNumber, dataRows.length)

  const [numberOfRowsToShow, setNumberOfRowsToShow] = useState(initialNumberOfRows)

  const areSomeRowsHidden = numberOfRowsToShow < dataRows.length

  const addMoreRows = useCallback(() => {
    setNumberOfRowsToShow(currentValue => Math.min(currentValue + infiniteScrollRowsNumber, dataRows.length))
  }, [infiniteScrollRowsNumber, dataRows.length])

  const scrollableDivRef = useRef<HTMLDivElement>(null)

  // Scroll to top and reset infiniteScrollRowsNumber when rows change
  useEffect(() => {
    scrollableDivRef.current?.scrollTo({ top: 0 })
    setNumberOfRowsToShow(initialNumberOfRows)
  }, [initialNumberOfRows, dataRows])

  // Automatically show more rows if there is no enough rows to make the div scrollable
  useEffect(() => {
    if (scrollableDivRef.current === null) return
    if (!isElementOverflown(scrollableDivRef.current) && areSomeRowsHidden) addMoreRows()
  }, [addMoreRows, numberOfRowsToShow, areSomeRowsHidden])

  const onScroll = useCallback(
    (event: UIEvent<HTMLDivElement>) => {
      if (isElementScrolledToBottom(event.currentTarget) && areSomeRowsHidden) addMoreRows()
    },
    [addMoreRows, areSomeRowsHidden],
  )

  const rowsToDisplay = useMemo(() => dataRows.slice(0, numberOfRowsToShow), [numberOfRowsToShow, dataRows])

  return { scrollableDivRef, onScroll, rowsToDisplay }
}

export default useInfiniteScroll
