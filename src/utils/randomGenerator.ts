import { faker } from '@faker-js/faker';

export class Random {
  static string(length = 10): string {
    return faker.string.alphanumeric(length);
  }
}
