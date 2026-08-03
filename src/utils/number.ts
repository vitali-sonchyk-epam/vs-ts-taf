export function parseNumber(rawValue: string, fieldName = 'value'): number {
  const parsedValue = Number(rawValue);
  if (Number.isNaN(parsedValue)) {
    throw new Error(`${fieldName} is not a valid number. Received: "${rawValue}"`);
  }
  return parsedValue;
}

