export const getFullPhoneNumber = (countryPrefix: string, phoneNumber: string) => {
  if (phoneNumber.startsWith('0')) {
    phoneNumber = phoneNumber.substring(1);
  }
  return countryPrefix + phoneNumber;
};
