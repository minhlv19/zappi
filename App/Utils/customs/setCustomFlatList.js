import { FlatList } from 'react-native';

export const setCustomFlatList = customProps => {
  const FlatListRender = FlatList.render;
  const initialDefaultProps = FlatList.defaultProps;
  FlatList.defaultProps = {
    ...initialDefaultProps,
    ...customProps,
  };
  FlatList.render = function render(props) {
    let oldProps = props;
    props = { ...props, style: [customProps.style, props.style] };
    try {
      return FlatListRender.apply(this, arguments);
    } finally {
      props = oldProps;
    }
  };
};
