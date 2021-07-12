const PHONE_NUMBER_REGEX = /^\+(?:[0-9] ?){6,14}[0-9]$/;

export const isPhoneNumberValid = (phoneNumber: string) => {
  return PHONE_NUMBER_REGEX.test(phoneNumber);
};
