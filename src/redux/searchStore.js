import { createStore } from 'redux';
import searchReducer from './searchReducer';

const searchStore = createStore(searchReducer);

export default searchStore;