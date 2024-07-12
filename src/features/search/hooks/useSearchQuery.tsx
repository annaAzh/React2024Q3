import { useState } from 'react';
import { getLocaleStorage, setLocaleStorage } from 'shared/utils/localeStorage/LocaleStorage';

const useSearchQuery = (): [string, (value: string) => void] => {
  const [searchValue, setSearchValue] = useState<string>(() => getLocaleStorage() ?? '');

  const updateSearchValue = (value: string) => {
    setSearchValue(value);
    setLocaleStorage(value);
  };

  return [searchValue, updateSearchValue];
};

export { useSearchQuery };
