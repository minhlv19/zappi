import React, { ReactElement, useState } from 'react';
import { View, Text, SafeAreaView, TouchableOpacity, GestureResponderEvent, StyleSheet } from 'react-native';
import styles from 'App/Containers/Store/StoreScreen/styles';
import ReferFriends from 'App/assets/icons/ReferFriends.svg';
import IconNext from 'App/assets/icons/IconNext.svg';
import { useTranslation } from 'react-i18next';
import StyledText from 'App/Components/StyledText/StyledText';

interface Props {
  action?: ((event: GestureResponderEvent) => void) | undefined;
  txtTitle: string;
  icLeft: any;
}
const Item = (props: Props): ReactElement => {
  return (
    <View style={styles.itemStyle}>
      <TouchableOpacity onPress={props.action} style={styles.itemContainer}>
        {props.icLeft}
        <StyledText style={styles.txttile}>{props.txtTitle}</StyledText>
        <IconNext />
      </TouchableOpacity>
    </View>
  );
};

export default Item;
