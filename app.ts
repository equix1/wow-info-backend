import express from "express";
import { router } from "./src/router";
import "./src/utils/expandEnv"; // Uses dotenv to expand .env

const app = express();

app.use(router);

export default app;
