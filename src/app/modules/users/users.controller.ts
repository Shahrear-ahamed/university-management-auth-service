import { RequestHandler } from 'express'
import userService from './users.service'

const createUser: RequestHandler = async (req, res, next) => {
  try {
    const { user } = req.body

    const result = await userService.createUser(user)

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    res.status(201).json({
      success: true,
      message: 'User created successfully',
      data: result,
    })
  } catch (e) {
    next()
  }
}

export default {
  createUser,
}
