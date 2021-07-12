import { updateErrorModalData } from 'App/Redux/appState/AppStateActions';
import { logError } from 'App/Utils/error';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';

const useHandleRequestError = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  return (error: any) => {
    logError(error);
    dispatch(
      updateErrorModalData({
        title: t('An error occurred'),
        subtitle: error?.response?.data?.message,
        dismissButtonTitle: t('Got It'),
        display: true,
      }),
    );
  };
};

export default useHandleRequestError;
