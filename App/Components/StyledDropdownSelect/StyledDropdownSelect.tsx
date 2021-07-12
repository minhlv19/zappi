import React, { ReactElement, useEffect, useRef, useState } from 'react';
import { TouchableOpacity, View, StyleSheet } from 'react-native';
import { Palette } from '../../Theme/Palette';
import StyledText from '../StyledText/StyledText';
import ModalDropdown, { ModalDropdownProps } from 'react-native-modal-dropdown';
import { getInputBorderColor } from 'App/Utils/style';
import { responsiveByWidth as rw, responsiveByHeight as rh } from 'App/Utils/style';
import _ from 'lodash';
import { ArrowDownIcon, PenEditIcon } from 'App/assets/svg';
interface StyledDropdownSelectProps extends ModalDropdownProps {
  options: StyleDropdownRowData[];
  placeholder?: string;
  selectedIndex?: string;
  errorMessage?: String;
  hideFields?: (StyleDropdownRowData | null)[];
  isShowEditBtn?: boolean;
  onClickEditBtn?: () => void;
  isShowEditBtnItem?: boolean;
  onClickEditBtnItem?: (index: number) => void;
  createBtnName?: string;
  onClickAddBtn?: () => void;
}

export interface StyleDropdownRowData {
  value: any;
  title: string;
  type?: string;
}
export interface StyleDropdownRowDataCustom<T> {
  value: T;
  title: string;
}

const StyledDropdownSelect = (props: StyledDropdownSelectProps): ReactElement => {
  const {
    options,
    placeholder,
    selectedIndex,
    errorMessage,
    hideFields,
    isShowEditBtn,
    onClickEditBtn,
    isShowEditBtnItem,
    onClickEditBtnItem,
    createBtnName,
    onClickAddBtn,
  } = props;
  const [isShowing, setIsShowing] = useState(false);
  const [selected, setSelected] = useState<StyleDropdownRowData | undefined>();
  const componentRef: any = useRef(null);
  useEffect(() => {
    if (componentRef && componentRef.current) {
      componentRef.current.select(selectedIndex);
      const option = options[+selectedIndex!];
      if (option?.value !== 'ADD') {
        onSelect(selectedIndex!, options[+selectedIndex!]);
      }
    }
  }, [selectedIndex]);
  const renderDropdownItem = (rowData: StyleDropdownRowData, index: string) => {
    if (
      _.find(hideFields, function (o) {
        return o?.title === rowData.title;
      })
    ) {
      return;
    }
    if (rowData.title === createBtnName) {
      return (
        <TouchableOpacity onPress={onClickAddBtn}>
          <View style={styles.textContainer}>
            <StyledText
              style={{
                fontWeight: '600',
                fontSize: 14,
                color: Palette.zaapi3,
              }}>
              + Create new {createBtnName}
            </StyledText>
          </View>
        </TouchableOpacity>
      );
    }
    return (
      <View style={styles.textContainer}>
        <StyledText style={[styles.optionText]}>{rowData.title}</StyledText>

        {isShowEditBtnItem && (
          <TouchableOpacity
            onPress={() => {
              if (onClickEditBtnItem) {
                onClickEditBtnItem(+index || 0);
              }
            }}
            style={styles.penIcon}>
            <PenEditIcon width={20} height={30} />
          </TouchableOpacity>
        )}
      </View>
    );
  };
  const renderMainDropdown = () => {
    return (
      <View
        style={[
          styles.mainDropdownContainer,
          {
            borderColor: getInputBorderColor(isShowing, !!errorMessage),
          },
        ]}>
        <StyledText style={!selected ? styles.mainDropdownTextPlaceholder : styles.mainDropdownText}>
          {!!selected ? selected.title : placeholder}
        </StyledText>
        {isShowEditBtn && (
          <TouchableOpacity onPress={onClickEditBtn} style={styles.penIcon}>
            <PenEditIcon width={20} height={30} />
          </TouchableOpacity>
        )}
        <ArrowDownIcon color={Palette.white} style={styles.arrowDownIcon} />
      </View>
    );
  };

  const onSelect = (index: string, option: StyleDropdownRowData) => {
    if (props.onSelect) {
      props.onSelect(index, option);
    }
    if (options) {
      setSelected(option);
    }
  };

  return (
    <>
      <ModalDropdown
        options={[...options, { title: createBtnName ? createBtnName : '', value: createBtnName ? 'ADD' : '' }]}
        style={[styles.dropdown, props.style, props.disabled ? { backgroundColor: Palette.color_F5F5F5 } : {}]}
        dropdownStyle={[styles.dropdownStyle, props.dropdownStyle]}
        renderRow={renderDropdownItem}
        onSelect={onSelect}
        renderSeparator={() => <></>}
        //textStyle={{color:'red'}}
        onDropdownWillShow={() => setIsShowing(true)}
        onDropdownWillHide={() => setIsShowing(false)}
        ref={componentRef}
        disabled={props.disabled}>
        {renderMainDropdown()}
      </ModalDropdown>
      {!!errorMessage && <StyledText style={styles.errorMessage}>{errorMessage}</StyledText>}
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
    fontSize: rh(14),
    lineHeight: rh(18),
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
  penIcon: {
    position: 'absolute',
    right: 34,
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
  mainDropdownText: {
    fontWeight: '600',
    fontSize: rh(14),
    display: 'flex',
    lineHeight: 18,
    color: Palette.zaapi4,
  },
});

export default StyledDropdownSelect;
