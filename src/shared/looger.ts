import path from 'path'
import { createLogger, format, transports } from 'winston'
import DailyRotateFile from 'winston-daily-rotate-file'

const { combine, timestamp, label, printf } = format

// Customize format
const myFormat = printf(({ level, message, label, timestamp }) => {
  // customize date
  const date = new Date(timestamp)

  // day hour minute and second
  const day: string = date.toDateString()
  const hour: number = date.getHours()
  const minute: number = date.getMinutes()
  const second: number = date.getSeconds()

  // return format
  return `${day} ${hour} ${minute} ${second} [${label}] ${level}: ${message}`
})
const logger = createLogger({
  level: 'info',
  format: combine(label({ label: 'Mexemy' }), timestamp(), myFormat),
  transports: [
    new transports.Console(),
    new DailyRotateFile({
      filename: path.join(
        process.cwd(),
        'logs',
        'winston',
        'successes',
        'mexemy-%DATE%-success.log'
      ),
      datePattern: 'YYYY-DD-MM-HH',
      zippedArchive: true,
      maxSize: '20m',
      maxFiles: '14d',
    }),
  ],
})

const errorLogger = createLogger({
  level: 'error',
  format: combine(label({ label: 'Mexemy' }), timestamp(), myFormat),
  transports: [
    new transports.Console(),
    new DailyRotateFile({
      filename: path.join(
        process.cwd(),
        'logs',
        'winston',
        'errors',
        'mexemy-%DATE%-error.log'
      ),
      datePattern: 'YYYY-DD-MM-HH',
      zippedArchive: true,
      maxSize: '20m',
      maxFiles: '14d',
    }),
  ],
})

export { logger, errorLogger }
