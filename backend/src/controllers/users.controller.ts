import { Router } from 'express'
import { deleteUser, getUsers } from '../services/users.service'

const router = Router()

router.get('/', ({ query }, res) => {
  if (
    query.limit !== undefined &&
    (typeof query.limit !== 'string' || query.limit !== parseInt(query.limit).toString())
  ) {
    res.status(400).json({ error: `${JSON.stringify(query.limit)} is not a valid limit. Limit must be an integer.` })
    return
  }

  const limit = query.limit ? parseInt(query.limit) : undefined

  const users = getUsers(limit)

  res.json({ users })
})

router.delete('/:id', ({ params }, res) => {
  const userId = parseInt(params.id)

  if (params.id !== userId.toString()) {
    res.status(400).json({ error: `"${params.id}" is not a valid user ID. User ID must be an integer.` })
    return
  }

  deleteUser(userId)

  res.sendStatus(204)
})

export default router
