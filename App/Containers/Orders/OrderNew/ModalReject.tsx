import React, { Dispatch, SetStateAction, useState } from 'react';
import { View, Text, SafeAreaView, GestureResponderEvent, Modal, StyleSheet, TouchableOpacity } from 'react-native';
import { Palette } from 'App/Theme/Palette';
import StyledText from 'App/Components/StyledText/StyledText';
import { useTranslation } from 'react-i18next';
import { responsiveByHeight as rh, responsiveByWidth as rw } from 'App/Utils/style';
import RadioButtonGroup, { RadioButtonOption } from 'App/Components/RadioButtonGroup';
import StyledTextInput from 'App/Components/StyledTextInput/StyledTextInput';
import StyledButton from 'App/Components/StyledButton/StyledButton';
import LinearGradient from 'react-native-linear-gradient';
import { RFValue } from 'react-native-responsive-fontsize';

const ModalReject = ({
  visible,
  onClose,
  onSubmit,
}: {
  visible: boolean;
  onClose: () => void;
  onSubmit: (reason: string) => void;
}) => {
  const { t } = useTranslation();
  const radioButtonsData: RadioButtonOption[] = [
    {
      label: 'Out of stock',
      value: 'Out of stock',
    },
    {
      label: 'Too many orders',
      value: 'Too many orders',
    },
    {
      label: 'Out of business hours',
      value: 'Out of business hours',
    },
    {
      label: 'Listing error',
      value: 'Listing error',
    },
    {
      label: 'Other',
      value: 'Other',
    },
  ];
  const [radioButton, setRadioButton] = useState<string>('Out of stock');
  const [optionalReason, setOptionalReason] = useState<string>('');
  function onPressRadioButton(radioButton: string) {
    setRadioButton(radioButton);
  }
  return (
    <>
      <Modal animationType="slide" transparent={true} visible={visible} presentationStyle="overFullScreen">
        <View style={styles.overlay} />
        <View style={styles.viewModal}>
          <View style={styles.contentModal}>
            <StyledText>{t('Are you sure you want to reject this order?')}</StyledText>
            <StyledText style={{ marginBottom: rh(21) }}>{t('Please select a reason')}</StyledText>
            <RadioButtonGroup radio={radioButtonsData} onPress={onPressRadioButton} />

            <StyledTextInput
              style={styles.input}
              placeholder={t('Optional')}
              value={optionalReason}
              onChangeText={setOptionalReason}
            />
            <View style={styles.styleActioncontent}>
              <LinearGradient
                style={[styles.buttonContainer, { marginRight: rw(4) }]}
                colors={[Palette.color_54B56F, Palette.color_2B90AB]}
                start={{ x: 0.0, y: 0.0 }}
                end={{ x: 1.0, y: 1.0 }}>
                <TouchableOpacity style={styles.button} onPress={onClose}>
                  <View style={styles.btnLeave}>
                    <StyledText style={[styles.buttonTitle, { color: Palette.zaapi2 }]}>{'Cancel'}</StyledText>
                  </View>
                </TouchableOpacity>
              </LinearGradient>
              <LinearGradient
                style={[styles.buttonContainer, { marginLeft: rw(4) }]}
                colors={[Palette.color_54B56F, Palette.color_2B90AB]}
                start={{ x: 0.0, y: 0.0 }}
                end={{ x: 1.0, y: 1.0 }}>
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => {
                    onClose();
                    onSubmit(radioButton === 'Other' ? optionalReason : radioButton);
                  }}>
                  <StyledText style={styles.buttonTitle}>{'Confirm'}</StyledText>
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
  viewModal: {
    flex: 1,
    justifyContent: 'center',
    // alignItems: 'center',
    // width:widthPercentageToDP('100%'),
    // // backgroundColor:Palette.white,
    // opacity:0.3,

    marginHorizontal: rw(22),
  },
  contentModal: {
    backgroundColor: Palette.white,
    width: '100%',
    //justifyContent: 'center',
    // alignItems: 'center',
    padding: 20,
    borderRadius: 12,
    elevation: 4,
  },
  input: {
    position: 'absolute',
    right: 30,
    top: -45,
    width: 191,
    height: 36,
  },
  viewBottom: {
    flexDirection: 'row',
    marginTop: 50,
    marginBottom: 30,
  },
  btnReject: {
    width: '50%',
    marginRight: 2,
  },
  btnAccept: {
    width: '50%',
    marginLeft: 2,
  },
  styleActioncontent: {
    flexDirection: 'row',
    marginTop: rh(18),
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
  btnLeave: {
    borderRadius: 12,
    backgroundColor: Palette.white,
    width: '98%',
    height: '96%',
    // margin:2
    justifyContent: 'center',
  },
});
export default ModalReject;
