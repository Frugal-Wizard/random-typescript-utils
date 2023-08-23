/* eslint-disable @typescript-eslint/ban-types */

type HasInstance<T> = { [Symbol.hasInstance](value: unknown): value is T };
type Constructor<T> = new (...args: never[]) => T;

export default function instanceOf<T>(type: HasInstance<T>): (value: unknown) => value is T;
export default function instanceOf<T>(type: Constructor<T>): (value: unknown) => value is T;
export default function instanceOf<T>(type: HasInstance<T>, value: unknown): value is T;
export default function instanceOf<T>(type: Constructor<T>, value: unknown): value is T;

export default function instanceOf<T>(type: HasInstance<T> | Constructor<T>, value?: unknown) {
  if (arguments.length > 1) {
    return value instanceof (type as Function);
  } else {
    return (value: unknown) => value instanceof (type as Function);
  }
}
