import { combineReducers } from 'redux';
import routeReducer from './routeReducer';
import loginReducer from './loginReducer';
import swiperReducer from './swiperReducer';

export default combineReducers({
    route: routeReducer,
    authentication: loginReducer,
    slide: swiperReducer
});
