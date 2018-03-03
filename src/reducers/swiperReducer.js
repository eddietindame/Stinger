import {
    CHANGE_SLIDE_INDEX,
    SLIDE_INDEX_CHANGED
} from '../modules/constants'

const initialState = {
    changed: false,
    index: 0,
    newIndex: 0
}

export default (state = initialState, { type, index }) => {
    switch (type) {
        case CHANGE_SLIDE_INDEX:
            return {
                ...state,
                changed: false,
                newIndex: index
             }
        case SLIDE_INDEX_CHANGED:
            return {
                ...state,
                changed: true,
                index: index
            }
        default:
            return state
    }
}
