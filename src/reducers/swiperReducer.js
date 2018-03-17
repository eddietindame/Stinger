import {
    CHANGE_SLIDE_INDEX,
    SLIDE_INDEX_CHANGED,
    DOCK_HIDE,
    DOCK_SHOW
} from '../modules/constants'

const initialState = {
    changed: false,
    index: 2,
    newIndex: 2,
    dockHidden: false
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
        case DOCK_HIDE:
            return {
                ...state,
                dockHidden: true
            }
        case DOCK_SHOW:
            return {
                ...state,
                dockHidden: false
            }
        default:
            return state
    }
}
