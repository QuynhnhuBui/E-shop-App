import jwt_decode from "jwt-decode"
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-simple-toast'
import url from '../../common/baseUrl'
export const SET_USER = "SET_USER";

export const loginUser = (user, dispatch) => {
    fetch(`${url}users/login`, {
        method: "POST",
        body: JSON.stringify(user),
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
    })
    .then((res) => res.json())
    .then((data) => {
        console.log(data)
        
        if (data) {
            if(data.success == true){
                const token = data.token;
                const decoded = jwt_decode(token)
    
                AsyncStorage.setItem("token", token).then(res =>{console.log(222)})
                dispatch(setUserData(decoded, user))
            } else {
                Toast.showWithGravity(
                    data.message,
                    Toast.LONG,
                    Toast.TOP,
                  )
            }
           
        } else {
           logoutUser(dispatch)
        }
       
    })
    .catch((err) => {
        console.log(err)
        Toast.showWithGravity(
            'Something went wrong. Please try again',
            Toast.LONG,
            Toast.TOP,
          )
        logoutUser(dispatch)
    });
};



export const logoutUser = (dispatch) => {
    AsyncStorage.removeItem("token");
    dispatch(setUserData({}))
}

export const setUserData = (decoded, user) => {
    return {
        type: SET_USER,
        payload: decoded,
        userProfile: user
    }
}