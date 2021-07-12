import React, { useState } from 'react';
import { View, Text, SafeAreaView, TextInput, StyleSheet } from 'react-native';
import { Palette } from 'App/Theme/Palette';
import { ArrowDownIcon, CloseIcon, PenEditIcon } from 'App/assets/svg';
import { responsiveByWidth as rw, responsiveByHeight as rh } from 'App/Utils/style';

const DropDownSelect = () => {
  return (
    <View>
      <View style={styles.ViewSelect}>
        <TextInput placeholder={'Choose a delivery profile'} style={{ flex: 1 }} />
        <ArrowDownIcon />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  ViewSelect: {
    borderWidth: 1,
    borderRadius: 12,
    borderColor: Palette.zaapi3,
    flexDirection: 'row',
    alignItems: 'center',
  },
});
export default DropDownSelect;
// /* eslint-disable react-native/no-inline-styles */
// import React, { FC, memo, useCallback, useState } from 'react';
// import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
//
// import { ArrowDownIcon, CloseIcon, PenEditIcon } from 'App/assets/svg';
// import InputComponent from 'App/Components/Input/InputComponent';
// import ItemVariantOption from './ItemVariantOption';
// import StyledText from 'App/Components/StyledText/StyledText';
//
// const { width } = Dimensions.get('window');
//
// interface IProps {
//   categories: any[];
//   onCloseSubVariant?: () => void;
// }
//
// const SubVariantCategory: FC<IProps> = ({ categories, onCloseSubVariant }) => {
//   const [data, setData] = useState([
//     { title: 'Black', checked: false },
//     { title: 'White', checked: false },
//     { title: 'Paper', checked: false },
//     { title: 'Pink', checked: false },
//     { title: 'Blue', checked: false },
//   ]);
//
//   const onChangeItem = useCallback((item: any) => {
//     setData(state => state.map(i => ({ ...i, checked: item.title === i.title ? !item.checked : i.checked })));
//   }, []);
//
//   return (
//     <View style={styles.container}>
//       <View style={styles.viewHeader}>
//         <StyledText style={styles.textTitle}>Sub-Variant Category*</StyledText>
//
//         <TouchableOpacity onPress={onCloseSubVariant}>
//           <CloseIcon fill="#42A391" width={20} height={20} />
//         </TouchableOpacity>
//       </View>
//
//       <InputComponent
//         value="Colors"
//         styleWapper={styles.styleWapper}
//         rightIcon={
//           <View style={styles.rightIconInput}>
//             <PenEditIcon style={styles.viewPen} fill="#999999" width={20} height={20} />
//             <ArrowDownIcon fill="#000" />
//           </View>
//         }
//       />
//
//       <StyledText style={[styles.textVariant]}>Variant Options</StyledText>
//
//       <View style={styles.viewButtons}>
//         {data.map((item, index) => (
//           <TouchableOpacity
//             onPress={() => onChangeItem(item)}
//             key={index}
//             style={[styles.viewButton, item.checked && styles.buttonChecked]}>
//             <StyledText style={[styles.textButton, item.checked && styles.textButtonChecked]}>{item.title}</StyledText>
//           </TouchableOpacity>
//         ))}
//       </View>
//
//       {data.filter(i => !!i.checked).length > 0 &&
//       categories.length > 0 &&
//       categories.map((item, index) => (
//         <ItemVariantOption
//           data={data.filter(i => !!i.checked)}
//           title={item.title}
//           styleWapper={[styles.viewSetupVariant, { marginTop: index === 0 ? 0 : 30 }]}
//           key={index}
//         />
//       ))}
//     </View>
//   );
// };
//
// const styles = StyleSheet.create({
//   container: { backgroundColor: '#fff', marginTop: rh(10), paddingTop: rh(30) },
//   textTitle: { color: '#4B4A4B', fontWeight: '700', fontSize: 14 },
//   styleWapper: { marginTop: rh(18), paddingHorizontal: 15 },
//   rightIconInput: { flexDirection: 'row', alignItems: 'center' },
//   viewPen: { marginRight: rw(14) },
//   viewHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 15 },
//   textVariant: { color: '#4B4A4B', fontWeight: '700', fontSize: rh(14), marginTop: rh(30), paddingHorizontal: 15 },
//   viewButtons: {
//     marginTop: rh(10),
//     flexDirection: 'row',
//     alignItems: 'center',
//     paddingBottom: rh(30),
//     flexWrap: 'wrap',
//     paddingHorizontal: rw(5),
//   },
//   viewButton: {
//     height: rh(42),
//     width: (width - 50) / 3,
//     alignItems: 'center',
//     justifyContent: 'center',
//     borderRadius: 12,
//     borderWidth: 1,
//     borderColor: '#d6d6d6',
//     marginLeft: rw(10),
//     marginTop: rh(10),
//   },
//   textButton: { color: '#4B4A4B', fontSize: rh(14), fontWeight: '600' },
//   buttonChecked: { backgroundColor: '#42A391', borderColor: '#42A391' },
//   textButtonChecked: { color: '#fff' },
//   viewSetupVariant: {
//     marginTop: rh(30),
//     paddingBottom: rh(30),
//     borderBottomColor: '#d6d6d6',
//     borderBottomWidth: 1,
//     marginHorizontal: rw(15),
//   },
// });
//
// export default memo(SubVariantCategory);
