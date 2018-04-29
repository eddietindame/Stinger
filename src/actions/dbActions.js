import firebase from 'react-native-firebase'
import {
    DB_SET_REQUEST,
    DB_SET_SUCCESS,
    DB_SET_FAILURE,
    DB_REMOVE_REQUEST,
    DB_REMOVE_SUCCESS,
    DB_REMOVE_FAILURE,
    DB_WIPE_SUCCESS
} from '../modules/constants'

export const writeUserData = ({ displayName, email, photoURL, uid }, fbid) => async dispatch => {
    dispatch({
        type: DB_SET_REQUEST,
        method: writeUserData
    })

    return await firebase
        .database().ref('users/' + uid).set({
            username: displayName,
            fbid: fbid,
            friendsList: [],
            email: email,
            photoURL: photoURL
        })
        .then(() => {
            firebase
                .database().ref('users/' + uid + '/status/')
                .onDisconnect()
                .set('offline')
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

export const writeUserDataLocal = ({ photoURL, uid }, fbid) => {
    return {
        type: DB_SET_SUCCESS,
        photoURL: photoURL,
        fbid: fbid,
        uid: uid
    }
}

export const deleteUser = () => (dispatch, getState) => {
    const uid = getState().authentication.user._user.uid

    dispatch({
        type: DB_REMOVE_REQUEST,
        method: removeRound
    })

    const globalRef = firebase.database()
        .ref('/users/' + uid)

    globalRef.remove()
        .then(() => {
            dispatch({
                type: DB_WIPE_SUCCESS,
                user: uid
            })
        })
        .catch(error => {
            dispatch({
                type: DB_REMOVE_FAILURE,
                error: error
            })
        })
}

export const addRound = () => (dispatch, getState) => {
    dispatch({
        type: DB_SET_REQUEST,
        method: addRound
    })

    const newRoundGlobalRef = firebase.database()
        .ref('rounds')
        .push()

    const newRoundUserRef = firebase.database()
        .ref('users/'
            + getState().authentication.user._user.uid
            + '/rounds/')
        .push()

    const newRound = {
        id: newRoundGlobalRef.key,
        name: 'New round',
        members: [{
            fbid: getState().db.fbid,
            name: getState().authentication.user._user.displayName,
            photoUrl: getState().db.photoURL,
            admin: true
        }]
    }

    firebase.database()
        .ref('users/'
            + getState().authentication.user._user.uid
            + '/rounds/'
            + newRoundGlobalRef.key)
        .set(true)

    newRoundGlobalRef.set({
        name: newRound.name,
        members: []
    })
        .then(() => {
            // const newRoundMembersRef = firebase.database()
            //     .ref('users/'
            //         + getState().authentication.user._user.uid
            //         + '/rounds/'
            //         + newRoundGlobalRef.key
            //         + '/members/')
            //     .push()
            const newRoundMembersRef = firebase.database()
                .ref('rounds/'
                    + newRoundGlobalRef.key
                    + '/members/'
                    + getState().authentication.user._user.uid)

            newRoundMembersRef.set(newRound.members[0])
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
        })
}

export const removeRound = (roundID: number) => (dispatch, getState) => {
    dispatch({
        type: DB_REMOVE_REQUEST,
        method: removeRound
    })

    const globalRef = firebase.database()
        .ref('/rounds/'
            + roundID)

    const localRef = firebase.database()
        .ref('users/'
            + getState().authentication.user._user.uid
            + '/rounds/'
            + roundID)

    globalRef.remove()
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

export const addMember = (roundId, fbid, name, photoUrl) => (dispatch, getState) => {
    dispatch({
        type: DB_SET_REQUEST,
        method: 'addMember'
    })

    let newMemberRef = firebase
        .database()
        .ref('/rounds/'
            + roundId
            + '/members')
        .push()

    let newMember = {
        fbid: fbid,
        name: name,
        photoUrl: photoUrl
    }

    newMemberRef.set(newMember)
        .then(() => {
            dispatch({
                type: DB_SET_SUCCESS,
                member: newMember
            })
        })
        .catch(error => {
            dispatch({
                type: DB_SET_FAILURE,
                error: error
            })
        })
}

export const setStatus = (status: string) => (dispatch, getState) => {
    dispatch({
        type: DB_SET_REQUEST,
        method: 'setStatus'
    })

    const statusRef = firebase.database()
        .ref('users/' + getState().authentication.user._user.uid + '/status/')

    statusRef.set(status)
        .then(() => {
            statusRef
                .onDisconnect()
                .set('offline')
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

export const setFriendsList = list => (dispatch, getState) => {
    dispatch({
        type: DB_SET_REQUEST,
        method: 'setFriendsList'
    })

    const friendsRef = firebase.database()
        .ref('users/' + getState().authentication.user._user.uid + '/friends/')

    friendsRef.set(list)
        .then(() => {
            dispatch({
                type: DB_SET_SUCCESS,
                friendsList: list
            })
        })
        .catch(error => {
            dispatch({
                type: DB_SET_FAILURE,
                error: error
            })
        })
}

export const setProfile = profile => dispatch => {
    dispatch({
        type: DB_SET_REQUEST,
        method: 'setProfile'
    })

    

    dispatch({
        type: DB_SET_SUCCESS,
        profile: profile
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
