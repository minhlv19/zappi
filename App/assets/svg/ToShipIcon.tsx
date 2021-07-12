import * as React from 'react';
import Svg, { SvgProps, Circle, Mask, Rect, G, Path, Defs, ClipPath } from 'react-native-svg';

function SvgComponent(props: SvgProps) {
  return (
    <Svg width={54} height={54} viewBox="0 0 54 54" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <Circle cx={27} cy={27} r={27} fill="#3B9E96" />
      <Mask id="prefix__a" maskUnits="userSpaceOnUse" x={0} y={0} width={54} height={54}>
        <Rect width={54} height={54} rx={27} fill="#fff" />
      </Mask>
      <G mask="url(#prefix__a)">
        <Path d="M11.996 43.005l2.84-2.29L42.5 27.5l3-4 12.65 12.68-26.746 26.746-19.408-19.92z" fill="#0A877D" />
      </G>
      <G clipPath="url(#prefix__clip0)">
        <Path
          d="M28.157 19.114h-1.543v-4.25a3.325 3.325 0 00-3.32-3.32c-.887 0-1.721.345-2.349.972a3.296 3.296 0 00-.973 2.348v4.25H18.43v-4.25c0-1.3.506-2.521 1.425-3.44A4.832 4.832 0 0123.294 10a4.87 4.87 0 014.863 4.864v4.25z"
          fill="#E3E0E4"
        />
        <Path d="M20.64 16.644L19.51 43h-7.518l.03-.715 1.098-25.641h7.52z" fill="#FC6712" />
        <Path d="M37.88 16.644L39.008 43H17.727l1.128-26.356H37.88z" fill="#F7772E" />
        <Path d="M31.689 20.594l-.787-3.95h1.62l-.833 3.95zM23.504 20.594l-.788-3.95h1.62l-.832 3.95z" fill="#FC6712" />
        <Path
          d="M32.46 21.365a.772.772 0 01-.771-.771v-5.73a3.325 3.325 0 00-3.321-3.32 3.325 3.325 0 00-3.321 3.32v5.73a.772.772 0 01-1.544 0v-5.73A4.87 4.87 0 0128.368 10a4.87 4.87 0 014.864 4.864v5.73a.772.772 0 01-.772.771z"
          fill="#F1F1F1"
        />
      </G>
      <Path d="M42.781 27.625H21.22v15.469H42.78V27.625z" fill="#FFE7A0" />
      <Path
        d="M38.563 38.406h-1.407v.938h1.407v-.938zM36.219 38.406h-3.282v.938h3.282v-.938zM39.969 40.281H35.28v.938h4.688v-.938zM34.344 40.281H31.53v.938h2.813v-.938zM28.719 27.625h-7.5v15.469h7.5V27.625zM21.219 27.625l-2.813-4.219h7.5l2.813 4.219h-7.5zM42.781 27.625l2.813-4.219h-7.5l-2.813 4.219h7.5z"
        fill="#F7D162"
      />
      <Path d="M35.75 37l-2.813-1.875v-3.281l2.813-1.875 2.813 1.875v3.281L35.75 37z" fill="#FFB401" />
      <Path d="M32.938 31.844l2.812 1.875 2.813-1.875-2.813-1.875-2.813 1.875z" fill="#FFD873" />
      <Path d="M35.75 37v-3.281l-2.813-1.875v3.281L35.75 37z" fill="#FFC431" />
      <Defs>
        <ClipPath id="prefix__clip0">
          <Path fill="#fff" transform="translate(9 10)" d="M0 0h33v33H0z" />
        </ClipPath>
      </Defs>
    </Svg>
  );
}

const ToShipIcon = React.memo(SvgComponent);
export default ToShipIcon;
