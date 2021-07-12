import React, { useState } from 'react';
import { View, Text, SafeAreaView, StyleSheet, ScrollView } from 'react-native';
import StyleHeader from 'App/Components/Header/StyleHeader';
import BackIcon from 'App/assets/icons/BackIcon.svg';
import { responsiveByHeight as rh, responsiveByWidth as rw } from 'App/Utils/style';
import { Palette } from 'App/Theme/Palette';
import { heightPercentageToDP, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import StyledText from 'App/Components/StyledText/StyledText';
import MockupReferFriends from 'App/assets/icons/Mockup_ReferFriends.svg';
import StepItem from './StepItem';
import UniqueReferralLink from 'App/Containers/Store/Referfriends/UniqueReferralLink';
import { useLayout } from '@react-native-community/hooks';

const Referfriends = () => {
  const navigation = useNavigation();
  const { t } = useTranslation();
  const [Friend1, setFriend1] = useState(true);
  const [Friend2, setFriend2] = useState(false);
  const [Friend3, setFriend3] = useState(false);
  const { onLayout: onLayoutShareStore, height: heightShareStore } = useLayout();
  return (
    <SafeAreaView style={styles.container}>
      <StyleHeader
        isStatusbar={true}
        title={t('Refer friends and unlock perks')}
        styleTitle={styles.titleHeaderStyle}
        iconLeft={<BackIcon />}
        styleiconLeft={styles.icLeftHeaderStyle}
        actionLeft={() => navigation.goBack()}
        styleHeader={styles.styleHeader}
      />
      <ScrollView style={styles.content}>
        <View>
          <StyledText style={styles.txtTitleInvite}>{t('Invite friends and remove Zaapi banner')}</StyledText>
        </View>
        <View>
          <StyledText style={styles.txtSubInvite}>
            {t(
              'Invite friends to remove the Zaapi banner from your store. Unlock this as soon as 3 of them add products to their store!',
            )}
          </StyledText>
        </View>
        <View>
          <MockupReferFriends style={styles.icMocup} />
        </View>
        <View style={styles.viewIconFriend}>
          <StepItem isDone={Friend1} title={t('Friend 1')} />
          <StepItem isDone={Friend2} title={t('Friend 2')} />
          <StepItem isDone={Friend3} title={t('Friend 3')} hideLine />
        </View>
        <View>
          <UniqueReferralLink />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  titleHeaderStyle: {
    fontWeight: 'bold',
    fontSize: rh(18),
    lineHeight: rh(23),
    color: Palette.white,
    marginLeft: rw(20),
    justifyContent: 'center',
  },
  icLeftHeaderStyle: {
    justifyContent: 'center',
    marginLeft: rw(20),
  },
  styleHeader: {
    position: 'absolute',
    width: wp('100%'),
  },
  content: {
    backgroundColor: Palette.white,
    width: wp('100'),
    marginTop: rh(100),
    height: heightPercentageToDP('100%'),
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    paddingVertical: rh(17),
    paddingHorizontal: rh(16),
  },
  txtTitleInvite: {
    fontWeight: 'bold',
    fontSize: rh(18),
    lineHeight: rh(23),
    color: Palette.zaapi4,
  },
  txtSubInvite: {
    fontSize: rh(14),
    lineHeight: rh(18),
    color: Palette.grey,
    marginTop: rh(9),
  },
  icMocup: {
    marginVertical: rh(20),
    alignSelf: 'center',
  },
  viewIconFriend: { alignItems: 'center', flexDirection: 'row', alignSelf: 'center', marginTop: rh(50) },
  viewRight: { flex: 1, flexDirection: 'row' },
});
export default Referfriends;
