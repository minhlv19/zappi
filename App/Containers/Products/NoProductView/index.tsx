import React, { useState } from 'react';
import { View, SafeAreaView, Image, TouchableOpacity } from 'react-native';
import { media } from 'App/assets/media';
import { useTranslation } from 'react-i18next';
import styles from './styles';
import { useNavigation } from '@react-navigation/native';
import StyledText from 'App/Components/StyledText/StyledText';
import { responsiveByWidth as rw, responsiveByHeight as rh } from 'App/Utils/style';
import { AddProductIcon } from 'App/assets/svg';
import { Palette } from 'App/Theme/Palette';

const NoProductView = () => {
  const navigation = useNavigation();
  const { t } = useTranslation();
  const [listProduct, setListProduct] = useState([]);
  return (
    <SafeAreaView style={styles.container}>
      <View>
        {listProduct.length === 0 ? (
          <View>
            <View style={styles.content}>
              <Image source={media.Product_isActive} style={{ width: rw(50), height: rh(50) }} />
              <StyledText style={styles.txtTitleContent}>
                {t(`No product yet. You can add product by clicking the link below or`)}
                <AddProductIcon fill={Palette.zaapi3} width={rh(18)} height={rh(17)} style={styles.inlineIcon} />
                {t(`at the top right`)}
              </StyledText>
            </View>
            <TouchableOpacity style={styles.viewCreateProduct} onPress={() => navigation.navigate('AddProduct')}>
              <Image source={media.Create_active} style={styles.icCreate} />
              <StyledText style={styles.txtCreate}>{t('Create new product')}</StyledText>
            </TouchableOpacity>
          </View>
        ) : (
          <View>
            <StyledText>Length !=0</StyledText>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

export default NoProductView;
