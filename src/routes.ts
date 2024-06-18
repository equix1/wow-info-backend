// Imports all the component route
import { Router } from 'express';
import { handleAccessToken } from '../src/module/blizzard/api';

export const routes = Router();

// Default route
routes.get('/', async (req, res) => {
    res.send('Welcome to the API');
});

// Get and validate the battle.net access token
routes.get('/blizzard/accessToken/handle', async (req, res) => {
    await handleAccessToken();
    res.send(`The Battle.net access token was handled at: ${new Date().toLocaleString('en-US', { timeZone: 'America/New_York' })}`);
});
