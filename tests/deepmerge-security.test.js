/** @jest-environment node */
const { createRequire } = require('node:module');

// Exercise the actual transitive dependency loaded by Jest, not just the vendor copy.
const jestRequire = createRequire(require.resolve('jest-config'));
const merge = jestRequire('deepmerge');

describe('Jest deepmerge security override', () => {
  const payload = () => JSON.parse('{"__proto__":{"poisoned":true}}');

  function expectSafe(result) {
    expect(Object.getPrototypeOf(result)).toBe(Object.prototype);
    expect(result.poisoned).toBeUndefined();
    expect({}.poisoned).toBeUndefined();
  }

  test('loads the local security patch', () => {
    expect(jestRequire('deepmerge/package.json').name).toBe('@criptomo/deepmerge');
  });

  test('does not poison the result when copying target keys', () => {
    expectSafe(merge(payload(), {}));
  });

  test('does not poison a null-prototype target when merging source keys', () => {
    expectSafe(merge(Object.create(null), payload()));
  });

  test('protects nested merges and cloning', () => {
    expectSafe(merge({ nested: payload() }, { nested: {} }).nested);
    expectSafe(merge({}, { nested: payload() }).nested);
  });

  test('preserves ordinary Jest globals, arrays, symbols, and custom merging', () => {
    const key = Symbol('config');
    const target = { config: { enabled: true }, values: [1], [key]: { a: 1 } };
    const source = { config: { count: 2 }, values: [2], [key]: { b: 2 } };
    expect(merge(target, source)).toEqual({
      config: { enabled: true, count: 2 }, values: [1, 2], [key]: { a: 1, b: 2 }
    });
    expect(target.values).toEqual([1]);
    expect(merge(target, source, { arrayMerge: (_, next) => next }).values).toEqual([2]);
    expect(merge({ count: 1 }, { count: 2 }, {
      customMerge: key => key === 'count' ? () => 3 : undefined,
      isMergeableObject: () => true
    }).count).toBe(3);
    expect(merge.all([{ a: 1 }, { b: 2 }])).toEqual({ a: 1, b: 2 });
  });
});
