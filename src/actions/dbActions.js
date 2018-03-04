import firebase from 'react-native-firebase'
import {
    DB_SET_REQUEST,
    DB_SET_SUCCESS,
    DB_SET_FAILURE,
    DB_REMOVE_REQUEST,
    DB_REMOVE_SUCCESS,
    DB_REMOVE_FAILURE
} from '../modules/constants'
import { store } from '../App';

export const writeUserData = ({ displayName, email, photoURL, uid }) => dispatch => {
    dispatch({
        type: DB_SET_REQUEST
    })

    firebase
        .database().ref('users/' + uid).set({
            username: displayName,
            email: email,
            photoURL: photoURL
        })
        .then(() => {
            firebase
                .database().ref('users/' + uid + '/status/')
                .onDisconnect()
                .set('offline')
            console.log('poop')
        })
        .then(() => {
            dispatch({
                type: DB_SET_SUCCESS,
                photoURL: photoURL,
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

export const writeUserDataLocal = ({ photoURL, uid }) => {
    return {
        type: DB_SET_SUCCESS,
        photoURL: photoURL,
        uid: uid
    }
}

export const addRound = () => dispatch => {
    dispatch({
        type: DB_SET_REQUEST
    })

    let newRoundRef = firebase
        .database()
        .ref('users/'
            + store.getState().authentication.user._user.uid
            + '/rounds/')
        .push()

    let newRound = {
        id: newRoundRef.key,
        name: 'New round',
        number: '0'
    }

    newRoundRef.set({
            name: newRound.name,
            number: newRound.number
        })
        .then(() => {
            dispatch({
                type: DB_SET_SUCCESS,
                rounds: newRound
            })
        })
        .catch(error => {
            dispatch({
                type: DB_SET_FAILURE,
                error: error
            })
        })
}

export const removeRound = (roundID: number) => dispatch => {
    dispatch({
        type: DB_REMOVE_REQUEST
    })

    firebase.database()
        .ref('users/'
            + store.getState().authentication.user._user.uid
            + '/rounds/'
            + roundID)
        .remove(roundID)
        .then(() => {
            dispatch({
                type: DB_REMOVE_SUCCESS,
                round: roundID
            })
        })
        .catch(error => {
            dispatch({
                type: DB_REMOVE_FAILURE,
                error: error
            })
        })
}

export const setStatus = (status: string) => dispatch => {
    dispatch({
        type: DB_SET_REQUEST
    })

    const statusRef = firebase.database()
        .ref('users/' + store.getState().authentication.user._user.uid + '/status/')

    statusRef.set(status)
        .then(() => {
            statusRef
                .onDisconnect()
                .set('offline')
            // console.log('status listener set')
        })
        .then(() => {
            dispatch({
                type: DB_SET_SUCCESS,
                status: status
            })
        })
        .catch(error => {
            dispatch({
                type: DB_SET_FAILURE,
                error: error
            })
        })
}

// // since I can connect from multiple devices or browser tabs, we store each connection instance separately
// // any time that connectionsRef's value is null (i.e. has no children) I am offline
// const myConnectionsRef = firebase.database().ref('users/' + uid + '/connections')
// // stores the timestamp of my last disconnect (the last time I was seen online)
// const lastOnlineRef = firebase.database().ref('users/' + uid + '/lastOnline')
// const connectedRef = firebase.database().ref('.info/connected')
// connectedRef.on('value', snap => {
//     if (snap.val() === true) {
//         // We're connected (or reconnected)! Do anything here that should happen only if online (or on reconnect)
//         let con = myConnectionsRef.push()

//         // When I disconnect, remove this device
//         con.onDisconnect().remove()

//         // Add this device to my connections list
//         // this value could contain info about the device or a timestamp too
//         con.set(true)

//         // When I disconnect, update the last time I was seen online
//         lastOnlineRef.onDisconnect().set(firebase.database.ServerValue.TIMESTAMP)
//     }
// })

// @flow