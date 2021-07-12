import { MultiSliderProps } from './MultiSlider/index.d';
import { useLayout } from '@react-native-community/hooks';
import React, { FC, memo, useCallback, useEffect, useState } from 'react';
import { View, StyleSheet, Text, Dimensions } from 'react-native';
import MultiSliderNew from './MultiSlider/MultiSliderNew';
import { ChunkValue } from '.';
import { responsiveByWidth as rw, responsiveByHeight as rh } from 'App/Utils/style';

interface IProps extends Partial<MultiSliderProps> {
  onChunkValuesChange: (chunkValues: ChunkValue) => void;
  chunkValues: ChunkValue;
  onDelete: (index: number) => void;
}

const ItemSlider: FC<IProps> = props => {
  const { ...rest } = props;
  const { onLayout, width } = useLayout();
  const [values, setValues] = useState<number[]>([0, 100]);

  const customMarker = useCallback(props => <View style={[styles.customMaker, props.style]} />, []);
  // const customLabel = useCallback((propsLabel: LabelProps) => <LabelMultiSlider {...propsLabel} />, []);

  const onValuesChange = useCallback((valuesChange: number[]) => {
    // setValues(valuesChange);
  }, []);

  return (
    <View style={styles.viewSlider}>
      <View style={styles.viewOverlaySlider}>
        <View style={styles.viewLineSlider} />
      </View>

      <View style={styles.wrapperSlider} onLayout={onLayout}>
        {width > 0 && (
          <MultiSliderNew
            step={15}
            trackStyle={styles.trackStyle}
            markerContainerStyle={styles.markerContainerStyle}
            sliderLength={width}
            enableLabel={false}
            selectedStyle={styles.selectedStyle}
            customMarker={customMarker}
            min={0}
            max={1440}
            onValuesChange={onValuesChange}
            values={[values[0], values[1]]}
            minMarkerOverlapStepDistance={4}
            {...rest}
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  trackStyle: { height: rh(4), backgroundColor: '#D6D6D6' },
  selectedStyle: { backgroundColor: '#42A391' },
  customMaker: { width: rw(16), height: rh(16), borderRadius: 16 / 2, backgroundColor: '#42A391' },
  markerContainerStyle: { top: -22 },
  wrapperSlider: { width: '100%' },
  viewSlider: { height: rh(120), justifyContent: 'center' },
  viewLineSlider: { borderRadius: 10, height: rh(4), width: '100%', backgroundColor: '#D6D6D6' },
  viewOverlaySlider: { ...StyleSheet.absoluteFillObject, justifyContent: 'center' },
});

export default memo(ItemSlider);
