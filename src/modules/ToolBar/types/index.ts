export const Theme = {
  LIGHT: "light",
  DARK: "dark",
} as const;

export type ThemeT = (typeof Theme)[keyof typeof Theme];
