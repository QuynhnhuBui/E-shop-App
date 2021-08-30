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
import {useNavigation} from '@react-navigation/native';

const AddProduct = props => {
  const [brand, setBrand] = useState('');
  const [count, setCount] = useState('');
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [categoryList, setList] = useState([]);

  const brandRef = useRef();
  const nameRef = useRef();
  const countRef = useRef();
  const categoryRef = useRef();
  const descriptionRef = useRef();
  const priceRef = useRef();


  const navigation = useNavigation();

  useEffect(() => {
  }, []);
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        behavior={Platform.OS == 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={Sizes.s260}
        style={{flex: 1, backgroundColor:'#fff'}}>
        <ScrollView style={{margin: Sizes.s30}}>
          <TextField
            id={'brand'}
            onBlur={text => {
              if(text == ""){
                brandRef.current.error('brand','Please enter brand name')
              }
            }}
            onFocus={() => {
                brandRef.current.clearError('brand')

            }}
            editable={true}
            ref={brandRef}
            isRequired={true}
            onChangeText={text => {
              setBrand(text.trim())
            }}
            placeholder="Brand"
            
          />
          <TextField
            id={'name'}
            onBlur={text => {
              if(text == ""){
                nameRef.current.error('name','Please enter product name')
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
            id={'price'}
            onBlur={text => {
                if(text == ""){
                    priceRef.current.error('price','Please enter product name')
                }
              }}
              onFocus={() => {
                priceRef.current.clearError('price')
  
              }}
            onChangeText={text => {
                setPrice(text.trim())
              }}
            ref={priceRef}

            editable={true}
            isRequired={true}
            
            placeholder="Price"
          />
          <TextField
            id={'count'}
            onBlur={text => {
              if(text == ""){
                countRef.current.error('count','Please enter your city')
              }
            }}
            onFocus={() => {
                countRef.current.clearError('count')
            }}
            editable={true}
            ref={countRef}
            isRequired={true}
            onChangeText={text => {
              setCount(text.trim())
            }}
            placeholder="Count In Stock"
          />
          <TextField
            id={'description'}
            onBlur={text => {
              if(text == ""){
                descriptionRef.current.error('description','Please enter product description')
              }
            }}
            onFocus={() => {
                descriptionRef.current.clearError('description')
            }}
            editable={true}
            ref={descriptionRef}
            isRequired={true}
            onChangeText={text => {
              setDescription(text.trim())
            }}
            placeholder="Description"
          />
          <Picker
            id={'category'}
            onBlur={selectedItem => {
              if (selectedItem === undefined) {
                categoryRef.current.error(
                  "country",
                  "Please select category"
                );
              }
            }}
            onFocus={() => {
                categoryRef.current.clearError(
                "country"
              );
            }}
            ref={categoryRef}
            isRequired={true}
            onChooseItem={item => {
              setCategory(item.id)
            }}
            placeholder="Select category"
            size={Sizes.s30}
            listItem={categoryList}
          />
        </ScrollView>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            
          }}>
          <Text style={{color: '#fff', fontWeight: '700'}}>Add</Text>
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

export default AddProduct;
