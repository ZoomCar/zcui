import ${name.pascal}Layout from './${name.param}';

test('${name.pascal}Layout name', () => {
  expect(${name.pascal}Layout.name).toBe('layout-${name.param}');
});
