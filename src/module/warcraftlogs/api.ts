import { updateConfig } from "@/config/configManager";
import axios from "axios";

const { env } = process;

export async function initializeWacraftLogsApi() {
  return {
    baseUrl: env.WARCRAFTLOGS_BASE_URL,
    oAuthUrl: env.WARCRAFTLOGS_OAUTH_URL,
    clientId: env.WARCRAFTLOGS_KEY,
    clientSecret: env.WARCRAFTLOGS_SECRET,
  };
}

async function getAccessToken(): Promise<string> {
  const warcraftLogsApi = await initializeWacraftLogsApi();
  try {
    const response = await axios.post(
      warcraftLogsApi.oAuthUrl,
      "grant_type=client_credentials",
      {
        auth: {
          username: warcraftLogsApi.clientId,
          password: warcraftLogsApi.clientSecret,
        },
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    return response.data.access_token;
  } catch (e) {
    console.error("Error fetching Warcraft Logs access token:", e);
    throw e;
  }
}

export async function handleWarcraftLogsAccessToken() {
  updateConfig({ warcraftLogsAccessToken: await getAccessToken() });
}
