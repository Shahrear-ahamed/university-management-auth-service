import express, { Application, Request, Response } from 'express'
import cors from 'cors'
import usersService from './app/modules/users/users.service'

const app: Application = express()

// use cors for cors issue
app.use(cors())

// parser
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/', async (req: Request, res: Response) => {
  await usersService.createUser({
    id: '000',
    password: 'shahrear',
    role: 'student',
  })
  res.send('Hello World!')
})

export default app
