import firebase from 'react-native-firebase'
import { Actions } from 'react-native-router-flux'
import {
    AccessToken,
    LoginManager,
    GraphRequest,
    GraphRequestManager
} from 'react-native-fbsdk'
import SplashScreen from 'react-native-splash-screen'
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
    setFriendsList
} from '../actions/dbActions'

export const login = () => dispatch => {
    dispatch({
        type: LOGIN_REQUEST
    })

    function dispatchActions(user) {
        dispatch(writeUserData(user._user, token.userID)).then(() => {
            dispatch(getFriendsList())
            dispatch(setStatus('online'))
        })
    }

    let token

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
                // If user does not exist in DB then add new entry
                firebase
                    .database()
                    .ref('users/')
                    .once('value', snapshot => {
                        snapshot.hasChild(user.uid) ||
                            dispatchActions(user)
                    })

                dispatch({
                    type: LOGIN_SUCCESS,
                    user: user
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
        method: 'reauthenticateUser'
    })

    console.log('1')

    LoginManager.logInWithReadPermissions([
        'public_profile',
        'email',
        'user_friends'
    ])
        .then(result => {
            if (!result.isCancelled) {
                console.log('2')
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
                console.log('3')
                // create a new firebase credential with the token
                const credential = firebase.auth.FacebookAuthProvider.credential(
                    data.accessToken
                )
                // login with credential
                return firebase.auth().currentUser
                    .reauthenticateWithCredential(credential)
                        .then(() => {
                            console.log('4')
                            dispatch({ type: LOGIN_SUCCESS })
                            dispatch(callback())
                        })
                        .catch(error => {
                            dispatch({
                                type: LOGIN_FAILURE,
                                error: error,
                                poop: true
                            })
                        })
            }
        })
        .catch(error => {
            dispatch({
                type: LOGIN_FAILURE,
                error: error,
                poopy: rue
            })
        })
}

// @flow
