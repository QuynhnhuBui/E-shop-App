export const ADD_TO_CART = 'ADD_TO_CART'
export const DELETE_FROM_CART = 'DELETE_FROM_CART'
export const EMPTY_CART = 'EMPTY_CART'

export const addToCart = (product) =>{
    return {

        type: ADD_TO_CART,
        product
    }
}
export const deleteFromCart = (data) =>{
    return {

        type: DELETE_FROM_CART,
        data
    }
}
export const emptyCart = (data) =>{
    return {

        type: EMPTY_CART,
        data
    }
}

