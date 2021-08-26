import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import {Sizes} from '@dungdang/react-native-basic';
import SwipeItem from './SwipeItem';
const ShoppingCart = props => {
  const [cartItem, setCartItem] = useState([]);
  const [totalPrice, setTotal] = useState([]);
  const [indexScroll, setIndexScroll] = useState('');
  countTotal = listItem => {
    let total = 0;
    if (listItem) {
      listItem.forEach(item => {
        total += item.price;
      });
    }
    return total;
  };
  useEffect(() => {
    if (props.cartItem) {
      setTotal(countTotal(props.cartItem));
      setCartItem(props.cartItem);
    }
  }, [props.cartItem]);
  return (
    <View style={styles.container}>
      <ScrollView>
        {cartItem && cartItem.length > 0 ? (
          cartItem.map((item, index) => {
            return (
              <SwipeItem
                index={index}
                indexScroll={indexScroll}
                setIndexScroll={value => setIndexScroll(value)}
                {...item}
                onPress={()=>{
                  console.log(222)
                  props.deleteFromCart(item)
                }}
              />
            );
          })
        ) : (
          <View
            style={styles.emptyCart}>
            <Text style={styles.emptyCartText}>
              Your cart is empty. Add items to your cart
            </Text>
          </View>
        )}
      </ScrollView>

      <View
        style={styles.bottomContainer}>
        <Text
          style={styles.price}>
          {totalPrice}$
        </Text>
        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity
            onPress={() => {
              props.emptyCart();
            }}>
            <Text
              style={styles.clearButton}>
              Clear
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {}}
            style={styles.checkoutButton}>
            <Text
              style={styles.checkout}>
              Checkout
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container:{
    backgroundColor: '#fff', flex: 1
  },
  bottomContainer:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: Sizes.s20,
    alignItems: 'center',
  },
  price:{
    fontSize: Sizes.s30,
    paddingVertical: Sizes.s20,
    color: '#ff6600',
    fontWeight: '700',
  },
  clearButton:{
    color: '#ff6600',
    fontWeight: '700',
    padding: Sizes.s30,
    textAlignVertical: 'center',
    fontSize: Sizes.s30,
  },
  checkout:{
    color: '#fff',
    fontWeight: '700',
    padding: Sizes.s30,
    textAlignVertical: 'center',
    fontSize: Sizes.s30,
  },
  checkoutButton:{backgroundColor: '#ff6600'},
  emptyCart:{
    flex: 1, justifyContent: 'center', alignItems: 'center'
  },
  emptyCartText:{
    fontSize: Sizes.s30
  }
});

export default ShoppingCart;
