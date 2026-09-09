import type { Preferences, UserPreferences } from "../models/preference.ts";

const store = new Map<string, UserPreferences>();

function clone(record: UserPreferences): UserPreferences {
  return {
    userId: record.userId,
    updatedAt: record.updatedAt,
    preferences: { ...record.preferences }
  };
}

export const preferencesRepository = {
  reset(seed: UserPreferences[] = []): void {
    store.clear();
    for (const record of seed) {
      store.set(record.userId, clone(record));
    }
  },

  findByUserId(userId: string): UserPreferences | undefined {
    const record = store.get(userId);
    return record ? clone(record) : undefined;
  },

  save(userId: string, preferences: Preferences): UserPreferences {
    const record: UserPreferences = {
      userId,
      preferences: { ...preferences },
      updatedAt: new Date().toISOString()
    };
    store.set(userId, record);
    return clone(record);
  }
};
