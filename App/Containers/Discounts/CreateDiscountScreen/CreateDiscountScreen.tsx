import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import styles from './CreateDiscountScreen.style';
import { useTranslation } from 'react-i18next';
import BackIcon from 'App/assets/icons/BackIcon.svg';
import StyledText from 'App/Components/StyledText/StyledText';
import StyledTextInput from 'App/Components/StyledTextInput/StyledTextInput';
import StyledDropdownSelect, { StyleDropdownRowData } from 'App/Components/StyledDropdownSelect/StyledDropdownSelect';
import AddIconZaapi2 from 'App/assets/icons/iconAddZaapi2.svg';
import SwitchCustom from 'App/Components/Switch/SwitchCustom';
import ModalConfig from 'App/Components/ModalConfig';
import _ from 'lodash';
import { responsiveByWidth as rw, responsiveByHeight as rh } from 'App/Utils/style';
import Header from 'App/Components/Header';
import NavigationService from 'App/navigation/NavigationService';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'App/Redux';
import {
  BuyXGetYDiscountRule,
  Discount,
  DiscountRuleType,
  DiscountType,
  FixedAmountDiscountRule,
  PercentageDiscountRule,
} from 'App/Types/discount';
import {
  createDiscountAsyncAction,
  deleteDiscountAsyncAction,
  resetDiscountToCreateAction,
  updateDiscountAsyncAction,
  updateDiscountToCreateAction,
} from 'App/Redux/discount/DiscountActions';
import StyledButton from 'App/Components/StyledButton/StyledButton';
import StyledDatePicker from 'App/Components/StyledDatePicker/StyledDatePicker';
import { GetUpdateDateTypeEnums, getUpdatedDatetime } from 'App/Utils/time';
import { resetTransaction } from 'App/Redux/transaction/TransactionActions';
import {
  resetConfirmModalData,
  updateConfirmModalData,
  updateErrorModalData,
  updateSuccessModalData,
} from 'App/Redux/appState/AppStateActions';
import StyledNumberInput from 'App/Components/StyledNumberInput/StyledNumberInput';
import {
  AddDiscountScreenRouteProps,
  AppliesToEnums,
  CustomerBuysOptionEnums,
  CustomerGetsOfferOptionEnums,
  EligibilityOptionEnums,
  MinimumRequirementOptionEnums,
} from './CreateDiscountScreen.type';
import {
  AppliesToOptions,
  CustomerBuysOptions,
  CustomerGetsOfferOptions,
  DiscountTypeOptions,
  EligibilityOptions,
  MinimumRequirementOptions,
} from './CreateDiscountScreen.constant';
import {
  getAppliesToDefaultState,
  getCustomerBuysDefaultState,
  getCustomerOfferDefaultState,
  getEligibilityDefaultState,
  getEnableSetEndDateDefaultState,
  getEnableTotalUseDefaultState,
  getMinimumRequirementDefaultState,
} from './CreateDiscountScreen.util';
import moment from 'moment';
import { DEFAULT_DATE_FORMAT_TO_USER } from 'App/Utils/constants';
import { ConfirmModalStateEnums, ConfirmModalTypeEnums } from 'App/Types';
import { DiscountProductAddTypeEnums } from '../DiscountAddProducts/DiscountAddProducts.type';
import { PenIcon } from 'App/assets/svg';
import { Palette } from 'App/Theme/Palette';
import useCurrency from 'App/Hooks/useCurrency';

const { width: screenWidth } = Dimensions.get('screen');

