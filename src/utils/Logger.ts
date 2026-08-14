import { format } from 'node:util';
import { logStep, Status } from 'allure-js-commons';
import { logger, LogLevel } from '../config/logger.config';

// Allure step reporting injects "Allure Metadata (step_start/step_stop)"
// attachments into Playwright's testInfo during execution. Only emit them
// when the Allure reporter is actually active, otherwise they clutter the
// Playwright HTML report.
const allureEnabled = process.env['REPORTER'] === 'allure';

export class Logger {
  private static write(level: LogLevel, message: string, args: unknown[]): string {
    const formatted = format(message, ...args);
    logger.log(level, formatted);
    return formatted;
  }

  private static reportStep(message: string, status: Status): void {
    if (allureEnabled) {
      void Promise.resolve(logStep(message, status)).catch(() => undefined);
    }
  }

  static trace(message: string, ...args: unknown[]): void {
    this.write('trace', message, args);
  }

  static debug(message: string, ...args: unknown[]): void {
    this.write('debug', message, args);
  }

  static info(message: string, ...args: unknown[]): void {
    const formatted = this.write('info', message, args);
    this.reportStep(formatted, Status.PASSED);
  }

  static warn(message: string, ...args: unknown[]): void {
    const formatted = this.write('warn', message, args);
    this.reportStep(formatted, Status.BROKEN);
  }

  static error(message: string, ...args: unknown[]): void {
    const formatted = this.write('error', message, args);
    this.reportStep(formatted, Status.FAILED);
  }
}
