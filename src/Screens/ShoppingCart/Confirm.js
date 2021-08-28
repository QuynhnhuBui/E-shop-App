import React, {useState, useCallback} from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';
import {Sizes} from '@dungdang/react-native-basic';
import {
  useFocusEffect,
  useNavigation,
} from '@react-navigation/native';
const Confirm = props => {
  const confirm = props.route.params;
  const [order, setOrder] = useState();
  const navigation = useNavigation();

  useFocusEffect(
    useCallback(() => {
      setOrder(props.cartItem);
    }, [props.cartItem]),
  );
  return (
    <ScrollView style={styles.container}>
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
              {order &&
                order.map(item => {
                  return (
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
                  );
                })}
            </View>
          )}
        </View>
      </View>
      <TouchableOpacity
        style={styles.orderButton}
        onPress={() => {
          navigation.navigate('cart');
          props.emptyCart();
        }}>
        <Text style={{color: '#fff', fontWeight: '700'}}>Place order</Text>
      </TouchableOpacity>
    </ScrollView>
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
    backgroundColor: '#fff',
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
