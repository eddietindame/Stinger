import { ActionConst } from 'react-native-router-flux'

const initialState = { scene: {} }

export default (state = initialState, { type, scene }) => {
    switch (type) {
        // focus action is dispatched when a new screen comes into focus
        case ActionConst.FOCUS:
            return { scene: scene }
        default:
            return state
    }
}
