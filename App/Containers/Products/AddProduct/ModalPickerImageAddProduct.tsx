import React, { FC, memo } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

import { ChangeImageIcon, TrashIcon } from 'App/assets/svg';
import ModalBottomSheet from 'App/Components/Modal/ModalBottomSheet';
import { Palette } from 'App/Theme/Palette';
import SetasCoverPhoto from 'App/assets/svg/SetasCoverPhoto';
import { responsiveByWidth as rw, responsiveByHeight as rh } from 'App/Utils/style';

interface IProps {
  isVisible: boolean;
  onClose?: () => void;
  onChnageImage?: () => void;
  onDeleteImage?: () => void;
  onSetasCoverPhoto?: () => void;
  showSetAsCoverPhoto: boolean;
}

const ModalPickerImageCategory: FC<IProps> = ({
  isVisible,
  onClose,
  onChnageImage,
  onDeleteImage,
  onSetasCoverPhoto,
  showSetAsCoverPhoto,
}) => {
  return (
    <ModalBottomSheet isVisible={isVisible} onClose={onClose}>
      <View style={styles.container}>
        {showSetAsCoverPhoto && (
          <TouchableOpacity onPress={onSetasCoverPhoto} style={styles.viewItem}>
            <SetasCoverPhoto />
            <Text style={styles.textItem}>{'Set as cover photo'}</Text>
          </TouchableOpacity>
        )}

        <TouchableOpacity onPress={onChnageImage} style={styles.viewItem}>
          <ChangeImageIcon />
          <Text style={styles.textItem}>{'Change image'}</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={onDeleteImage} style={styles.viewItem}>
          <TrashIcon />
          <Text style={styles.textItem}>{'Delete image'}</Text>
        </TouchableOpacity>
      </View>
    </ModalBottomSheet>
  );
};

const styles = StyleSheet.create({
  container: {},
  viewItem: {
    paddingHorizontal: rw(15),
    paddingVertical: rh(15),
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#F5F5F5',
  },
  textItem: {
    color: Palette.zaapi4,
    fontSize: rh(14),
    fontWeight: '600',
    marginLeft: rw(15),
    flex: 1,
    display: 'flex',
    lineHeight: 18,
  },
});

export default memo(ModalPickerImageCategory);
