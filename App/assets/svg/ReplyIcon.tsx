import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';

function SvgComponent(props: SvgProps) {
  return (
    <Svg width={14} height={12} viewBox="0 0 14 12" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <Path
        d="M6.625 11a.387.387 0 00.237-.08l6-4.643A.352.352 0 0013 6c0-.107-.05-.21-.138-.277l-6-4.643a.392.392 0 00-.398-.046.356.356 0 00-.214.323v2.512C3.322 4.053 1 6.38 1 9.214v.715c0 .14.085.266.218.324a.39.39 0 00.4-.053l.633-.516A6.912 6.912 0 016.25 8.153v2.49c0 .138.083.263.214.322a.393.393 0 00.161.035zm5.405-5L7 9.893V7.786a.366.366 0 00-.375-.357A7.7 7.7 0 001.763 9.14l-.013.01c.036-2.53 2.209-4.58 4.875-4.58.207 0 .375-.16.375-.357V2.107L12.03 6z"
        fill="#42A391"
        stroke="#42A391"
        strokeWidth={0.4}
      />
    </Svg>
  );
}

const ReplyIcon = React.memo(SvgComponent);
export default ReplyIcon;
