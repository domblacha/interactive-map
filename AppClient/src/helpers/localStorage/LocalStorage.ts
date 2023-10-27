class LocalStorage {
  public static getItem<T>(key: string): T | null {
    const item = localStorage.getItem(key);
    if (item) return JSON.parse(item) as T;
    else return null;
  }

  public static setItem<T>(key: string, data: T) {
    localStorage.setItem(key, JSON.stringify(data));
  }

  public static removeItem(key: string) {
    localStorage.removeItem(key);
  }
}

export default LocalStorage;
