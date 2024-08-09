import { describe, expect, it, afterEach } from 'vitest';
import { getLocaleStorage, setLocaleStorage } from './LocaleStorage';

describe('locale storage', () => {
  afterEach(() => {
    localStorage.clear();
  });

  it('locale storage key', () => {
    const localeSorageKey = 'test';
    const value = 'react';
    setLocaleStorage(value, localeSorageKey);
    expect(getLocaleStorage(localeSorageKey)).toBe(value);
  });

  it('locale storage return empty string', () => {
    const localeSorageKey = 'test';
    const value = '';
    expect(getLocaleStorage(localeSorageKey)).toBe(value);
  });
});
