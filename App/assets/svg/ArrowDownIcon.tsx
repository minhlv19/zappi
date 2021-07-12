import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';

function SvgComponent(props: SvgProps) {
  return (
    <Svg width={11} height={7} viewBox="0 0 11 7" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M10.282.22a.75.75 0 00-1.062 0L5.25 4.192 1.283.221A.75.75 0 10.22 1.283l4.5 4.5a.75.75 0 001.062 0l4.5-4.5a.75.75 0 000-1.062z"
        fill={props.fill || '#4B4A4B'}
      />
    </Svg>
  );
}

const ArrowDownIcon = React.memo(SvgComponent);
export default ArrowDownIcon;
