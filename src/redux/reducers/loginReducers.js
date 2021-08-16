import {
	POST_LOGIN,
	POST_LOGIN_ERROR,
	POST_LOGIN_SUCCESS,
} from "../action/loginActions";
const initState = {
	StatusCode: null,
	result: null,
	error: null,
	loading: false,
	status: null,
	msg: null,
	errorServer: null,
};

const loginReducers = (state = initState, action) => {
	switch (action.type) {
		case POST_LOGIN:
			return Object.assign({}, state, {
				result: null,
				error: null,
				loading: true,
				StatusCode: null,
				msg: null,
			});
		
		case POST_LOGIN_SUCCESS:
			return Object.assign({}, state, {
				StatusCode: action.response.StatusCode,
				result: action.response.resultObject,
				error: null,
				loading: false,
				status: action.response.status,
				msg: action.response.description,
			});
		case POST_LOGIN_ERROR:
			return Object.assign({}, state, {
				StatusCode: null,
				result: null,
				error: action.error,
				loading: false,
				status: null,
				msg: null,
			});

		default:
			return state
	}
};

export default loginReducers