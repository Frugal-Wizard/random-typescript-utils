interface DuckInterface {
  quack(): void;
}

export class Duck implements DuckInterface {
  quack() {}

  static [Symbol.hasInstance](value: unknown): value is DuckInterface {
    if (value === null) return false;
    if (typeof value !== 'object') return false;
    if (!('quack' in value)) return false;
    if (typeof value.quack !== 'function') return false;
    return true;
  }
}
