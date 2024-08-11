import { getLocaleStorage, setLocaleStorage } from '@/app/src/shared/utils/localeStorage/LocaleStorage';
import { useState } from 'react';

const useSearchQuery = (): [string, (value: string) => void] => {
  const [searchValue, setSearchValue] = useState<string>(() => getLocaleStorage() ?? '');

  const updateSearchValue = (value: string) => {
    setSearchValue(value);
    setLocaleStorage(value);
  };

  return [searchValue, updateSearchValue];
};

export { useSearchQuery };
