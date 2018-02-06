import { LOGGING_IN, LOGGING_IN_SUCCESS, LOGGING_IN_FAILURE } from '../constants';

const initialState = {
    isAuthenticating: false,
    isAuthenticated: false,
    error: false
}

export default function loginReducer(action, state = initialState) {
    switch(action.type) {
        case LOGGING_IN:
            return {
                ...state,
                isAuthenticating: true
            }
        case LOGGING_IN_SUCCESS:
            return {
                ...state,
                isAuthenticated: true
            }
        case LOGGING_IN_FAILURE:
            return {
                ...state,
                error: true
            }
        default:
            return state;
    }
}
