import { describe, expect, it } from 'vitest';
import { getPaginationArray } from './getPaginationArray';

describe('test return array with pagination items', () => {
  it('should be equal to mock array ', () => {
    const arr = [1, 2, 3, 4, 5, '...', 10];
    const totalPage = 10;
    const page = 1;
    const siblings = 1;
    const result = getPaginationArray(totalPage, page, siblings);
    expect(result).toEqual(arr);
  });

  it('should be equal to mock array ', () => {
    const arr = [1, '...', 5, 6, 7, '...', 10];
    const totalPage = 10;
    const page = 6;
    const siblings = 1;
    const result = getPaginationArray(totalPage, page, siblings);
    expect(result).toEqual(arr);
    expect(result).toBeTypeOf('object');
  });

  it('should be equal to mock array when totalPage is less than or equal to PAGINATION_SIZE + siblings', () => {
    const arr = [1, 2, 3, 4, 5];
    const totalPage = 5;
    const page = 1;
    const siblings = 1;
    const result = getPaginationArray(totalPage, page, siblings);
    expect(result).toEqual(arr);
  });

  it('should be equal mock array when only right dots shown', () => {
    const arr = [1, 2, 3, 4, 5, '...', 10];
    const totalPage = 10;
    const page = 1;
    const siblings = 1;
    const result = getPaginationArray(totalPage, page, siblings);
    expect(result).toEqual(arr);
  });

  it('should be equal to mock array when only left dots are shown', () => {
    const arr = [1, '...', 6, 7, 8, 9, 10];
    const totalPage = 10;
    const page = 10;
    const siblings = 1;
    const result = getPaginationArray(totalPage, page, siblings);
    expect(result).toEqual(arr);
  });

  it('should be equal to mock array when both left and right dots are shown', () => {
    const arr = [1, '...', 5, 6, 7, '...', 10];
    const totalPage = 10;
    const page = 6;
    const siblings = 1;
    const result = getPaginationArray(totalPage, page, siblings);
    expect(result).toEqual(arr);
  });

  it('should be equal to mock array when page is near the start', () => {
    const arr = [1, 2, 3, 4, 5, '...', 10];
    const totalPage = 10;
    const page = 2;
    const siblings = 1;
    const result = getPaginationArray(totalPage, page, siblings);
    expect(result).toEqual(arr);
  });

  it('should be equal to mock array when page is near the end', () => {
    const arr = [1, '...', 6, 7, 8, 9, 10];
    const totalPage = 10;
    const page = 9;
    const siblings = 1;
    const result = getPaginationArray(totalPage, page, siblings);
    expect(result).toEqual(arr);
  });

  it('should be equal to mock array when no dots are needed', () => {
    const arr = [1, 2, 3, 4, 5];
    const totalPage = 5;
    const page = 3;
    const siblings = 1;
    const result = getPaginationArray(totalPage, page, siblings);
    expect(result).toEqual(arr);
  });

  it('should be equal to mock array when no dots are needed with larger totalPage', () => {
    const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const totalPage = 10;
    const page = 5;
    const siblings = 4;
    const result = getPaginationArray(totalPage, page, siblings);
    expect(result).toEqual(arr);
  });

  it('should be equal to mock array when left sibling index equal firstPageIndex + indexShift( or 2)', () => {
    const arr = [1, 2, 3, 4, 5, '...', 10];
    const totalPage = 10;
    const page = 3;
    const siblings = 1;
    const result = getPaginationArray(totalPage, page, siblings);
    expect(result).toEqual(arr);
  });

  it('should be equal to mock array if array length equal 1', () => {
    const arr = [1];
    const totalPage = 1;
    const page = 1;
    const siblings = 1;
    const result = getPaginationArray(totalPage, page, siblings);
    expect(result).toEqual(arr);
  });
});
