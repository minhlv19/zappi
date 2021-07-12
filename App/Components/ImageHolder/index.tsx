import React, { useState, Dispatch, SetStateAction, ReactElement } from 'react';
import { View, Text, SafeAreaView, TouchableOpacity, ActivityIndicator } from 'react-native';
import styles from './styles';
import FastImage from 'react-native-fast-image';
import { media } from 'App/assets/media';
import ImagePicker from 'react-native-image-crop-picker';
import PopUpImage from 'App/Components/PopUpImage';
import { logError } from 'App/Utils/error';
import { responsiveByWidth as rw, responsiveByHeight as rh } from 'App/Utils/style';

interface Props {
  index: number;
  listImage: string[];
  setListValue: Dispatch<SetStateAction<string[]>>;
}
const ImageHolder = (props: Props): ReactElement => {
  const [image, setImage] = useState('');
  const [loading, setLoading] = useState(false);
  const [chooseVisible, setChooseVisible] = useState(false);
  const open_camera = () => {
    setChooseVisible(false);
    setTimeout(() => {
      ImagePicker.openCamera({
        width: rw(300),
        height: rh(400),
        cropping: true,
      })
        .then(img => {
          console.log(img);
        })
        .catch(err => {
          logError(err);
          console.warn(err);
        });
    }, 200);
  };
  const open_gallery = () => {
    setChooseVisible(false);
    setTimeout(() => {
      ImagePicker.openPicker({
        width: rw(300),
        height: rh(400),
        cropping: true,
      })
        .then(img => {
          console.log(img);
        })
        .catch(err => {
          console.warn(err);
        });
    }, 200);
  };

  return (
    <>
      <TouchableOpacity style={styles.addLogoAreaContainer} onPress={() => (image ? null : setChooseVisible(true))}>
        <View style={styles.containerImage}>
          {loading ? <ActivityIndicator style={styles.loading} animating={true} /> : null}
          <FastImage
            source={image ? media.imageHolder : media.imageHolder}
            style={image ? styles.image : styles.iconAdd}
            onLoadStart={() => setLoading(true)}
            onLoadEnd={() => setLoading(false)}
          />
        </View>
      </TouchableOpacity>
      <PopUpImage
        visible={chooseVisible}
        setVisible={setChooseVisible}
        openCamera={() => open_camera()}
        openGallery={() => open_gallery()}
      />
    </>
  );
};

export default ImageHolder;
