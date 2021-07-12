/* eslint-disable react-native/no-inline-styles */
import { CheckIcon } from 'App/assets/svg';
import React, { FC, memo } from 'react';
import { View, StyleSheet } from 'react-native';
import { responsiveByWidth as rw, responsiveByHeight as rh } from 'App/Utils/style';
import Refer from 'App/assets/icons/Refer.svg';
import ReferGrey from 'App/assets/icons/Refer_grey.svg';
import StyledText from 'App/Components/StyledText/StyledText';
import { Palette } from 'App/Theme/Palette';
interface IProps {
  isDone?: boolean;
  hideLine?: boolean;
  title?: string;
}

const StepItem: FC<IProps> = ({ isDone, hideLine, title }) => {
  return (
    <View style={styles.container}>
      {isDone ? (
        <View style={{ marginRight: -10 }}>
          <Refer width={40} height={40} />
          <StyledText style={[styles.textHeader]}>{title}</StyledText>
        </View>
      ) : (
        <View style={{ marginRight: -10 }}>
          <ReferGrey />
          <StyledText style={[styles.textHeader, { color: Palette.grey }]}>{title}</StyledText>
        </View>
      )}

      {!hideLine && <View style={[styles.viewLine, { backgroundColor: isDone ? '#42A391' : '#D6D6D6' }]} />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { alignItems: 'center', flexDirection: 'row' },
  viewLine: { width: rw(104), height: rh(2), backgroundColor: '#42A391', marginBottom: rh(30) },
  textHeader: {
    color: Palette.zaapi2,
    fontSize: rh(14),
    lineHeight: rh(18),
    display: 'flex',
    alignItems: 'center',
    textAlign: 'center',
    marginTop: 6,
  },
});

export default memo(StepItem);
