import {
    CHANGE_SLIDE_INDEX,
    SLIDE_INDEX_CHANGED,
    DOCK_HIDE,
    DOCK_SHOW
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

export const hideDock = () => {
    return {
        type: DOCK_HIDE
    }
}

export const showDock = () => {
    return {
        type: DOCK_SHOW
    }
}

// @flow
