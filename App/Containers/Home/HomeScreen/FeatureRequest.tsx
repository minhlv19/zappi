import React, { memo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { View, Text, StyleSheet, TextInput } from 'react-native';

import { ArrowDownIcon } from 'App/assets/svg';
import InputComponent from 'App/Components/Input/InputComponent';
import StyledText from 'App/Components/StyledText/StyledText';
import { responsiveByWidth as rw, responsiveByHeight as rh } from 'App/Utils/style';

const FeatureRequest = () => {
  const { t } = useTranslation();
  const [textFeedback, setTextFeedback] = useState<string>('');

  return (
    <View style={styles.container}>
      <StyledText style={styles.textHeader}>{t('Feature Request')}</StyledText>

      <View style={styles.viewContent}>
        <InputComponent
          label={t('Categories')}
          editable={false}
          placeholder={t('Choose Categories')}
          rightIcon={<ArrowDownIcon />}
        />

        <StyledText style={styles.textTitleFeedback}>{t('Feedback')}</StyledText>

        <View style={styles.viewFeedBack}>
          <View style={styles.viewInput}>
            <TextInput style={styles.textInput} multiline value={textFeedback} onChangeText={setTextFeedback} />
          </View>
          <View style={styles.viewNumberOfText}>
            <StyledText style={styles.viewNumberOfText}>{textFeedback.length}/500</StyledText>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { marginBottom: rh(20), paddingHorizontal: 15 },
  textHeader: { fontSize: rh(16), fontWeight: '700', color: '#4B4A4B' },
  viewContent: {
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingHorizontal: rw(12),
    paddingVertical: rh(12),
    marginTop: rh(15),
  },
  textTitle: { color: '#4B4A4B', fontWeight: '700' },
  viewChooseCate: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 12,
    borderColor: '#D6D6D6',
    borderWidth: 1,
    marginTop: rh(6),
    paddingHorizontal: rw(12),
    paddingVertical: rh(12),
  },
  textPlacaholder: { color: '#D6D6D6', fontWeight: '600' },
  textTitleFeedback: { color: '#4B4A4B', fontWeight: '700', marginTop: rh(30) },
  viewFeedBack: {
    height: rh(112),
    borderRadius: 12,
    borderColor: '#D6D6D6',
    borderWidth: 1,
    marginTop: rh(6),
    paddingHorizontal: rw(12),
    paddingVertical: rh(12),
  },
  viewInput: { flex: 1 },
  viewNumberOfText: { alignItems: 'flex-end' },
  textNumberOfText: { fontSize: rh(14), color: '#D6D6D6', fontWeight: '600' },
  textInput: { color: '#000', margin: 0, padding: 0, flex: 1 },
});

export default memo(FeatureRequest);
