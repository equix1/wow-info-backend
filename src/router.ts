// Imports all the component route
import { Router } from 'express';
import { handleBattleNetAccessToken } from './module/battlenet/api';
import { handleWarcraftLogsAccessToken, getReports } from './module/warcraftlogs/api';

export const router = Router();

// Default route
router.get('/', async (req, res) => {
    res.send('Welcome to the API');
});

// Get and validate the battle.net access token
router.get('/battleNet/accessToken/handle', async (req, res) => {
    await handleBattleNetAccessToken();
    res.send(`The Battle.net access token was handled at: ${new Date().toLocaleString('en-US', { timeZone: 'America/New_York' })}`);
});

router.get('/warcraftLogs/accessToken/handle', async (req, res) => {
    await handleWarcraftLogsAccessToken();
    res.send(`The Warcraft Logs access token was handled at: ${new Date().toLocaleString('en-US', { timeZone: 'America/New_York' })}`);
});

// Test route for Warcraft Logs
router.get('/reports/guild/:guildName/:serverName/:region', async (req, res) => {
    const { guildName, serverName, region } = req.params;
    try {
        const data = await getReports(guildName, serverName, region);
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while fetching reports' });
    }
});