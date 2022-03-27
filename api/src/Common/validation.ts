import { isArray, isInteger, isNullOrUndefined, isString } from "./predicates";

export function assertNonNull<T>(name: string, value: T): void {
  if (isNullOrUndefined(value)) {
    throw new Error(`'${name}' cannot be null or undefined`);
  }
}

export function assertIntOptional<T>(name: string, value: T): void {
  if (!isNullOrUndefined(value) && !isInteger(value)) {
    throw new Error(
      `'${name}' expected to be integer, not ${JSON.stringify(value)}`
    );
  }
}

export function assertStringOptional<T>(name: string, value: T): void {
  if (!isNullOrUndefined(value) && !isString(value)) {
    throw new Error(
      `'${name}' expected to be string, not ${JSON.stringify(value)}`
    );
  }
}

export function assertArrayOptional<T>(name: string, value: T): void {
  if (!isNullOrUndefined(value) && !isArray(value)) {
    throw new Error(
      `'${name}' expected to be array, not ${JSON.stringify(value)}`
    );
  }
}

export function assertIntPositiveOptional(name: string, value: unknown): void {
  if (!isNullOrUndefined(value) && isInteger(value) && <number>value <= 0) {
    throw new Error(
      `'${name}' expected to be positive integer, not ${JSON.stringify(value)}`
    );
  }
}
