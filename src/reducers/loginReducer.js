import { LOGIN_SUCCESS, LOGOUT_SUCCESS } from '../modules/constants';

const initialState = {
    isAuthenticated: false,
    user: null
};

export default (state = initialState, action) => {
    switch(action.type) {
        case LOGIN_SUCCESS:
            return {
                isAuthenticated: true,
                user: action.payload
            };
        case LOGOUT_SUCCESS:
            return {
                isAuthenticated: false,
                user: null
            };
        default:
            return state;
    }
};
