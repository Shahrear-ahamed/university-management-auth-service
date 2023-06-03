import mongoose from 'mongoose'
import { IGenericErrorMessage } from '../interfaces/error'
import { IGenericErrorResponse } from '../interfaces/common'

const handleValidationError = (
  err: mongoose.Error.ValidatorError
): IGenericErrorResponse => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const errors: IGenericErrorMessage[] = Object.values(err?.errors).map(
    (elem: unknown) => {
      // Update the type of `elem` to `unknown`
      const error = elem as mongoose.Error.ValidatorError
      return {
        path: error?.path,
        message: error?.message,
      }
    }
  )
  // statusCode
  const statusCode = 400

  // return response types
  return {
    statusCode,
    message: 'Validation Error',
    errorMessages: errors,
  }
}

export default handleValidationError
