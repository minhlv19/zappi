import StyledText from 'App/Components/StyledText/StyledText';
import React, { FC, memo } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import Dash from 'react-native-dash';
import { responsiveByWidth as rw, responsiveByHeight as rh } from 'App/Utils/style';

interface IProps {
  item: any;
  heightChar: number;
  showTime?: boolean;
  isVisitior?: boolean;
}

const ItemChar: FC<IProps> = ({ item, heightChar, showTime, isVisitior }) => {
  return (
    <View style={styles.container}>
      <View style={[styles.viewContent, { height: heightChar - 20 }]}>
        <View style={styles.viewWapperDash}>
          {showTime && (
            <Dash style={styles.dashItem} dashStyle={styles.dashStyle} dashGap={1.5} dashLength={5} dashThickness={1} />
          )}
        </View>

        <View
          style={[styles.viewChar, { height: `${Number(item.value) * 100}%` }, isVisitior && styles.backGroundVisitor]}
        />
      </View>

      <View style={styles.viewTime}>{showTime && <StyledText style={styles.textTime}>{item.time}</StyledText>}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { alignContent: 'center' },
  dashItem: { flexDirection: 'column', height: '100%' },
  dashStyle: { backgroundColor: '#D6D6D6' },
  viewChar: { width: rw(30), borderRadius: 2, backgroundColor: '#318496', height: rh(50) },
  viewWapperDash: { flex: 1, alignItems: 'center' },
  textTime: { color: '#4B4A4B', fontSize: rh(10), textAlign: 'center' },
  viewTime: { height: rh(20), alignItems: 'center', justifyContent: 'center' },
  viewContent: { height: rh(105) },
  backGroundVisitor: { backgroundColor: '#93DAAF' },
});

export default memo(ItemChar);
