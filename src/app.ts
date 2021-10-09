import express, { Application, NextFunction, Request, Response } from 'express'
import { json, urlencoded } from 'body-parser';
import HttpException from './exceptions/exceptions';
import CustomerRoutes from './module/customers/routes'
import pino from 'pino';

const logger = pino()
const app: Application = express();
const port = 3000;

// parse application/x-www-form-urlencoded
app.use(urlencoded({ extended: false }))
// parse application/json
app.use(json())

// logging middleware
app.use((req: Request, res: Response, next: NextFunction) => {
  logger.info(`${req.method} ${req.path}`)
  next();
})

//CORS middleware
app.use((req: Request, res: Response, next: NextFunction) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');

  next();
})

//routes
app.use('/customers', CustomerRoutes);

// error handler
app.use((err: HttpException, req: Request, res: Response, next: NextFunction) => {
  res.status(err.status || 500).json({
    errors: 'Something went wrong'
  });
});

//handle 404 exceptions
app.use(function (req: Request, res: Response, next: NextFunction) {
  res.status(404).send("Sorry can't find that!")
})

app.listen(port, () => {
  logger.info(`Service started on port ${port}`)
})

export default app
