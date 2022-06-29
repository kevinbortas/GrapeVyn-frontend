const prod = {
    API_URL: "https://www.grapevyn.co",
    CONTRACT_ADDRESS: "0x291466351320E6E3Bd1eEC492C36735baFaF468F",
    COLLECTION_URL: "https://api.x.immutable.com/v1/assets/",
    OWNED_COLLECTION_URL: "https://api.x.immutable.com/v1/assets?order_by=updated_at&collection=",
    TOKEN_URL: "https://api.x.immutable.com/v1/mintable-token/",
    TOKEN_DATA_URL: "https://api.x.immutable.com/v1/assets/",
    LINK_ADDRESS: "https://link.x.immutable.com",
    MINT_TOKEN_API: "https://29o8eqgw21.execute-api.eu-west-1.amazonaws.com/mintToken",
    GET_CURRENT_ID_API: "https://29o8eqgw21.execute-api.eu-west-1.amazonaws.com/getCurrentId",
};

const dev = {
    API_URL: "http://localhost:3000",
    CONTRACT_ADDRESS: "0xF8ef56d0497a6ab70D72C1F2De554d9C26Cf4e69",
    COLLECTION_URL: "https://api.ropsten.x.immutable.com/v1/assets/",
    OWNED_COLLECTION_URL: "https://api.ropsten.x.immutable.com/v1/assets?order_by=updated_at&collection=",
    TOKEN_URL: "https://api.ropsten.x.immutable.com/v1/mintable-token/",
    TOKEN_DATA_URL: "https://api.ropsten.x.immutable.com/v1/assets/",
    LINK_ADDRESS: "https://link.ropsten.x.immutable.com",
    MINT_TOKEN_API: "http://localhost:3002/mintToken",
    GET_CURRENT_ID_API: "http://localhost:3002/getCurrentId",
};

export const config = process.env.NODE_ENV === 'development' ? dev : prod;