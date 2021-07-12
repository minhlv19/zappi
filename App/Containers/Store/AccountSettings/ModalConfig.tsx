import React, { Dispatch, SetStateAction, useState } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  Modal,
  Alert,
  TouchableOpacity,
  GestureResponderEvent,
  StyleSheet,
} from 'react-native';

import StyledButton from 'App/Components/StyledButton/StyledButton';
import { Palette } from 'App/Theme/Palette';
import LinearGradient from 'react-native-linear-gradient';
import StyledText from 'App/Components/StyledText/StyledText';
import MaskedView from '@react-native-community/masked-view';
import { responsiveByWidth as rw, responsiveByHeight as rh } from 'App/Utils/style';
import { RFValue } from 'react-native-responsive-fontsize';
import { useTranslation } from 'react-i18next';

const ModalConfig = ({
  visible,
  setVisible,
  action,
}: {
  visible: boolean;
  setVisible: Dispatch<SetStateAction<boolean>>;
  action: (event: GestureResponderEvent) => void;
}) => {
  const { t } = useTranslation();
  return (
    <>
      <Modal animationType="slide" transparent={true} visible={visible} presentationStyle="overFullScreen">
        <View style={styles.overlay} />
        <View style={styles.viewModal}>
          <View style={styles.contentModal}>
            <Text style={styles.txtTitle}>{t('Are you sure you want to leave this page without saving?')}</Text>

            <View style={styles.styleActioncontent}>
              <LinearGradient
                style={[styles.buttonContainer, { marginRight: rw(4) }]}
                colors={[Palette.color_54B56F, Palette.color_2B90AB]}
                start={{ x: 0.0, y: 0.0 }}
                end={{ x: 1.0, y: 1.0 }}>
                <TouchableOpacity style={styles.button} onPress={() => setVisible(false)}>
                  <View style={styles.btnLeave}>
                    <StyledText style={[styles.buttonTitle, { color: Palette.zaapi2 }]}>{t('Cancel')}</StyledText>
                  </View>
                </TouchableOpacity>
              </LinearGradient>
              <LinearGradient
                style={[styles.buttonContainer, { marginLeft: rw(4) }]}
                colors={[Palette.color_54B56F, Palette.color_2B90AB]}
                start={{ x: 0.0, y: 0.0 }}
                end={{ x: 1.0, y: 1.0 }}>
                <TouchableOpacity style={styles.button} onPress={action}>
                  <StyledText style={styles.buttonTitle}>{t('Confirm')}</StyledText>
                </TouchableOpacity>
              </LinearGradient>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
};
const styles = StyleSheet.create({
  viewModal: {
    flex: 1,
    justifyContent: 'center',
    // alignItems: 'center',
    // width:widthPercentageToDP('100%'),
    // // backgroundColor:Palette.white,
    // opacity:0.3,

    marginHorizontal: rw(20),
  },
  overlay: {
    flex: 1,
    position: 'absolute',
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
    backgroundColor: Palette.black,
    opacity: 0.6,
    zIndex: 0,
  },
  styleActioncontent: {
    flexDirection: 'row',
    marginTop: rh(20),
  },
  contentModal: {
    backgroundColor: Palette.white,
    width: '100%',
    height: rh(173),
    //justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    borderRadius: 12,
    elevation: 4,
  },
  txtTitle: {
    fontWeight: '700',
    fontSize: RFValue(16, 680),
    textAlign: 'center',
    color: Palette.black,
  },
  txtSubtitle: {
    fontWeight: '400',
    fontSize: RFValue(14, 680),
    textAlign: 'center',
    color: '#15192050',
    marginTop: rh(10),
  },
  action: {
    flex: 1,
  },
  buttonContainer: {
    borderRadius: 12,
    height: rh(42),
    flex: 1,
  },
  button: {
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonTitle: {
    color: Palette.white,
    fontWeight: 'bold',
    fontSize: RFValue(12, 580),
    textAlign: 'center',
  },
  buttonTitleDisabled: {
    color: Palette.white,
  },
  btnLeave: {
    borderRadius: 12,
    backgroundColor: Palette.white,
    width: '98%',
    height: '96%',
    // margin:2
    justifyContent: 'center',
  },
});
export default ModalConfig;
