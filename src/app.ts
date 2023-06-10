import express, { Application, Request, Response } from 'express';
import cors from 'cors'; // Application routers
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import routes from './app/routes';

const app: Application = express();

// use cors for cors issue
app.use(cors());

// parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Application routes
app.use('/api/v1/', routes);

app.get('/', async (req: Request, res: Response) => {
  res.send('Hello World!');
});

// global error handler
app.use(globalErrorHandler);

export default app;
