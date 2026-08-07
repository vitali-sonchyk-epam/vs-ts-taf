import { format } from 'node:util';
import { logStep, Status } from 'allure-js-commons';
import { logger, LogLevel } from '../config/logger.config';

export class Logger {
  private static write(level: LogLevel, message: string, args: unknown[]): string {
    const formatted = format(message, ...args);
    logger.log(level, formatted);
    return formatted;
  }

  static trace(message: string, ...args: unknown[]): void {
    this.write('trace', message, args);
  }

  static debug(message: string, ...args: unknown[]): void {
    this.write('debug', message, args);
  }

  static info(message: string, ...args: unknown[]): void {
    const formatted = this.write('info', message, args);
    void Promise.resolve(logStep(formatted, Status.PASSED)).catch(() => undefined);
  }

  static warn(message: string, ...args: unknown[]): void {
    const formatted = this.write('warn', message, args);
    void Promise.resolve(logStep(formatted, Status.BROKEN)).catch(() => undefined);
  }

  static error(message: string, ...args: unknown[]): void {
    const formatted = this.write('error', message, args);
    void Promise.resolve(logStep(formatted, Status.FAILED)).catch(() => undefined);
  }
}
