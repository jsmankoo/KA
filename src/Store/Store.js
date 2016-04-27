import {combineReducers, createStore} from 'redux';

import Communities from './Pages/Communities';

const reducer = combineReducers({
  Communities: Communities
});

const Store = createStore(reducer);

export default Store;
