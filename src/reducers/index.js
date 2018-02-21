import { combineReducers } from 'redux'
import routeReducer from './routeReducer'
import authReducer from './authReducer'
import swiperReducer from './swiperReducer'

export default combineReducers({
    route: routeReducer,
    authentication: authReducer,
    slide: swiperReducer
})
