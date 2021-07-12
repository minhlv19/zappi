import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';

function SvgComponent(props: SvgProps) {
  return (
    <Svg width={8} height={6} viewBox="0 0 8 6" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <Path
        d="M4.417 5.368a.5.5 0 01-.834 0L1.048 1.525A.5.5 0 011.465.75h5.07a.5.5 0 01.417.775L4.417 5.368z"
        fill="#4B4A4B"
      />
    </Svg>
  );
}

const ArrowDownInStock = React.memo(SvgComponent);
export default ArrowDownInStock;
