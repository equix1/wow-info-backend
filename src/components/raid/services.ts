// TODO: Fetch API data from the various API's and push it to the database

import { initializeWacraftLogsApi } from "@/module/warcraftlogs/api";
import { readConfig } from "@/config/configManager";
import axios from "axios";

// Test function to see the API connection
export async function getReports(
  guildName: string,
  serverName: string,
  region: string
) {
  const warcraftLogsApi = await initializeWacraftLogsApi();
  const query = `
      query NextKillRank {
        reportData { 
          reports(zoneID: 4) {
            data {
              rankings(difficulty: 4, encounterID: 3135)
            }
          }
        }
      }
    `;
  // const query = `
  //     query GetCurrentGuildRank {
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
