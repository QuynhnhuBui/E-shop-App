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
  Alert,
  Image,
} from 'react-native';
import {Sizes} from '@dungdang/react-native-basic';
import TextField from '../Custom/TextField';
import Picker from '../Custom/Picker';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
import url from '../../common/baseUrl';
import {launchImageLibrary} from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-simple-toast';

const AddProduct = props => {
  const [brand, setBrand] = useState('');
  const [count, setCount] = useState('');
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [categoryList, setList] = useState([]);
  const [image, setImage] = useState();
  const [token, setToken] = useState();
  const [imageRes, setRes] = useState();
  const [id, setId] = useState();

  const brandRef = useRef();
  const nameRef = useRef();
  const countRef = useRef();
  const categoryRef = useRef();
  const descriptionRef = useRef();
  const priceRef = useRef();

  const navigation = useNavigation();
  const item = props.route.params.item;
  useEffect(() => {
    AsyncStorage.getItem('token').then(res => setToken(res));
    getCategoryList();
    if (item) {
      setName(item.name);
      setBrand(item.brand);
      setCategory(item.category.id);
      setImage(item.image);
      setDescription(item.description);
      setCount(item.countInStock.toString());
      setPrice(item.price.toString());
      setId(item.id);
    }
  }, []);

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

  const selectImage = () => {
    const options = {};
    launchImageLibrary(options, res => {
      if (res.assets) {
        setImage(res.assets[0].uri);
        setRes(res.assets[0]);
      }
    });
  };
  const onPress = () => {
    if (
      name == ' ' ||
      brand == '' ||
      count == '' ||
      category == '' ||
      description == '' ||
      price == ''
    ) {
      Alert.alert('Alert', 'Please fill in product information', [
        {
          text: 'Cancel',
        },
      ]);
    } else if (image == undefined) {
      Alert.alert('Alert', 'Please select product image', [
        {
          text: 'Cancel',
        },
      ]);
    } else {
      let body = new FormData();

      body.append('name', name);
      body.append('price', price);
      body.append('description', description);
      body.append('countInStock', count);
      body.append('brand', brand);
      if (imageRes) {
        body.append('image', {
          name: imageRes.fileName,
          type: imageRes.type,
          uri:
            Platform.OS === 'android'
              ? imageRes.uri
              : imageRes.uri.replace('file://', ''),
        });
      }
      body.append('category', category);

      if (item !== null) {
        fetch(`${url}products/updateProduct/${id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`,
          },
          body: body,
        })
          .then(response => response.json())
          .then(response => {
            if (response.success == true) {
              Toast.showWithGravity(
                'Update product successfully',
                Toast.LONG,
                Toast.TOP,
              );
              setName('');
              setBrand('');
              setCount('');
              setPrice('');
              setCategory('');
              setDescription('');
              navigation.navigate('product');
            }
          })
          .catch(error => {
            console.log('error', error);
          });
      } else {
        fetch(`${url}products/createProducts`, {
          method: 'POST',
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`,
          },
          body: body,
        })
          .then(response => response.json())
          .then(response => {
            if (response.success == true) {
              Toast.showWithGravity(
                'Add product successfully',
                Toast.LONG,
                Toast.TOP,
              );
              setName('');
              setBrand('');
              setCount('');
              setPrice('');
              setCategory('');
              setDescription('');
              navigation.navigate('product');
            }
          })
          .catch(error => {
            console.log('error', error);
          });
      }
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        behavior={Platform.OS == 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={Sizes.s260}
        style={{flex: 1, backgroundColor: '#fff'}}>
        <ScrollView style={{margin: Sizes.s30}}>
          <TouchableOpacity
            onPress={() => {
              selectImage();
            }}
            style={styles.picker}>
            <Image
              source={{uri: image ? image : null}}
              style={styles.image}
              resizeMode="cover"
            />
            <View style={styles.icon}>
              <Icon name="camera" size={Sizes.s30} />
            </View>
          </TouchableOpacity>
          <TextField
            id={'brand'}
            onBlur={text => {
              if (text == '') {
                brandRef.current.error('brand', 'Please enter brand name');
              }
            }}
            onFocus={() => {
              brandRef.current.clearError('brand');
            }}
            editable={true}
            ref={brandRef}
            isRequired={true}
            onChangeText={text => {
              setBrand(text.trim());
            }}
            placeholder="Brand"
            value={brand}
          />
          <TextField
            id={'name'}
            onBlur={text => {
              if (text == '') {
                nameRef.current.error('name', 'Please enter product name');
              }
            }}
            onFocus={() => {
              nameRef.current.clearError('name');
            }}
            editable={true}
            ref={nameRef}
            isRequired={true}
            onChangeText={text => {
              setName(text.trim());
            }}
            placeholder="Name"
            value={name}
          />
          <TextField
            id={'price'}
            onBlur={text => {
              if (text == '') {
                priceRef.current.error('price', 'Please enter product price');
              }
            }}
            onFocus={() => {
              priceRef.current.clearError('price');
            }}
            onChangeText={text => {
              setPrice(text.trim());
            }}
            ref={priceRef}
            editable={true}
            isRequired={true}
            placeholder="Price"
            value={price}
          />
          <TextField
            id={'count'}
            onBlur={text => {
              if (text == '') {
                countRef.current.error('count', 'Please enter product count');
              }
            }}
            onFocus={() => {
              countRef.current.clearError('count');
            }}
            editable={true}
            ref={countRef}
            isRequired={true}
            onChangeText={text => {
              setCount(text.trim());
            }}
            placeholder="Count In Stock"
            value={count}
          />
          <TextField
            id={'description'}
            onBlur={text => {
              if (text == '') {
                descriptionRef.current.error(
                  'description',
                  'Please enter product description',
                );
              }
            }}
            onFocus={() => {
              descriptionRef.current.clearError('description');
            }}
            editable={true}
            ref={descriptionRef}
            isRequired={true}
            onChangeText={text => {
              setDescription(text.trim());
            }}
            placeholder="Description"
            value={description}
          />
          <Picker
            id={'category'}
            onBlur={selectedItem => {
              if (selectedItem === undefined) {
                categoryRef.current.error('country', 'Please select category');
              }
            }}
            onFocus={() => {
              categoryRef.current.clearError('country');
            }}
            ref={categoryRef}
            isRequired={true}
            onChooseItem={item => {
              setCategory(item.id);
            }}
            placeholder="Select category"
            size={Sizes.s30}
            listItem={categoryList}
          />
        </ScrollView>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            onPress();
          }}>
          <Text style={{color: '#fff', fontWeight: '700'}}>
            {item !== null ? 'Update' : 'Add'}
          </Text>
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
  },
  picker: {
    width: Sizes.s260 + Sizes.s10,
    height: Sizes.s260 + Sizes.s10,
    backgroundColor: '#fafafa',
    borderRadius: 100,
    alignSelf: 'center',
  },
  image: {
    height: '95%',
    width: '95%',
    borderRadius: 200,
    backgroundColor: '#9999',
  },
  icon: {
    width: Sizes.h52,
    height: Sizes.h44,
    position: 'absolute',
    right: 10,
    bottom: 10,
    backgroundColor: '#FAFAFA',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
  },
});

export default AddProduct;
