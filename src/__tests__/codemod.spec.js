const tests = [
  'OneImport',
  'MultipleImports',
  'ModuleWithoutDefaultExport'
];

const defineTest = require('jscodeshift/dist/testUtils').defineTest;

describe('Codemod', () => {
  tests.forEach(test =>
    defineTest(
      __dirname,
      'codemod',
      null,
      test,
    )
  );
});