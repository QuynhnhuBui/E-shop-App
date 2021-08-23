import React, {useState} from 'react';
import {View, Text, TouchableOpacity, Image, StyleSheet} from 'react-native';
import {Sizes} from '@dungdang/react-native-basic';

const ShoppingCart = props => {
  console.log(999, props.cartItem)
  const [cartItem, setCartItem] = useState([])
  return (
    <View style={{backgroundColor: '#fff', flex: 1}}>
      {cartItem.length > 0 ? (<View></View>): (
        <View style={{flex:1 , justifyContent: 'center', alignItems:'center'}}>

          <Text style={{fontSize: Sizes.s30}}>Your cart is empty. Add items to your cart</Text>
        </View>
      )}
    </View>
  );
};
const styles = StyleSheet.create({});
export default ShoppingCart;
