import store from './redux/store.js';

let collectionUrl = "https://api.ropsten.x.immutable.com/v1/assets?order_by=updated_at&collection=0x7556EE38C43f319E935E663170137f4849c6AA60"

// Gets Token Blueprint
let tokenURL = "https://api.ropsten.x.immutable.com/v1/mintable-token/0x7556EE38C43f319E935E663170137f4849c6AA60/"

// Gets Token Data
let tokenIdUrl = "https://api.ropsten.x.immutable.com/v1/assets/0x7556EE38C43f319E935E663170137f4849c6AA60/"

const insert = (array, object) => {
    array.push(object);
    let n = array.length;
        for (let i = 1; i < n; i++) {
            let current = array[i];

            let j = i - 1; 
            while ((j > -1) && (parseInt(current.blockId) > parseInt(array[j].blockId))) {
                array[j + 1] = array[j];
                j--;
            }
            array[j + 1] = current;
        }
    return array;
}

const tokenArrayBuilder = async (object) => {
    let tokensArray = []
    for (const element of object["result"]) {
        let blueprint = await getTokenData(element["token_id"]);

        let createdAt = new Date(element["created_at"]);
        let timestamp = createdAt.getTime();

        let object = {message: blueprint, blockId: element["token_id"], timestamp: timestamp, owner: element["user"]};

        tokensArray = insert(tokensArray, object);
    };
    return tokensArray;
}

export const getOwnedTokens = async (address, pageSize, cursor) => {
    let parameterUrl;
    if (cursor) {
        parameterUrl = `&page_size=${pageSize}&cursor=${cursor}`
    }
    else {
        parameterUrl = `&page_size=${pageSize}`;
    }

    let ownedTokensUrl = collectionUrl + `&user=${address}` + parameterUrl
    let response = await (await fetch(ownedTokensUrl)).json();
    let returnedCursor = response.cursor;
    let remaining = response.remaining

    return { tokenArray: await tokenArrayBuilder(response), returnedCursor, remaining };
}

export const getCollectionData = async (pageSize, cursor) => {
    let parameterUrl;
    if (cursor) {
        parameterUrl = `&page_size=${pageSize}&cursor=${cursor}`
    }
    else {
        parameterUrl = `&page_size=${pageSize}`;
    }

    let url = collectionUrl + parameterUrl
    let response = await (await fetch(url)).json();
    let returnedCursor = response.cursor;
    let remaining = response.remaining

    return { tokenArray: await tokenArrayBuilder(response), returnedCursor, remaining };
}

export const getTokenById = async (id) => {
    if (id.substring(0,2) === "0x"){return [];}
    
    let url = tokenIdUrl + id;
    const response = { result: [await (await fetch(url)).json()] };

    if (response.result[0].code === "resource_not_found_code"){return [];}

    return await tokenArrayBuilder(response);
}

export const getTokenData = async (id) => {
    let url = tokenURL + id;
    let response = await (await fetch(url)).json();
    return response["blueprint"]
}