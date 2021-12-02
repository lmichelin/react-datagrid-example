import axios from 'axios'
import { makeUseAxios } from 'axios-hooks'
import { useCallback } from 'react'
import { UsersDTO } from '../types/user'

const useFetch = makeUseAxios({
  axios: axios.create({ baseURL: process.env.REACT_APP_BACKEND_BASE_URL }),
  defaultOptions: { manual: true },
})

export const useAutoGetUsers = (limit?: number) => {
  let url = '/users'

  if (limit !== undefined) url += `?limit=${limit}`

  const [{ data, error, loading }, doGetUsers] = useFetch<UsersDTO>(url, { manual: false })

  return { doGetUsers, users: data?.users, getUsersError: error, areUsersLoading: loading }
}

export const useDeleteUser = () => {
  const [{ error, loading }, doDelete] = useFetch<void>({ method: 'DELETE' })

  const doDeleteUser = useCallback((id: number) => doDelete({ url: `/users/${id}` }), [doDelete])

  return { doDeleteUser, deleteUserError: error, isDeletingUser: loading }
}
