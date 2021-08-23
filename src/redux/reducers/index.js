import { combineReducers } from 'redux';
import loginReducers from './loginReducers'
import cartReducers from './cartReducers'
const allReducers = combineReducers({
    loginReducers,
    cartReducers
});

export default allReducers;