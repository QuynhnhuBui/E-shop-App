import React, { Component } from 'react';
import ShoppingCart from '../Screens/ShoppingCart/ShoppingCart'
import { connect } from 'react-redux';
import { addToCart, emptyCart,deleteFromCart} from '../redux/action/cartAction'
class CartContainer extends React.Component {
    render() {
        return <ShoppingCart {...this.props} />;
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        addToCart: (product) => {
            dispatch(addToCart(product))
        },
        emptyCart:()=>{
            dispatch(emptyCart())
        },
        deleteFromCart:(product)=>{
            dispatch(deleteFromCart(product))
        }
       
    };
}
const mapStateToProps = (state) => {
    return {
        cartItem: state.cartReducers,
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(CartContainer);