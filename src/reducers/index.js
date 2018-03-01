import { combineReducers } from 'redux'
import routeReducer from './routeReducer'
import authReducer from './authReducer'
import dbReducer from './dbReducer'
import swiperReducer from './swiperReducer'

export default combineReducers({
    authentication: authReducer,
    db: dbReducer,
    route: routeReducer,
    slide: swiperReducer
})
