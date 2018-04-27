import {
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAILURE,
    LOGOUT_REQUEST,
    LOGOUT_SUCCESS,
    LOGOUT_FAILURE,
    DELETE_REQUEST,
    DELETE_SUCCESS,
    DELETE_FAILURE,
    AUTH_CHECK_REQUEST,
    AUTH_CHECK_SUCCESS,
    AUTH_CHECK_FAILURE,
    GRAPH_QUERY_REQUEST,
    GRAPH_QUERY_SUCCESS,
    GRAPH_QUERY_FAILURE
} from '../modules/constants'

const initialState = {
    isAuthenticating: false,
    user: null,
    result: null,
    token: null,
    error: null
}

export default (state = initialState, action) => {
    switch (action.type) {
    case LOGIN_REQUEST:
    case LOGOUT_REQUEST:
    case DELETE_REQUEST:
    case AUTH_CHECK_REQUEST:
    case GRAPH_QUERY_REQUEST:
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
            user: action.user,
            token: action.token,
            error: null
        }
    case GRAPH_QUERY_SUCCESS:
        return {
            ...state,
            isAuthenticating: false,
            result: action.result,
            error: null
        }
    case LOGOUT_SUCCESS:
    case DELETE_SUCCESS:
        return {
            ...state,
            isAuthenticating: false,
            user: null,
            token: null,
            error: null
        }
    case LOGIN_FAILURE:
    case LOGOUT_FAILURE:
    case AUTH_CHECK_FAILURE:
    case DELETE_FAILURE:
    case GRAPH_QUERY_FAILURE:
        return {
            ...state,
            isAuthenticating: false,
            error: action.error
        }
    default:
        return state
    }
}
