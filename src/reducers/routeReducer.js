import { ActionConst } from 'react-native-router-flux'

const initialState = { scene: {} }

export default (state = initialState, { type, routeName }) => {
    switch (type) {
        // focus action is dispatched when a new screen comes into focus
        case ActionConst.FOCUS:
            return { scene: routeName }
        default:
            return state
    }
}
