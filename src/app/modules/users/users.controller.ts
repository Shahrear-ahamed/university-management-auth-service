import { NextFunction, Request, Response } from 'express'
import userService from './users.service'

const createUser = async (req: Request, res: Response, next: NextFunction) => {
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
