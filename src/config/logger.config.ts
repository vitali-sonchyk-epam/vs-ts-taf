import winston from 'winston';

export type LogLevel = 'trace' | 'debug' | 'info' | 'warn' | 'error';

const levels: Record<LogLevel, number> = {
  error: 0,
  warn: 1,
  info: 2,
  debug: 3,
  trace: 4,
};

export const logger = winston.createLogger({
  level: (process.env['LOG_LEVEL'] as LogLevel) ?? 'debug',
  levels,
  format: winston.format.printf(
    ({ level, message }) =>
      `${new Date().toISOString()} ${level.toUpperCase()} taf: ${message}`,
  ),
  transports: [
    new winston.transports.Console({ stderrLevels: ['error', 'warn'] }),
  ],
});