const CreateDiscountScreen = ({ route }: { route: AddDiscountScreenRouteProps }) => {
  const { isEditing, existingDiscount, enableEndDate } = route?.params || {};
  const { t } = useTranslation();
  const [isDisabledPressed, setIsDisabledPressed] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const { discountToCreate, displayFilter } = useSelector((state: RootState) => state.discount);
  const { createDiscount: createDiscountTransaction, updateDiscount: updateDiscountTransaction } = useSelector(
    (state: RootState) => state.transaction,
  );
  const { confirmModalData } = useSelector((state: RootState) => state.appState);
  const dispatch = useDispatch();
  const currency = useCurrency();

  const [appliesTo, setAppliesTo] = useState(getAppliesToDefaultState(existingDiscount));
  const [minimumRequirement, setMinimumRequirement] = useState<MinimumRequirementOptionEnums | undefined>(
    getMinimumRequirementDefaultState(existingDiscount),
  );
  const [eligibility, setEligibility] = useState(getEligibilityDefaultState(existingDiscount));
  const [enableTotalUseLimit, setEnableTotalUseLimit] = useState(getEnableTotalUseDefaultState(existingDiscount));
  const [enableSetEndDate, setEnableSetEndDate] = useState(
    enableEndDate !== undefined ? enableEndDate : getEnableSetEndDateDefaultState(existingDiscount),
  );

  const [customerBuys, setCustomerBuys] = useState(getCustomerBuysDefaultState(existingDiscount));
  const [customerGetsOffer, setCustomerGetsOffer] = useState(getCustomerOfferDefaultState(existingDiscount));

  const [formErrors, setFormErrors] = useState({
    discountCode: '',
    discountRuleType: '',
    dicountValueAmount: '',
    dicountValuePercentage: '',
    appliesTo: '',
    minimumRequirement: '',
    minimumPurchaseAmt: '',
    totalUseLimit: '',
    eligibility: '',
    startDate: '',
    startTime: '',
    endDate: '',
    endTime: '',
  });
  const checkFormValid = () => {
    const formErrors = getFormErrors();
    const errorKeys = Object.keys(formErrors);
    for (let errorKey of errorKeys) {
      if ((formErrors as any)[errorKey]) return false;
    }
    return true;
  };

  const getFormErrors = () => {
    return {
      discountCode: !discountToCreate.code ? t('The field is required') : '',
      discountRuleType: !discountToCreate.rule?.type ? t('The field is required') : '',
      dicountValueAmount:
        discountToCreate.rule?.type == DiscountRuleType.FIXED_AMOUNT &&
        !(discountToCreate.rule as FixedAmountDiscountRule).amount
          ? t('The field is required')
          : '',
      dicountValuePercentage:
        discountToCreate.rule?.type == DiscountRuleType.PERCENTAGE &&
        !(discountToCreate.rule as PercentageDiscountRule).percentage
          ? t('The field is required')
          : '',
      appliesTo: '',
      minimumRequirement:
        discountToCreate.rule?.type != DiscountRuleType.BUY_X_GET_Y && !minimumRequirement
          ? t('The field is required')
          : '',
      minimumPurchaseAmt:
        minimumRequirement == MinimumRequirementOptionEnums.MINIMUM_PURCHASE_AMOUNT && !discountToCreate.minPurchaseAmt
          ? t('The field is required')
          : '',
      totalUseLimit:
        enableTotalUseLimit && !discountToCreate.usageLimit?.totalUseLimit ? t('The field is required') : '',
      eligibility: displayFilter.type == DiscountType.MANUAL && !eligibility ? t('The field is required') : '',
      startDate: !discountToCreate.validFrom ? t('The field is required') : '',
      startTime: !discountToCreate.validFrom ? t('The field is required') : '',
      endDate: enableSetEndDate && !discountToCreate.validThru ? t('The field is required') : '',
      endTime: enableSetEndDate && !discountToCreate.validThru ? t('The field is required') : '',
    };
  };

  const showFormErrors = () => {
    setFormErrors(getFormErrors());
  };

  const onPressDisabled = () => {
    setIsDisabledPressed(true);
    showFormErrors();
  };

  useEffect(() => {
    if (createDiscountTransaction.response && !createDiscountTransaction.errorResponse) {
      dispatch(resetTransaction('createDiscount'));
      dispatch(resetDiscountToCreateAction());
      NavigationService.goBack();
    }
    if (createDiscountTransaction.errorResponse) {
      let errorTitle: string;
      let errorSubtitle: string;
      if (createDiscountTransaction.errorResponse.errorCode == 'ZPSTORE0011') {
        errorTitle = t('Sorry, this name already exists');
        errorSubtitle = t('A discount with this name already exists. Please change the name and try again.');
      } else {
        errorTitle = t('An error occurred');
        errorSubtitle = createDiscountTransaction.errorResponse?.message;
      }
      dispatch(
        updateErrorModalData({
          title: errorTitle,
          subtitle: errorSubtitle,
          display: true,
        }),
      );
    }
  }, [createDiscountTransaction]);

  useEffect(() => {
    if (updateDiscountTransaction.response && !updateDiscountTransaction.errorResponse) {
      dispatch(resetTransaction('updateDiscount'));
      dispatch(resetDiscountToCreateAction());
      dispatch(updateSuccessModalData({ display: true }));
      NavigationService.goBack();
    }
    if (updateDiscountTransaction.errorResponse) {
      dispatch(
        updateErrorModalData({
          title: t('An error occurred'),
          subtitle: updateDiscountTransaction.errorResponse?.message,
          display: true,
        }),
      );
    }
  }, [updateDiscountTransaction]);

  const onDiscountRuleTypeSelect = useCallback(
    (index: string, rowData: StyleDropdownRowData) => {
      if (rowData) {
        const ruleType = rowData.value as DiscountRuleType;
        if (ruleType == DiscountRuleType.FREE_SHIP) {
          onAppliesToSelect('0', { title: '', value: AppliesToEnums.ALL_PRODUCTS });
        }
        if (ruleType == DiscountRuleType.BUY_X_GET_Y) {
          setMinimumRequirement(undefined);
        }

        dispatch(
          updateDiscountToCreateAction({
            rule: {
              ...discountToCreate.rule,
              type: ruleType,
            } as any,
          }),
        );
      }
    },
    [discountToCreate],
  );

  const onCustomerGetsOfferSelect = useCallback(
    (index: string, rowData: StyleDropdownRowData) => {
      setCustomerGetsOffer(rowData?.value);
    },
    [setCustomerGetsOffer],
  );

  const onDiscountCodeTextChange = useCallback((text: string) => {
    dispatch(
      updateDiscountToCreateAction({
        code: text,
      }),
    );
  }, []);

  const onDiscountValueAmountTextChange = useCallback(
    (text: string) => {
      dispatch(
        updateDiscountToCreateAction({
          rule: {
            ...discountToCreate.rule,
            type: discountToCreate.rule?.type!,
            amount: +text,
          },
        }),
      );
    },
    [discountToCreate],
  );

  const onDiscountValuePercentageTextChange = useCallback(
    (text: string) => {
      dispatch(
        updateDiscountToCreateAction({
          rule: {
            ...discountToCreate.rule,
            type: discountToCreate.rule?.type!,
            percentage: +text,
          },
        }),
      );
    },
    [discountToCreate],
  );

  const onGetYPercentageOffTextChange = useCallback(
    (text: string) => {
      dispatch(
        updateDiscountToCreateAction({
          rule: {
            ...discountToCreate.rule,
            yPercentageOff: +text,
          } as any,
        }),
      );
    },
    [discountToCreate],
  );

  const onTotalUseLimitTextChange = useCallback(
    (text: string) => {
      dispatch(
        updateDiscountToCreateAction({
          usageLimit: {
            oneUsePerCustomerEnabled: discountToCreate.usageLimit?.oneUsePerCustomerEnabled || false,
            totalUseLimit: +text,
          },
        }),
      );
    },
    [discountToCreate],
  );

  const onMinimumPurchaseAmtTextChange = useCallback((text: string) => {
    dispatch(
      updateDiscountToCreateAction({
        minPurchaseAmt: +text || 0,
      }),
    );
  }, []);

  const onBuyXMinimumPurchaseAmtTextChange = useCallback(
    (text: string) => {
      dispatch(
        updateDiscountToCreateAction({
          rule: {
            ...discountToCreate.rule,
            xMinPurchase: +text,
          } as any,
        }),
      );
    },
    [discountToCreate],
  );

  const onContinuePress = useCallback(async () => {
    try {
      if (discountToCreate.validThru && moment(discountToCreate.validThru).isBefore(discountToCreate.validFrom)) {
        dispatch(
          updateErrorModalData({
            title: t('The end date cannot be before the start date'),
            subtitle: '',
            display: true,
          }),
        );
        return;
      }
      let discountRule = discountToCreate.rule;

      // clean up BUY_X_GET_Y state
      if (discountRule?.type == DiscountRuleType.BUY_X_GET_Y) {
        discountRule = discountRule as BuyXGetYDiscountRule;
        if (customerBuys == CustomerBuysOptionEnums.MINIMUM_PURCHASE_AMOUNT) {
          discountRule.xMinQuantity = 0;
          discountRule.xProductIds = [];
        } else {
          discountRule.xMinQuantity = discountRule.xMinQuantity || 1;
          discountRule.xMinPurchase = 0;
        }

        if (customerGetsOffer == CustomerGetsOfferOptionEnums.FREE) {
          discountRule.yPercentageOff = 100;
        }

        discountRule.yQuantity = discountRule.yQuantity || 1;
      }
      console.log('discountRule', discountRule);
      const requestBody = {
        id: isEditing ? existingDiscount?.id : undefined,
        code: discountToCreate.code,
        details: 'Discount Details',
        enabled: true,
        type: displayFilter.type,
        validFrom: discountToCreate.validFrom,
        validThru: enableSetEndDate ? discountToCreate.validThru : undefined,
        applicability: {
          allProductEnabled: appliesTo == AppliesToEnums.ALL_PRODUCTS,
          productIds: appliesTo == AppliesToEnums.SPECIFIC_PRODUCTS ? appliesToProductIds : [],
          categoryIds: appliesTo == AppliesToEnums.SPECIFIC_PRODUCT_CATEGORIES ? appliesToCategoryIds : [],
        },
        eligibility: {
          everyOneEnabled: eligibility == EligibilityOptionEnums.EVERYONE,
          customerIds:
            eligibility == EligibilityOptionEnums.SPECIFIC_CUSTOMERS
              ? discountToCreate.eligibility?.customerIds || []
              : [],
        },
        minPurchaseAmt:
          minimumRequirement == MinimumRequirementOptionEnums.MINIMUM_PURCHASE_AMOUNT
            ? discountToCreate.minPurchaseAmt
            : 0,
        minQuantity:
          minimumRequirement == MinimumRequirementOptionEnums.MINIMUM_QUANTITY ? discountToCreate.minQuantity : 0,
        usageLimit: {
          oneUsePerCustomerEnabled: discountToCreate.usageLimit?.oneUsePerCustomerEnabled || false,
          totalUseLimit: enableTotalUseLimit ? discountToCreate.usageLimit?.totalUseLimit : undefined,
        },
        rule: discountRule,
      } as Partial<Discount>;

      if (!isEditing) {
        dispatch(createDiscountAsyncAction(requestBody));
      } else {
        dispatch(updateDiscountAsyncAction(requestBody));
      }
    } catch (e) {
      console.log(e?.response.data);
    }
  }, [discountToCreate]);

  const onAppliesToSelect = useCallback(
    (index: string, rowData: StyleDropdownRowData) => {
      setAppliesTo(rowData?.value);
    },
    [setAppliesTo],
  );

  const onMinimumRequirementSelect = useCallback(
    (index: string, rowData: StyleDropdownRowData) => {
      const minimumRequirement = rowData?.value as MinimumRequirementOptionEnums;

      if (minimumRequirement == MinimumRequirementOptionEnums.MINIMUM_QUANTITY) {
        if (!discountToCreate.minQuantity) {
          dispatch(updateDiscountToCreateAction({ minQuantity: 1 }));
        }
      }

      setMinimumRequirement(minimumRequirement);
    },
    [setMinimumRequirement, discountToCreate],
  );

  const onEligibilitySelect = useCallback(
    (index: string, rowData: StyleDropdownRowData) => {
      setEligibility(rowData?.value);
    },
    [setEligibility],
  );

  const onCustomerBuysSelect = useCallback(
    (index: string, rowData: StyleDropdownRowData) => {
      setCustomerBuys(rowData?.value);
    },
    [setCustomerBuys],
  );

  const onToggleOneUsePerCustomerEnabled = useCallback(
    (value: boolean) => {
      dispatch(
        updateDiscountToCreateAction({
          ...discountToCreate,
          usageLimit: {
            ...discountToCreate.usageLimit,
            oneUsePerCustomerEnabled: value,
          },
        }),
      );
    },
    [discountToCreate],
  );

  const onMinQuantityChange = useCallback((value: number) => {
    dispatch(updateDiscountToCreateAction({ minQuantity: value }));
  }, []);

  const onBuyXMinQuantityChange = useCallback(
    (value: number) => {
      dispatch(
        updateDiscountToCreateAction({
          rule: {
            ...discountToCreate.rule,
            xMinQuantity: value,
          } as any,
        }),
      );
    },
    [discountToCreate],
  );

  const onGetYQuantityChange = useCallback(
    (value: number) => {
      dispatch(
        updateDiscountToCreateAction({
          rule: {
            ...discountToCreate.rule,
            yQuantity: value,
          } as any,
        }),
      );
    },
    [discountToCreate],
  );

  const onStartDateChange = useCallback(
    (updateDatetimeString: any) => {
      dispatch(
        updateDiscountToCreateAction({
          validFrom: getUpdatedDatetime(
            discountToCreate.validFrom || moment().startOf('day').toDate(),
            updateDatetimeString,
            GetUpdateDateTypeEnums.DATE,
          ),
        }),
      );
    },
    [discountToCreate],
  );

  const onStartTimeChange = useCallback(
    (updateDatetimeString: any) => {
      dispatch(
        updateDiscountToCreateAction({
          validFrom: getUpdatedDatetime(
            discountToCreate.validFrom || moment().startOf('day').toDate(),
            updateDatetimeString,
            GetUpdateDateTypeEnums.TIME,
          ),
        }),
      );
    },
    [discountToCreate],
  );

  const onEndDateChange = useCallback(
    (updateDatetimeString: any) => {
      dispatch(
        updateDiscountToCreateAction({
          validThru: getUpdatedDatetime(
            discountToCreate.validThru || moment().startOf('day').toDate(),
            updateDatetimeString,
            GetUpdateDateTypeEnums.DATE,
          ),
        }),
      );
    },
    [discountToCreate],
  );

  const onEndTimeChange = useCallback(
    (updateDatetimeString: any) => {
      dispatch(
        updateDiscountToCreateAction({
          validThru: getUpdatedDatetime(
            discountToCreate.validThru || moment().startOf('day').toDate(),
            updateDatetimeString,
            GetUpdateDateTypeEnums.TIME,
          ),
        }),
      );
    },
    [discountToCreate],
  );

  useEffect(() => {
    if (
      confirmModalData.type == ConfirmModalTypeEnums.DISCOUNT_DELETE &&
      confirmModalData.metadata?.source == CreateDiscountScreen.name
    ) {
      if (confirmModalData.state == ConfirmModalStateEnums.CONFIRMED) {
        dispatch(deleteDiscountAsyncAction(existingDiscount?.id || ''));
        dispatch(resetConfirmModalData());
        dispatch(resetDiscountToCreateAction());
        NavigationService.goBack();
      }
      if (confirmModalData.state == ConfirmModalStateEnums.CANCELLED) {
        dispatch(resetConfirmModalData());
      }
    }
  }, [confirmModalData, existingDiscount]);

  const screenTitle = useMemo(() => {
    if (!isEditing) {
      return displayFilter.type == DiscountType.MANUAL ? t('Create Discount Code') : t('Create Automatic Discount');
    } else {
      return existingDiscount?.code;
    }
  }, [isEditing, displayFilter, existingDiscount]);

  const xProductIdsCount = useMemo(() => (discountToCreate.rule as BuyXGetYDiscountRule)?.xProductIds?.length || 0, [
    discountToCreate,
  ]);
  const yProductIdsCount = useMemo(() => (discountToCreate.rule as BuyXGetYDiscountRule)?.yProductIds?.length || 0, [
    discountToCreate,
  ]);
  const appliesToProductsCount = useMemo(() => discountToCreate.applicability?.productIds?.length || 0, [
    discountToCreate,
  ]);
  const appliesToCategoriesCount = useMemo(() => discountToCreate.applicability?.categoryIds?.length || 0, [
    discountToCreate,
  ]);
  const xProductIds = useMemo(() => (discountToCreate.rule as BuyXGetYDiscountRule)?.xProductIds || [], [
    discountToCreate,
  ]);
  const yProductIds = useMemo(() => (discountToCreate.rule as BuyXGetYDiscountRule)?.yProductIds || [], [
    discountToCreate,
  ]);
  const appliesToProductIds = useMemo(() => discountToCreate.applicability?.productIds || [], [discountToCreate]);
  const appliesToCategoryIds = useMemo(() => discountToCreate.applicability?.categoryIds || [], [discountToCreate]);
  const eligibilityCustomerIds = useMemo(() => discountToCreate.eligibility?.customerIds || [], [discountToCreate]);

  return (
    <View style={styles.container}>
      <Header
        title={screenTitle}
        icon={<BackIcon width={20} color={'#ffffff'} onPress={() => setModalVisible(true)} />}
      />
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.viewcontent}>
          {displayFilter.type == DiscountType.MANUAL && (
            <View style={[styles.formItem, { marginTop: rh(0) }]}>
              <View style={{ flexDirection: 'row' }}>
                <StyledText style={styles.formItemTitle}>
                  {t('Discount Code')}
                  <StyledText style={styles.requiredMark}>{t('*')}</StyledText>
                </StyledText>
              </View>
              <StyledTextInput
                placeholder={t('Customer will enter this code at checkout')}
                onChangeText={onDiscountCodeTextChange}
                errorMessage={formErrors.discountCode}
                value={discountToCreate.code}
                maxLength={250}
              />
            </View>
          )}

          {displayFilter.type == DiscountType.AUTOMATIC && (
            <View style={[styles.formItem, { marginTop: rh(0) }]}>
              <View style={{ flexDirection: 'row' }}>
                <StyledText style={styles.formItemTitle}>
                  {t('Discount Title')}
                  <StyledText style={styles.requiredMark}>{t('*')}</StyledText>
                </StyledText>
              </View>
              <StyledTextInput
                placeholder={t('Automatic discount title')}
                onChangeText={onDiscountCodeTextChange}
                errorMessage={formErrors.discountCode}
                value={discountToCreate.code}
                maxLength={250}
              />
            </View>
          )}

          <View style={[styles.formItem, { marginTop: rh(12) }]}>
            <StyledText style={styles.formItemTitle}>
              {t('Discount Type')}
              <StyledText style={styles.requiredMark}>{t('*')}</StyledText>
            </StyledText>
            <StyledDropdownSelect
              options={DiscountTypeOptions}
              style={styles.categoryTypeDropdownSelect}
              dropdownStyle={styles.categoryTypeDropdownSelect}
              placeholder={t('Choose type')}
              selectedIndex={
                DiscountTypeOptions.findIndex(item => item.value == discountToCreate.rule?.type).toString() || ''
              }
              onSelect={onDiscountRuleTypeSelect}
              errorMessage={formErrors.discountRuleType}
            />
          </View>

          {discountToCreate.rule?.type == DiscountRuleType.FIXED_AMOUNT && (
            <View style={[styles.formItem]}>
              <View style={{ flexDirection: 'row' }}>
                <StyledText style={styles.formItemTitle}>
                  {`${t('Discount Value')} (${currency})`}
                  <StyledText style={styles.requiredMark}>{t('*')}</StyledText>
                </StyledText>
              </View>
              <StyledTextInput
                placeholder={t('Discount Value')}
                onChangeText={onDiscountValueAmountTextChange}
                errorMessage={formErrors.dicountValueAmount}
                value={(discountToCreate.rule as FixedAmountDiscountRule)?.amount?.toString()}
                maxLength={250}
              />
            </View>
          )}

          {discountToCreate.rule?.type == DiscountRuleType.PERCENTAGE && (
            <View style={[styles.formItem]}>
              <View style={{ flexDirection: 'row' }}>
                <StyledText style={styles.formItemTitle}>
                  {`${t('Discount Value')} (%)`}
                  <StyledText style={styles.requiredMark}>{t('*')}</StyledText>
                </StyledText>
              </View>
              <StyledTextInput
                placeholder={t('Discount Value')}
                onChangeText={onDiscountValuePercentageTextChange}
                errorMessage={formErrors.dicountValuePercentage}
                value={(discountToCreate.rule as PercentageDiscountRule)?.percentage?.toString()}
                maxLength={250}
                keyboardType={'decimal-pad'}
              />
            </View>
          )}

          {discountToCreate.rule?.type == DiscountRuleType.BUY_X_GET_Y && (
            <View>
              <View>
                <View style={[styles.divider, { marginTop: rh(30) }]} />
                <View style={[styles.formItem, { marginTop: rh(20) }]}>
                  <StyledText style={styles.formItemTitle}>
                    {t('Customer Buys')}
                    <StyledText style={styles.requiredMark}>{t('*')}</StyledText>
                  </StyledText>
                  <StyledDropdownSelect
                    options={CustomerBuysOptions}
                    style={styles.categoryTypeDropdownSelect}
                    dropdownStyle={styles.categoryTypeDropdownSelect}
                    placeholder={t('Choose')}
                    selectedIndex={CustomerBuysOptions.findIndex(item => item.value == customerBuys).toString() || ''}
                    onSelect={onCustomerBuysSelect}
                    errorMessage={formErrors.minimumRequirement}
                  />
                </View>

                {customerBuys == CustomerBuysOptionEnums.MINIMUM_QUANTITY_OF_ITEMS && (
                  <>
                    <View style={[styles.formItem, styles.quantityOfItemsInput]}>
                      <View style={{ flexDirection: 'row', flex: 1 }}>
                        <StyledText style={styles.formItemTitle}>
                          {t('Quantity of Items')}
                          <StyledText style={styles.requiredMark}>{t('*')}</StyledText>
                        </StyledText>
                      </View>
                      <View>
                        <StyledNumberInput
                          min={1}
                          value={(discountToCreate.rule as BuyXGetYDiscountRule).xMinQuantity}
                          onChange={onBuyXMinQuantityChange}
                        />
                      </View>
                    </View>
                    <View style={styles.viewVariants}>
                      <View style={styles.productSelectHeader}>
                        <Text style={styles.txtVariants}>{t('Products')}</Text>
                        {xProductIdsCount > 0 && (
                          <TouchableOpacity
                            onPress={() => {
                              NavigationService.navigate('DiscountAddProducts', {
                                type: DiscountProductAddTypeEnums.CUSTOMER_BUYS_SPECIFIC_PRODUCTS,
                                selectedProductIds: xProductIds,
                              });
                            }}>
                            <PenIcon color={Palette.zaapi2} width={rw(20)} height={rw(20)} />
                          </TouchableOpacity>
                        )}
                      </View>
                      {xProductIdsCount > 0 ? (
                        <StyledText style={styles.productCountText}>
                          {'\u2022' + '    '}
                          {`${xProductIdsCount} ${xProductIdsCount > 1 ? t('products') : t('product')}`}
                        </StyledText>
                      ) : (
                        <>
                          <Text style={styles.txtSubVariants}>{t('Select all applicable products.')}</Text>
                          <TouchableOpacity
                            style={styles.btnAddVariants}
                            onPress={() =>
                              NavigationService.navigate('DiscountAddProducts', {
                                type: DiscountProductAddTypeEnums.CUSTOMER_BUYS_SPECIFIC_PRODUCTS,
                                selectedProductIds: xProductIds,
                              })
                            }>
                            <AddIconZaapi2 />
                            <Text style={styles.txtAddVariants}>{t('Add Product')}</Text>
                          </TouchableOpacity>
                        </>
                      )}
                    </View>
                  </>
                )}

                {customerBuys == CustomerBuysOptionEnums.MINIMUM_PURCHASE_AMOUNT && (
                  <View style={[styles.formItem]}>
                    <View style={{ flexDirection: 'row' }}>
                      <StyledText style={styles.formItemTitle}>
                        {`${t('Amount')} (${currency})`}
                        <StyledText style={styles.requiredMark}>{t('*')}</StyledText>
                      </StyledText>
                    </View>
                    <StyledTextInput
                      placeholder={t('Amount')}
                      onChangeText={onBuyXMinimumPurchaseAmtTextChange}
                      errorMessage={formErrors.minimumPurchaseAmt}
                      value={(discountToCreate.rule as BuyXGetYDiscountRule).xMinPurchase?.toString()}
                      maxLength={250}
                      keyboardType={'decimal-pad'}
                    />
                  </View>
                )}
              </View>
              <View>
                <View style={[styles.divider]} />

                <Text style={[styles.sectionTitle, { marginTop: rh(20) }]}>{t('Customer Gets')}</Text>

                <View style={[styles.formItem, styles.quantityOfItemsInput]}>
                  <View style={{ flexDirection: 'row', flex: 1 }}>
                    <StyledText style={styles.formItemTitle}>
                      {t('Quantity of Items')}
                      <StyledText style={styles.requiredMark}>{t('*')}</StyledText>
                    </StyledText>
                  </View>
                  <View>
                    <StyledNumberInput
                      min={1}
                      value={(discountToCreate.rule as BuyXGetYDiscountRule).yQuantity}
                      onChange={onGetYQuantityChange}
                    />
                  </View>
                </View>
                <View style={styles.viewVariants}>
                  <View style={styles.productSelectHeader}>
                    <Text style={styles.txtVariants}>{t('Products')}</Text>
                    {yProductIdsCount > 0 && (
                      <TouchableOpacity
                        onPress={() => {
                          NavigationService.navigate('DiscountAddProducts', {
                            type: DiscountProductAddTypeEnums.CUSTOMER_GETS_SPECIFIC_PRODUCTS,
                            selectedProductIds: yProductIds,
                          });
                        }}>
                        <PenIcon color={Palette.zaapi2} width={rw(20)} height={rw(20)} />
                      </TouchableOpacity>
                    )}
                  </View>
                  {yProductIdsCount > 0 ? (
                    <StyledText style={styles.productCountText}>
                      {'\u2022' + '    '}
                      {`${yProductIdsCount} ${yProductIdsCount > 1 ? t('products') : t('product')}`}
                    </StyledText>
                  ) : (
                    <>
                      <Text style={styles.txtSubVariants}>{t('Select all applicable products.')}</Text>
                      <TouchableOpacity
                        style={styles.btnAddVariants}
                        onPress={() =>
                          NavigationService.navigate('DiscountAddProducts', {
                            type: DiscountProductAddTypeEnums.CUSTOMER_GETS_SPECIFIC_PRODUCTS,
                            selectedProductIds: yProductIds,
                          })
                        }>
                        <AddIconZaapi2 />
                        <Text style={styles.txtAddVariants}>{t('Add Product')}</Text>
                      </TouchableOpacity>
                    </>
                  )}
                </View>

                <View style={[styles.formItem, { marginTop: rh(12) }]}>
                  <StyledText style={styles.formItemTitle}>
                    {t('Offer')}
                    <StyledText style={styles.requiredMark}>{t('*')}</StyledText>
                  </StyledText>
                  <StyledDropdownSelect
                    options={CustomerGetsOfferOptions}
                    style={styles.categoryTypeDropdownSelect}
                    dropdownStyle={styles.categoryTypeDropdownSelect}
                    placeholder={t('Choose type')}
                    selectedIndex={
                      CustomerGetsOfferOptions.findIndex(item => item.value == customerGetsOffer).toString() || ''
                    }
                    onSelect={onCustomerGetsOfferSelect}
                    errorMessage={formErrors.discountRuleType}
                  />
                </View>

                {customerGetsOffer == CustomerGetsOfferOptionEnums.PERCENTAGE_DISCOUNT && (
                  <View style={[styles.formItem]}>
                    <View style={{ flexDirection: 'row' }}>
                      <StyledText style={styles.formItemTitle}>
                        {`${t('Value')} (%)`}
                        <StyledText style={styles.requiredMark}>{t('*')}</StyledText>
                      </StyledText>
                    </View>
                    <StyledTextInput
                      placeholder={t('Value')}
                      onChangeText={onGetYPercentageOffTextChange}
                      errorMessage={formErrors.dicountValuePercentage}
                      value={(discountToCreate.rule as BuyXGetYDiscountRule).yPercentageOff?.toString()}
                      maxLength={250}
                    />
                  </View>
                )}

                <View style={[styles.divider, { marginTop: rh(30), marginBottom: -rh(10) }]} />
              </View>
            </View>
          )}

          {discountToCreate.rule?.type != DiscountRuleType.BUY_X_GET_Y && (
            <>
              <View style={styles.formItem}>
                <StyledText style={styles.formItemTitle}>
                  {t('Applies To')}
                  <StyledText style={styles.requiredMark}>{t('*')}</StyledText>
                </StyledText>
                <StyledDropdownSelect
                  options={AppliesToOptions}
                  style={styles.categoryTypeDropdownSelect}
                  dropdownStyle={styles.categoryTypeDropdownSelect}
                  placeholder={t('Choose type')}
                  selectedIndex={AppliesToOptions.findIndex(item => item.value == appliesTo).toString() || ''}
                  onSelect={onAppliesToSelect}
                  disabled={discountToCreate.rule?.type == DiscountRuleType.FREE_SHIP}
                  errorMessage={formErrors.appliesTo}
                />
              </View>

              {appliesTo == AppliesToEnums.SPECIFIC_PRODUCTS && (
                <View style={styles.viewVariants}>
                  <View style={styles.productSelectHeader}>
                    <Text style={styles.txtVariants}>{t('Products')}</Text>
                    {appliesToProductsCount > 0 && (
                      <TouchableOpacity
                        onPress={() => {
                          NavigationService.navigate('DiscountAddProducts', {
                            type: DiscountProductAddTypeEnums.APPLIES_TO_SPECIFIC_PRODUCTS,
                            selectedProductIds: appliesToProductIds,
                          });
                        }}>
                        <PenIcon color={Palette.zaapi2} width={rw(20)} height={rw(20)} />
                      </TouchableOpacity>
                    )}
                  </View>
                  {appliesToProductsCount > 0 ? (
                    <StyledText style={styles.productCountText}>
                      {'\u2022' + '    '}
                      {`${appliesToProductsCount} ${appliesToProductsCount > 1 ? t('products') : t('product')}`}
                    </StyledText>
                  ) : (
                    <>
                      <Text style={styles.txtSubVariants}>{t('Select all applicable products.')}</Text>
                      <TouchableOpacity
                        style={styles.btnAddVariants}
                        onPress={() =>
                          NavigationService.navigate('DiscountAddProducts', {
                            type: DiscountProductAddTypeEnums.APPLIES_TO_SPECIFIC_PRODUCTS,
                            selectedProductIds: appliesToProductIds,
                          })
                        }>
                        <AddIconZaapi2 />
                        <Text style={styles.txtAddVariants}>{t('Add Product')}</Text>
                      </TouchableOpacity>
                    </>
                  )}
                </View>
              )}

              {appliesTo == AppliesToEnums.SPECIFIC_PRODUCT_CATEGORIES && (
                <View style={styles.viewVariants}>
                  <View style={styles.productSelectHeader}>
                    <Text style={styles.txtVariants}>{t('Products Categories')}</Text>
                    {appliesToCategoriesCount > 0 && (
                      <TouchableOpacity
                        onPress={() => {
                          NavigationService.navigate('DiscountAddProducts', {
                            type: DiscountProductAddTypeEnums.APPLIES_TO_SPECIFIC_CATEGORIES,
                            selectedCategoryIds: appliesToCategoryIds,
                          });
                        }}>
                        <PenIcon color={Palette.zaapi2} width={rw(20)} height={rw(20)} />
                      </TouchableOpacity>
                    )}
                  </View>
                  {appliesToCategoriesCount > 0 ? (
                    <StyledText style={styles.productCountText}>
                      {'\u2022' + '    '}
                      {`${appliesToCategoriesCount} ${appliesToCategoriesCount > 1 ? t('categories') : t('category')}`}
                    </StyledText>
                  ) : (
                    <>
                      <Text style={styles.txtSubVariants}>{t('Select all applicable products categories.')}</Text>
                      <TouchableOpacity
                        style={styles.btnAddVariants}
                        onPress={() =>
                          NavigationService.navigate('DiscountAddProducts', {
                            type: DiscountProductAddTypeEnums.APPLIES_TO_SPECIFIC_CATEGORIES,
                            selectedCategoryIds: appliesToCategoryIds,
                          })
                        }>
                        <AddIconZaapi2 />
                        <Text style={styles.txtAddVariants}>{t('Add Category')}</Text>
                      </TouchableOpacity>
                    </>
                  )}
                </View>
              )}

              <View style={styles.formItem}>
                <StyledText style={styles.formItemTitle}>
                  {t('Minimum Requirement')}
                  <StyledText style={styles.requiredMark}>{t('*')}</StyledText>
                </StyledText>
                <StyledDropdownSelect
                  options={MinimumRequirementOptions}
                  style={styles.categoryTypeDropdownSelect}
                  dropdownStyle={styles.categoryTypeDropdownSelect}
                  placeholder={t('Choose')}
                  selectedIndex={
                    MinimumRequirementOptions.findIndex(item => item.value == minimumRequirement).toString() || ''
                  }
                  onSelect={onMinimumRequirementSelect}
                  errorMessage={formErrors.minimumRequirement}
                />
              </View>

              {minimumRequirement == MinimumRequirementOptionEnums.MINIMUM_PURCHASE_AMOUNT && (
                <View style={[styles.formItem]}>
                  <View style={{ flexDirection: 'row' }}>
                    <StyledText style={styles.formItemTitle}>
                      {`${t('Amount')} (${currency})`}
                      <StyledText style={styles.requiredMark}>{t('*')}</StyledText>
                    </StyledText>
                  </View>
                  <StyledTextInput
                    placeholder={t('Amount')}
                    onChangeText={onMinimumPurchaseAmtTextChange}
                    errorMessage={formErrors.minimumPurchaseAmt}
                    value={discountToCreate.minPurchaseAmt?.toString()}
                    maxLength={250}
                    keyboardType={'decimal-pad'}
                  />
                </View>
              )}

              {minimumRequirement == MinimumRequirementOptionEnums.MINIMUM_QUANTITY && (
                <View style={[styles.formItem, styles.quantityOfItemsInput]}>
                  <View style={{ flexDirection: 'row', flex: 1 }}>
                    <StyledText style={styles.formItemTitle}>
                      {t('Quantity of Items')}
                      <StyledText style={styles.requiredMark}>{t('*')}</StyledText>
                    </StyledText>
                  </View>
                  <View>
                    <StyledNumberInput min={1} value={discountToCreate.minQuantity} onChange={onMinQuantityChange} />
                  </View>
                </View>
              )}
            </>
          )}

          {displayFilter.type == DiscountType.MANUAL && (
            <View style={styles.formItem}>
              <StyledText style={styles.formItemTitle}>
                {t('Eligibility')}
                <StyledText style={styles.requiredMark}>{t('*')}</StyledText>
              </StyledText>
              <StyledDropdownSelect
                options={EligibilityOptions}
                style={styles.categoryTypeDropdownSelect}
                dropdownStyle={styles.categoryTypeDropdownSelect}
                placeholder={t('Choose')}
                selectedIndex={EligibilityOptions.findIndex(item => item.value == eligibility).toString() || ''}
                onSelect={onEligibilitySelect}
                errorMessage={formErrors.eligibility}
              />
            </View>
          )}

          {eligibility == EligibilityOptionEnums.SPECIFIC_CUSTOMERS && (
            <View style={styles.viewVariants}>
              <View style={styles.productSelectHeader}>
                <Text style={styles.txtVariants}>{t('Customers')}</Text>
                {eligibilityCustomerIds.length > 0 && (
                  <TouchableOpacity
                    onPress={() => {
                      NavigationService.navigate('DiscountSpecificCustomers', {
                        selectedCustomerIds: eligibilityCustomerIds,
                      });
                    }}>
                    <PenIcon color={Palette.zaapi2} width={rw(20)} height={rw(20)} />
                  </TouchableOpacity>
                )}
              </View>
              {eligibilityCustomerIds.length > 0 ? (
                <View style={styles.customerCountTextContainer}>
                  {eligibilityCustomerIds.map(customerId => (
                    <StyledText style={styles.customerCountText}>
                      {'\u2022' + '    '}
                      {`ID ${customerId}`}
                    </StyledText>
                  ))}
                </View>
              ) : (
                <>
                  <Text style={styles.txtSubVariants}>{t('Select all specific customers.')}</Text>
                  <TouchableOpacity
                    style={styles.btnAddVariants}
                    onPress={() =>
                      NavigationService.navigate('DiscountSpecificCustomers', {
                        selectedCustomerIds: eligibilityCustomerIds,
                      })
                    }>
                    <AddIconZaapi2 />
                    <Text style={styles.txtAddVariants}>{t('Add Customer')}</Text>
                  </TouchableOpacity>
                </>
              )}
            </View>
          )}

          {displayFilter.type == DiscountType.MANUAL && (
            <View style={{ marginTop: rh(30) }}>
              <StyledText style={styles.formItemTitle}>{t('Usage Limits')}</StyledText>
              <View style={[styles.switchContainer, { marginTop: rh(14) }]}>
                <StyledText style={styles.switchContainerText}>
                  {t('Limit number of times discount can be used in total')}
                </StyledText>
                <View style={styles.switchInnerContainer}>
                  <SwitchCustom onValueChange={setEnableTotalUseLimit} value={enableTotalUseLimit} />
                </View>
              </View>
              {enableTotalUseLimit && (
                <View style={[styles.formItem]}>
                  <View style={{ flexDirection: 'row' }}>
                    <StyledText style={styles.formItemTitle}>
                      {t('Limit Amount')}
                      <StyledText style={styles.requiredMark}>{t('*')}</StyledText>
                    </StyledText>
                  </View>
                  <StyledTextInput
                    placeholder={t('Limit amount')}
                    onChangeText={onTotalUseLimitTextChange}
                    errorMessage={formErrors.totalUseLimit}
                    value={discountToCreate.usageLimit?.totalUseLimit?.toString()}
                    maxLength={250}
                    keyboardType={'number-pad'}
                  />
                </View>
              )}
              <View style={[styles.switchContainer, { marginTop: rh(25) }]}>
                <StyledText style={styles.switchContainerText}>{t('Limit to one use per customer ')}</StyledText>
                <View style={styles.switchInnerContainer}>
                  <SwitchCustom
                    onValueChange={onToggleOneUsePerCustomerEnabled}
                    value={discountToCreate.usageLimit?.oneUsePerCustomerEnabled}
                  />
                </View>
              </View>
            </View>
          )}

          <View style={styles.viewPriceStock}>
            <View style={[styles.formItem, { flex: 1, marginRight: rw(5) }]}>
              <StyledText style={styles.formItemTitle}>
                {t('Start Date')}
                <StyledText style={styles.requiredMark}>{t('*')}</StyledText>
              </StyledText>
              <View>
                <StyledDatePicker
                  date={discountToCreate.validFrom ? moment(discountToCreate.validFrom) : undefined}
                  mode="date"
                  placeholder={t('Start date')}
                  format={DEFAULT_DATE_FORMAT_TO_USER}
                  onDateChange={onStartDateChange}
                  style={{
                    width: (screenWidth - rw(45)) / 2,
                  }}
                />
              </View>
            </View>
            <View style={[styles.formItem, { flex: 1, marginRight: rw(5) }]}>
              <StyledText style={styles.formItemTitle}>
                {t('Start Time')}
                <StyledText style={styles.requiredMark}>{t('*')}</StyledText>
              </StyledText>
              <View>
                <StyledDatePicker
                  date={discountToCreate.validFrom ? moment(discountToCreate.validFrom) : undefined}
                  mode="time"
                  placeholder={t('Time')}
                  format="HH:mm"
                  onDateChange={onStartTimeChange}
                  style={{
                    width: (screenWidth - rw(45)) / 2,
                  }}
                />
              </View>
            </View>
          </View>

          <View style={{ marginTop: rh(30) }}>
            <View style={[styles.switchContainer]}>
              <StyledText style={styles.formItemTitle}>{t('Set End Date')}</StyledText>
              <View style={styles.switchInnerContainer}>
                <SwitchCustom onValueChange={setEnableSetEndDate} value={enableSetEndDate} />
              </View>
            </View>
          </View>

          {enableSetEndDate && (
            <View style={styles.viewPriceStock}>
              <View style={[styles.formItem, { flex: 1, marginRight: rw(5) }]}>
                <StyledText style={styles.formItemTitle}>
                  {t('End Date')}
                  <StyledText style={styles.requiredMark}>{t('*')}</StyledText>
                </StyledText>
                <View>
                  <StyledDatePicker
                    date={discountToCreate.validThru ? moment(discountToCreate.validThru) : undefined}
                    mode="date"
                    placeholder={t('End date')}
                    format={DEFAULT_DATE_FORMAT_TO_USER}
                    onDateChange={onEndDateChange}
                    style={{
                      width: (screenWidth - rw(45)) / 2,
                    }}
                  />
                </View>
              </View>
              <View style={[styles.formItem, { flex: 1, marginRight: rw(5) }]}>
                <StyledText style={styles.formItemTitle}>
                  {t('End Time')}
                  <StyledText style={styles.requiredMark}>{t('*')}</StyledText>
                </StyledText>
                <View>
                  <StyledDatePicker
                    date={discountToCreate.validThru ? moment(discountToCreate.validThru) : undefined}
                    mode="time"
                    placeholder={t('Time')}
                    format="HH:mm"
                    onDateChange={onEndTimeChange}
                    style={{
                      width: (screenWidth - rw(45)) / 2,
                    }}
                  />
                </View>
              </View>
            </View>
          )}

          <View style={styles.bottomSection}>
            {isEditing ? (
              <View style={styles.viewActions}>
                <StyledButton
                  onPressDisabled={() => {
                    dispatch(
                      updateConfirmModalData({
                        title: t('Are you sure you want to delete this discount?'),
                        display: true,
                        type: ConfirmModalTypeEnums.DISCOUNT_DELETE,
                        metadata: {
                          source: CreateDiscountScreen.name,
                        },
                      }),
                    );
                  }}
                  disabled
                  style={styles.viewButtonEdit}
                  title="Delete"
                />
                <View style={styles.viewCenter} />

                <StyledButton
                  style={styles.viewButtonEdit}
                  title={t('Save')}
                  disabled={!checkFormValid()}
                  onPressDisabled={onPressDisabled}
                  onPress={onContinuePress}
                />
              </View>
            ) : (
              <StyledButton
                disabled={!checkFormValid()}
                title={t('Save')}
                style={styles.AddButton}
                onPressDisabled={onPressDisabled}
                onPress={onContinuePress}
              />
            )}
          </View>
        </View>
      </ScrollView>
      <ModalConfig
        visible={modalVisible}
        setVisible={setModalVisible}
        action={() => {
          setModalVisible(false);
          dispatch(resetDiscountToCreateAction());
          NavigationService.goBack();
        }}
      />
    </View>
  );
};

export default CreateDiscountScreen;
