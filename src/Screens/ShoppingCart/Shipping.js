import React, {useState, useRef, useEffect} from 'react';
import {StyleSheet, View, Text, KeyboardAvoidingView} from 'react-native';
import {Sizes} from '@dungdang/react-native-basic';
import TextField from '../Custom/TextField';
import Picker from '../Custom/Picker';
import countries from '../../data/countries.json';
const Shipping = props => {
  const [phone, setPhone] = useState('');
  const [address1, setAddress1] = useState('');
  const [address2, setAddress2] = useState('');
  const [city, setCity] = useState('');
  const [zip, setZip] = useState('');
  const [country, setCountry] = useState('');
  const [orderItems, setOrder] = useState();
  const phoneNumber = useRef();
  const shipAddress = useRef();
  const cityRef = useRef();
  const zipRef = useRef();
  const countryRef = useRef();

  useEffect(() => {
    setOrder(props.cartItem);
  }, []);
  const checkOut = () => {
    let order = {
      city,
      zip,
      shippingAddress1: address1,
      shippingAddress2: address2,
      country,
      orderItems,
      phone,

    };
  };
  return (
    <View style={{margin: Sizes.s30}}>
      <TextField
        id={'phone'}
        onBlur={text => {}}
        onFocus={() => {}}
        editable={true}
        ref={phoneNumber}
        isRequired={true}
        onChangeText={text => {}}
        placeholder="Phone"
      />
      <TextField
        id={'address1'}
        onBlur={text => {}}
        onFocus={() => {}}
        editable={true}
        ref={shipAddress}
        isRequired={true}
        onChangeText={text => {}}
        placeholder="Shipping Address 1"
      />
      <TextField
        id={'address2'}
        onBlur={text => {}}
        onFocus={() => {}}
        editable={true}
        isRequired={true}
        onChangeText={text => {}}
        placeholder="Shipping Address 2"
      />
      <TextField
        id={'city'}
        onBlur={text => {}}
        onFocus={() => {}}
        editable={true}
        ref={cityRef}
        isRequired={true}
        onChangeText={text => {}}
        placeholder="City"
      />
      <TextField
        id={'zip'}
        onBlur={text => {}}
        onFocus={() => {}}
        editable={true}
        ref={zipRef}
        isRequired={true}
        onChangeText={text => {}}
        placeholder="ZIP"
      />
      <Picker
        id={'LinhVucID'}
        onBlur={selectedItem => {}}
        onFocus={() => {}}
        ref={countryRef}
        isRequired={true}
        onChooseItem={item => {}}
        placeholder="Select your country"
        size={Sizes.s30}
        listItem={countries}
      />
    </View>
  );
};

const styles = StyleSheet.create({});

export default Shipping;
