import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addToCart, emptyCart,deleteFromCart} from '../redux/action/cartAction'
import Confirm from '../Screens/ShoppingCart/Confirm'
class ConfirmContainer extends React.Component {
    render() {
        return <Confirm {...this.props} />;
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        // addToCart: (product) => {
        //     dispatch(addToCart(product))
        // },
        emptyCart:()=>{
            dispatch(emptyCart())
        },
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
export default connect(mapStateToProps, mapDispatchToProps)(ConfirmContainer);