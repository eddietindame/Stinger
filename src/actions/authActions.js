import firebase from 'react-native-firebase'
import { Actions } from 'react-native-router-flux'
import {
    AccessToken,
    LoginManager
} from 'react-native-fbsdk'
import SplashScreen from 'react-native-splash-screen'
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
    SLIDE_INDEX_CHANGED
} from '../modules/constants'

export const login = () => dispatch => {
    dispatch({
        type: LOGIN_REQUEST
    })

    LoginManager
        .logInWithReadPermissions(['public_profile', 'email'])
        .then(result => {
            if (!result.isCancelled) {
                // get the access token
                return AccessToken.getCurrentAccessToken()
            } else {
                dispatch({
                    type: LOGIN_FAILURE,
                    payload: 'Login cancelled'
                })
            }
        })
        .then(data => {
            if (data) {
                // create a new firebase credential with the token
                const credential = firebase.auth.FacebookAuthProvider.credential(data.accessToken)
                // login with credential
                return firebase.auth().signInWithCredential(credential)
            }
        })
        .then(user => {
            if (user) {
                dispatch({
                    type: LOGIN_SUCCESS,
                    payload: user
                })
                Actions.main('reset')
            }
        })
        .catch(error => {
            dispatch({
                type: LOGIN_FAILURE,
                error: error
            })
        })
}

export const logout = () => dispatch => {
    dispatch({
        type: LOGOUT_REQUEST
    })

    firebase.auth().signOut()
        .then(() => {
            LoginManager.logOut()
        })
        .then(() => {
            dispatch({
                type: LOGOUT_SUCCESS
            })
            Actions.login('reset')
        })
        .catch(error => {
            dispatch({
                type: LOGOUT_FAILURE,
                error: error
            })
        })
}

export const checkAuth = () => dispatch => {
    dispatch({
        type: CHECK_REQUEST
    })

    AccessToken.getCurrentAccessToken()
      .then(token => {
        if (token) {
          firebase.auth().onAuthStateChanged(currentUser => {
            if (currentUser) {
                dispatch({
                    type: CHECK_SUCCESS,
                    payload: currentUser
                })
                Actions.main('reset')
            } else {
                dispatch({
                    type: CHECK_FAILURE,
                    payload: 'User not signed in'
                })
            }
          })
        } else {
            dispatch({
                type: CHECK_FAILURE,
                payload: 'User not signed in'
            })
        }
      })
      .catch(error => {
        dispatch({
            type: CHECK_FAILURE,
            error: error
        })
      })

    setTimeout(() => {
        try {
            SplashScreen.hide()
        } catch (error) {
            // console.info(error)
        }
    }, 500)
}

export const slideIndexChanged = index => {
    return {
        type: SLIDE_INDEX_CHANGED,
        index: index
    }
}
