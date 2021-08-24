import React, { Component } from 'react';
import ProductList from '../Screens/Products/ProductLists'
import { connect } from 'react-redux';
import * as actions from '../redux/action/cartAction';
class ProductContainer extends React.Component {
    render() {
        return <ProductList {...this.props} />;
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        addToCart: (product) => {
            dispatch(actions.addToCart({...product, quantity: 1}))
        },
       
    };
}
const mapStateToProps = (state) => {
    return {
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(ProductContainer);