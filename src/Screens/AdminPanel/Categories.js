import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
} from 'react-native';
import {Sizes} from '@dungdang/react-native-basic';

const Categories = props => {
 
  return (
    <View></View>
  );
};

const styles = StyleSheet.create({
  name: {
    fontWeight: '700',
    paddingVertical: Sizes.s10,
  },
  price: {
    color: '#ffd700',
    fontWeight: '700',
    paddingVertical: Sizes.s10,
  },
  image: {
    width: Sizes.s100,
    height: Sizes.s100,
    alignSelf: 'center',
    marginRight: Sizes.s30
  },
  button:{
    borderBottomWidth: 1, borderBottomColor: '#dcdcdc'
  },
  container:{
    flexDirection: 'row', padding: Sizes.s20
  }
});

export default Categories;
