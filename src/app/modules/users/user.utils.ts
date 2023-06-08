import { User } from './user.model'

export const findLastUserId = async () => {
  const userId = await User.findOne({}, { id: 1, _id: 0 })
    .sort({
      createdAt: -1,
    })
    .lean()

  return userId?.id
}

export const generateUserId = async () => {
  const currentId = (await findLastUserId()) || (0).toString().padStart(5, '0')
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return (parseInt(currentId) + 1).toString().padStart(5, '0')
}
