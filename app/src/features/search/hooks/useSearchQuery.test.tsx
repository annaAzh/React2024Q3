import { beforeAll, describe, expect, it } from 'vitest';
import { useSearchQuery } from './useSearchQuery';
import { renderHook, waitFor } from '@testing-library/react';
import { getLocaleStorage, setLocaleStorage } from '@/app/src/shared/utils/localeStorage/LocaleStorage';

const value = 'love react';
const new_value = 'love tests';
const localeSorageKey = 'annaAzhReact';

beforeAll(() => {
  setLocaleStorage(value, localeSorageKey);
});

describe('use search hook', () => {
  it('expect set and get correct data at locale storage', async () => {
    const { result } = renderHook(() => useSearchQuery());
    const searchValue = result.current[0];
    expect(searchValue).toBe(value);
    const updateSearchValue = result.current[1];
    await waitFor(() => {
      updateSearchValue(new_value);
    });
    expect(getLocaleStorage(localeSorageKey)).toBe(new_value);
  });
});
