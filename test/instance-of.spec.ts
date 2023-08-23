import { instanceOf } from '../src';
import { Duck } from './class-has-instance';
import { ParentClass, ChildClass, UnrelatedClass } from './classes';
import { ObjectWithNumberValue, integer } from './has-instance';
import assert from 'assert/strict';

describe('instanceOf()', () => {
  describe('using Symbol.hasInstance', () => {
    it('should work', () => {
      {
        assert(instanceOf(integer, 1));
        assert(!instanceOf(integer, 1.2));
        assert(!instanceOf(integer, '3'));

        assert.deepEqual(
          [1, 1.2, 2, 2.3, '3'].filter(instanceOf(integer)),
          [1, 2]
        );
      }

      {
        const objectWithNumberValue: unknown = { value: 1 };
        const objectWithStringValue: unknown = { value: '1' };
        const emptyObject: unknown = {};
        const nullObject: unknown = null;
        const emptyString: unknown = '';
        const all = [objectWithNumberValue, objectWithStringValue, emptyObject, nullObject, emptyString];

        assert(instanceOf(ObjectWithNumberValue, objectWithNumberValue));
        assert(typeof objectWithNumberValue.value == 'number');
        assert(!instanceOf(ObjectWithNumberValue, objectWithStringValue));
        assert(!instanceOf(ObjectWithNumberValue, emptyObject));
        assert(!instanceOf(ObjectWithNumberValue, nullObject));
        assert(!instanceOf(ObjectWithNumberValue, emptyString));

        const filtered = all.filter(instanceOf(ObjectWithNumberValue));

        assert.deepEqual(filtered, [objectWithNumberValue]);
        for (const object of filtered) {
          assert(typeof object.value == 'number');
        }
      }
    });
  });

  describe('using class', () => {
    it('should work', () => {
      const parent: unknown = new ParentClass();
      const child: unknown = new ChildClass();
      const unrelated: unknown = new UnrelatedClass();
      const all = [parent, child, unrelated];

      assert(instanceOf(ParentClass, parent));
      assert(instanceOf(ParentClass, child));
      assert(!instanceOf(ParentClass, unrelated));

      assert.deepEqual(all.filter(instanceOf(ParentClass)), [parent, child]);

      assert(!instanceOf(ChildClass, parent));
      assert(instanceOf(ChildClass, child));
      assert(!instanceOf(ChildClass, unrelated));

      assert.deepEqual(all.filter(instanceOf(ChildClass)), [child]);

      assert(!instanceOf(UnrelatedClass, parent));
      assert(!instanceOf(UnrelatedClass, child));
      assert(instanceOf(UnrelatedClass, unrelated));

      assert.deepEqual(all.filter(instanceOf(UnrelatedClass)), [unrelated]);
    });
  });

  describe('using class with Symbol.hasInstance', () => {
    it('should work', () => {
      const classyDuck: unknown = new Duck();
      const objectyDuck: unknown = { quack() {} };
      const notADuck: unknown = { bark() {} };
      const all = [classyDuck, objectyDuck, notADuck];

      assert(instanceOf(Duck, classyDuck));
      assert(typeof classyDuck.quack === 'function');
      assert(instanceOf(Duck, objectyDuck));
      assert(typeof objectyDuck.quack === 'function');
      assert(!instanceOf(Duck, notADuck));

      assert.deepEqual(all.filter(instanceOf(Duck)), [classyDuck, objectyDuck]);
    });
  });
});
