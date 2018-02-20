import {
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAILURE,
    LOGOUT_REQUEST,
    LOGOUT_SUCCESS,
    LOGOUT_FAILURE,
    CHECK_REQUEST,
    CHECK_SUCCESS,
    CHECK_FAILURE,
} from '../modules/constants';

const initialState = {
    isAuthenticating: false,
    user: null,
    error: null
};

export default (state = initialState, action) => {
    switch(action.type) {
        case LOGIN_REQUEST:
        case LOGOUT_REQUEST:
        case CHECK_REQUEST:
            return {
                ...state,
                isAuthenticating: true,
                error: null
            };
        case LOGIN_SUCCESS:
        case CHECK_SUCCESS:
            return {
                ...state,
                isAuthenticating: false,
                user: action.payload,
                error: null
            };
        case LOGOUT_SUCCESS:
            return {
                ...state,
                isAuthenticating: false,
                user: null,
                error: null
            };
        case LOGIN_FAILURE:
        case LOGOUT_FAILURE:
        case CHECK_FAILURE:
            return {
                ...state,
                isAuthenticating: false,
                error: action.payload
            };
        default:
            return state;
    }
};
