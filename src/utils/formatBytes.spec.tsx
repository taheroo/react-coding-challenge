import formatBytes from './formatBytes';

it(`formatBytes should return 152.14 KB for 155788`, () => {
  const result = formatBytes(155788);
  expect(result).toEqual(`152.14 KB`);
});
