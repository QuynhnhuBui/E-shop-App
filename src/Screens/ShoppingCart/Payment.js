import React, {useState} from 'react';
import {StyleSheet, View, Text, Platform, TouchableOpacity} from 'react-native';
import {Sizes} from '@dungdang/react-native-basic';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Select from '../Custom/Select';
import {useNavigation} from '@react-navigation/native';

const paymentMethods = [
  {name: 'Cash on Delivery', value: 1},
  {name: 'Bank Transfer', value: 2},
  {name: 'Card Payment', value: 3},
];
const paymentCards = [
  {name: 'Wallet', value: 1},
  {name: 'Visa', value: 2},
  {name: 'Master Card', value: 3},
  {name: 'Other', value: 4},
];

const Payment = props => {
  const order = props.route.params
  const [selectedMethod, setSelectedMethod] = useState();
  const [showModal, setShowModal] = useState(false);
  const [card, setCard] = useState()
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <View
        style={styles.title}>
        <Text style={{fontWeight: '700'}}>Choose your payment method</Text>
      </View>
      {paymentMethods.map(item => {
        return (
          <View
            style={styles.paymentMethod}>
            <TouchableOpacity
              style={{padding: Sizes.s30, flex: 1}}
              onPress={() => {
                if (item.value == 3) {
                  setShowModal(true);
                }
                setSelectedMethod(item);
              }}>
              <Text>{item.name}</Text>
            </TouchableOpacity>
            {selectedMethod === item && (
              <Icon
                style={styles.icon}
                size={Sizes.s35}
                color="#007AFF"
                name="check"
              />
            )}
          </View>
        );
      })}
      {showModal && (
        <Select
          id={'paymentCard'}
          onBlur={selectedItem => {}}
          onFocus={() => {}}
          isRequired={true}
          onChooseItem={item => {setCard(item)}}
          placeholder="Select your payment card"
          size={Sizes.s30}
          listItem={paymentCards}
        />
      )}
      <TouchableOpacity
          style={{
            backgroundColor: '#ff6600',
            padding: Sizes.s20,
            marginHorizontal: Sizes.s60,
            marginVertical: Sizes.s30,
            alignItems: 'center',
            borderRadius: Sizes.s35,
          }}
          disabled = {selectedMethod == undefined ? true : false}
          onPress={() => {
            navigation.navigate('confirm', {order:order})
          }}>
          <Text style={{color: '#fff', fontWeight: '700'}}>Confirm</Text>
        </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container:{flex: 1, backgroundColor: '#fff'},
  title: {
    backgroundColor: '#dcdcdc',
    padding: Sizes.s20,
    alignItems: 'center',
  },
  paymentMethod: {
    backgroundColor: '#fff',
    borderBottomWidth: Sizes.s2,
    borderBottomColor: '#dcdcdc',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  icon: {
    paddingHorizontal: Sizes.s10,
  }
});

export default Payment;
