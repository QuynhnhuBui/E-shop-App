import React, {useState, useRef, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Text,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Platform,
  Keyboard,
  ScrollView,
  TouchableOpacity,
  Alert
} from 'react-native';
import {Sizes} from '@dungdang/react-native-basic';
import TextField from '../Custom/TextField';
import Picker from '../Custom/Picker';
import countries from '../../data/countries.json';
import {useNavigation} from '@react-navigation/native';

const Shipping = props => {
  const [phone, setPhone] = useState('0466593094');
  const [address1, setAddress1] = useState('Hatuntekjankuja');
  const [address2, setAddress2] = useState('');
  const [city, setCity] = useState('Helsinki');
  const [zip, setZip] = useState('00750');
  const [country, setCountry] = useState('');
  const [orderItems, setOrder] = useState();
  const phoneNumber = useRef();
  const shipAddress = useRef();
  const cityRef = useRef();
  const zipRef = useRef();
  const countryRef = useRef();
  const navigation = useNavigation();

  useEffect(() => {
    setOrder(props.cartItem);
  }, []);
  const checkOut = () => {
   

    if(city == "" || zip =="" || address1 == "" || country == "" || phone ==""){
      console.log(country)
      Alert.alert(
        "Alert",
        "Please fill in your shipping information",
        [
          {
            text: "Cancel",
          
          },
        ],
        
      );
    } else{
      let order = {
        city,
        zip,
        shippingAddress1: address1,
        shippingAddress2: address2,
        country,
        phone,
        orderItems: orderItems
      };
      navigation.navigate('payment', {order: order});
    }
    
  };
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        behavior={Platform.OS == 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={Sizes.s260}
        style={{flex: 1}}>
        <ScrollView style={{margin: Sizes.s30}}>
          <TextField
            id={'phone'}
            onBlur={text => {
              if(text == ""){
                phoneNumber.current.error('phone','Please enter your phone number')
              }
            }}
            onFocus={() => {
              phoneNumber.current.clearError('phone')

            }}
            editable={true}
            ref={phoneNumber}
            isRequired={true}
            onChangeText={text => {
              setPhone(text.trim())
            }}
            placeholder="Phone"
            
          />
          <TextField
            id={'address1'}
            onBlur={text => {
              if(text == ""){
                shipAddress.current.error('address1','Please enter your shipping address')
              }
            }}
            onFocus={() => {
              shipAddress.current.clearError('address1')

            }}
            editable={true}
            ref={shipAddress}
            isRequired={true}
            onChangeText={text => {
              setAddress1(text.trim())
            }}
            placeholder="Shipping Address 1"
          />
          <TextField
            id={'address2'}
            
            editable={true}
            onChangeText={text => {
              setAddress2(text.trim())
            }}
            placeholder="Shipping Address 2"
          />
          <TextField
            id={'city'}
            onBlur={text => {
              if(text == ""){
                cityRef.current.error('city','Please enter your city')
              }
            }}
            onFocus={() => {
              cityRef.current.clearError('city')
            }}
            editable={true}
            ref={cityRef}
            isRequired={true}
            onChangeText={text => {
              setCity(text.trim())
            }}
            placeholder="City"
          />
          <TextField
            id={'zip'}
            onBlur={text => {
              if(text == ""){
                zipRef.current.error('zip','Please enter your zip code')
              }
            }}
            onFocus={() => {
              zipRef.current.clearError('zip')
            }}
            editable={true}
            ref={zipRef}
            isRequired={true}
            onChangeText={text => {
              setZip(text.trim())
            }}
            placeholder="ZIP"
          />
          <Picker
            id={'country'}
            onBlur={selectedItem => {
              if (selectedItem === undefined) {
                countryRef.current.error(
                  "country",
                  "Please select your country"
                );
              }
            }}
            onFocus={() => {
              countryRef.current.clearError(
                "country"
              );
            }}
            ref={countryRef}
            isRequired={true}
            onChooseItem={item => {
              setCountry(item.name)
            }}
            placeholder="Select your country"
            size={Sizes.s30}
            listItem={countries}
          />
        </ScrollView>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            checkOut();
          }}>
          <Text style={{color: '#fff', fontWeight: '700'}}>Confirm</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#ff6600',
    padding: Sizes.s20,
    marginHorizontal: Sizes.s60,
    marginVertical: Sizes.s20,
    alignItems: 'center',
    borderRadius: Sizes.s35,
  }
});

export default Shipping;
