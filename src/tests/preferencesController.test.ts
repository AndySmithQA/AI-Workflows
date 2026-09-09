import request from "supertest";
import { beforeEach, describe, expect, it } from "vitest";
import { createApp } from "../app.ts";
import { preferencesRepository } from "../repositories/preferencesRepository.ts";

const app = createApp();

beforeEach(() => {
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
});

describe("GET /users/:userId/preferences", () => {
  it("returns 200 for an existing user", async () => {
    const response = await request(app).get("/users/user-1/preferences");
    expect(response.status).toBe(200);
    expect(response.body.preferences.theme).toBe("dark");
  });

  it("returns 404 when preferences do not exist", async () => {
    const response = await request(app).get("/users/missing/preferences");
    expect(response.status).toBe(404);
  });
});

describe("PUT /users/:userId/preferences", () => {
  it("saves a complete preference payload", async () => {
    const response = await request(app)
      .put("/users/user-2/preferences")
      .send({
        theme: "light",
        language: "es",
        notificationFrequency: "Never",
        timeZone: "UTC"
      });

    expect(response.status).toBe(200);
    expect(response.body.preferences.notificationFrequency).toBe("Never");
  });

  it("returns 400 when notificationFrequency is omitted", async () => {
    const response = await request(app)
      .put("/users/user-2/preferences")
      .send({
        theme: "light",
        language: "es",
        timeZone: "UTC"
      });

    expect(response.status).toBe(400);
    expect(response.body.details).toContain("notificationFrequency is required");
  });
});

describe("PATCH /users/:userId/preferences", () => {
  it("returns 200 for a valid partial update", async () => {
    const response = await request(app)
      .patch("/users/user-1/preferences")
      .send({ language: "de" });

    expect(response.status).toBe(200);
    expect(response.body.preferences.language).toBe("de");
    expect(response.body.preferences.notificationFrequency).toBe("Daily");
  });

  it("returns 400 when an explicit frequency is invalid", async () => {
    const response = await request(app)
      .patch("/users/user-1/preferences")
      .send({ notificationFrequency: "Hourly" });

    expect(response.status).toBe(400);
  });
});
