import express, { Application, NextFunction, Request, Response } from 'express'
import HttpException from './exceptions/exceptions';
import customersRouter from './routes/customers'
import pino from 'pino';

const logger = pino()
const app: Application = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// logging middleware
app.use((req: express.Request, res: express.Response, next: NextFunction) => {
  logger.info(`${req.method} ${req.path}`)
  next();
})
app.use('/customers', customersRouter);

// error handler
app.use((err: HttpException, req: Request, res: Response, next: NextFunction) => {
  res.status(err.status || 500).json({
    errors: 'Something went wrong'
  });
});

app.listen(port, () => {
  logger.info(`Service started on port ${port}`)
})

export default app
