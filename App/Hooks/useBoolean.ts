import { useCallback, useState } from 'react';

const useBoolean = (defaultValue: boolean = false): [boolean, () => void, () => void] => {
  const [visibale, setVisibale] = useState<boolean>(defaultValue);

  const open = useCallback(() => {
    setVisibale(true);
  }, []);
  const close = useCallback(() => {
    setVisibale(false);
  }, []);

  return [visibale, open, close];
};

export default useBoolean;
