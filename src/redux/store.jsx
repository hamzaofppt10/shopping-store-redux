import { combineReducers, createStore } from 'redux';
import rootReducer from './reducers';
import { productReducer } from './productReducer';

const root = combineReducers({
    products : productReducer,
    cart : rootReducer

})
const store = createStore(root);

export default store;
