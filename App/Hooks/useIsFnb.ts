import { RootState } from 'App/Redux';
import { useSelector } from 'react-redux';

const useIsFnb = (): boolean => {
  const store = useSelector((state: RootState) => state.store);
  return store.productSetType === 'F&B';
};

export default useIsFnb;
