import { combineReducers } from 'redux';
import routeReducer from './routeReducer';
import loginReducer from './loginReducer';

export default combineReducers({
    route: routeReducer,
    authentication: loginReducer
});
