import * as React from 'react';
import Svg, { SvgProps, G, Rect, Path, Defs, LinearGradient, Stop } from 'react-native-svg';
/* SVGR has dropped some elements not supported by react-native-svg: filter */

function SvgComponent(props: SvgProps) {
  return (
    <Svg width={48} height={48} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <G filter="url(#prefix__filter0_d)">
        <Rect x={4} y={4} width={40} height={40} rx={12} fill="#fff" />
      </G>
      <Path
        d="M32.627 15.373a4.687 4.687 0 010 6.63l-3.863 3.862c-.52.52-1.13.892-1.782 1.117a4.71 4.71 0 01-3.064 0 4.667 4.667 0 01-1.783-1.117 4.672 4.672 0 01-1.116-1.783L21.1 24c-.082.082 1.448-1.479 1.448-1.479L24 24c.8.8 2.1.8 2.9 0l.082-.082 3.78-3.78c.8-.8.8-2.1 0-2.9-.8-.8-2.1-.8-2.899 0l-3.78 3.78-1.533.623-1.531-.623a4.67 4.67 0 011.116-1.783l3.863-3.862a4.687 4.687 0 016.629 0z"
        fill="url(#prefix__paint0_linear)"
      />
      <Path
        d="M24.082 21.018a4.67 4.67 0 011.783 1.117c.52.52.892 1.132 1.117 1.783l-.083.082c-.8.8-2.1.8-2.899 0-.8-.8-2.1-.8-2.9 0l-.082.082-3.78 3.78c-.8.8-.8 2.101 0 2.9.799.8 2.1.8 2.9 0l3.78-3.78c.99.34 2.073.34 3.064 0a4.668 4.668 0 01-1.117 1.782l-3.863 3.863a4.688 4.688 0 01-6.63-6.63l3.864-3.862a4.668 4.668 0 011.782-1.117 4.71 4.71 0 013.064 0z"
        fill="url(#prefix__paint1_linear)"
      />
      <Defs>
        <LinearGradient
          id="prefix__paint0_linear"
          x1={20.81}
          y1={15.103}
          x2={34.159}
          y2={15.28}
          gradientUnits="userSpaceOnUse">
          <Stop stopColor="#54B56F" />
          <Stop offset={1} stopColor="#2B90AB" />
        </LinearGradient>
        <LinearGradient
          id="prefix__paint1_linear"
          x1={13.792}
          y1={21.865}
          x2={27.14}
          y2={22.042}
          gradientUnits="userSpaceOnUse">
          <Stop stopColor="#54B56F" />
          <Stop offset={1} stopColor="#2B90AB" />
        </LinearGradient>
      </Defs>
    </Svg>
  );
}

const CopyUrlIcon = React.memo(SvgComponent);
export default CopyUrlIcon;
