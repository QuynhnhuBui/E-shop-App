import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Alert
} from 'react-native';
import {Sizes} from '@dungdang/react-native-basic';
import {
  useNavigation,
} from '@react-navigation/native';
import Toast from 'react-native-simple-toast'
import TextField from '../Custom/TextField'
import axios from 'axios'
import url from '../../common/baseUrl'

const Register = props => {
 const [email, setEmail] = useState('')
 const [name, setName] = useState('')
 const [phone, setPhone] = useState('')
 const [password, setPassword] = useState('')

 const phoneNumber = useRef();
 const emailRef = useRef();
 const nameRef = useRef();
 const passwordRef = useRef();

 const navigation = useNavigation()
 
  useEffect(() => {
  
  }, []);

  isInvalidEmail = (email) => {
		const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		return re.test(email);
	};
 
const onPress = () =>{

  if (email == '' || password == '' || phone == '' || name == ''){
    Alert.alert(
          "Alert",
          "Please fill in your information",
          [
            {
              text: "Cancel",
              
            },
          ],
          
        );
  } else {
    let user ={
      email,
      password,
      phone,
      name,
      isAdmin: false
    }


    if(isInvalidEmail(email) == false){
      emailRef.current.error('email','Invalid email')

      
    } else {
      axios.post(`${url}users/register`, user)
      .then((res)=>{
        if(res.status == 200){
            setTimeout(()=>{
              Toast.showWithGravity(
                'Register successfully',
                Toast.LONG,
                Toast.TOP,
              )
              navigation.navigate('login')
            },500)
        }
      })
      .catch((error)=>{
        Toast.showWithGravity(
          'Something went wrong. Please try again',
          Toast.LONG,
          Toast.TOP,
        )
      })
    }
    

   
  }
}

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
    <KeyboardAvoidingView
      behavior={Platform.OS == 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={Sizes.s260}
      style={{flex: 1}}>
      <ScrollView style={{margin: Sizes.s30}}>
        <TextField
          id={'name'}
          onBlur={text => {
            if(text == ""){
              nameRef.current.error('name','Please enter your phone name')
            }
          }}
          onFocus={() => {
            nameRef.current.clearError('name')

          }}
          editable={true}
          ref={nameRef}
          isRequired={true}
          onChangeText={text => {
            setName(text.trim())
          }}
          placeholder="Name"
          
        />
        <TextField
          id={'email'}
          onBlur={text => {
            if(text == ""){
              emailRef.current.error('email','Please enter your email')
            }
          }}
          onFocus={() => {
            emailRef.current.clearError('email')

          }}
          editable={true}
          ref={emailRef}
          isRequired={true}
          onChangeText={text => {
            setEmail(text.trim().toLowerCase())
          }}
          placeholder="Email"
        />
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
          id={'password'}
          onBlur={text => {
            if(text == ""){
              passwordRef.current.error('password','Please enter your password')
            }
          }}
          onFocus={() => {
            passwordRef.current.clearError('password')
          }}
          editable={true}
          ref={passwordRef}
          isRequired={true}
          onChangeText={text => {
            setPassword(text.trim())
          }}
          placeholder="Password"
          secureTextEntry = {true}
        />
       
      </ScrollView>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          onPress()
        }}>
        <Text style={{color: '#fff', fontWeight: '700'}}>Register</Text>
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

export default Register;
