import { CompletedIcon, NewOrdersIcon, ToShipIcon } from 'App/assets/svg';
import StyledText from 'App/Components/StyledText/StyledText';
import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { View, Text, StyleSheet } from 'react-native';
import { responsiveByWidth as rw, responsiveByHeight as rh } from 'App/Utils/style';

const ViewOrders = () => {
  const { t } = useTranslation();

  return (
    <View style={styles.container}>
      <StyledText style={styles.textHeader}>{t('Orders')}</StyledText>

      <View style={styles.viewOrder}>
        <View style={styles.viewItem}>
          <View>
            <NewOrdersIcon width={54} height={54} />

            <View style={styles.viewBagde}>
              <StyledText style={styles.textBadge}>99</StyledText>
            </View>
          </View>
          <StyledText style={styles.textItem}>{t('New Orders')}</StyledText>
        </View>

        <View style={styles.viewItem}>
          <ToShipIcon width={54} height={54} />
          <StyledText style={styles.textItem}>{t('To Ship')}</StyledText>
        </View>

        <View style={styles.viewItem}>
          <CompletedIcon width={54} height={54} />
          <StyledText style={styles.textItem}>{t('Completed')}</StyledText>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { paddingHorizontal: 15 },
  textHeader: { fontSize: rh(16), fontWeight: '700', color: '#4B4A4B' },
  viewOrder: {
    borderRadius: 12,
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: rh(23),
    marginBottom: rh(20),
    marginTop: rh(14),
  },
  viewItem: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  textItem: { marginTop: rh(10), fontSize: rh(14), fontWeight: '700', color: '#4B4A4B' },
  viewBagde: {
    backgroundColor: '#E51D35',
    width: rw(22),
    height: rh(22),
    borderRadius: 22 / 2,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    position: 'absolute',
    top: -2,
    right: -5,
  },
  textBadge: { color: '#fff', fontSize: rh(11), fontWeight: '500' },
});

export default memo(ViewOrders);
