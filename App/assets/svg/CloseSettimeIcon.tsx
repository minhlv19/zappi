import * as React from 'react';
import Svg, { SvgProps, Path, Circle } from 'react-native-svg';

function SvgComponent(props: SvgProps) {
  return (
    <Svg width={375} height={433} viewBox="0 0 375 433" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <Path d="M0 20C0 8.954 8.954 0 20 0h335c11.046 0 20 8.954 20 20v413H0V20z" fill="#fff" />
      <Circle cx={237} cy={267} r={6} fill="#E3E3E3" />
      <Path
        d="M237.55 267l2.336-2.336a.389.389 0 10-.55-.55L237 266.45l-2.336-2.336a.389.389 0 10-.55.55L236.45 267l-2.336 2.336a.389.389 0 10.55.55L237 267.55l2.336 2.336a.389.389 0 10.55-.55L237.55 267z"
        fill="#4B4A4B"
      />
    </Svg>
  );
}

const CloseSettimeIcon = React.memo(SvgComponent);
export default CloseSettimeIcon;
