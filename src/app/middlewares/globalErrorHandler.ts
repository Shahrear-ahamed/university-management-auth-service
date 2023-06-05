import { ErrorRequestHandler } from 'express'
import { IGenericErrorMessage } from '../../interfaces/error'
import config from '../../config'
import handleValidationError from '../../Errors/handleValidationError'
import ApiError from '../../Errors/ApiError'

const globalErrorHandler: ErrorRequestHandler = (error, req, res, next) => {
  // pre defined error details
  let statusCode = 500
  let message = 'Something went wrong !'
  let errorMessages: IGenericErrorMessage[] = []
  const stack = config.env != 'production' ? error?.stack : undefined

  // check error and generate error messages
  if (error?.name === 'ValidationError') {
    const simplifiedError = handleValidationError(error)

    // set values
    statusCode = simplifiedError.statusCode
    message = simplifiedError.message
    errorMessages = simplifiedError.errorMessages
  } else if (error instanceof ApiError) {
    statusCode = error?.statusCode
    message = error?.message
    errorMessages = error?.message
      ? [
          {
            path: '',
            message: error?.message,
          },
        ]
      : []
  } else if (error instanceof Error) {
    message = error?.message
    errorMessages = error?.message
      ? [
          {
            path: '',
            message: error?.message,
          },
        ]
      : []
  }
  // send response for errors
  res.status(statusCode).json({
    success: false,
    message,
    errorMessages,
    stack,
  })

  next()
}

export default globalErrorHandler
