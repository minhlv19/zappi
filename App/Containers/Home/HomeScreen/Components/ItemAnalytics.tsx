import StyledText from 'App/Components/StyledText/StyledText';
import React, { FC, memo } from 'react';
import { useTranslation } from 'react-i18next';
import { View, Text, StyleSheet, Dimensions } from 'react-native';

import SegmentConponent from './SegmentConponent';
import ViewChart from './ViewChart';
import { responsiveByWidth as rw, responsiveByHeight as rh } from 'App/Utils/style';

const { width } = Dimensions.get('window');

interface IProps {
  item: any;
}

const ItemAnalytics: FC<IProps> = ({ item }) => {
  const { t } = useTranslation();

  return (
    <View style={styles.viewAnalytics}>
      <SegmentConponent data={[t('Today'), t('Yesterday'), t('This week'), t('This month')]} />
      <ViewChart isVisitior={item?.visitior} />

      <View style={styles.viewTotal}>
        <StyledText style={styles.textTotal}>
          {item?.visitior ? 'Total 1,111 visitiors' : `${t('Total sales')} 3,000 THB`}
        </StyledText>
        {!item?.visitior && <StyledText style={styles.textOrder}>2 {t('orders')}</StyledText>}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  viewAnalytics: {
    borderRadius: 12,
    backgroundColor: '#fff',
    paddingVertical: rh(20),
    marginTop: rh(14),
    paddingHorizontal: rw(12),
    width: width - 30,
    flex: 1,
  },
  viewTotal: { alignItems: 'center', justifyContent: 'center', marginTop: rh(30) },
  textTotal: { fontWeight: '600' },
  textOrder: { color: '#263238', textAlign: 'center', marginTop: rh(5) },
});

export default memo(ItemAnalytics);
