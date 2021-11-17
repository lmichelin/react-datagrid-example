import axios from 'axios'
import { makeUseAxios } from 'axios-hooks'
import { UsersDTO } from '../types/user'

const useFetch = makeUseAxios({
  axios: axios.create({ baseURL: process.env.REACT_APP_BACKEND_BASE_URL }),
  defaultOptions: { manual: true },
})

export const useAutoGetUsers = (limit?: number) => {
  let url = '/users'

  if (limit !== undefined) url += `?limit=${limit}`

  const [{ data, error, loading }] = useFetch<UsersDTO>(url, { manual: false })

  return { users: data?.users, getUsersError: error, areUsersLoading: loading }
}
