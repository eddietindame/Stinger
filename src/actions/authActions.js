import firebase from 'react-native-firebase'
import {
    Actions
} from 'react-native-router-flux'
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
    AUTH_CHECK_REQUEST,
    AUTH_CHECK_SUCCESS,
    AUTH_CHECK_FAILURE,
    SLIDE_INDEX_CHANGED
} from '../modules/constants'
import {
    writeUserData,
    writeUserDataLocal,
    setStatus
} from '../actions/dbActions'

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
                // If user does not exist in DB then add new entry
                firebase.database().ref('users/').once('value', snapshot => {
                    snapshot.hasChild(user.uid) || dispatch(writeUserData(user._user))
                })
                .then(() => {
                    dispatch(setStatus('online'))
                })

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
    dispatch(setStatus('offline'))

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
        type: AUTH_CHECK_REQUEST
    })

    AccessToken.getCurrentAccessToken()
        .then(token => {
            if (token) {
                firebase.auth().onAuthStateChanged(currentUser => {
                    if (currentUser) {
                        dispatch({
                            type: AUTH_CHECK_SUCCESS,
                            payload: currentUser
                        })
                        dispatch(writeUserDataLocal(currentUser._user))
                        dispatch(setStatus('online'))
                        Actions.main('reset')
                    } else {
                        dispatch({
                            type: AUTH_CHECK_FAILURE,
                            payload: 'User not signed in'
                        })
                    }
                })
            } else {
                dispatch({
                    type: AUTH_CHECK_FAILURE,
                    payload: 'User not signed in'
                })
            }
        })
        .catch(error => {
            dispatch({
                type: AUTH_CHECK_FAILURE,
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