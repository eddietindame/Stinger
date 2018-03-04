import { combineReducers } from 'redux'
import routeReducer from './routeReducer'
import authReducer from './authReducer'
import dbReducer from './dbReducer'
import swiperReducer from './swiperReducer'
import { LOGOUT_SUCCESS } from '../modules/constants'

const rootReducer = combineReducers({
    authentication: authReducer,
    db: dbReducer,
    route: routeReducer,
    slide: swiperReducer
})

// If logout action is dispatched, clear store
export default (state, action) => {
    if (action.type === LOGOUT_SUCCESS) {
      state = undefined
    }

    return rootReducer(state, action)
}
