import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';

function SvgComponent(props: SvgProps) {
  return (
    <Svg width={20} height={20} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <Path
        d="M10 0C4.477 0 0 4.477 0 10s4.477 10 10 10 10-4.477 10-10S15.523 0 10 0zm0 18.75a8.75 8.75 0 110-17.5 8.75 8.75 0 010 17.5z"
        fill="#4B4A4B"
      />
      <Path
        d="M12.319 3.932l-.888.887L12.87 6.25H6.25C5.56 6.25 5 6.81 5 7.5v1.875h1.25V7.5h6.619l-1.431 1.432.88.88 2.5-2.5a.625.625 0 000-.88l-2.5-2.5zM13.75 12.5H7.133l1.431-1.431-.881-.882-2.5 2.5a.625.625 0 000 .882l2.5 2.5.881-.881-1.431-1.438h6.619c.69 0 1.25-.56 1.25-1.25v-1.875h-1.25V12.5z"
        fill="#4B4A4B"
      />
    </Svg>
  );
}

const ChangeImageIcon = React.memo(SvgComponent);
export default ChangeImageIcon;
