import {ADD_TO_CART, DELETE_FROM_CART, EMPTY_CART} from '../action/cartAction';

const initState = {
	data: null,

};
const cartReducers = (state =[], action) => {
  switch (action.type) {
    case ADD_TO_CART:
      return [...state, action.product]
    case DELETE_FROM_CART:
      return state.filter(item => item !== action.data);
    case EMPTY_CART:
      return (state = []);
    default:
      return state;
  }
};

export default cartReducers;
