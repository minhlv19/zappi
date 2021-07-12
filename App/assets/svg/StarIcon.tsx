import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';

function SvgComponent(props: SvgProps) {
  return (
    <Svg width={18} height={17} viewBox="0 0 18 17" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <Path
        d="M16.42 6.397a.404.404 0 01.229.707l-3.71 3.253-.225.196.066.29 1.094 4.818a.404.404 0 01-.6.437h0l-4.231-2.53-.257-.153-.256.153-4.233 2.53a.4.4 0 01-.443-.02.404.404 0 01-.156-.417l1.093-4.817.066-.29-.224-.197L.924 7.105v-.001a.404.404 0 01.23-.706l4.906-.446.298-.027.117-.275 1.94-4.54a.403.403 0 01.743 0l1.94 4.54.117.275.297.027 4.907.445z"
        stroke={props.fill}
      />
    </Svg>
  );
}

const StarIcon = React.memo(SvgComponent);
export default StarIcon;
