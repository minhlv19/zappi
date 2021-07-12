import * as React from 'react';
import Svg, { SvgProps, Circle, Path } from 'react-native-svg';

function SvgComponent(props: SvgProps) {
  return (
    <Svg width={54} height={54} viewBox="0 0 54 54" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <Circle cx={27} cy={27} r={27} fill="#4DCD7F" />
      <Path
        d="M27.371 32.054c.89.889.89 2.412 0 3.301l-1.84 1.841c-.89.889-2.413.889-3.302 0l-8.062-8.126c-.89-.889-.89-2.412 0-3.301l1.84-1.841c.89-.889 2.413-.889 3.302 0l8.062 8.126z"
        fill="#fff"
      />
      <Path
        d="M34.958 18.024c.89-.889 2.413-.889 3.302 0l1.84 1.841c.89.889.89 2.413 0 3.301L26.135 37.07c-.889.89-2.412.89-3.301 0l-1.841-1.84c-.889-.89-.889-2.413 0-3.302l13.966-13.903z"
        fill="#fff"
      />
    </Svg>
  );
}

const SuccessIcon = React.memo(SvgComponent);
export default SuccessIcon;
