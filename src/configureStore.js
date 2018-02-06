import { createStore, applyMiddleware } from 'redux';
import rootReducer from './reducers';

export default function configureStore() {
    let store = createStore(rootReducer)
}
