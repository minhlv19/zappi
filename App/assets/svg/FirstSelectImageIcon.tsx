import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';

function SvgComponent(props: SvgProps) {
  return (
    <Svg width={33} height={33} viewBox="0 0 33 33" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <Path
        d="M8.824 0h-7.63a.922.922 0 00-.919.92v7.629c0 .505.414.919.92.919h7.63c.505 0 .918-.414.918-.92V.92A.922.922 0 008.824 0zm-.827 7.721H2.114V1.838h5.883v5.883zM20.314 0h-7.63a.922.922 0 00-.918.92v7.629c0 .505.413.919.919.919h7.63c.505 0 .919-.414.919-.92V.92a.922.922 0 00-.92-.919zm-.827 7.721h-5.883V1.838h5.883v5.883zM8.824 11.582h-7.63a.922.922 0 00-.919.92v7.629c0 .505.414.919.92.919h7.63c.505 0 .918-.414.918-.92v-7.629a.922.922 0 00-.919-.919zm-.827 7.63H2.114V13.42h5.883v5.79zM20.314 11.582h-7.63a.922.922 0 00-.918.92v7.629c0 .505.413.919.919.919h7.63c.505 0 .919-.414.919-.92v-7.629a.922.922 0 00-.92-.919zm-.827 7.63h-5.883V13.42h5.883v5.79zM31.805 0h-7.63a.922.922 0 00-.92.92v7.629c0 .505.415.919.92.919h7.63c.505 0 .919-.414.919-.92V.92a.922.922 0 00-.92-.919zm-.828 7.721h-5.883V1.838h5.883v5.883zM31.805 11.582h-7.63a.922.922 0 00-.92.92v7.629c0 .505.415.919.92.919h7.63c.505 0 .919-.414.919-.92v-7.629a.922.922 0 00-.92-.919zm-.828 7.63h-5.883V13.42h5.883v5.79zM8.824 23.532h-7.63a.922.922 0 00-.919.92v7.629c0 .506.414.92.92.92h7.63c.505 0 .918-.414.918-.92v-7.63a.922.922 0 00-.919-.919zm-.827 7.722H2.114V25.37h5.883v5.883zM20.314 23.532h-7.63a.922.922 0 00-.918.92v7.629c0 .506.413.92.919.92h7.63c.505 0 .919-.414.919-.92v-7.63a.922.922 0 00-.92-.919zm-.827 7.722h-5.883V25.37h5.883v5.883zM31.805 23.532h-7.63a.922.922 0 00-.92.92v7.629c0 .506.415.92.92.92h7.63c.505 0 .919-.414.919-.92v-7.63a.922.922 0 00-.92-.919zm-.828 7.722h-5.883V25.37h5.883v5.883z"
        fill="#42A391"
      />
    </Svg>
  );
}

const FirstSelectImageIcon = React.memo(SvgComponent);
export default FirstSelectImageIcon;
