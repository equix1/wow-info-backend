import { Router } from "express";
import { getReports } from "./services";

const raidRouter = Router();

// Test route for Warcraft Logs
raidRouter.get(
  "/reports/guild/:guildName/:serverName/:region",
  async (req, res) => {
    const { guildName, serverName, region } = req.params;
    try {
      const data = await getReports(guildName, serverName, region);
      res.json(data);
    } catch (error) {
      res
        .status(500)
        .json({ error: "An error occurred while fetching reports" });
    }
  }
);

export default raidRouter;