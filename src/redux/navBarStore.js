import { combineReducers, createStore } from "redux";
import searchReducer from "./searchReducer";
import userMenuReducer from "./userMenuReducer";

const navBarReducer = combineReducers({ searchReducer: searchReducer, userMenuReducer: userMenuReducer })
const navBarStore = createStore(navBarReducer);

export default navBarStore;