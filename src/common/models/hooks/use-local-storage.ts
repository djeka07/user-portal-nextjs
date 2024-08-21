type UseLocaleStorageReturn<T> = {
  getItem: (name: string) => T | undefined;
  setItem: (name: string, value: T) => void;
};

export const useLocaleStorage = <T>(): UseLocaleStorageReturn<T> => {
  const getItem = (name: string): T | undefined => {
    try {
      const item = localStorage.getItem(name) as string;
      return JSON.parse(item) as T;
    } catch (error) {
      return undefined;
    }
  };

  const setItem = (name: string, value: T): void => {
    try {
      localStorage.setItem(name, JSON.stringify(value));
    } catch (error) {
      console.log(error);
    }
  };

  return { setItem, getItem };
};
