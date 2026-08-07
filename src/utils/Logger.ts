import { format } from 'node:util';
import { logStep, Status } from 'allure-js-commons';

export class Logger {
  private static write(level: string, message: string, args: unknown[]): string {
    const formatted = format(message, ...args);
    console.log(`${new Date().toISOString()} ${level} taf: ${formatted}`);
    return formatted;
  }

  static trace(message: string, ...args: unknown[]): void {
    this.write('TRACE', message, args);
  }

  static debug(message: string, ...args: unknown[]): void {
    this.write('DEBUG', message, args);
  }

  static info(message: string, ...args: unknown[]): void {
    const formatted = this.write('INFO', message, args);
    void Promise.resolve(logStep(formatted, Status.PASSED)).catch(() => undefined);
  }

  static warn(message: string, ...args: unknown[]): void {
    const formatted = this.write('WARN', message, args);
    void Promise.resolve(logStep(formatted, Status.BROKEN)).catch(() => undefined);
  }

  static error(message: string, ...args: unknown[]): void {
    const formatted = this.write('ERROR', message, args);
    void Promise.resolve(logStep(formatted, Status.FAILED)).catch(() => undefined);
  }
}
