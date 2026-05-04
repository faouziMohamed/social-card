/**
 * Lightweight runtime validation — no dependencies.
 */

export type Validator = (value: unknown, fieldName: string) => unknown;

export function stringValidator(optional = false): Validator {
  return (value, fieldName) => {
    if (value == null) {
      if (optional) return;
      throw new Error(
        `Social Card SDK: ${fieldName} is required and must be a non-empty string`,
      );
    }
    if (typeof value !== 'string' || value.trim() === '') {
      throw new Error(
        `Social Card SDK: ${fieldName} must be a non-empty string`,
      );
    }
    return value;
  };
}

export function numberValidator(
  options: {optional?: boolean; min?: number; max?: number} = {},
): Validator {
  return (value, fieldName) => {
    if (value == null) {
      if (options.optional) return;
      throw new Error(
        `Social Card SDK: ${fieldName} is required and must be a number`,
      );
    }
    const num = Number(value);
    if (Number.isNaN(num))
      throw new Error(`Social Card SDK: ${fieldName} must be a number`);
    if (options.min !== undefined && num < options.min)
      throw new Error(
        `Social Card SDK: ${fieldName} must be >= ${options.min}`,
      );
    if (options.max !== undefined && num > options.max)
      throw new Error(
        `Social Card SDK: ${fieldName} must be <= ${options.max}`,
      );
    return num;
  };
}

export function enumValidator(allowed: string[], optional = false): Validator {
  return (value, fieldName) => {
    if (value == null) {
      if (optional) return;
      throw new Error(
        `Social Card SDK: ${fieldName} must be one of: ${allowed.join(', ')}`,
      );
    }
    if (typeof value !== 'string' || !allowed.includes(value)) {
      throw new Error(
        `Social Card SDK: ${fieldName} must be one of: ${allowed.join(', ')}`,
      );
    }
    return value;
  };
}

export function hexColorValidator(optional = false): Validator {
  const regex = /^#([\dA-Fa-f]{3}){1,2}$/;
  return (value, fieldName) => {
    if (value == null) {
      if (optional) return;
      throw new Error(
        `Social Card SDK: ${fieldName} must be a hex color (e.g. '#6366f1')`,
      );
    }
    if (typeof value !== 'string' || !regex.test(value)) {
      throw new Error(
        `Social Card SDK: ${fieldName} must be a valid hex color, got: ${JSON.stringify(value)}`,
      );
    }
    return value;
  };
}

export function validate<T extends Record<string, unknown>>(
  params: T,
  validators: Partial<Record<keyof T, Validator>>,
): T {
  const result = {...params} as Record<string, unknown>;
  for (const [key, validator] of Object.entries(validators)) {
    if (typeof validator === 'function') {
      result[key] = validator(params[key], key);
    }
  }
  return result as T;
}
