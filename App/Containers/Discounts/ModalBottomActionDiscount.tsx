import React, { FC, Fragment, memo, useCallback, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, InteractionManager } from 'react-native';
import { useTranslation } from 'react-i18next';

import { TrashIcon } from 'App/assets/svg';
import ModalBottomSheet from 'App/Components/Modal/ModalBottomSheet';
import ViewShareSocial from 'App/Containers/Home/HomeScreen/Components/ViewShareSocial';
import StyledText from 'App/Components/StyledText/StyledText';
import { responsiveByWidth as rw, responsiveByHeight as rh } from 'App/Utils/style';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'App/Redux';
import DuplicateIcon from 'App/assets/icons/DuplicateIcon.svg';
import { resetConfirmModalData, updateConfirmModalData } from 'App/Redux/appState/AppStateActions';
import { ConfirmModalStateEnums, ConfirmModalTypeEnums } from 'App/Types';
import { deleteDiscountAsyncAction, updateDiscountToCreateAction } from 'App/Redux/discount/DiscountActions';
import { Discount, DiscountType } from 'App/Types/discount';
import NavigationService from 'App/navigation/NavigationService';
import { getEnableSetEndDateDefaultState } from './CreateDiscountScreen/CreateDiscountScreen.util';

interface IProps {
  isVisible: boolean;
  onClose: () => void;
}

const ModalBottomActionDiscount: FC<IProps> = ({ isVisible, onClose }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { selectedDiscount, displayFilter } = useSelector((state: RootState) => state.discount);
  const { confirmModalData } = useSelector((state: RootState) => state.appState);

  const handleDelete = useCallback(() => {
    onClose();

    InteractionManager.runAfterInteractions(() => {
      dispatch(
        updateConfirmModalData({
          title: t('Are you sure you want to delete this discount?'),
          display: true,
          type: ConfirmModalTypeEnums.DISCOUNT_DELETE,
          metadata: {
            source: ModalBottomActionDiscount.name,
          },
        }),
      );
    });
  }, [onClose]);

  const handleDuplicateDiscount = useCallback(() => {
    onClose();

    const discountToCreate: Partial<Discount> = {
      ...selectedDiscount,
      code: t('{{discountCode}} Copy {{number}}', { discountCode: selectedDiscount?.code, number: 1 }),
      validFrom: undefined,
      validThru: undefined,
    };

    dispatch(updateDiscountToCreateAction(discountToCreate));

    NavigationService.navigate('CreateDiscountScreen', {
      existingDiscount: discountToCreate,
      enableEndDate: getEnableSetEndDateDefaultState(selectedDiscount),
    });
  }, [onClose]);

  useEffect(() => {
    if (
      confirmModalData.type == ConfirmModalTypeEnums.DISCOUNT_DELETE &&
      confirmModalData.metadata?.source == ModalBottomActionDiscount.name
    ) {
      if (confirmModalData.state == ConfirmModalStateEnums.CONFIRMED) {
        dispatch(deleteDiscountAsyncAction(selectedDiscount?.id || ''));
        dispatch(resetConfirmModalData());
      }
      if (confirmModalData.state == ConfirmModalStateEnums.CANCELLED) {
        dispatch(resetConfirmModalData());
      }
    }
  }, [confirmModalData, selectedDiscount]);

  return (
    <Fragment>
      <ModalBottomSheet isVisible={isVisible} onClose={onClose}>
        <View style={styles.container}>
          {displayFilter.type == DiscountType.MANUAL && (
            <ViewShareSocial title={t('Share discount link')} link="aaaa" />
          )}

          <View style={styles.viewActions}>
            <TouchableOpacity style={styles.viewItemAction} onPress={handleDuplicateDiscount}>
              <DuplicateIcon />
              <StyledText style={styles.textItemAction}>{t('Duplicate discount')}</StyledText>
            </TouchableOpacity>

            <TouchableOpacity onPress={handleDelete} style={styles.viewItemAction}>
              <TrashIcon />
              <StyledText style={styles.textItemAction}>{t('Delete discount')}</StyledText>
            </TouchableOpacity>
          </View>
        </View>
      </ModalBottomSheet>
    </Fragment>
  );
};

const styles = StyleSheet.create({
  container: { paddingTop: rh(20) },
  viewActions: { borderTopWidth: 1, borderTopColor: '#F5F5F5', marginTop: rh(20) },
  viewItemAction: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: rh(15),
    paddingHorizontal: rw(15),
    borderBottomWidth: 1,
    borderBottomColor: '#F5F5F5',
  },
  textItemAction: { fontSize: rh(14), fontWeight: '600', marginLeft: rw(15), flex: 1, color: '#4B4A4B' },
});

export default memo(ModalBottomActionDiscount);
