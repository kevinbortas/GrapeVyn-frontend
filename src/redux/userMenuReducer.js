import * as actions from "./actionTypes";

const initialState = {
    className: ["nav-links-clicked", "nav-links", "nav-links"],
    indexSelected: 0,
    page: ""
}

export default function userMenuReducer(state = initialState, action) {
    switch (action.type) {
        case actions.SELECT:
            return {
                className: action.payload.className,
                indexSelected: action.payload.indexSelected,
                page: action.payload.page,
            }
        default:
            return state;
    }
}