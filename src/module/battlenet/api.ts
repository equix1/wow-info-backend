import { readConfig, updateConfig } from '../../../config/configManager';

const { BlizzAPI } = require("blizzapi");
const { env } = process;

export let battleNetApi;

export async function initializeBattleNetApi() {
    battleNetApi = new BlizzAPI({
        region: env.BATTLENET_REGION,
        clientId: env.BATTLENET_KEY,
        clientSecret: env.BATTLENET_SECRET,
    });
}

async function getAccessToken() {
    try {
        await initializeBattleNetApi() 
        updateConfig({ battleNetAccessToken: await battleNetApi.getAccessToken() });
    } catch (e) {
        console.log(e);
    }
}

async function validateAccessToken(accessToken) {
    try {
        await BlizzAPI.validateAccessToken(env.BATTLENET_REGION, accessToken);
    } catch (e) {
        console.log("validate",e);
    }
}

export async function handleBattleNetAccessToken() {
    let config = readConfig();
    console.log("The Battle.net access token was handled at: ", new Date().toLocaleString('en-US', { timeZone: 'America/New_York' }));
    // Check if the access token exists, if it does is it still valid, if not get a new one.
    config.battleNetAccessToken ? await validateAccessToken(config.battleNetAccessToken) : await getAccessToken();
}


