// Imports all the component route
import { Router } from 'express';
// import raidRoutes from './routes/raidRoutes';
// import dungeonRoutes from './routes/dungeonRoutes';
// import playerRoutes from './routes/playerRoutes';
// import ratingRoutes from './routes/ratingRoutes';
// import errorHandler from './middleware/errorHandler';

export const routes = Router();

// Default route
routes.get('/', async (req, res) => {
    res.send('Welcome to the API');
});

routes.get('/test', async (req, res) => {
    res.send('Test');
});


// app.use('/api/raids', raidRoutes);
// app.use('/api/dungeons', dungeonRoutes);
// app.use('/api/players', playerRoutes);

// app.use(errorHandler);