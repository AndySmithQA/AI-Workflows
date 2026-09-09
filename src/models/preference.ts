export const THEMES = ["light", "dark", "system"] as const;
export type Theme = (typeof THEMES)[number];

export const LANGUAGES = ["en", "fr", "es", "de"] as const;
export type Language = (typeof LANGUAGES)[number];

export const NOTIFICATION_FREQUENCIES = [
  "Daily",
  "Weekly",
  "Monthly",
  "Never"
] as const;
export type NotificationFrequency = (typeof NOTIFICATION_FREQUENCIES)[number];

export const TIME_ZONES = [
  "UTC",
  "Europe/London",
  "Europe/Paris",
  "America/New_York",
  "America/Los_Angeles",
  "Asia/Tokyo"
] as const;
export type TimeZone = (typeof TIME_ZONES)[number];

export type Preferences = {
  theme: Theme;
  language: Language;
  notificationFrequency: NotificationFrequency;
  timeZone: TimeZone;
};

export type UserPreferences = {
  userId: string;
  preferences: Preferences;
  updatedAt: string;
};

export type PreferencePatch = Partial<Preferences>;
