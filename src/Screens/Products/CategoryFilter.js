import React from 'react';
import {StyleSheet, TouchableOpacity, ScrollView, Text} from 'react-native';
import {Sizes} from '@dungdang/react-native-basic';

const CategoryFilter = props => {
    const { setActive, active, categories} = props

  return (
    <ScrollView
      bounces={true}
      horizontal={true}
      style={{backgroundColor: '#f2f2f2'}}>
      <TouchableOpacity
        key={1}
        onPress={() => {
         props.onPress('')
         setActive(-1);
        }}
        style={[
          styles.center,
          active == -1 ? styles.active : styles.inactive,
        ]}>
        <Text style={styles.text}>All</Text>
      </TouchableOpacity>
      {categories.map(item => (
        <TouchableOpacity
          key={item.id}
          onPress={() => {
            // categoryFilter(item._id),
            props.onPress(item.id)
              setActive(categories.indexOf(item));
          }}
          style={[
            styles.center,

            active == categories.indexOf(item)
              ? styles.active
              : styles.inactive,
          ]}>
          <Text style={styles.text}>{item.name}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};
CategoryFilter.defaultProps= {
  onPress: ()=>{},
}
const styles = StyleSheet.create({
  center: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: Sizes.s30,
    margin: 5,
  },
  active: {
    backgroundColor: '#03bafc',
  },
  inactive: {
    backgroundColor: '#a0e1eb',
  },
  text: {
    color: '#fff',
    padding: Sizes.s10,
  },
});

export default CategoryFilter;
