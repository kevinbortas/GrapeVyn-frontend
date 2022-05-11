import * as actions from "./actionTypes";

const initialState = {
    address: null,
    isConnected: false,
}

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case actions.CONNECT:
            return {
                address: action.payload.address,
                isConnected: action.payload.isConnected,
            }
        default:
            return state;
    }
}