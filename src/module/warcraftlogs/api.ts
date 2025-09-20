import { readConfig, updateConfig } from "../../../config/configManager";

const { env } = process;

import axios from "axios";

export async function initializeWacraftLogsApi() {
  return {
    baseUrl: env.WARCRAFTLOGS_BASE_URL,
    oAuthUrl: env.WARCRAFTLOGS_OAUTH_URL,
    clientId: env.WARCRAFTLOGS_KEY,
    clientSecret: env.WARCRAFTLOGS_SECRET,
  };
}

async function getAccessToken() {
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

// Test function to see the API connection
export async function getReports(
  guildName: string,
  serverName: string,
  region: string
) {
  const warcraftLogsApi = await initializeWacraftLogsApi();
  const query = `
        #graphql
        query RecentKills {
            reportData {
                reports(
                zoneID: [ZONE_ID]
                encounterID: [ENCOUNTER_ID]
                difficulty: 4
                killType: Kills
                ) {
                total  # Total number of kill reports
                data {
                    guild {
                    id
                    name
                    }
                }
                }
            }
        }
    `;
  // vv Get Current ranking of the guild vv
  // const query = `
  //     query {
  //         guildData{
  //             guild(name: "${guildName}", serverSlug: "${serverName}", serverRegion: "${region}") {
  //                 zoneRanking {
  //                     progress {
  //                         worldRank {
  //                             number
  //                             percentile
  //                             color
  //                         }
  //                         regionRank {
  //                             number
  //                             percentile
  //                             color
  //                         }
  //                         serverRank {
  //                             number
  //                             percentile
  //                             color
  //                         }
  //                     }
  //                 }
  //             }
  //         }
  //     }
  // `;

  try {
    const response = await axios.post(
      `${warcraftLogsApi.baseUrl}`,
      {
        query: query,
      },
      {
        headers: {
          Authorization: `Bearer ${readConfig().warcraftLogsAccessToken}`,
          "Content-Type": "application/json",
        },
      }
    );

    return response.data;
  } catch (e) {
    console.error("Error fetching reports:", e);
    throw "e";
  }
}
