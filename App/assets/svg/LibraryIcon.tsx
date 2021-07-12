import * as React from 'react';
import Svg, { SvgProps, G, Path, Defs, ClipPath } from 'react-native-svg';

function SvgComponent(props: SvgProps) {
  return (
    <Svg width={20} height={20} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <G clipPath="url(#prefix__clip0)">
        <Path
          d="M18.27 4.808V3.461c0-.954-.777-1.73-1.732-1.73h-8.1l-.302-.494a.577.577 0 00-.492-.276H1.731C.776.961 0 1.738 0 2.692v14.616c0 .954.776 1.73 1.73 1.73h16.54c.954 0 1.73-.776 1.73-1.73V6.539c0-.954-.776-1.73-1.73-1.73zm-1.732-1.923c.319 0 .577.258.577.576v1.347h-6.792L9.55 3.547l-.406-.663h7.393zm2.308 14.423a.578.578 0 01-.577.576H1.731a.578.578 0 01-.577-.576V2.692c0-.318.259-.577.577-.577h5.59l.302.494 1.113 1.816.772 1.261a.577.577 0 00.492.276h8.27c.317 0 .576.259.576.577v10.769z"
          fill="#4B4A4B"
        />
      </G>
      <Defs>
        <ClipPath id="prefix__clip0">
          <Path fill="#fff" d="M0 0h20v20H0z" />
        </ClipPath>
      </Defs>
    </Svg>
  );
}

const LibraryIcon = React.memo(SvgComponent);
export default LibraryIcon;
