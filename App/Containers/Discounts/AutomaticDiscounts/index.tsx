import React, { useState } from 'react';
import { StyleSheet, View, Text, ScrollView, RefreshControl, FlatList, SectionList, SafeAreaView } from 'react-native';
import NoDiscountCodes from 'App/Containers/Discounts/NoDiscountCodes';
import NoAutomaticDiscounts from 'App/Containers/Discounts/NoAutomaticDiscounts';

const AutomaticDiscounts = () => {
  const [listAutomaticDiscounts, setListAutomaticDiscounts] = useState([]);

  if (listAutomaticDiscounts.length === 0) {
    return <NoAutomaticDiscounts />;
  } else {
    return (
      <View>
        <Text>List Automatic Discounts</Text>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  body: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#ffffff',
  },
  item: {
    margin: 10,
    backgroundColor: '#4ae1fa',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: '#000000',
    fontSize: 45,
    fontStyle: 'italic',
    margin: 10,
  },
});

export default AutomaticDiscounts;
