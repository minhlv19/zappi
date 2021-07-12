import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';

function SvgComponent(props: SvgProps) {
  return (
    <Svg width={20} height={20} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <Path
        d="M19.686 10.332a.5.5 0 000-.674L11.748.953a.5.5 0 00-.87.337v4.697H9.82a9.755 9.755 0 00-6.944 2.876A9.755 9.755 0 000 15.807v2.903a.5.5 0 00.87.337l.88-.964a12.552 12.552 0 019.128-4.08v4.696a.5.5 0 00.87.337l7.938-8.704zM1.172 16.987v-1.18c0-2.31.9-4.482 2.533-6.115A8.591 8.591 0 019.82 7.159h2.23V3.024l6.357 6.97-6.357 6.971v-4.134H11c-3.7 0-7.257 1.51-9.827 4.156z"
        fill="#000"
      />
    </Svg>
  );
}

const ShareIcon = React.memo(SvgComponent);
export default ShareIcon;
