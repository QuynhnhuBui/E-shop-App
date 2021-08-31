import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Platform,
  StyleSheet,
  Alert,
  Modal,
  TouchableWithoutFeedback,
  Animated,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import Toast from 'react-native-simple-toast';
import axios from 'axios';
import url from '../../common/baseUrl';

import {Sizes} from '@dungdang/react-native-basic';
const listItem = [
  {name: 'Pending'},
  {name: 'Delivered'},
  {name: 'Finished'},
  {name: 'Cancel'},
];
const Item = props => {
  const [showSelect, setShowSelect] = useState(false);
  const [selectedItem, setSelected] = useState();
  const [id, setId] = useState()
  const {item} = props;


  const updateStatus = (item,id) => {
    let body = {
      status: item,
    };
    console.log(body)
    axios
      .put(`${url}orders/updateStatus/${id}`, body, {
        headers: {
          Authorization: `Bearer ${props.token}`,
        },
      })
      .then(res => {
        if (res.data.success == true) {
            console.log(res.data)
          Toast.showWithGravity('Update status success', Toast.LONG, Toast.TOP);
          props.navigation.navigate('product')
        }
      })
      .catch(error => {
        console.log('Fetch api error');
      });
  };
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.text}>{`Order Number: ${item.id}`}</Text>
        <Text style={styles.text}>{`Status: ${item.status}`}</Text>
        <Text style={styles.text}>{`Phone: ${item.phone}`}</Text>
        <Text style={styles.text}>{`Address: ${item.shippingAddress1}`}</Text>
        <Text style={styles.text}>
          {`Date: ${item.dateOrder.split('T')[0]}`}
        </Text>
        <Text style={styles.text}>{`Price: ${item.totalPrice}`}</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            setShowSelect(true);
            setId(item.id)
          }}>
          <Text style={{color: '#fff', fontWeight: '700'}}>Update</Text>
        </TouchableOpacity>
      </View>
      <Modal
        animationType="none"
        transparent={true}
        visible={showSelect}
        onRequestClose={() => {
          setShowSelect(false);
        }}>
        <TouchableWithoutFeedback
          onPress={() => {
            setShowSelect(false);
           
          }}>
          <View style={styles.modal}>
            <TouchableWithoutFeedback>
              <Animated.View
                disabled={true}
                style={{
                  width: '100%',
                  backgroundColor: '#ffffff',
                  alignSelf: 'center',
                  borderRadius: 15,
                  height: Dimensions.get('window').height * 0.5,
                }}>
                <View
                  style={{
                    borderBottomWidth: 0.5,
                    width: Dimensions.get('window').width,
                    justifyContent: 'center',
                    borderColor: '#EFEFEF',
                    flexDirection: 'row',
                  }}>
                  <View>
                    <Text style={styles.title}>{'Select status'}</Text>
                  </View>
                </View>
                <FlatList
                  showsVerticalScrollIndicator={false}
                  data={listItem}
                  keyExtractor={(item, index) => {
                    index.toString();
                  }}
                  renderItem={(item, index) => {
                    return (
                      <View
                        style={{
                          borderBottomWidth: 0.5,
                          width: Dimensions.get('window').width * 0.9,
                          marginHorizontal: 10,
                          alignItem: 'center',
                          justifyContent: 'center',
                          borderColor: '#EFEFEF',
                        }}>
                        <TouchableOpacity
                          style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                          }}
                          onPress={() => {
                            setSelected(item.item.name);
                            console.log(item.item.name)
                            setShowSelect(false);
                            updateStatus(item.item.name,id)
                          }}>
                          <Text
                            style={{
                              paddingVertical: Sizes.s30,
                            }}>
                            {item.item.name}
                          </Text>
                          <View style={{flex: 1}}></View>
                          {selectedItem === item.item.name && (
                            <Icon
                              solid
                              style={{
                                paddingHorizontal: Sizes.s10,
                              }}
                              size={Sizes.s35}
                              color="#007AFF"
                              name="check-circle"
                            />
                          )}
                        </TouchableOpacity>
                      </View>
                    );
                  }}
                  style={{
                    width: '100%',
                    alignSelf: 'center',
                    backgroundColor: '#ffffff',
                    height: Dimensions.get('window').height * 0.5,
                  }}
                  contentContainerStyle={{
                    alignItems: 'center',
                  }}
                />
              </Animated.View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
};
const styles = StyleSheet.create({
  title: {
    fontSize: Sizes.h36,
    fontFamily: 'SanFranciscoText-Medium',
    color: '#0070D1',
    marginBottom: Sizes.h24,
    flex: 1,
    height: '100%',
  },

  name: {
    fontSize: Sizes.h32,
    fontFamily: 'SanFranciscoText-SemiBold',
  },
  icon: {
    width: Sizes.h48,
    height: Sizes.h48,
  },
  leftAction: {
    width: Sizes.s120,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: Sizes.s20,
    backgroundColor: '#E8E8E8',
    marginBottom: Sizes.s15,
    marginTop: Sizes.s15,
    marginRight: Sizes.s20,
  },
  image: {
    width: Sizes.s140,
    height: Sizes.s140,
    alignSelf: 'center',
    marginRight: Sizes.s30,
  },
  button: {
    backgroundColor: '#ff6600',
    padding: Sizes.s20,
    marginHorizontal: Sizes.s60,
    marginVertical: Sizes.s20,
    alignItems: 'center',
    borderRadius: Sizes.s35,
  },
  text: {
    fontSize: Sizes.h30,
    fontWeight: '500',
    paddingVertical: Sizes.s2,
  },
  container: {
    flex: 1,
    marginHorizontal: Sizes.s30,
    flexDirection: 'column',
    width: Dimensions.get('screen').width - Sizes.s60,
    marginVertical: Sizes.s15,
    backgroundColor: '#fff',
    borderRadius: Sizes.s20,
    paddingHorizontal: Sizes.s30,
    paddingVertical: Sizes.s30,
    shadowColor: 'black',
    shadowOffset: {width: 0, height: 0.5 * Sizes.s5},
    shadowOpacity: 0.4,
    shadowRadius: 0.8 * Sizes.s5,
    elevation: Sizes.s7,
  },
  modal: {
    backgroundColor: '#00000036',
    flex: 1,
    width: '100%',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  title: {
    paddingVertical: 15,
    alignSelf: 'center',
    color: '#222222',
    fontWeight: 'bold',
  },
});

export default Item;
