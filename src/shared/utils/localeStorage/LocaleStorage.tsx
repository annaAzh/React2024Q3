const localeSorageKey = 'annaAzhReact';

class LocaleStorage {
  constructor(public key: string = localeSorageKey) {}

  getLocaleStorage(): string {
    const lsValue = localStorage.getItem(this.key);
    if (lsValue) {
      return JSON.parse(lsValue);
    }
    return '';
  }

  setLocaleStorage(value: string): void {
    localStorage.setItem(this.key, JSON.stringify(value));
  }
}

export { LocaleStorage };
