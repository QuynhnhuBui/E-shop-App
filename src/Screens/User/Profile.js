import React, {useState, useEffect, useCallback, useContext} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import {Sizes} from '@dungdang/react-native-basic';
import {useNavigation, useFocusEffect} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import url from '../../common/baseUrl';
import AuthGlobal from '../../redux/store/authGlobal';
import axios from 'axios';
import {logoutUser} from '../../redux/action/loginActions'

const Profile = props => {
  const context = useContext(AuthGlobal);
  const navigation = useNavigation();
  const [user, setUser] = useState({});
  useFocusEffect(
    useCallback(() => {
     
      if (
       
        context.stateUserData.isAuthenticated === false ||
        context.stateUserData.isAuthenticated === null
      ) {
        navigation.replace('login');
      }
      if (context.stateUserData.user.userId) {
        
        getProfile(context.stateUserData.user.userId)
      }
      

     
    }, [context.stateUserData.isAuthenticated]),
  );

  const getProfile = async (id)=>{
    const token = await AsyncStorage.getItem('token')
    axios
    .get(`${url}users/getProfile/${id}`, {
      headers: {Authorization: `Bearer ${token}`},
    })
    .then(user => {
      setUser(user.data);
    }).catch((e)=>{console.log(e)})
  }
  return (
    <View style={styles.container}>
      {/* {user && ( */}
        <View>
          <View
            style={styles.textView}>
            <Text style={styles.text}>Name</Text>
            <Text style={styles.text}>{user.name}</Text>
          </View>
          <View
            style={styles.textView}>
            <Text style={styles.text}>Phone</Text>
            <Text style={styles.text}>{user.phone}</Text>
          </View>

          <View
            style={styles.textView}>
            <Text style={styles.text}>Email</Text>
            <Text style={styles.text}>{user.email}</Text>
          </View>
        </View>
      {/* )} */}
       <TouchableOpacity style={styles.button} onPress={() => {
         console.log(555, context)
         logoutUser(context.dispatch)
         AsyncStorage.removeItem('token')
       }}>
          <Text style={{color: '#fff', fontWeight: '700'}}>Sign out</Text>
        </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
  },
  textView:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: Sizes.s40,
    borderBottomWidth: Sizes.s2,
    borderBottomColor: '#dcdcdc',
    paddingVertical: Sizes.s30
  },
  text:{fontWeight:'600',fontSize: Sizes.s30},
  button: {
    backgroundColor: '#ff6600',
    padding: Sizes.s20,
    marginHorizontal: Sizes.s60,
    marginVertical: Sizes.s40,
    alignItems: 'center',
    borderRadius: Sizes.s35,
  },
});

export default Profile;
