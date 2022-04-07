export function isNullOrUndefined<T>(value: T): boolean {
  return value == null;
}

export function isInteger<T>(value: T): boolean {
  return Number.isInteger(value);
}

export function isString<T>(value: T): boolean {
  return typeof value === "string" || value instanceof String;
}

export function isArray<T>(value: T): boolean {
  return Array.isArray(value);
}
