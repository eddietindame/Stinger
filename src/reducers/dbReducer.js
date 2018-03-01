import {
    DB_SET_REQUEST,
    DB_SET_SUCCESS,
    DB_SET_FAILURE,
    DB_REMOVE_REQUEST,
    // DB_REMOVE_SUCCESS,
    DB_REMOVE_FAILURE,
    // CHECK_REQUEST,
    // CHECK_SUCCESS,
    // CHECK_FAILURE,
} from '../modules/constants'

const initialState = {
    isQuerying: false,
    uid: null,
    rounds: {},
    error: null
}

export default (state = initialState, action) => {
    switch(action.type) {
        case DB_SET_REQUEST:
        case DB_REMOVE_REQUEST:
        // case CHECK_REQUEST:
            return {
                ...state,
                isQuerying: true,
                error: null
            }
        case DB_SET_SUCCESS:
        // case CHECK_SUCCESS:
            return {
                ...state,
                isQuerying: false,
                uid: action.uid || state.uid,
                rounds: action.rounds || state.rounds,
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
        // case CHECK_FAILURE:
            return {
                ...state,
                isQuerying: false,
                error: action.error
            }
        default:
            return state
    }
}
