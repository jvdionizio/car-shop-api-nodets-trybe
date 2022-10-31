import express from 'express';
import 'express-async-errors';
import carsRoute from './routes/carsRoutes';
import motorcycleRoute from './routes/motorcycleRoutes';
import errorHandler from './middlewares/error';

const app = express();

app.use(express.json());
app.use(carsRoute);
app.use(motorcycleRoute);
app.use(errorHandler);

export default app;