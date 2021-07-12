import * as React from 'react';
import Svg, { SvgProps, Rect } from 'react-native-svg';

function SvgComponent(props: SvgProps) {
  return (
    <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <Rect x={3.5} y={3.5} width={17} height={17} rx={8.5} stroke="#D6D6D6" strokeWidth={3} />
    </Svg>
  );
}

const UnCheckedRadioButton = React.memo(SvgComponent);
export default UnCheckedRadioButton;
