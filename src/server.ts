import { createApp } from "./app.ts";
import { preferencesRepository } from "./repositories/preferencesRepository.ts";

const port = Number(process.env.PORT) || 3000;

preferencesRepository.reset([
  {
    userId: "user-1",
    updatedAt: "2026-09-01T09:00:00.000Z",
    preferences: {
      theme: "dark",
      language: "en",
      notificationFrequency: "Daily",
      timeZone: "Europe/London"
    }
  }
]);

const app = createApp();

app.listen(port, () => {
  console.log(`Preference Management API listening on http://localhost:${port}`);
});
