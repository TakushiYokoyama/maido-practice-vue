import { Plugin } from 'vuex';
export const getByLocalstorage = <T>(key: string, generater: () => T) => {
  const json = localStorage.getItem(key);
  if (json) {
    return JSON.parse(json) as T;
  }
  return generater();
};
export const setToLocalstorage = <T>(key: string, value: T) => {
  localStorage.setItem(key, JSON.stringify(value));
};
export const createLocalstoragePlugin: <TStore>(
  namespace: string
) => Plugin<TStore> = <TStore>(namespace: keyof TStore) => (s) => {
  s.subscribe((mutation, state) => {
    const key = namespace.toString();
    if (mutation.type.startsWith(key)) {
      setToLocalstorage(key, state[key]);
    }
  });
};
