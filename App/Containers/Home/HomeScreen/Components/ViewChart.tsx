import React, { FC, memo, useCallback } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { responsiveByWidth as rw, responsiveByHeight as rh } from 'App/Utils/style';

import ItemChar from './ItemChar';

interface IProps {
  isVisitior?: boolean;
}

const ViewChart: FC<IProps> = ({ isVisitior }) => {
  const renderItem = useCallback(
    ({ item, index }) => <ItemChar isVisitior={isVisitior} showTime={index % 2 === 0} heightChar={125} item={item} />,
    [isVisitior],
  );
  const itemSeparatorComponent = useCallback(() => <View style={styles.itemSeparatorComponent} />, []);

  return (
    <View style={styles.container}>
      <View style={styles.viewLine}>
        <View style={styles.line} />
        <View style={styles.line} />
        <View style={styles.line} />
        <View style={styles.line} />
        <View style={styles.line} />
      </View>

      <FlatList
        horizontal
        style={styles.flatList}
        ItemSeparatorComponent={itemSeparatorComponent}
        data={[
          { time: '8 AM', value: 0.5 },
          { time: '9 AM', value: 0.4 },
          { time: '10 AM', value: 0.7 },
          { time: '11 AM', value: 0.6 },
          { time: '12 AM', value: 0.7 },
          { time: '1 PM', value: 0.8 },
          { time: '2 PM', value: 0.9 },
          { time: '3 PM', value: 0.3 },
          { time: '4 PM', value: 0.2 },
        ]}
        renderItem={renderItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { marginTop: rh(30), height: rh(125) },
  line: { height: rh(1), backgroundColor: '#D6D6D6', width: '100%', marginTop: rh(20) },
  viewLine: { ...StyleSheet.absoluteFillObject },
  itemSeparatorComponent: { width: rw(7) },
  flatList: { height: '100%', width: '100%' },
});

export default memo(ViewChart);
