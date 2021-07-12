import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';

function SvgComponent(props: SvgProps) {
  return (
    <Svg width={16} height={16} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <Path
        d="M8.003 3.935a.666.666 0 00-.667.666V8.6a.666.666 0 101.333 0V4.601a.666.666 0 00-.666-.666zM8.615 11.079a.62.62 0 00-.14-.22c-.033-.027-.066-.06-.106-.08a.384.384 0 00-.114-.06.666.666 0 00-.726.14.622.622 0 00-.14.22.664.664 0 00-.053.253c0 .087.02.173.053.253a.77.77 0 00.14.22.77.77 0 00.22.14c.08.034.167.054.254.054.086 0 .172-.02.252-.054a.778.778 0 00.22-.14.77.77 0 00.14-.22.663.663 0 00.053-.253.664.664 0 00-.053-.253z"
        fill={props.fill}
      />
      <Path
        d="M2.34 13.66c-3.12-3.121-3.12-8.199 0-11.32 3.121-3.12 8.199-3.12 11.32 0 3.12 3.121 3.12 8.199 0 11.32-3.121 3.12-8.199 3.12-11.32 0zM12.852 3.149a6.868 6.868 0 00-9.702 0 6.868 6.868 0 000 9.702 6.868 6.868 0 009.702 0 6.868 6.868 0 000-9.702z"
        fill={props.fill}
      />
    </Svg>
  );
}

const InfoIcon = React.memo(SvgComponent);
export default InfoIcon;