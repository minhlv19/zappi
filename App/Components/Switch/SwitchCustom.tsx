import React, { FC, memo } from 'react';
import { StyleSheet } from 'react-native';
import { Switch, SwitchProps } from 'react-native-switch';
import { responsiveByWidth as rw, responsiveByHeight as rh } from 'App/Utils/style';

interface IProps extends SwitchProps {}

const SwitchCustom: FC<IProps> = props => {
  return (
    <Switch
      barHeight={24}
      circleSize={24}
      innerCircleStyle={styles.innerCircleStyle}
      renderInActiveText={false}
      renderActiveText={false}
      backgroundInactive="#D6D6D6"
      backgroundActive="#42A391"
      circleBorderWidth={0}
      circleBorderInactiveColor="#fff"
      circleBorderActiveColor="#fff"
      {...props}
    />
  );
};

const styles = StyleSheet.create({
  innerCircleStyle: { width: rw(18), height: rh(18), borderRadius: rh(18) / 2 },
});

export default memo(SwitchCustom);
