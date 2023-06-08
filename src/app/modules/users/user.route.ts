import express from 'express'
import { UserController } from './user.controller'

const router = express.Router()

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
router.post('/create-user', UserController.createUser)

export const UserRoutes = router
