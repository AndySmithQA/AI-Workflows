import { beforeEach, describe, expect, it } from "vitest";
import { NotFoundError, ValidationError } from "../errors.ts";
import { preferencesRepository } from "../repositories/preferencesRepository.ts";
import { preferencesService } from "../services/preferencesService.ts";

const existing = {
  userId: "user-1",
  updatedAt: "2026-09-01T09:00:00.000Z",
  preferences: {
    theme: "dark" as const,
    language: "en" as const,
    notificationFrequency: "Daily" as const,
    timeZone: "Europe/London" as const
  }
};

beforeEach(() => {
  preferencesRepository.reset([existing]);
});

describe("preferencesService.get", () => {
  it("returns stored preferences for a known user", () => {
    const result = preferencesService.get("user-1");
    expect(result.preferences.notificationFrequency).toBe("Daily");
  });

  it("throws when the user has no preferences", () => {
    expect(() => preferencesService.get("missing")).toThrow(NotFoundError);
  });
});

describe("preferencesService.replace", () => {
  it("creates or overwrites a full preference set", () => {
    const result = preferencesService.replace("user-2", {
      theme: "light",
      language: "fr",
      notificationFrequency: "Monthly",
      timeZone: "Europe/Paris"
    });

    expect(result.userId).toBe("user-2");
    expect(result.preferences).toEqual({
      theme: "light",
      language: "fr",
      notificationFrequency: "Monthly",
      timeZone: "Europe/Paris"
    });
  });

  it("rejects a missing notification frequency", () => {
    expect(() =>
      preferencesService.replace("user-2", {
        theme: "light",
        language: "fr",
        timeZone: "Europe/Paris"
      })
    ).toThrow(ValidationError);
  });

  it("rejects an invalid notification frequency when one is provided", () => {
    expect(() =>
      preferencesService.replace("user-2", {
        theme: "light",
        language: "fr",
        notificationFrequency: "Hourly",
        timeZone: "Europe/Paris"
      })
    ).toThrow(ValidationError);
  });
});

describe("preferencesService.patch", () => {
  it("updates only the provided fields", () => {
    const result = preferencesService.patch("user-1", { theme: "system" });
    expect(result.preferences).toEqual({
      theme: "system",
      language: "en",
      notificationFrequency: "Daily",
      timeZone: "Europe/London"
    });
  });

  it("still validates notification frequency when it is supplied", () => {
    expect(() =>
      preferencesService.patch("user-1", { notificationFrequency: "Hourly" })
    ).toThrow(ValidationError);
  });
});
