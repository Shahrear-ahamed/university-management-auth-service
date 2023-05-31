import { IUser } from './users.interface'
import { User } from './users.model'
import { generateUserId } from './users.utils'
import config from '../../../config'

const createUser = async (user: IUser): Promise<IUser | null> => {
  // create auto generated incremental unique id
  user.id = await generateUserId()

  // default password
  if (!user.password) {
    user.password = config.default_user_pass as string
  }

  const createdUser = await User.create(user)

  if (!createdUser) throw new Error('Failed to create user!')

  return createdUser
}

export default {
  createUser,
}
