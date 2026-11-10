# Temporary deepmerge security patch

Jest 29's `jest-config` uses deepmerge 4.3.1 to combine preset globals. Even
Jest 30.5.2 still depends on the affected library. As of 2026-11-10, there is
no patched upstream release for
[GHSA-gcqx-w48m-w2h4 / CVE-2026-93753](https://github.com/advisories/GHSA-gcqx-w48m-w2h4).

This package copies the self-contained `dist/cjs.js` from the npm deepmerge
4.3.1 distribution, preserving its MIT license and API. The only behavioral
change is that all three destination writes in `mergeObject` use
`Object.defineProperty` to create own data properties. This prevents an own
`__proto__` key from invoking the inherited setter, whether copied from the
target or merged from a source (including null-prototype targets and nested
objects). Ordinary array, symbol, clone, and custom merge behavior is preserved.

The root npm override replaces every transitive deepmerge installation with
this local package. Regression tests resolve the dependency from Jest itself
to check that the override is active. Run `npm ci`, `npm test`, and `npm audit`
to validate it.

Remove this directory and the override, then regenerate `package-lock.json`,
once Jest stops using deepmerge or a verified upstream fix is available. Do
not replace this with an older version just to fall outside the advisory range.
