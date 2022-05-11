import * as actions from './actionTypes'

export function storeAddress(address, isConnected) {
    return {
    type: actions.CONNECT,
    payload: {
        address: address,
        isConnected: isConnected,
        }
    }
}

export function searchAction(searchInput) {
    return {
    type: actions.SEARCH,
    payload: {
        searchInput: searchInput,
        }
    }
}

export function menuSelected(className, index, page) {
    return {
    type: actions.SELECT,
    payload: {
        className: className,
        indexSelected: index,
        page: page,
        }
    }
}