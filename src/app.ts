import express, { Application, Request, Response } from 'express'
import cors from 'cors'

// Application routers
import userRoute from './app/modules/users/users.route'

const app: Application = express()

// use cors for cors issue
app.use(cors())

// parser
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Application routes
app.use('/api/v1/users', userRoute)

app.get('/', async (req: Request, res: Response) => {
  res.send('Hello World!')
})

export default app
