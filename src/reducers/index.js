import { combineReducers } from 'redux';
import routes from './routeReducer';
import authentication from './loginReducer';

const rootReducer = combineReducers({
    routes,
    authentication
});

export default rootReducer;
