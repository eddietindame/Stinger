import { LOGGING_IN, LOGGING_IN_SUCCESS, LOGGING_IN_FAILURE } from './constants';
import facebookLogin from './modules/FacebookLogin';

const logIn = () => ({ type: LOGGING_IN }),
      logInSuccess = data => ({ type: LOGGING_IN_SUCCESS, data }),
      logInFailure = () => ({ type: LOGGING_IN_FAILURE });

export function authenticateUser() {
    return (dispatch) {
        dispatch(logIn());
    }
    facebookLogin();
} 
