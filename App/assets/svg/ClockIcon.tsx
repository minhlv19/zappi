import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';

function SvgComponent(props: SvgProps) {
  return (
    <Svg width={16} height={16} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <Path
        d="M10.85 9.413L8.62 7.74V4.332a.62.62 0 10-1.24 0V8.05c0 .195.092.379.248.495l2.478 1.86a.617.617 0 00.868-.125.618.618 0 00-.124-.867z"
        fill="currentColor"
      />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M0 8c0-4.411 3.589-8 8-8 4.412 0 8 3.589 8 8 0 1.115-.23 2.178-.643 3.143a3.014 3.014 0 00-1.007-.823c.266-.724.41-1.505.41-2.32A6.769 6.769 0 008 1.24 6.769 6.769 0 001.24 8 6.769 6.769 0 008 14.76c.815 0 1.596-.144 2.32-.41.199.393.48.736.823 1.007A7.957 7.957 0 018 16c-4.411 0-8-3.588-8-8z"
        fill="currentColor"
      />
      <Path
        d="M15.25 12.6H13.4v-1.85a.4.4 0 00-.8 0v1.85h-1.85a.4.4 0 000 .8h1.85v1.85a.4.4 0 00.8 0V13.4h1.85a.4.4 0 000-.8z"
        fill="currentColor"
        stroke="currentColor"
        strokeWidth={0.3}
      />
    </Svg>
  );
}

const ClockIcon = React.memo(SvgComponent);
export default ClockIcon;
