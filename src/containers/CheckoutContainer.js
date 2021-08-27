import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addToCart, emptyCart,deleteFromCart} from '../redux/action/cartAction'
import Shipping from '../Screens/ShoppingCart/Shipping'
class CheckoutContainer extends React.Component {
    render() {
        return <Shipping {...this.props} />;
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        // addToCart: (product) => {
        //     dispatch(addToCart(product))
        // },
        // emptyCart:()=>{
        //     dispatch(emptyCart())
        // },
        // deleteFromCart:(product)=>{
        //     dispatch(deleteFromCart(product))
        // }
       
    };
}
const mapStateToProps = (state) => {
    return {
        cartItem: state.cartReducers,
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(CheckoutContainer);