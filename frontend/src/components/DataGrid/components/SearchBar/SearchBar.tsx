import { useEffect, useState } from 'react'
import styles from './SearchBar.module.scss'

const DEBOUNCE_DELAY = 300 // ms

const SearchBar = ({
  onChange,
  displayedResultsCount,
  totalResultsCount,
}: {
  onChange: (value: string) => void
  totalResultsCount: number
  displayedResultsCount: number
}) => {
  const [searchText, setSearchText] = useState('')

  useEffect(() => {
    const timeoutId = setTimeout(() => onChange(searchText), DEBOUNCE_DELAY)
    return () => clearTimeout(timeoutId)
  }, [onChange, searchText])

  return (
    <div className={styles.container}>
      <input
        className={styles.searchInput}
        placeholder="Search..."
        value={searchText}
        onChange={({ target }) => setSearchText(target.value)}
      />
      <span>
        <b>{totalResultsCount.toLocaleString()}</b> result{totalResultsCount !== 1 && 's'} •{' '}
        <b>{displayedResultsCount.toLocaleString()}</b> displayed
      </span>
    </div>
  )
}

export default SearchBar
