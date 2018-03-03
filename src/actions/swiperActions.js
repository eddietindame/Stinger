import {
    CHANGE_SLIDE_INDEX,
    SLIDE_INDEX_CHANGED
} from '../modules/constants'

export const changeSlideIndex = (index: number) => {
    return {
        type: CHANGE_SLIDE_INDEX,
        index: index
    }
}

export const slideIndexChanged = (index: number) => {
    return {
        type: SLIDE_INDEX_CHANGED,
        index: index
    }
}

// @flow
