import { useEffect, useState } from 'react'
import styles from './SearchBar.module.scss'

const DEBOUNCE_DELAY = 300 // ms

const SearchBar = ({ onChange, resultsCount }: { onChange: (value: string) => void; resultsCount: number }) => {
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
        <b>{resultsCount.toLocaleString()}</b> result{resultsCount !== 1 && 's'}
      </span>
    </div>
  )
}

export default SearchBar
