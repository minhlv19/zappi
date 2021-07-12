import * as React from 'react';
import Svg, { SvgProps, Rect, Path } from 'react-native-svg';

function SvgComponent(props: SvgProps) {
  return (
    <Svg width={20} height={20} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <Rect x={1.55} y={0.55} width={16.9} height={4.9} rx={1.45} stroke="#fff" strokeWidth={1.1} />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M9.022 14H3a2 2 0 00-2 2v2a2 2 0 002 2h7c.662 0 1.25-.322 1.613-.818a5.528 5.528 0 01-.874-.669.899.899 0 01-.739.387H3a.9.9 0 01-.9-.9v-2a.9.9 0 01.9-.9h6.032a5.563 5.563 0 01-.01-1.1zM3 8.1h14a.9.9 0 01.9.9v1.177c.41.322.773.702 1.077 1.128.015-.1.023-.201.023-.305V9a2 2 0 00-2-2H3a2 2 0 00-2 2v2a2 2 0 002 2h6.207c.11-.386.26-.754.445-1.1H3a.9.9 0 01-.9-.9V9a.9.9 0 01.9-.9z"
        fill="#fff"
      />
      <Path
        d="M10.565 18.135a5.358 5.358 0 010-7.57 5.358 5.358 0 017.57 0 5.358 5.358 0 010 7.57 5.358 5.358 0 01-7.57 0zm7.03-7.03a4.593 4.593 0 00-6.49 0 4.593 4.593 0 000 6.49 4.593 4.593 0 006.49 0 4.593 4.593 0 000-6.49z"
        fill="#fff"
        stroke="#fff"
        strokeWidth={0.5}
      />
      <Path d="M14.275 16.128a.24.24 0 01-.07-.17v-3.41a.24.24 0 11.482 0v3.41a.241.241 0 01-.412.17z" fill="#fff" />
      <Path d="M12.57 14.424a.24.24 0 01.17-.411h3.41a.24.24 0 110 .481H12.74a.24.24 0 01-.17-.07z" fill="#fff" />
      <Path
        d="M14.275 16.128a.24.24 0 01-.07-.17v-3.41a.24.24 0 11.482 0v3.41a.241.241 0 01-.412.17z"
        stroke="#fff"
        strokeWidth={0.6}
      />
      <Path
        d="M12.57 14.424a.24.24 0 01.17-.411h3.41a.24.24 0 110 .481H12.74a.24.24 0 01-.17-.07z"
        stroke="#fff"
        strokeWidth={0.6}
      />
    </Svg>
  );
}

const AddCategoryIcon = React.memo(SvgComponent);
export default AddCategoryIcon;
