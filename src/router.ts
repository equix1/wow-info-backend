// Imports all the component route
import { Router } from "express";
import { handleBattleNetAccessToken } from "./module/battlenet/api";
import { handleWarcraftLogsAccessToken } from "./module/warcraftlogs/api";
import raidRoutes from './components/raid/RaidRoutes'

export const router = Router();

router.use('/raid', raidRoutes);

// Default route
router.get("/", async (req, res) => {
  res.send("Welcome to the API");
});

// Get and validate the battle.net access token
router.get("/battleNet/accessToken/handle", async (req, res) => {
  await handleBattleNetAccessToken();
  res.send(
    `The Battle.net access token was handled at: ${new Date().toLocaleString(
      "en-US",
      { timeZone: "America/New_York" }
    )}`
  );
});

router.get("/warcraftLogs/accessToken/handle", async (req, res) => {
  await handleWarcraftLogsAccessToken();
  res.send(
    `The Warcraft Logs access token was handled at: ${new Date().toLocaleString(
      "en-US",
      { timeZone: "America/New_York" }
    )}`
  );
});
