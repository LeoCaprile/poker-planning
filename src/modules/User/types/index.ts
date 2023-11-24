export const UserRoles = {
  dev: "dev",
  po: "po",
  viewer: "viewer",
} as const;

export type UserRoleT = keyof typeof UserRoles;

export const UserState = {
  idle: "idle",
  ready: "ready",
  coffee: "coffee",
} as const;

export type UserStateT = keyof typeof UserState;
