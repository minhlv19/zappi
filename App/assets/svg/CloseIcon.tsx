import * as React from 'react';
import Svg, { SvgProps, Path, G, ClipPath, Defs } from 'react-native-svg';

function SvgComponent(props: SvgProps) {
  return (
    <Svg
      width={props.width || 16}
      height={props.height || 16}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <G clipPath="url(#prefix__clip0)" fill={props.fill || '#fff'}>
        <Path d="M-.005 10C-.005 4.483 4.483-.005 10-.005c5.516 0 10.004 4.488 10.004 10.005 0 5.516-4.488 10.004-10.004 10.004C4.483 20.004-.005 15.516-.005 10zm18.58 0c0-4.729-3.847-8.576-8.575-8.576-4.729 0-8.576 3.847-8.576 8.576 0 4.728 3.847 8.575 8.576 8.575 4.728 0 8.575-3.847 8.575-8.575z" />
        <Path d="M5.712 13.573c0-.183.07-.366.21-.505l7.146-7.146a.714.714 0 111.01 1.01l-7.146 7.146a.714.714 0 01-1.22-.505z" />
        <Path d="M5.712 6.427a.714.714 0 011.22-.505l7.146 7.146a.714.714 0 11-1.01 1.01L5.92 6.932a.712.712 0 01-.209-.505z" />
      </G>
      <Defs>
        <ClipPath id="prefix__clip0">
          <Path fill="#fff" d="M0 0h20v20H0z" />
        </ClipPath>
      </Defs>
    </Svg>
  );
}

const CloseIcon = React.memo(SvgComponent);
export default CloseIcon;
