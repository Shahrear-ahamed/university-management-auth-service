import express from 'express'
import userController from './users.controller'

const router = express.Router()

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
router.post('/create-user', userController.createUser)

export default router
