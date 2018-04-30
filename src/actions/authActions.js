import firebase from 'react-native-firebase'
import { Actions } from 'react-native-router-flux'
import {
    AccessToken,
    LoginManager,
    GraphRequest,
    GraphRequestManager
} from 'react-native-fbsdk'
import SplashScreen from 'react-native-splash-screen'
import { filter } from 'lodash'
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
import {
    writeUserData,
    writeUserDataLocal,
    setStatus,
    setFriendsList,
    deleteUser
} from '../actions/dbActions'

export const login = () => dispatch => {
    dispatch({
        type: LOGIN_REQUEST
    })

    let token

    // Get access token from Facebook
    LoginManager.logInWithReadPermissions([
        'public_profile',
        'email',
        'user_friends'
    ])
        .then(result => {
            if (!result.isCancelled) {
                // get the access token
                return AccessToken.getCurrentAccessToken()
            } else {
                dispatch({
                    type: LOGIN_FAILURE,
                    error: 'Login cancelled'
                })
            }
        })
        .then(data => {
            if (data) {
                token = data
                // create a new firebase credential with the token
                const credential = firebase.auth.FacebookAuthProvider.credential(
                    data.accessToken
                )
                // login with credential
                return firebase.auth().signInWithCredential(credential)
            }
        })
        .then(user => {
            if (user) {
                dispatch({
                    type: LOGIN_SUCCESS,
                    user: user
                })

                firebase
                    .database()
                    .ref('users/')
                    .once('value', snapshot => {
                        // If user does not exist in DB then add new entry
                        if(!snapshot.hasChild(user.uid))
                            dispatch(writeUserData(user._user, token.userID))
                        else
                            dispatch(setStatus('online'))
                    })
                        .then(() => {
                            dispatch(getFriendsList())
                            Actions.main('reset')
                        })
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

    firebase
        .auth()
        .signOut()
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

    let accessToken

    async function dispatchActions(user) {
        await dispatch(writeUserDataLocal(user._user, accessToken.userID))
        dispatch(getFriendsList())
        dispatch(setStatus('online'))
    }

    AccessToken.getCurrentAccessToken()
        .then(token => {
            if (token) {
                accessToken = token
                firebase.auth().onAuthStateChanged(currentUser => {
                    if (currentUser) {
                        dispatch({
                            type: AUTH_CHECK_SUCCESS,
                            user: currentUser,
                            token: accessToken
                        })
                        dispatchActions(currentUser)
                        Actions.main('reset')
                    } else {
                        dispatch({
                            type: AUTH_CHECK_FAILURE,
                            error: 'User not signed in'
                        })
                    }
                })
            } else {
                dispatch({
                    type: AUTH_CHECK_FAILURE,
                    error: 'User not signed in'
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

export const getFriendsList = () => dispatch => {
    const users = firebase.database().ref('users')

    const _responseInfoCallback = (error: ?Object, result: ?Object) => {
        if (error) {
            dispatch({
                type: GRAPH_QUERY_FAILURE,
                error: error
            })
        } else {
            dispatch({
                type: GRAPH_QUERY_SUCCESS,
                result: result
            })
            dispatch(setFriendsList(result.data))
        }
    }

    // Create a graph request asking for user information with a callback to handle the response.
    const infoRequest = new GraphRequest(
        '/me/friends',
        null,
        _responseInfoCallback
    )

    // Start the graph request.
    new GraphRequestManager().addRequest(infoRequest).start()

    dispatch({
        type: GRAPH_QUERY_REQUEST,
        request: infoRequest
    })
}

export const deleteAccount = () => dispatch => {
    dispatch({
        type: DELETE_REQUEST
    })

    firebase.auth().currentUser
        .delete()
        .then(() => {
            dispatch({
                type: DELETE_SUCCESS
            })
            dispatch(deleteUser())
            Actions.login('reset')
        })
        .catch(error => {
            dispatch({
                type: DELETE_FAILURE,
                error: error
            })

            dispatch(reauthenticateUser(deleteAccount))
        })
}

export const reauthenticateUser = callback => dispatch => {
    dispatch({
        type: LOGIN_REQUEST,
        method: reauthenticateUser
    })

    LoginManager.logInWithReadPermissions([
        'public_profile',
        'email',
        'user_friends'
    ])
        .then(result => {
            if (!result.isCancelled) {
                // get the access token
                return AccessToken.getCurrentAccessToken()
            } else {
                dispatch({
                    type: LOGIN_FAILURE,
                    error: 'Login cancelled'
                })
            }
        })
        .then(data => {
            if (data) {
                // create a new firebase credential with the token
                const credential = firebase.auth.FacebookAuthProvider.credential(
                    data.accessToken
                )
                // login with credential
                return firebase.auth().currentUser
                    .reauthenticateWithCredential(credential)
                        .then(() => {
                            dispatch({ type: LOGIN_SUCCESS })
                            dispatch(callback())
                        })
                        .catch(error => {
                            dispatch({
                                type: LOGIN_FAILURE,
                                error: error
                            })
                        })
            }
        })
        .catch(error => {
            dispatch({
                type: LOGIN_FAILURE,
                error: error
            })
        })
}

// @flow
