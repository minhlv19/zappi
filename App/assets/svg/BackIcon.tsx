import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';

function SvgComponent(props: SvgProps) {
  return (
    <Svg width={20} height={21} viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <Path
        d="M8.705 10.73l3.926-3.925a.569.569 0 00.167-.406.57.57 0 00-.167-.406l-.344-.343a.57.57 0 00-.406-.168.57.57 0 00-.406.168l-4.674 4.673a.57.57 0 00-.167.407c0 .155.059.3.167.408l4.67 4.669a.57.57 0 00.406.168.57.57 0 00.405-.168l.344-.344a.575.575 0 000-.812l-3.92-3.92z"
        fill="#fff"
      />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M10 2.213a8.537 8.537 0 100 17.074 8.537 8.537 0 000-17.074zM0 10.75c0-5.523 4.477-10 10-10s10 4.477 10 10-4.477 10-10 10-10-4.477-10-10z"
        fill="#fff"
      />
    </Svg>
  );
}

const BackIcon = React.memo(SvgComponent);
export default BackIcon;
