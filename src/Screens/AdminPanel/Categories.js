import React, {useState, useEffect, useCallback} from 'react';
import {
  View,
  FlatList,
  TouchableOpacity,
  Image,
  StyleSheet,
  ActivityIndicator,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Keyboard,
  ScrollView,
} from 'react-native';
import {Sizes} from '@dungdang/react-native-basic';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import url from '../../common/baseUrl';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import Toast from 'react-native-simple-toast'

const Categories = props => {
  const [token, setToken] = useState('');
  const [categories, setList] = useState([]);
  const [text, setText] = useState('')
  useFocusEffect(
    useCallback(() => {
      AsyncStorage.getItem('token')
        .then(token => {
          setToken(token);
        })
        .catch(error => console.log(error));
      getCategoryList();
    }, []),
  );

  const getCategoryList = () => {
    axios
      .get(`${url}categories/getListCategory`)
      .then(res => {
        if (res.data.success == true) {
          setList(res.data.categoryList);
        }
      })
      .catch(error => {
        console.log('Fetch api error');
      });
  };
  const addCategory = () =>{

    if(text !== ""){
      let body ={
        name: text}
      axios
      .post(`${url}categories/addCategory`,body,{
        headers: { 
          Authorization: `Bearer ${token}`
        }
      })
      .then(res => {
        if (res.data.success == true) {
          Toast.showWithGravity(
            'Add category success',
            Toast.LONG,
            Toast.TOP,
          )
          Keyboard.dismiss()
          setText('')
          getCategoryList()
        }
      })
      .catch(error => {
        console.log('Fetch api error');
      });
    }
   
  }

  
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        behavior={Platform.OS == 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={Sizes.s260}
        style={{flex: 1, backgroundColor: '#fff'}}>
        <ScrollView>
          {categories &&
            categories.map(category => {
              return (
                <View style={styles.itemView}>
                  <View style={styles.container}>
                    <Text>{category.name}</Text>

                    
                  </View>
                </View>
              );
            })}
        </ScrollView>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Text>Add category</Text>
          <TextInput
            style={{
              borderWidth: Sizes.s2,
              borderColor: '#dcdcdc',
              paddingVertical: Sizes.s20,
              width: '60%',
              marginLeft: Sizes.s10,
            }}
            onChangeText={(text)=>{
              setText(text.trim())
            }}
            value={text}
          />
          <TouchableOpacity
          onPress={()=>{
            addCategory()
          }}
            style={{
              backgroundColor: '#ff6600',
              paddingVertical: Sizes.s20,
              paddingHorizontal: Sizes.s30,
            }}>
            <Text style={{color: '#fff', fontWeight: '700'}}>Add</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: Sizes.s20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  itemView: {
    backgroundColor: '#ffffff',
    borderRadius: Sizes.s10,
    margin: Sizes.s20,
    alignContent: 'center',
    shadowColor: 'black',
    shadowOffset: {width: 0, height: 0.5 * Sizes.s5},
    shadowOpacity: 0.4,
    shadowRadius: 0.8 * Sizes.s5,
    elevation: Sizes.s7,
  },
  deleteButton: {
    backgroundColor: 'red',
    borderRadius: Sizes.s30,
  },
});

export default Categories;
