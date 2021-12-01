import { useAutoGetUsers } from '../../services/apiClient'
import { User } from '../../types/user'
import DataGrid, { getDefaultStringCompareFunction } from '../DataGrid'
import styles from './UsersTable.module.scss'

const columns = [
  { id: 'firstName', title: 'First name', compareFunction: getDefaultStringCompareFunction('firstName') },
  { id: 'lastName', title: 'Last name', compareFunction: getDefaultStringCompareFunction('lastName') },
  { id: 'email', title: 'Email', compareFunction: getDefaultStringCompareFunction('email') },
  { id: 'phoneNumber', title: 'Phone number' },
  { id: 'birthDate', title: 'Birth date', compareFunction: getDefaultStringCompareFunction('birthDate') },
  {
    id: 'address',
    title: 'Address',
    compareFunction: (a: User, b: User) =>
      `${a.zipCode}${a.city}${a.streetAddress}`.localeCompare(`${b.zipCode}${b.city}${b.streetAddress}`),
  },
] as const

type ColumnId = typeof columns[number]['id']

const renderCell = (id: ColumnId, row: User) => {
  switch (id) {
    case 'email':
      return <a href={`mailto:${row.email}`}>{row.email}</a>
    case 'phoneNumber':
      return <a href={`tel:${row.phoneNumber}`}>{row.phoneNumber}</a>
    case 'birthDate':
      return new Date(row.birthDate).toLocaleDateString()
    case 'address':
      return (
        <>
          {row.streetAddress}
          <br />
          {row.zipCode} {row.city.toUpperCase()}
        </>
      )
  }
}

const UsersTable = () => {
  const { users, areUsersLoading, getUsersError } = useAutoGetUsers(100000)

  return (
    <div className={styles.container}>
      {areUsersLoading && <div className={styles.message}>Loading...</div>}
      {getUsersError !== null && <div className={styles.message}>Error while loading users</div>}
      {users !== undefined && (
        <DataGrid className={styles.usersTable} columns={columns} dataRows={users} renderCell={renderCell} />
      )}
    </div>
  )
}

export default UsersTable
