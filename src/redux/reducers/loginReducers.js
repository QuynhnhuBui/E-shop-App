import {SET_USER} from '../action/loginActions';
export const isEmpty = data => {
 return data === undefined ||
    data === null ||
    (typeof data === 'object' && Object.keys(data).length === 0) ||
    (typeof data === 'string' && data.trim().length === 0);
};
export default function (state = {} , action) {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        user: action.payload,
        userProfile: action.userProfile,
      };
    default:
      return state;
  }
}
