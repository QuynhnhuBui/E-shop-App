import React, {
  useState,
  useEffect,
  useImperativeHandle,
  forwardRef,
} from 'react';
import {
  View,
  Text,
  Modal,
  StyleSheet,
  TouchableWithoutFeedback,
  Dimensions,
  FlatList,
  TouchableOpacity,
  Animated,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {Sizes} from '@dungdang/react-native-basic';
const Picker = forwardRef((props, ref) => {
  let [showSelect, setShowSelect] = useState(false);
  let [selectedItem, setSelectedItem] = useState(
    props.defaultValue !== undefined ? props.defaultValue : undefined,
  );
  let [error, setError] = useState('');

  useImperativeHandle(ref, () => ({
    error: (key, content) => {
      if (key === props.id) {
        setError(content);
        return false;
      }
    },
    clearError: key => {
      if (key === props.id) {
        setError('');
      }
    },
  }));

  const {listItem} = props;
  _animatedSlideUp = new Animated.Value(showSelect ? 0 : 1);
  useEffect(() => {
    let value = 0;
    if (showSelect) {
      value = 1;
    }

    Animated.timing(_animatedSlideUp, {
      toValue: value,
      duration: 300,
      useNativeDriver: false,
    }).start();
  }, [showSelect]);

  const renderItem = ({item, index}) => {
    return (
      <View
        style={{
          borderBottomWidth: 0.5,
          width: Dimensions.get('window').width * 0.9,
          marginHorizontal: 10,
          alignItems: 'center',
          justifyContent: 'center',
          borderColor: '#EFEFEF',
        }}>
        <TouchableOpacity
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}
          onPress={() => {
            Animated.timing(_animatedSlideUp, {
              toValue: 0,
              duration: 300,
              useNativeDriver: false,
            }).start();
            setTimeout(() => {
              setSelectedItem(item);
              setShowSelect(false);
              props.onChooseItem(item);
            }, 300);
          }}>
          <Text
            style={{
              fontSize: selectedItem === item ? props.size * 1.1 : props.size,
              paddingVertical: Sizes.s30,
              color: selectedItem === item ? '#007AFF' : '#222222',
            }}>
            {item.name !== undefined ? item.name : item}
          </Text>
          <View style={{flex: 1}}></View>
          {selectedItem === item && (
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
  };

  let borderColor = '#EFEFEF';
  if (showSelect) {
    borderColor = '#007AFF';
  }
  if (error !== '') {
    borderColor = 'red';
  }
  return (
    <View style={[styles.container, props.style]}>
      <TouchableOpacity
        style={{...styles.button, borderColor: borderColor}}
        onPress={() => {
          props.onFocus(selectedItem);
          setShowSelect(!showSelect);
        }}>
        <Text
          style={{
            color: selectedItem === undefined ? '#8A8A8E' : '#222222',
            fontSize: props.size,
            ...styles.placeHolder,
          }}>
          {selectedItem !== undefined ? selectedItem.name : props.placeholder}
        </Text>
        <Icon
          color="#989898"
          size={Sizes.s30}
          name="chevron-down"
          style={styles.icon}
        />
      </TouchableOpacity>
      {error !== '' && (
        <View>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      )}
      <Modal
        animationType="none"
        transparent={true}
        visible={showSelect}
        onRequestClose={() => {
          setShowSelect(false);
        }}>
        <TouchableWithoutFeedback
          onPress={() => {
            Animated.timing(_animatedSlideUp, {
              toValue: 0,
              duration: 300,
              useNativeDriver: false,
            }).start();
            setTimeout(() => {
              setShowSelect(false);
              props.onBlur(selectedItem);
            }, 300);
          }}>
          <View style={styles.modal}>
            <TouchableWithoutFeedback>
              <Animated.View
                disabled={true}
                style={{
                  transform: [
                    {
                      translateY: _animatedSlideUp.interpolate({
                        inputRange: [0, 1],
                        outputRange: [1000, 0],
                      }),
                    },
                  ],
                  width: '100%',
                  backgroundColor: '#ffffff',
                  alignSelf: 'center',
                  borderRadius: 15,
                  height: Dimensions.get('window').height * 0.5,
                }}>
                <View style={styles.modalHeader}>
                  <View>
                    <Text style={styles.modalPlaceholder}>
                      {props.placeholder}
                    </Text>
                  </View>
                  <TouchableOpacity
                    style={{
                      justifyContent: 'center',
                      position: 'absolute',
                      right: 10,
                      height: '100%',
                    }}
                    onPress={() => {
                      setShowSelect(!showSelect);
                    }}></TouchableOpacity>
                </View>
                <FlatList
                  showsVerticalScrollIndicator={false}
                  data={listItem}
                  keyExtractor={(item, index) => {
                    index.toString();
                  }}
                  renderItem={(item, index) => renderItem(item, index)}
                  style={styles.flatList}
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
});
export default Picker;

Picker.defaultProps = {
  placeholder: 'Select an item',
  type: 'normal',
  size: 18,
  onChooseItem: item => {},
  onFocus: () => {},
  onBlur: () => {},
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  icon: {
    alignSelf: 'center',
    right: 5,
    position: 'absolute',
  },
  button: {
    borderWidth: 1,
    borderRadius: Sizes.s10,
    flexDirection: 'row',
    backgroundColor: '#fff',
    marginTop: Sizes.s20,
  },
  placeHolder: {
    paddingVertical: Sizes.s20,
    paddingRight: Sizes.s50,
    paddingLeft: Sizes.s10,
  },
  errorText: {
    fontSize: Sizes.s25,
    color: 'red',
    paddingVertical: Sizes.s15,
  },
  modal: {
    backgroundColor: '#00000036',
    flex: 1,
    width: '100%',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  flatList: {
    width: '100%',
    alignSelf: 'center',
    backgroundColor: '#ffffff',
    height: Dimensions.get('window').height * 0.5,
  },
  modalPlaceholder: {
    paddingVertical: 15,
    alignSelf: 'center',
    color: '#222222',
    fontWeight: 'bold',
  },
  modalHeader: {
    borderBottomWidth: 0.5,
    width: Dimensions.get('window').width,
    justifyContent: 'center',
    borderColor: '#EFEFEF',
    flexDirection: 'row',
  },
});
