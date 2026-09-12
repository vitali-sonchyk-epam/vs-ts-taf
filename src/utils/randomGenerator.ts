import { faker } from '@faker-js/faker';

export class Random {
  static string(length = 10): string {
    return faker.string.alphanumeric(length);
  }

  static number(min = 1, max = 1000): number {
    return faker.number.int({ min, max });
  }

  static boolean(): boolean {
    return faker.datatype.boolean();
  }

  static futureDateTime(): string {
    return faker.date.future().toISOString();
  }
}
