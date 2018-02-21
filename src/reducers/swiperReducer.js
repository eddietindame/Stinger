import { SLIDE_INDEX_CHANGED } from '../modules/constants'

const initialState = { index: 0 }

export default (state = initialState, { type, index }) => {
    switch (type) {
        case SLIDE_INDEX_CHANGED:
            return { index: index }
        default:
            return state
    }
}
