import {
    LOGIN_SUCCESS,
    LOGOUT_SUCCESS,
    CHANGE_SCENE_TO_MAIN
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

export const changeSceneToMain = () => {
    return {
        type: CHANGE_SCENE_TO_MAIN
    };
};
