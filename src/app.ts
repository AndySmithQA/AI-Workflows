import express from "express";
import { preferencesController } from "./controllers/preferencesController.ts";

export function createApp() {
  const app = express();
  app.use(express.json());

  app.get("/health", (_req, res) => {
    res.status(200).json({ status: "ok" });
  });

  app.get("/users/:userId/preferences", preferencesController.get);
  app.put("/users/:userId/preferences", preferencesController.replace);
  app.patch("/users/:userId/preferences", preferencesController.patch);

  return app;
}
