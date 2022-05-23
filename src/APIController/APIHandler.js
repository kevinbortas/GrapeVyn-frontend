import { sign } from "Web3/ImmuSDKClient.mjs";
import { ethers } from "ethers";

let contractAddress = "0xa503E5325c59147B42DC4bC71Cd5692402a67fD2";

let collectionUrl = `https://api.ropsten.x.immutable.com/v1/assets?order_by=updated_at&collection=${contractAddress}`

let collectionUrlV2 = `https://api.ropsten.x.immutable.com/v1/assets/${contractAddress}/`

// Gets Token Blueprint
let tokenURL = `https://api.ropsten.x.immutable.com/v1/mintable-token/${contractAddress}/`

// Gets Token Data
let tokenIdUrl = `https://api.ropsten.x.immutable.com/v1/assets/${contractAddress}/`

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

export const getCollectionDataV2 = async (page_size, currentTokenId) => {
    let result = []

    for (page_size; page_size > 0; page_size--){
        let url = collectionUrlV2 + currentTokenId;
        let response = await (await fetch(url)).json();
        result.push(response);
        currentTokenId--;
    }

    return { tokenArray: await tokenArrayBuilder({ result }), currentTokenId };
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

export const mintToken = async (address, message) => {
    let signature = await sign(message);

    let signerAddress = ethers.utils.verifyMessage(message, signature);
    if (signerAddress.toLowerCase() !== address) {
        throw 'Address and signature do not match'
    }

    let response = await ( await fetch('https://29o8eqgw21.execute-api.eu-west-1.amazonaws.com/mintToken', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message, address, signature }),
    })).json()

    return response;
}