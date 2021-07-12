import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';

function SvgComponent(props: SvgProps) {
  return (
    <Svg width={23} height={23} viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <Path
        d="M11.5 7.188a1.438 1.438 0 100-2.876 1.438 1.438 0 000 2.875zM11.5 12.938a1.438 1.438 0 100-2.876 1.438 1.438 0 000 2.876zM11.5 18.688a1.438 1.438 0 100-2.876 1.438 1.438 0 000 2.876z"
        fill="#4B4A4B"
      />
    </Svg>
  );
}

const MoreActionIcon = React.memo(SvgComponent);
export default MoreActionIcon;
