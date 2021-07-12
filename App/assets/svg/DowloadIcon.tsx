import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';

function SvgComponent(props: SvgProps) {
  return (
    <Svg width={20} height={20} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <Path
        d="M3.756 9H6.9a.1.1 0 00.1-.1V.6a.1.1 0 01.1-.1h5.3a.1.1 0 01.1.1v8.3a.1.1 0 00.1.1h3.644a.1.1 0 01.068.173l-6.244 5.764a.1.1 0 01-.136 0L3.688 9.173A.1.1 0 013.756 9z"
        stroke="#000"
      />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M1 20a1 1 0 01-1-1v-6.5a.5.5 0 011 0v6.124c0 .208.168.376.376.376H18.624a.376.376 0 00.376-.376V12.5a.5.5 0 011 0V19a1 1 0 01-1 1H1z"
        fill="#000"
      />
    </Svg>
  );
}

const DowloadIcon = React.memo(SvgComponent);
export default DowloadIcon;
