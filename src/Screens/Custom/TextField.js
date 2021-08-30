import React, {useState, forwardRef, useImperativeHandle} from 'react';
import {Text, TextInput, View, StyleSheet} from 'react-native';
import {Sizes} from '@dungdang/react-native-basic';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {TouchableOpacity} from 'react-native-gesture-handler';

const TextField = forwardRef((props, ref) => {
  const [isFocus, setIsFocus] = useState(false);
  const [text, setText] = useState(
    props.defaultValue !== undefined ? props.defaultValue : '',
  );
  const [error, setError] = useState('');
  let borderColor = '#EFEFEF';
  if (isFocus) {
    borderColor = '#007AFF';
  }
  if (error !== '') {
    borderColor = 'red';
  }

  useImperativeHandle(ref, () => ({
    error: (key, content) => {
      setError(content);
    },
    clearError: key => {
      setError('');
    },
  }));
  return (
    <View>
      <View style={styles.container}>
        <TextInput
          secureTextEntry={props.secureTextEntry}
          id={props.id}
          editable={props.editable}
          value={props.value}
          defaultValue={props.defaultValue}
          onChangeText={text => {
            setText(text);
            props.onChangeText(text);
          }}
          keyboardType={props.keyboardType}
          onFocus={() => {
            setIsFocus(true);
            props.onFocus(text);
            setText(text);
          }}
          onBlur={() => {
            setIsFocus(false);
            props.onBlur(text);
          }}
          placeholder={props.placeholder}
          placeholderTextColor="#989898"
          style={[
            {
              ...styles.textInput,
              textAlignVertical: props.multiline && 'center',
              backgroundColor: props.editable ? 'white' : '#eee',
              paddingTop: props.multiline && Sizes.s15,
              lineHeight: props.multiline && Sizes.s40,
              borderColor: borderColor,
            },
            props.style,
          ]}
          multiline={props.multiline}
        />
        {props.textLimit !== undefined && isFocus && (
          <View
            style={{
              position: 'absolute',
              top: props.icon !== undefined ? 0 : -Sizes.s25,
              right: props.icon !== undefined ? Sizes.s80 : 0,
            }}>
           
          </View>
        )}

        {props.icon !== undefined && (
          <TouchableOpacity
            disabled={error === '' ? false : true}
            onPress={() => {
              if (error === '') {
                props.onSubmit(text);
                setText('');
              }
            }}
            style={{
              paddingHorizontal: Sizes.s20,
              marginTop: Sizes.s25,
            }}>
            <Icon
              name="location-arrow"
              size={Sizes.s40}
              solid
              color="#007AFF"
            />
          </TouchableOpacity>
        )}
      </View>
      {error !== '' && (
        <View>
          <Text
            style={styles.errorText}>
            {error}
          </Text>
        </View>
      )}
    </View>
  );
});
TextField.defaultProps = {
  defaultValue: '',
  id: '',
  onFocus: () => {},
  onBlur: () => {},
  editable: true,
};
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: Sizes.s20,
  },
  textInput: {
    flex: 1,
    justifyContent: 'center',
    fontSize: Sizes.s30,
    paddingVertical: Sizes.s20,
    color: '#222222',
    paddingHorizontal: Sizes.s10,
    borderWidth: 1,
    borderRadius: Sizes.s10,
  },
  errorText: {
    fontSize: Sizes.s25,
    color: 'red',
    paddingVertical: Sizes.s15,
  }
});
export default TextField;
