import mongoose from 'mongoose'
import app from './app'
import config from './config'
import { errorLogger, logger } from './shared/looger'
import { Server } from 'http'

async function bootstrap() {
  let server: Server
  try {
    await mongoose.connect(config.database_url as string)
    logger.info('🛢 Database connected successfully')

    // running server
    server = app.listen(config.port, () => {
      logger.info(`Example app listening on port ${config.port}`)
    })
  } catch (e) {
    errorLogger.error('Failed to connect database')
  }

  // unhandled rejection
  process.on('unhandledRejection', error => {
    // eslint-disable-next-line no-console
    console.log('Unhandled rejection we are closing our server.... 🙂🙂')
    if (server) {
      server.close(() => {
        errorLogger.error(error)
        process.exit(1)
      })
    } else {
      // process exit
      process.exit(1)
    }
  })
}

bootstrap()
