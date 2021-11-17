import UsersTable from '../UsersTable'
import styles from './App.module.scss'

const App = () => {
  return (
    <div className={styles.app}>
      <div className={styles.usersTableContainer}>
        <UsersTable />
      </div>
    </div>
  )
}

export default App
