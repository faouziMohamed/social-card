import {describe, expect, it} from 'vitest';
import {
  enumValidator,
  hexColorValidator,
  numberValidator,
  stringValidator,
  validate,
} from './validator';

describe('stringValidator', () => {
  it('returns value when valid string', () => {
    const v = stringValidator();
    expect(v('hello', 'name')).toBe('hello');
  });

  it('throws when value is null and not optional', () => {
    const v = stringValidator();
    expect(() => v(null, 'name')).toThrow('name is required');
  });

  it('returns undefined when value is null and optional', () => {
    const v = stringValidator(true);
    expect(v(null, 'name')).toBeUndefined();
  });

  it('throws when value is empty string', () => {
    const v = stringValidator();
    expect(() => v('  ', 'name')).toThrow('must be a non-empty string');
  });

  it('throws when value is not a string', () => {
    const v = stringValidator();
    expect(() => v(42, 'name')).toThrow('must be a non-empty string');
  });
});

describe('numberValidator', () => {
  it('returns parsed number', () => {
    const v = numberValidator();
    expect(v('42', 'count')).toBe(42);
  });

  it('throws when value is null and not optional', () => {
    const v = numberValidator();
    expect(() => v(null, 'count')).toThrow('count is required');
  });

  it('returns undefined when optional and null', () => {
    const v = numberValidator({optional: true});
    expect(v(null, 'count')).toBeUndefined();
  });

  it('throws when value is NaN', () => {
    const v = numberValidator();
    expect(() => v('abc', 'count')).toThrow('must be a number');
  });

  it('throws when value is below min', () => {
    const v = numberValidator({min: 10});
    expect(() => v(5, 'count')).toThrow('>= 10');
  });

  it('throws when value is above max', () => {
    const v = numberValidator({max: 100});
    expect(() => v(200, 'count')).toThrow('<= 100');
  });

  it('passes at boundary values', () => {
    const v = numberValidator({min: 10, max: 100});
    expect(v(10, 'x')).toBe(10);
    expect(v(100, 'x')).toBe(100);
  });
});

describe('enumValidator', () => {
  const allowed = ['dark', 'light', 'auto'];

  it('returns value when valid', () => {
    const v = enumValidator(allowed);
    expect(v('dark', 'theme')).toBe('dark');
  });

  it('throws when value is not in allowed list', () => {
    const v = enumValidator(allowed);
    expect(() => v('purple', 'theme')).toThrow(
      'must be one of: dark, light, auto',
    );
  });

  it('throws when null and not optional', () => {
    const v = enumValidator(allowed);
    expect(() => v(null, 'theme')).toThrow();
  });

  it('returns undefined when optional and null', () => {
    const v = enumValidator(allowed, true);
    expect(v(null, 'theme')).toBeUndefined();
  });
});

describe('hexColorValidator', () => {
  it('accepts 6-digit hex color', () => {
    const v = hexColorValidator();
    expect(v('#6366f1', 'color')).toBe('#6366f1');
  });

  it('accepts 3-digit hex color', () => {
    const v = hexColorValidator();
    expect(v('#fff', 'color')).toBe('#fff');
  });

  it('throws on invalid hex color', () => {
    const v = hexColorValidator();
    expect(() => v('red', 'color')).toThrow('must be a valid hex color');
    expect(() => v('#gggggg', 'color')).toThrow('must be a valid hex color');
  });

  it('throws when null and not optional', () => {
    const v = hexColorValidator();
    expect(() => v(null, 'color')).toThrow();
  });

  it('returns undefined when optional and null', () => {
    const v = hexColorValidator(true);
    expect(v(null, 'color')).toBeUndefined();
  });
});

describe('validate', () => {
  it('applies validators to matching fields', () => {
    const result = validate(
      {theme: 'dark', count: '5'},
      {count: numberValidator()},
    );
    expect(result.count).toBe(5);
    expect(result.theme).toBe('dark');
  });

  it('propagates validation errors', () => {
    expect(() =>
      validate({color: 'bad'}, {color: hexColorValidator()}),
    ).toThrow('must be a valid hex color');
  });

  it('passes through fields without validators unchanged', () => {
    const result = validate({a: 1, b: 'two'}, {});
    expect(result).toEqual({a: 1, b: 'two'});
  });
});
