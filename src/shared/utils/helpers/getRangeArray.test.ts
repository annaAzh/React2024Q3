import { describe, expect, it } from 'vitest';
import { getRangeArray } from './getRangeArray';

describe('test create array start from and end', () => {
  it('should be equal to mock array ', () => {
    const arr = [1, 2, 3, 4, 5];
    const result = getRangeArray(1, 6);
    expect(result).toEqual(arr);
  });
  it('should be equal to mock array ', () => {
    const arr = [1];
    const result = getRangeArray(1, 2);
    expect(result).toEqual(arr);
    expect(result).toBeTypeOf('object');
  });
});
