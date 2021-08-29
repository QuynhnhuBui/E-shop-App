import React, {useState, useEffect, useContext} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  TextInput,
  Alert,
} from 'react-native';
import {Sizes} from '@dungdang/react-native-basic';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import jwt_decode from "jwt-decode"
import url from "../../common/baseUrl"
import Toast from 'react-native-simple-toast'
import {loginUser} from '../../redux/action/loginActions'
import AuthGlobal from '../../redux/store/authGlobal'
const Login = props => {
    const context = useContext(AuthGlobal)
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();
  useEffect(() => {
      console.log(222, context.stateUserData.isAuthenticated)
      if(context.stateUserData.isAuthenticated){
          navigation.navigate('profile')
      } 
  }
  , [context.stateUserData.isAuthenticated]);

  const onLogin = () => {
      
    if (email == '' || password == '') {
        Alert.alert(
                "Alert",
                "Please fill in your email and password",
                [
                  {
                    text: "Cancel",
                    // onPress: () => Alert.alert("Cancel Pressed"),
                    // style: "cancel",
                  },
                ],)
    } else {
      const user = {
        email:email,
        password:password
      };
      loginUser(user, context.dispatch)

    }
  };
//   const loginUser = (user) => {
//     fetch(`${url}users/login`, {
//         method: "POST",
//         body: JSON.stringify(user),
//         headers: {
//             Accept: "application/json",
//             "Content-Type": "application/json",
//         },
//     })
//     .then((res) => res.json())
//     .then((data) => {
//         if (data) {
//           console.log(data)
//             const token = data.token;
//             AsyncStorage.setItem("token", token)
//             // const decoded = jwt_decode(token)
//             // dispatch(setCurrentUser(decoded, user))
//         } 
//     })
//     .catch((err) => {
//         Toast.showWithGravity(
//             'Something went wrong. Please try again',
//             Toast.LONG,
//             Toast.TOP,
//           )
//     });
// };
  return (
    <View style={styles.container}>
      <Text
        style={{
          alignSelf: 'center',
          fontSize: Sizes.s40,
          fontWeight: '700',
          marginVertical: Sizes.s50,
        }}>
        ESHOP
      </Text>

      <ScrollView
        contentContainerStyle={{
          justifyContent: 'center',
          alignContent: 'center',
          marginHorizontal: Sizes.s50,
        }}>
        <View
          style={{
            borderWidth: Sizes.s2,
            borderColor: '#dcdcdc',
            borderRadius: Sizes.s20,
          }}>
          <TextInput
            style={{padding: Sizes.s20}}
            placeholder="email"
            placeholderTextColor="#a9a9a9"
            onChangeText={text => {
              setEmail(text.trim().toLowerCase());
            }}
          />
        </View>
        <View
          style={{
            borderWidth: Sizes.s2,
            borderColor: '#dcdcdc',
            borderRadius: Sizes.s20,
            marginTop: Sizes.s40,
          }}>
          <TextInput
            style={{padding: Sizes.s20}}
            placeholder="password"
            placeholderTextColor="#a9a9a9"
            onChangeText={text => {
              setPassword(text.trim());
            }}
            secureTextEntry={true}
          />
        </View>
        <TouchableOpacity style={styles.button} onPress={() => {onLogin()}}>
          <Text style={{color: '#fff', fontWeight: '700'}}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{alignItems: 'center'}}
          onPress={() => {
            navigation.navigate('register');
          }}>
          <Text style={{color: '#000080', fontSize: Sizes.s30}}>
            Don't have an account yet? Register
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
  },
  button: {
    backgroundColor: '#ff6600',
    padding: Sizes.s20,
    marginHorizontal: Sizes.s60,
    marginVertical: Sizes.s40,
    alignItems: 'center',
    borderRadius: Sizes.s35,
  },
});

export default Login;
