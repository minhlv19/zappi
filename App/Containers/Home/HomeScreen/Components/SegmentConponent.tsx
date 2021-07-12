import StyledText from 'App/Components/StyledText/StyledText';
import React, { FC, useState } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { responsiveByWidth as rw, responsiveByHeight as rh } from 'App/Utils/style';

interface IProps {
  data: string[];
  onChangeIndex?: (index: number) => void;
}

const SegmentConponent: FC<IProps> = ({ data, onChangeIndex }) => {
  const [indexActive, setIndexActive] = useState<number>(0);

  return (
    <View style={styles.container}>
      {data.map((item, index) => (
        <Pressable
          onPress={() => {
            setIndexActive(index);
            !!onChangeIndex && onChangeIndex(index);
          }}
          key={index}
          style={[styles.viewItem, indexActive === index && styles.backGroundActive]}>
          <StyledText style={[styles.textItem, indexActive === index && styles.textActive]}>{item}</StyledText>
        </Pressable>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
    overflow: 'hidden',
    width: '100%',
  },
  viewItem: { height: rh(24), alignItems: 'center', justifyContent: 'center', backgroundColor: '#F5F5F5', flex: 1 },
  textItem: { color: '#999999', textAlign: 'center', fontSize: 12 },
  backGroundActive: { backgroundColor: '#42A391' },
  textActive: { color: '#fff' },
});

export default SegmentConponent;
