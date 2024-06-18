import { readConfig, updateConfig } from '../../../config/configManager';

const { BlizzAPI } = require("blizzapi");
const { env } = process;

export let api;

export async function initializeBlizzApi() {
    api = new BlizzAPI({
        region: env.API_BATTLENET_REGION,
        clientId: env.API_BATTLENET_KEY,
        clientSecret: env.API_BATTLENET_SECRET,
    });
}

export async function getAccessToken() {
    try {
        await initializeBlizzApi() 
        updateConfig({ apiAccessToken: await api.getAccessToken() });
    } catch (e) {
        console.log(e);
    }
}

export async function validateAccessToken(accessToken) {
    try {
        await BlizzAPI.validateAccessToken(env.API_BATTLENET_REGION, accessToken);
    } catch (e) {
        console.log("validate",e);
    }
}

export async function handleAccessToken() {
    let config = readConfig();
    console.log("The Battle.net access token was handled at: ", new Date().toLocaleString('en-US', { timeZone: 'America/New_York' }));
    // Check if the access token exists, if it does is it still valid, if not get a new one.
    config.apiAccessToken ? await validateAccessToken(config.apiAccessToken) : await getAccessToken();
}


