/* eslint-disable react-native/no-inline-styles */
import { CheckIcon } from 'App/assets/svg';
import React, { FC, memo } from 'react';
import { View, StyleSheet } from 'react-native';
import { responsiveByWidth as rw, responsiveByHeight as rh } from 'App/Utils/style';

interface IProps {
  isDone?: boolean;
  hideLine?: boolean;
}

const StepItem: FC<IProps> = ({ isDone, hideLine }) => {
  return (
    <View style={styles.container}>
      <CheckIcon fill={isDone ? '#42A391' : '#D6D6D6'} width={30} height={30} />

      {!hideLine && <View style={[styles.viewLine, { backgroundColor: isDone ? '#42A391' : '#D6D6D6' }]} />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { alignItems: 'center' },
  viewLine: { width: 2.5, height: rh(70), backgroundColor: '#42A391' },
});

export default memo(StepItem);
