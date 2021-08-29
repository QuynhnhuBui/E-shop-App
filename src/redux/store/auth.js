import React, { useEffect, useReducer, userEffect, useState } from "react";
import jwt_decode from "jwt-decode";
import AsyncStorage from '@react-native-async-storage/async-storage';
import loginReducer from '../reducers/loginReducers'
import {setUserData} from '../action/loginActions'
import AuthGlobal from './authGlobal'

const Auth = props => {
    const [stateUserData, dispatch] = useReducer(loginReducer, {
        isAuthenticated: null,
        user: {}
    });
    const [show, setShow] = useState(false);

    useEffect(async () => {
       const token =  await AsyncStorage.getItem('token')
        setShow(true);
        if (token) {
            const decoded = token ? token : "";
            if (setShow) {
                dispatch(setUserData(jwt_decode(decoded)))
            }
        }
        return () => setShow(false);
    }, [])


    if (!show) {
        return null;
    } else {
        return (
            <AuthGlobal.Provider
                value={{
                    stateUserData,
                    dispatch
                }}
            >
                {props.children}
            </AuthGlobal.Provider>
        )
    }
};

export default Auth;