import express from 'express';
import { routes } from './src/routes';
import './src/utils/expandEnv'; // Uses dotenv to expand .env

const app = express();

app.use(routes);

export default app;