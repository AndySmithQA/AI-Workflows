import { NotFoundError, ValidationError } from "../errors.ts";
import type { PreferencePatch, Preferences, UserPreferences } from "../models/preference.ts";
import { preferencesRepository } from "../repositories/preferencesRepository.ts";
import { validatePatchBody, validateReplaceBody } from "../validators/preferencesValidator.ts";

export const preferencesService = {
  get(userId: string): UserPreferences {
    const record = preferencesRepository.findByUserId(userId);
    if (!record) {
      throw new NotFoundError(`No preferences found for user ${userId}`);
    }
    return record;
  },

  replace(userId: string, body: unknown): UserPreferences {
    const result = validateReplaceBody(body);
    if (!result.ok) {
      throw new ValidationError(result.errors);
    }
    return preferencesRepository.save(userId, result.value);
  },

  patch(userId: string, body: unknown): UserPreferences {
    const existing = preferencesRepository.findByUserId(userId);
    if (!existing) {
      throw new NotFoundError(`No preferences found for user ${userId}`);
    }

    const result = validatePatchBody(body);
    if (!result.ok) {
      throw new ValidationError(result.errors);
    }

    const merged: Preferences = {
      ...existing.preferences,
      ...result.value
    };

    return preferencesRepository.save(userId, merged);
  }
};

export type { PreferencePatch, Preferences, UserPreferences };
