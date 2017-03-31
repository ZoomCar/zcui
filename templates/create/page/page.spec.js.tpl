import ${name.pascal}Page from './${name.param}';

test('${name.pascal}Page name', () => {
  expect(${name.pascal}Page.name).toBe('page-${name.param}');
});

