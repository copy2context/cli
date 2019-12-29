import { generateFileName } from '../src/utils';

describe('generateFileName', () => {
  it('works when given a file ext', () => {
    expect(generateFileName('dir', 'file', 'ts')).toEqual('dir/file.ts');
  });
  it('works when not given a file ext and defaults to js', () => {
    expect(generateFileName('dir', 'file')).toEqual('dir/file.js');
  });
});
