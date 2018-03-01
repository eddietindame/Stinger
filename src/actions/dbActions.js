import firebase from 'react-native-firebase'
import shortid from 'shortid'
import {
    DB_SET_REQUEST,
    DB_SET_SUCCESS,
    DB_SET_FAILURE
} from '../modules/constants'

export const writeUserData = ({ displayName, email, uid }) => dispatch => {
    dispatch({
        type: DB_SET_REQUEST
    })

    firebase
        .database().ref('users/' + uid).set({
            username: displayName,
            email: email
        })
        .then(() => {
            dispatch({
                type: DB_SET_SUCCESS,
                uid: uid
            })
        })
        .catch(error => {
            dispatch({
                type: DB_SET_FAILURE,
                error: error
            })
        })
}

export const addRound = uid => dispatch => {
    dispatch({
        type: DB_SET_REQUEST
    })

    let round = {
        name: 'New round',
        number: '0'
    }

    firebase
        .database().ref('users/' + uid + '/rounds/' + shortid.generate()).set(round)
        .then(() => {
            dispatch({
                type: DB_SET_SUCCESS,
                rounds: round
            })
        })
        .catch(error => {
            dispatch({
                type: DB_SET_FAILURE,
                error: error
            })
        })
}
