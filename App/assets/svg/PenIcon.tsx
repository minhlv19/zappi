import * as React from 'react';
import Svg, { SvgProps, G, Path, Defs, ClipPath } from 'react-native-svg';

function SvgComponent(props: SvgProps) {
  return (
    <Svg width={16} height={16} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <G clipPath="url(#prefix__clip0)" fill="currentColor">
        <Path d="M.514 16a.507.507 0 01-.493-.632l.955-3.833a.51.51 0 01.133-.237L11.862.545a1.868 1.868 0 012.638 0l.96.96a1.868 1.868 0 010 2.638L4.707 14.896a.506.506 0 01-.237.133l-3.833.955A.471.471 0 01.514 16zm1.414-4.083l-.716 2.875 2.875-.716L14.74 3.423a.85.85 0 000-1.2l-.959-.958a.85.85 0 00-1.2 0L1.929 11.917zm2.42 2.619h.006-.006z" />
        <Path d="M13.444 5.947c-.13 0-.26-.05-.36-.149L10.206 2.92a.509.509 0 11.72-.72l2.878 2.879a.509.509 0 01-.36.868zM4.346 15.045c-.13 0-.26-.05-.36-.15l-2.878-2.878a.51.51 0 01.72-.72l2.878 2.879a.509.509 0 01-.36.869z" />
      </G>
      <Defs>
        <ClipPath id="prefix__clip0">
          <Path fill="currentColor" d="M0 0h16v16H0z" />
        </ClipPath>
      </Defs>
    </Svg>
  );
}

const PenIcon = React.memo(SvgComponent);
export default PenIcon;
