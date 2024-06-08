import express from 'express';
import './src/utils/loadEnv';
import * as blizzapi from './src/utils/blizzard/apiClient'
import { readConfig } from './config/configManager';
// import raidRoutes from './routes/raidRoutes';
// import dungeonRoutes from './routes/dungeonRoutes';
// import playerRoutes from './routes/playerRoutes';
// import ratingRoutes from './routes/ratingRoutes';
// import errorHandler from './middleware/errorHandler';

const app = express();

app.use(express.json());

// Default route
app.get('/', async (req, res) => {
    res.send('Welcome to the API');
});

// app.use('/api/raids', raidRoutes);
// app.use('/api/dungeons', dungeonRoutes);
// app.use('/api/players', playerRoutes);

// app.use(errorHandler);

export default app;