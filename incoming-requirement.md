# Incoming product change

Paste this into Understand, then use Plan and Implement against the current Preference Management API.

## Requirement

When a user does not provide a notification frequency, automatically apply the system default value of **Weekly**.

If the user explicitly provides a value, preserve the existing behaviour and continue to validate it.

## Current behaviour (as shipped)

`PUT /users/:userId/preferences` requires `notificationFrequency`. Omitting it returns `400` with `notificationFrequency is required`.

Allowed values today: `Daily`, `Weekly`, `Monthly`, `Never`.

`PATCH /users/:userId/preferences` only changes fields that are present. An omitted frequency currently leaves the stored value unchanged.

## Notes for discussion (intentionally under-specified)

The request does not say whether “does not provide” means a missing property, `null`, or `""`.

It also does not say whether the default applies only to create/replace (`PUT`), also to `PATCH`, or when reading preferences that were stored before this change.

Decide those points in Plan before implementing.
