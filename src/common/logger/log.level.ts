export const LogLevel = {
  Error: 0,
  Warning: 1,
  Information: 2,
  Http: 3,
  Verbose: 4,
  Debug: 5,
  Silly: 6,
} as const;

// eslint-disable-next-line @typescript-eslint/no-redeclare
export type LogLevel = (typeof LogLevel)[keyof typeof LogLevel];
