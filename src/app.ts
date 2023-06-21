import express, { Application, NextFunction, Request, Response } from 'express';
import cors from 'cors'; // Application routers
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import routes from './app/routes';
import httpStatus from 'http-status';
import cookieParser from 'cookie-parser';

const app: Application = express();

// use cors for cors issue
app.use(cors());

// parser
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

// Application routes
app.use('/api/v1/', routes);

app.get('/', async (req: Request, res: Response) => {
  res.status(httpStatus.OK).json({ status: true, message: 'Hello World' });
});

// global error handler
app.use(globalErrorHandler);

// not found api error
app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(httpStatus.NOT_FOUND).json({
    status: false,
    message: req.originalUrl + ' Url not found',
    errorMessages: [
      {
        path: req.originalUrl,
        message: req.originalUrl + ' Url not found',
      },
    ],
  });

  next();
});

// const generateId = async () => {
//   const academicSemester = {
//     code: '02',
//     year: '2025',
//   };
//   const testID = await generateStudentId(academicSemester);
//   console.log(testID);
// };
//
// generateId();

export default app;
