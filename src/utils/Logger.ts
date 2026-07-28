import logger from '@wdio/logger';
import allureReporter from '@wdio/allure-reporter';
import { Status } from 'allure-js-commons';
import { format } from 'node:util';

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
    allureReporter.addStep(format(message, ...args));
  }

  static warn(message: string, ...args: unknown[]): void {
    log.warn(message, ...args);
    allureReporter.addStep(format(message, ...args), undefined, Status.BROKEN);
  }

  static error(message: string, ...args: unknown[]): void {
    log.error(message, ...args);
    allureReporter.addStep(format(message, ...args), undefined, Status.FAILED);
  }
}
