import Storage from 'react-native-storage';
import AsyncStorage from '@react-native-community/async-storage';

const DataStorage = new Storage({
  size: 1000,
  storageBackend: AsyncStorage,
  defaultExpires: null,
  enableCache: true,
  sync: {},
});

export const getStoredProperty = async (key: string) => {
  let value;
  try {
    value = await DataStorage.load({ key });
  } catch {}
  return value;
};

export default DataStorage;
