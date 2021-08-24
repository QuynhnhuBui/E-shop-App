import React from "react";
import { StyleSheet, View, Text } from "react-native";
// import { Badge, Text } from "native-base";
import {Sizes} from '@dungdang/react-native-basic';

import { connect } from "react-redux";

const CartIcon = (props) => {
  return (
    <>
      {props.cartItems.length ? (
        <View style={styles.icon}>
          <Text style={styles.text}>{props.cartItems.length}</Text>
        </View>
      ) : null}
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    cartItems: state.cartReducers,
  };
};

const styles = StyleSheet.create({
  
  text: {
    fontSize: 12,
    fontWeight: "bold",
    color:'#fff'
  },
  icon:{
    backgroundColor: "#ff6600",
    height: Sizes.s40,
    width: Sizes.s40,
    top: -3,
    position: "absolute",
    right: -10,
    borderRadius: Sizes.s15,
    alignItems: "center",
    justifyContent: "center",
  }
});

export default connect(mapStateToProps)(CartIcon);
