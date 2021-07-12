import React, { createRef, useEffect, useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  Text,
  View,
} from 'react-native';
import styles from './styles';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import StyledText from 'App/Components/StyledText/StyledText';
import { actions, RichEditor } from 'react-native-pell-rich-editor';
import { Palette } from 'App/Theme/Palette';
import AlignLeftIcon from 'App/assets/icons/AlignLeftIcon.svg';
import AlignCenterIcon from 'App/assets/icons/AlignCenterIcon.svg';
import AlignRightIcon from 'App/assets/icons/AlignRightIcon.svg';
import BoldIcon from 'App/assets/icons/BoldIcon.svg';
import ItalicIcon from 'App/assets/icons/ItalicIcon.svg';
import HighlightIcon from 'App/assets/icons/HighlightIcon.svg';
import ListBulletIcon from 'App/assets/icons/ListBullet.svg';
import ListNumberIcon from 'App/assets/icons/ListNumberIcon.svg';
import PictureSelectIcon from 'App/assets/icons/PictureSelectIcon.svg';
import ModalSelectImage from 'App/Components/ModalSelectMultipleImage';
import useBoolean from 'App/Hooks/useBoolean';
import { responsiveByWidth as rw, responsiveByHeight as rh } from 'App/Utils/style';
import HeaderComponent from 'App/Components/Header/HeaderComponent';
const ProductDescription = (props: any) => {
  const { t } = useTranslation();
  const route = useRoute();
  const navigation = useNavigation();
  const richText = createRef<any>();
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
      setKeyboardVisible(true); // or some other action
    });
    const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardVisible(false); // or some other action
    });

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  const onPressIcon = (action: string) => {
    richText?.current?.sendAction(action, 'result');
  };
  const [isVisibleModal, showModal, hideModal] = useBoolean();
  const onSetImage = async (items: any[]) => {
    for (let item of items) {
      richText?.current?.insertImage(`data:${item.mime};base64,${item.data}`, '');
    }
    await richText?.current?.focusContentEditor();
  };

  return (
    <View style={{ flex: 1 }}>
      <HeaderComponent
        titleBack={''}
        rightHeader={
          <TouchableOpacity
            onPress={async () => {
              let html = await richText.current?.getContentHtml();
              navigation.goBack(), props.route.params.setDescription(html);
            }}>
            <StyledText style={styles.txtRightHeader}>{t('Done')}</StyledText>
          </TouchableOpacity>
        }
      />
      <ScrollView style={[styles.content]}>
        <RichEditor
          placeholder={t('Type your description here')}
          initialContentHTML={props.route.params.Description}
          allowFileAccess={true}
          allowUniversalAccessFromFileURLs={true}
          ref={richText}
          initialFocus={true}
          disabled={false}
          editorStyle={{
            placeholderColor: Palette.color_D6D6D6,
          }}
        />
      </ScrollView>

      <KeyboardAvoidingView
        style={[
          {
            backgroundColor: Palette.white,
            borderTopLeftRadius: 12,
            borderTopRightRadius: 12,
          },
          isKeyboardVisible
            ? {
                marginBottom: 20,
              }
            : {
                height: rh(41),
              },
        ]}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            paddingHorizontal: 16,
            paddingVertical: 13,
            justifyContent: 'space-between',
          }}>
          <View style={{ flexDirection: 'row' }}>
            <TouchableOpacity
              onPress={() => {
                onPressIcon(actions.alignLeft);
              }}>
              <AlignLeftIcon style={[styles.icons, { marginRight: 12 }]} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                onPressIcon(actions.alignCenter);
              }}>
              <AlignCenterIcon style={[styles.icons, { marginRight: 12 }]} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                onPressIcon(actions.alignRight);
              }}>
              <AlignRightIcon style={[styles.icons, { marginRight: 12 }]} />
            </TouchableOpacity>

            <Divider />
            <TouchableOpacity
              onPress={() => {
                onPressIcon(actions.setBold);
              }}>
              <BoldIcon style={[{ marginLeft: 15, marginRight: 16 }]} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                onPressIcon(actions.setItalic);
              }}>
              <ItalicIcon style={[{ marginRight: 15 }]} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {}}>
              <HighlightIcon style={[{ marginRight: 14 }]} />
            </TouchableOpacity>
            <Divider />
            <TouchableOpacity
              onPress={() => {
                onPressIcon(actions.insertBulletsList);
              }}>
              <ListBulletIcon style={[{ marginLeft: 12 }]} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                onPressIcon(actions.insertOrderedList);
              }}>
              <ListNumberIcon style={[{ marginLeft: 12 }]} />
            </TouchableOpacity>
          </View>
          <TouchableOpacity onPress={showModal}>
            <PictureSelectIcon />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
      <ModalSelectImage isVisible={isVisibleModal} onClose={hideModal} onSetImage={onSetImage} />
    </View>
  );
};

function Divider() {
  return <View style={{ width: 1, height: 16, backgroundColor: '#E5E5E5' }}></View>;
}

export default ProductDescription;
