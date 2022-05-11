import { createStore } from 'redux';
import userMenuReducer from './userMenuReducer';

const userMenuStore = createStore(userMenuReducer);

export default userMenuStore;