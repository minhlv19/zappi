import React, { memo } from 'react';
import { View, Text, StyleSheet, Switch } from 'react-native';
import { getBottomSpace } from 'react-native-iphone-x-helper';

import StyledButton from 'App/Components/StyledButton/StyledButton';
import SwitchCustom from 'App/Components/Switch/SwitchCustom';
import StyledText from 'App/Components/StyledText/StyledText';
import { responsiveByWidth as rw, responsiveByHeight as rh } from 'App/Utils/style';

const ViewSetHoliday = ({ onSavePress, onSetHolidayValueChange, onHolidaysEnabled, storeId }: any) => {
  return (
    <View style={styles.container}>
      {storeId && (
        <>
          <StyledText style={styles.textTitle}>Set Holiday</StyledText>

          <View style={styles.viewSwitch}>
            <StyledText style={styles.textLabelSwitch}>Mark your store as "On Holiday"</StyledText>

            <SwitchCustom value={onHolidaysEnabled} onValueChange={onSetHolidayValueChange} />
          </View>

          <StyledText style={styles.textDesc}>
            Please note that your customers will not be able to put in orders when this is toggled off. Toggle on again
            when you return from holiday.
          </StyledText>
        </>
      )}

      <View style={styles.viewButtonSubmit}>
        <StyledButton title="Save" onPress={onSavePress} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: rh(10),
    backgroundColor: '#fff',
    paddingHorizontal: rw(15),
    paddingVertical: rh(20),
    paddingBottom: getBottomSpace() || 20,
  },
  textTitle: { color: '#4B4A4B', fontWeight: '700', fontSize: 18 },
  viewSwitch: { marginTop: rh(20), flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  textLabelSwitch: { color: '#4B4A4B', fontWeight: '600', fontSize: 14 },
  textDesc: { marginTop: rh(10), color: '#999999' },
  viewButtonSubmit: { marginTop: rh(40) },
});

export default memo(ViewSetHoliday);
