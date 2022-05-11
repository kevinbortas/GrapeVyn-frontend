import * as actions from "./actionTypes";

const initialState = {
    searchInput: "",
}

export default function searchReducer(state = initialState, action) {
    switch (action.type) {
        case actions.SEARCH:
            return {
                searchInput: action.payload.searchInput,
            }
        default:
            return state;
    }
}