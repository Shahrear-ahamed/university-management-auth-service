import { Request } from 'express'
import userService from './users.service'

const createUser = async (req: Request, res: Response) => {
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
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    res.status(400).json({ success: false, message: 'Failed to create user' })
  }
}

export default {
  createUser,
}
