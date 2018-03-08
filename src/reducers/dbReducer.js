import {
    DB_SET_REQUEST,
    DB_SET_SUCCESS,
    DB_SET_FAILURE,
    DB_REMOVE_REQUEST,
    // DB_REMOVE_SUCCESS,
    DB_REMOVE_FAILURE,
    // AUTH_CHECK_REQUEST,
    // AUTH_CHECK_SUCCESS,
    // AUTH_CHECK_FAILURE,
} from '../modules/constants'

const initialState = {
    isQuerying: false,
    uid: null,
    fbid: null,
    friendsList: [],
    photoURL: null,
    rounds: {},
    status: 'offline',
    error: null
}

export default (state = initialState, action) => {
    switch(action.type) {
        case DB_SET_REQUEST:
        case DB_REMOVE_REQUEST:
        // case AUTH_CHECK_REQUEST:
            return {
                ...state,
                isQuerying: true,
                error: null
            }
        case DB_SET_SUCCESS:
        // case AUTH_CHECK_SUCCESS:
            return {
                ...state,
                isQuerying: false,
                uid: action.uid || state.uid,
                fbid: action.fbid || state.fbid,
                friendsList: action.friendsList || state.friendsList,
                photoURL: action.photoURL || state.photoURL,
                rounds: action.rounds || state.rounds,
                status: action.status || state.status,
                error: null
            }
        // case DB_REMOVE_SUCCESS:
        //     return {
        //         ...state,
        //         isQuerying: false,
        //         uid: null,
        //         error: null
        //     }
        case DB_SET_FAILURE:
        case DB_REMOVE_FAILURE:
        // case AUTH_CHECK_FAILURE:
            return {
                ...state,
                isQuerying: false,
                error: action.error
            }
        default:
            return state
    }
}
