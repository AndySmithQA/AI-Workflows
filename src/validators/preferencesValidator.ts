import {
  LANGUAGES,
  NOTIFICATION_FREQUENCIES,
  THEMES,
  TIME_ZONES,
  type Language,
  type NotificationFrequency,
  type PreferencePatch,
  type Preferences,
  type Theme,
  type TimeZone
} from "../models/preference.ts";

type ValidationSuccess<T> = { ok: true; value: T };
type ValidationFailure = { ok: false; errors: string[] };
export type ValidationResult<T> = ValidationSuccess<T> | ValidationFailure;

function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function includeIfInvalid(
  errors: string[],
  condition: boolean,
  message: string
): void {
  if (condition) {
    errors.push(message);
  }
}

function isTheme(value: unknown): value is Theme {
  return THEMES.includes(value as Theme);
}

function isLanguage(value: unknown): value is Language {
  return LANGUAGES.includes(value as Language);
}

function isNotificationFrequency(value: unknown): value is NotificationFrequency {
  return NOTIFICATION_FREQUENCIES.includes(value as NotificationFrequency);
}

function isTimeZone(value: unknown): value is TimeZone {
  return TIME_ZONES.includes(value as TimeZone);
}

export function validateReplaceBody(body: unknown): ValidationResult<Preferences> {
  const errors: string[] = [];

  if (!isObject(body)) {
    return { ok: false, errors: ["Request body must be a JSON object"] };
  }

  includeIfInvalid(errors, !isTheme(body.theme), `theme must be one of: ${THEMES.join(", ")}`);
  includeIfInvalid(
    errors,
    !isLanguage(body.language),
    `language must be one of: ${LANGUAGES.join(", ")}`
  );
  includeIfInvalid(
    errors,
    !("notificationFrequency" in body),
    "notificationFrequency is required"
  );
  includeIfInvalid(
    errors,
    "notificationFrequency" in body && !isNotificationFrequency(body.notificationFrequency),
    `notificationFrequency must be one of: ${NOTIFICATION_FREQUENCIES.join(", ")}`
  );
  includeIfInvalid(
    errors,
    !isTimeZone(body.timeZone),
    `timeZone must be one of: ${TIME_ZONES.join(", ")}`
  );

  if (errors.length > 0) {
    return { ok: false, errors };
  }

  return {
    ok: true,
    value: {
      theme: body.theme as Theme,
      language: body.language as Language,
      notificationFrequency: body.notificationFrequency as NotificationFrequency,
      timeZone: body.timeZone as TimeZone
    }
  };
}

export function validatePatchBody(body: unknown): ValidationResult<PreferencePatch> {
  const errors: string[] = [];

  if (!isObject(body)) {
    return { ok: false, errors: ["Request body must be a JSON object"] };
  }

  const knownKeys = ["theme", "language", "notificationFrequency", "timeZone"];
  const providedKeys = Object.keys(body).filter((key) => knownKeys.includes(key));

  if (providedKeys.length === 0) {
    return {
      ok: false,
      errors: ["At least one preference field must be provided"]
    };
  }

  if ("theme" in body) {
    includeIfInvalid(errors, !isTheme(body.theme), `theme must be one of: ${THEMES.join(", ")}`);
  }
  if ("language" in body) {
    includeIfInvalid(
      errors,
      !isLanguage(body.language),
      `language must be one of: ${LANGUAGES.join(", ")}`
    );
  }
  if ("notificationFrequency" in body) {
    includeIfInvalid(
      errors,
      !isNotificationFrequency(body.notificationFrequency),
      `notificationFrequency must be one of: ${NOTIFICATION_FREQUENCIES.join(", ")}`
    );
  }
  if ("timeZone" in body) {
    includeIfInvalid(
      errors,
      !isTimeZone(body.timeZone),
      `timeZone must be one of: ${TIME_ZONES.join(", ")}`
    );
  }

  if (errors.length > 0) {
    return { ok: false, errors };
  }

  const value: PreferencePatch = {};
  if ("theme" in body) value.theme = body.theme as Theme;
  if ("language" in body) value.language = body.language as Language;
  if ("notificationFrequency" in body) {
    value.notificationFrequency = body.notificationFrequency as NotificationFrequency;
  }
  if ("timeZone" in body) value.timeZone = body.timeZone as TimeZone;

  return { ok: true, value };
}
