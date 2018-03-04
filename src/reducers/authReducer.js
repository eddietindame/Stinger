import {
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAILURE,
    LOGOUT_REQUEST,
    LOGOUT_SUCCESS,
    LOGOUT_FAILURE,
    AUTH_CHECK_REQUEST,
    AUTH_CHECK_SUCCESS,
    AUTH_CHECK_FAILURE,
} from '../modules/constants'

const initialState = {
    isAuthenticating: false,
    user: null,
    error: null
}

export default (state = initialState, action) => {
    switch(action.type) {
        case LOGIN_REQUEST:
        case LOGOUT_REQUEST:
        case AUTH_CHECK_REQUEST:
            return {
                ...state,
                isAuthenticating: true,
                error: null
            }
        case LOGIN_SUCCESS:
        case AUTH_CHECK_SUCCESS:
            return {
                ...state,
                isAuthenticating: false,
                user: action.payload,
                error: null
            }
        case LOGOUT_SUCCESS:
            return {
                ...state,
                isAuthenticating: false,
                user: null,
                error: null
            }
        case LOGIN_FAILURE:
        case LOGOUT_FAILURE:
        case AUTH_CHECK_FAILURE:
            return {
                ...state,
                isAuthenticating: false,
                error: action.error
            }
        default:
            return state
    }
}
