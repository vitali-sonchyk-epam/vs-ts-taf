import logger from '@wdio/logger';

const log = logger('taf');

export class Logger {
  static trace(message: string, ...args: unknown[]): void {
    log.trace(message, ...args);
  }

  static debug(message: string, ...args: unknown[]): void {
    log.debug(message, ...args);
  }

  static info(message: string, ...args: unknown[]): void {
    log.info(message, ...args);
  }

  static warn(message: string, ...args: unknown[]): void {
    log.warn(message, ...args);
  }

  static error(message: string, ...args: unknown[]): void {
    log.error(message, ...args);
  }
}
