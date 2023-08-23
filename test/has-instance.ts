import { opaque } from '../src';

export type integer = opaque<number>;

export const integer = {
  [Symbol.hasInstance](value: unknown): value is integer {
    if (typeof value != 'number') return false;
    return Number.isInteger(value);
  }
}

export interface ObjectWithNumberValue {
  value: number;
}

export const ObjectWithNumberValue = {
  [Symbol.hasInstance](object: unknown): object is ObjectWithNumberValue {
    if (typeof object != 'object') return false;
    if (!object) return false;
    if (!('value' in object)) return false;
    if (typeof object.value != 'number') return false;
    return true;
  }
}
