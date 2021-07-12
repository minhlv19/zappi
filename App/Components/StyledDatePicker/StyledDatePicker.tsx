import { Palette } from 'App/Theme/Palette';
import React, { ReactElement } from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, Text, TextProps } from 'react-native';

import DatePicker, { DatePickerProps } from 'react-native-datepicker';
import { responsiveByWidth as rw, responsiveByHeight as rh } from 'App/Utils/style';

const StyledDatePicker = (props: DatePickerProps): ReactElement => {
  const { t } = useTranslation();

  return (
    <DatePicker
      confirmBtnText={props.confirmBtnText || t('Confirm')}
      cancelBtnText={props.cancelBtnText || t('Cancel')}
      showIcon={false}
      customStyles={{
        dateInput: {
          borderRadius: 12,
          borderColor: Palette.color_D6D6D6,
          borderWidth: rw(1),
          height: rh(42),
          alignItems: 'flex-start',
          paddingLeft: rw(13),
        },
        dateText: {
          color: Palette.zaapi4,
          fontSize: rh(14),
          fontWeight: '600',
          fontFamily: 'SourceSansPro-Regular',
        },
      }}
      {...props}
    />
  );
};

export default StyledDatePicker;
