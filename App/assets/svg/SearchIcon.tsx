import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';

function SvgComponent(props: SvgProps) {
  return (
    <Svg width={20} height={20} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <Path
        d="M19.81 18.912l-5.163-5.081a8.168 8.168 0 002.183-5.55C16.829 3.707 13.062 0 8.414 0 3.767 0 0 3.707 0 8.28c0 4.574 3.767 8.281 8.414 8.281 2.008 0 3.85-.694 5.297-1.849l5.183 5.101a.654.654 0 00.916 0 .63.63 0 000-.901zM8.414 15.287c-3.932 0-7.12-3.137-7.12-7.006 0-3.87 3.188-7.007 7.12-7.007 3.933 0 7.12 3.137 7.12 7.007 0 3.87-3.187 7.006-7.12 7.006z"
        fill={props.fill || '#fff'}
      />
    </Svg>
  );
}

const SearchIcon = React.memo(SvgComponent);
export default SearchIcon;
