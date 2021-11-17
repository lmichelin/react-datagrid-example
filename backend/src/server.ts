import cors from 'cors'
import express from 'express'
import morgan from 'morgan'
import usersController from './controllers/users.controller'

const app = express()

app.use(morgan('dev'))

app.use(cors())

app.use('/users', usersController)

const port = parseInt(process.env.PORT ?? '8000')

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`)
})
