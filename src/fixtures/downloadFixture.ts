import { rm } from 'node:fs/promises';
import { test as base } from './testFixture';
import { Logger } from '../utils/Logger';

type DownloadFixtures = {
  downloads: string[];
};

export const test = base.extend<DownloadFixtures>({
  downloads: async ({ bindPage: _bindPage }, use) => {
    const filePaths: string[] = [];

    await use(filePaths);

    for (const filePath of filePaths) {
      Logger.info('Removing downloaded file: %s', filePath);
      await rm(filePath, { force: true });
    }
  },
});

export { expect } from '@playwright/test';
