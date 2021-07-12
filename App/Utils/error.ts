import * as Sentry from '@sentry/react-native';

export const logError = (error: any) => {
  Sentry.captureException(error);
  if (error.response) {
    console.log('error', JSON.stringify(error.response, null, 2));
  } else {
    console.log('error', JSON.stringify(error, null, 2));
  }
};
