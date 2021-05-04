import {LOGIN_SUCCESS, INVALID_LOGIN, LOGIN_NETWORK_ERROR, LOGOUT} from "../actionConstants";
import {LOGIN_STATE} from "../storeConstants";

const INITIAL_STATE = {
    loginState: LOGIN_STATE.LOGGED_OUT
}

export const loginReducer = (state=INITIAL_STATE, action) => {
    switch (action.type) {
        case LOGIN_SUCCESS:
            return { loginState: LOGIN_STATE.LOGGED_IN }
        case INVALID_LOGIN:
            return {loginState: LOGIN_STATE.INVALID_LOGIN }
        case LOGIN_NETWORK_ERROR:
            return {loginState: LOGIN_STATE.NETWORK_ERROR }
        case LOGOUT:
            return {loginState: LOGIN_STATE.LOGGED_OUT }
        default:
            return state;
    }
}