import * as React from 'react';
import Svg, { SvgProps, G, Path, Defs, ClipPath } from 'react-native-svg';

function SvgComponent(props: SvgProps) {
  return (
    <Svg width={20} height={20} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <G clipPath="url(#prefix__clip0)" fill={props.fill || '#4B4A4B'}>
        <Path d="M.643 20a.633.633 0 01-.616-.79l1.194-4.792a.637.637 0 01.167-.296L14.828.682a2.335 2.335 0 013.298 0l1.2 1.199c.909.91.909 2.389 0 3.298l-13.44 13.44a.632.632 0 01-.297.168L.797 19.98A.59.59 0 01.643 20zm1.769-5.103l-.896 3.594 3.594-.896L18.427 4.28a1.062 1.062 0 000-1.5l-1.2-1.198a1.061 1.061 0 00-1.499 0L2.412 14.897zm3.024 3.273h.008-.008z" />
        <Path d="M16.804 7.434a.631.631 0 01-.45-.187L12.758 3.65a.636.636 0 11.9-.9l3.598 3.598a.636.636 0 01-.45 1.086zM5.433 18.806a.63.63 0 01-.45-.186l-3.597-3.598a.636.636 0 01.9-.9l3.598 3.598a.636.636 0 01-.45 1.087z" />
      </G>
      <Defs>
        <ClipPath id="prefix__clip0">
          <Path fill="#fff" d="M0 0h20v20H0z" />
        </ClipPath>
      </Defs>
    </Svg>
  );
}

const PenEditIcon = React.memo(SvgComponent);
export default PenEditIcon;
