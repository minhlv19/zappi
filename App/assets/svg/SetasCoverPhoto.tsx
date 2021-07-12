import * as React from 'react';
import Svg, { SvgProps, G, Path, Defs, ClipPath } from 'react-native-svg';

function SvgComponent(props: SvgProps) {
  return (
    <Svg width="18" height="20" viewBox="0 0 18 20" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <Path
        d="M16.5307 0H1.46826C1.14467 0 0.882324 0.262344 0.882324 0.585938V19.4141C0.882324 19.6171 0.98748 19.8057 1.16021 19.9125C1.33299 20.0193 1.54869 20.0289 1.73029 19.9382L8.99951 16.3036L16.2687 19.9381C16.3514 19.9795 16.4412 20 16.5308 20C16.6379 20 16.7447 19.9706 16.8388 19.9125C17.0116 19.8057 17.1167 19.6171 17.1167 19.414V0.585938C17.1167 0.262344 16.8544 0 16.5307 0ZM15.9448 18.466L9.2615 15.1244C9.17904 15.0831 9.08924 15.0625 8.99947 15.0625C8.90971 15.0625 8.8199 15.0832 8.73744 15.1244L2.0542 18.466V1.17188H15.9448V18.466H15.9448Z"
        fill="#4B4A4B"
      />
    </Svg>
  );
}

const SetasCoverPhoto = React.memo(SvgComponent);
export default SetasCoverPhoto;
