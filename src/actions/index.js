import {
    LOGIN_SUCCESS,
    LOGOUT_SUCCESS,
    SLIDE_INDEX_CHANGED
} from '../modules/constants';

export const loginSuccess = (user) => {
    return {
        type: LOGIN_SUCCESS,
        payload: user
    };
};

export const logoutSuccess = () => {
    return {
        type: LOGOUT_SUCCESS
    };
};

export const slideIndexChanged = (index) => {
    return {
        type: SLIDE_INDEX_CHANGED,
        index: index
    };
};
