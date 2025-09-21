import express from "express";
import { router } from "./src/router";

const app = express();

app.use(router);

export default app;
