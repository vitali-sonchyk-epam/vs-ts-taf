export function parseNumber(rawValue: string): number {
  const parsedValue = Number(rawValue);
  if (Number.isNaN(parsedValue)) {
    throw new Error(`${rawValue} is not a valid number`);
  }
  return parsedValue;
}
