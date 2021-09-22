import React, {useState, useCallback, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  ViewBase,
  FlatList,
} from 'react-native';
import {Sizes} from '@dungdang/react-native-basic';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import axios from 'axios';
import url from '../../common/baseUrl';
import Toast from 'react-native-simple-toast';

const Confirm = props => {
  const confirm = props.route.params;
  const [order, setOrder] = useState([]);
  const navigation = useNavigation();
  const [confirmOrder, setConfirm] = useState();
  useEffect(() => {
    if (confirm) {
      setConfirm(confirm.order.order.orderItems);
      getProduct(confirm);
    }
  }, [props]);
  const getProduct = list => {
    const order = list.order.order;
    let productList = [];

    if (order) {
      order.orderItems.forEach(item => {
        axios
          .get(`${url}products/getProduct/${item.product}`)
          .then(res => {
            if (res.data.success == true) {
              productList.push(res.data.product);

              setOrder(productList);
            }
          })
          .catch(error => {
            console.log('Fetch api error');
          });
      });
    }
  };

  const onPress = () => {
    axios
      .post(`${url}orders/createOrder`, confirm.order.order)
      .then(res => {
        if (res.data.success == true) {
          navigation.navigate('cart');
          props.emptyCart();
          Toast.showWithGravity('Order successfully', Toast.LONG, Toast.TOP);
        }
      })
      .catch(error => {
        console.log('Fetch api error');
      });
  };

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.confirmText}>Confirm order</Text>
        <View style={{borderWidth: Sizes.s2, marginHorizontal: Sizes.s50}}>
          <Text style={styles.shippingText}>Shipping to:</Text>
          {confirm && (
            <View>
              <View
                style={{
                  paddingVertical: Sizes.s15,
                  paddingHorizontal: Sizes.s30,
                }}>
                <Text>Address: {confirm.order.order.shippingAddress1}</Text>
                <Text>Address 2: {confirm.order.order.shippingAddress2}</Text>
                <Text>City: {confirm.order.order.city}</Text>
                <Text>Zip code: {confirm.order.order.zip}</Text>
                <Text>Country: {confirm.order.order.country}</Text>
              </View>
              <Text style={styles.title}>Items:</Text>

              <FlatList
                data={order}
                keyExtractor={item => item.id}
                renderItem={({item, index}) => (
                  <View style={styles.button}>
                    <View style={styles.listItem}>
                      <View style={{flexDirection: 'row'}}>
                        <Image
                          style={styles.image}
                          resizeMode="contain"
                          source={{uri: item.image ? item.image : null}}
                        />
                        <Text style={styles.name}>{item.name}</Text>
                      </View>
                      <Text style={styles.price}>${item.price}</Text>
                    </View>
                  </View>
                )}
              />
            </View>
          )}
        </View>
      </View>
      <TouchableOpacity
        style={styles.orderButton}
        onPress={() => {
          onPress();
        }}>
        <Text style={{color: '#fff', fontWeight: '700'}}>Place order</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  name: {
    fontWeight: '700',
    paddingVertical: Sizes.s10,
  },
  price: {
    fontWeight: '700',
    paddingVertical: Sizes.s10,
  },
  image: {
    width: Sizes.s100,
    height: Sizes.s100,
    alignSelf: 'center',
    marginRight: Sizes.s30,
  },
  button: {
    paddingVertical: Sizes.s10,
  },
  listItem: {
    flexDirection: 'row',
    padding: Sizes.s20,
    justifyContent: 'space-between',
  },
  container: {
    flex: 1,
    // backgroundColor: '#fff',
    // backgroundColor: 'red',
  },
  confirmText: {
    alignSelf: 'center',
    fontWeight: '700',
    paddingVertical: Sizes.s30,
    fontSize: Sizes.s35,
  },
  shippingText: {
    alignSelf: 'center',
    paddingVertical: Sizes.s20,
    fontWeight: '700',
    fontSize: Sizes.s30,
  },
  orderButton: {
    backgroundColor: '#ff6600',
    padding: Sizes.s20,
    marginHorizontal: Sizes.s60,
    marginVertical: Sizes.s30,
    alignItems: 'center',
    borderRadius: Sizes.s35,
  },
  title: {
    alignSelf: 'center',
    paddingVertical: Sizes.s20,
    fontWeight: '700',
    fontSize: Sizes.s30,
  },
});

export default Confirm;
