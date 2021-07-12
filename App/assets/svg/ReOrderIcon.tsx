import * as React from 'react';
import Svg, { SvgProps, Rect, Path } from 'react-native-svg';

function SvgComponent(props: SvgProps) {
  return (
    <Svg width={20} height={20} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <Rect x={10.55} y={0.55} width={8.9} height={4.9} rx={1.45} stroke={props.fill || '#fff'} strokeWidth={1.1} />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M18 15.1h-6a.9.9 0 00-.9.9v2a.9.9 0 00.9.9h6a.9.9 0 00.9-.9v-2a.9.9 0 00-.9-.9zM12 14a2 2 0 00-2 2v2a2 2 0 002 2h6a2 2 0 002-2v-2a2 2 0 00-2-2h-6zM18 8.1h-6a.9.9 0 00-.9.9v2a.9.9 0 00.9.9h6a.9.9 0 00.9-.9V9a.9.9 0 00-.9-.9zM12 7a2 2 0 00-2 2v2a2 2 0 002 2h6a2 2 0 002-2V9a2 2 0 00-2-2h-6zM.396 4.397A.566.566 0 01.393 3.6L3.683.257a.361.361 0 01.51-.004l3.398 3.345a.568.568 0 01-.795.811L4.503 2.17v15.66l2.293-2.24a.568.568 0 01.795.811l-3.398 3.345a.361.361 0 01-.51-.004L.393 16.4a.566.566 0 11.808-.792l2.168 2.221V2.17L1.201 4.392a.566.566 0 01-.805.005z"
        fill={props.fill || '#fff'}
      />
    </Svg>
  );
}

const ReOrderIcon = React.memo(SvgComponent);
export default ReOrderIcon;
