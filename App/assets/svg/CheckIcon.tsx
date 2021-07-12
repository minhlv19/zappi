import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';

function SvgComponent(props: SvgProps) {
  return (
    <Svg width={30} height={30} viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M30 15a15 15 0 11-30 0 15 15 0 0130 0zm-7.444-5.681a1.406 1.406 0 00-2.025.041l-6.512 8.297-3.924-3.926a1.406 1.406 0 00-1.988 1.987l4.962 4.963a1.407 1.407 0 002.023-.037l7.485-9.356a1.406 1.406 0 00-.019-1.97h-.002z"
        fill={props.fill}
      />
    </Svg>
  );
}

const CheckIcon = React.memo(SvgComponent);
export default CheckIcon;
