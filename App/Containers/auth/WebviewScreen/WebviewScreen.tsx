import Header from 'App/Components/Header';
import { Palette } from 'App/Theme/Palette';
import React, { useState } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import WebView from 'react-native-webview';
import GoBackIcon from '../../../assets/icons/GoBackIcon.svg';
import { responsiveByWidth as rw, responsiveByHeight as rh } from 'App/Utils/style';

const WebviewScreen = ({ route, navigation }: any) => {
  const { url, title } = route.params;

  return (
    <View>
      <Header title={title} icon={<GoBackIcon width={20} color={'#ffffff'} onPress={() => navigation.goBack()} />} />
      <View style={styles.screenContent}>
        <WebView source={{ uri: url }} style={styles.webviewContent} />
      </View>
    </View>
  );
};

const screenHeight = Dimensions.get('screen').height;

const styles = StyleSheet.create({
  screenContent: {
    position: 'absolute',
    marginTop: rh(102),
    borderRadius: 20,
    backgroundColor: Palette.white,
    height: screenHeight - 102,
    width: '100%',
  },
  webviewContent: {
    borderRadius: 20,
  },
});

export default WebviewScreen;
