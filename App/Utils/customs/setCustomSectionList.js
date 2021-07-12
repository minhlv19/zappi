import { SectionList } from 'react-native';

export const setCustomSectionList = customProps => {
  const SectionListRender = SectionList.render;
  const initialDefaultProps = SectionList.defaultProps;
  SectionList.defaultProps = {
    ...initialDefaultProps,
    ...customProps,
  };
  SectionList.render = function render(props) {
    let oldProps = props;
    props = { ...props, style: [customProps.style, props.style] };
    try {
      return SectionListRender.apply(this, arguments);
    } finally {
      props = oldProps;
    }
  };
};
