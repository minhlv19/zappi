import React, { ReactElement, useEffect, useRef, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Palette } from '../../Theme/Palette';
import StyledText from '../StyledText/StyledText';
import ModalDropdown, { ModalDropdownProps } from 'react-native-modal-dropdown';
import ArrowDownIcon from 'App/assets/svg/ArrowDownIcon';
import { responsiveByWidth as rw, responsiveByHeight as rh } from 'App/Utils/style';

interface StyledRadioButtonGroupProps extends ModalDropdownProps {
  options: StyleDropdownRowData[];
  placeholder?: string;
  selectedIndex?: string;
  errorMessage?: String;
}

export interface StyleDropdownRowData {
  value: any;
  title: string;
}

const StyledRadioButtonGroup = (props: StyledRadioButtonGroupProps): ReactElement => {
  const { options, placeholder, selectedIndex, errorMessage } = props;
  const [isShowing, setIsShowing] = useState(false);
  const [selected, setSelected] = useState<StyleDropdownRowData | undefined>();
  const componentRef: any = useRef(null);

  useEffect(() => {
    if (componentRef && componentRef.current) {
      componentRef.current.select(selectedIndex);
      onSelect(selectedIndex!, options[+selectedIndex!]);
    }
  }, [selectedIndex]);

  const renderDropdownItem = (rowData: StyleDropdownRowData, index: string) => {
    return (
      <View style={styles.textContainer}>
        <StyledText style={[styles.optionText]}>{rowData.title}</StyledText>
      </View>
    );
  };

  const renderMainDropdown = () => {
    return (
      <View
        style={[
          styles.mainDropdownContainer,
          isShowing ? { borderColor: Palette.color_42A391 } : {},
          {
            borderColor: errorMessage ? Palette.error : Palette.color_D6D6D6,
          },
        ]}>
        <StyledText style={!selected ? styles.mainDropdownTextPlaceholder : {}}>
          {!!selected ? selected.title : placeholder}
        </StyledText>
        <ArrowDownIcon color={Palette.white} style={styles.arrowDownIcon} />
      </View>
    );
  };

  const onSelect = (index: string, option: StyleDropdownRowData) => {
    setSelected(option);
    if (props.onSelect) {
      props.onSelect(index, option);
    }
  };

  return (
    <>
      <ModalDropdown
        options={options}
        style={[styles.dropdown, props.style]}
        dropdownStyle={[
          styles.dropdownStyle,
          {
            height: options.length * 37,
          },
          props.dropdownStyle,
        ]}
        renderRow={renderDropdownItem}
        onSelect={onSelect}
        renderSeparator={() => <></>}
        onDropdownWillShow={() => setIsShowing(true)}
        onDropdownWillHide={() => setIsShowing(false)}
        ref={componentRef}>
        {renderMainDropdown()}
      </ModalDropdown>
      <StyledText style={styles.errorMessage}>{errorMessage}</StyledText>
    </>
  );
};

const styles = StyleSheet.create({
  textContainer: {
    paddingLeft: rw(13),
    height: rh(36),
    justifyContent: 'center',
  },
  optionText: {
    fontWeight: '600',
    color: Palette.zaapi4,
  },
  dropdownStyle: {
    borderRadius: 12,
    borderColor: Palette.color_42A391,
    backgroundColor: Palette.white,
    borderWidth: 1,
    marginTop: rh(6),
  },
  dropdown: {
    width: rw(75),
    height: rh(42),
    borderWidth: 1,
    borderRadius: 31,
    borderColor: Palette.white,
    marginRight: rw(10),
  },
  mainDropdownContainer: {
    borderWidth: 1,
    borderRadius: 12,
    borderColor: Palette.color_D6D6D6,
    paddingLeft: rw(13),
    paddingRight: rw(13),
    fontSize: rh(14),
    height: rh(42),
    justifyContent: 'center',
  },
  mainDropdownTextPlaceholder: {
    color: Palette.zaapi3,
  },
  arrowDownIcon: {
    position: 'absolute',
    right: 11,
  },
  errorMessage: {
    color: Palette.error,
    fontSize: rh(14),
    marginTop: rh(2),
    lineHeight: 18,
  },
});

export default StyledRadioButtonGroup;
