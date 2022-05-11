// default libraries that make all of this possible
import { ImmutableXClient, Link } from '@imtbl/imx-sdk';
// import { ethers } from 'ethers';
import { AlchemyProvider } from '@ethersproject/providers';
import { Wallet } from '@ethersproject/wallet';
import store from './redux/store';
// import { ethers } from 'ethers';

// parsing .env
// import dotenv from 'dotenv';
// dotenv.config()

// const ENV_CHECK = [
//     'MINTER_PRIVATE_KEY',
//     'ALCHEMY_API_KEY',
//     'TOKEN_CONTRACT_ADDRESS',
//     // 'TOKEN_RECEIVER_ADDRESS',
//     'ROYALTY_RECEIVER_ADDRESS'
// ]

// API link
// https://api.ropsten.x.immutable.com/v1/assets?order_by=updated_at&collection=0x7556EE38C43f319E935E663170137f4849c6AA60

// Mainnet
// const linkAddress = 'https://link.x.immutable.com';
// const apiAddress = 'https://api.x.immutable.com/v1';

// Ropsten Testnet
const linkAddress = 'https://link.ropsten.x.immutable.com';
const apiAddress = 'https://api.ropsten.x.immutable.com/v1';

// Link SDK
const link = new Link(linkAddress);

// // IMX Client
// const client = await ImmutableXClient.build({ publicApiUrl: apiAddress });

let CURRENT_TOKEN_ID = "23";
let MINTER_PRIVATE_KEY = "927321a1dc77b4c6af188e9113d36783c151535d60855acdf293b97f81147e6c"
let ALCHEMY_API_KEY = "DvukuyBzEK-JyP6zp1NVeNVYLJCrzjp_"
let TOKEN_CONTRACT_ADDRESS = "0x7556EE38C43f319E935E663170137f4849c6AA60"
let ROYALTY_RECEIVER_ADDRESS = "0x13C0c2db919768Fe4AbAac6EdaBB8B7AD2886A05"

// // for(let [k, v] of Object.entries(process.env)){
// //     if(!ENV_CHECK.includes(k)) continue
// //     if(v.startsWith('<') && v.endsWith('>')){
// //         console.error(`[ERROR] Replace ${k} value in .env with a valid one!`)
// //         process.exit(0)
// //     }
// // }

// // setting up the provider
// const network = "ropsten";
// const provider = ethers.getDefaultProvider(network, {
//     alchemy: ALCHEMY_API_KEY,
// });
const provider = new AlchemyProvider('ropsten', ALCHEMY_API_KEY);

export const setUpAccount = async () => {
    const { address, starkPublicKey } = await link.setup({});

    localStorage.setItem('WALLET_ADDRESS', address);
    localStorage.setItem('STARK_PUBLIC_KEY', starkPublicKey);

    return address;
}

const getAssociatedTokenId = async (address) => {
    let response = await ( await fetch('http://localhost:3001/minter', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ address }),
    })).json()

    return response["rows"][0]["TokenId"];
  }

// this function blocks until the transaction is either mined or rejected
const waitForTransaction = async (promise) => {
    const txId = await promise;
    console.info('Waiting for transaction', 'TX id', txId);
    const receipt = await provider.waitForTransaction(txId);
    if (receipt.status === 0) {
      throw new Error('Transaction containing user registration rejected');
    }
    console.info('Transaction containing user registration TX mined: ' + receipt.blockNumber);
    return receipt;
};

const mintNFT = async (message) => {
    // creating a signer from the provided private key
    const signer = new Wallet(MINTER_PRIVATE_KEY).connect(provider);

    // console.log(await link.sign({
    //     message: 'Mint post',
    //     description: 'Do you wish to mint this post to the GrapeVyn?',
    // }));

    // console.log("signer", signer);

    // initializing IMX-SDK client
    const client = await ImmutableXClient.build({ 
        // IMX's API URL
        publicApiUrl: 'https://api.ropsten.x.immutable.com/v1',
        // signer (in this case, whoever owns the contract)
        signer,
        // IMX's Ropsten STARK contract address
        starkContractAddress: '0x4527BE8f31E2ebFbEF4fCADDb5a17447B27d2aef',
        // IMX's Ropsten Registration contract address
        registrationContractAddress: '0x6C21EC8DE44AE44D0992ec3e2d9f1aBb6207D864'
    });

    // Registering the user (owner of the contract) with IMX
    const registerImxResult = await client.registerImx({
        // address derived from PK
        etherKey: client.address.toLowerCase(),
        starkPublicKey: client.starkPublicKey,
    });

    // If the user is already registered, there's is no transaction to await, hence no tx_hash
    if (registerImxResult.tx_hash === '') {
        console.info('Minter registered, continuing...');
    } else {
        // If the user isn't registered, we have to wait for the block containing the registration TX to be mined
        // This is a one-time process (per address)
        console.info('Waiting for minter registration...');
        await waitForTransaction(Promise.resolve(registerImxResult.tx_hash));
    }

    let tokenId = await getAssociatedTokenId(store.getState().address.toLowerCase());

    // this is the mintv2 (which will replace the client.mint in the near future!)
    // it allows you to add protocol-level royalties to the token
    // also, compared to mint(v1) where you batch minted tokens of different types to the same user
    // mintv2 batch mints token of the same type to multiple users (which makes sense, 
    // considering you have to sign/be the owner of the token)
    const result = await client.mintV2([
        {
            "contractAddress": TOKEN_CONTRACT_ADDRESS.toLowerCase(),
            // top-level "global" royalties that apply to this entire call
            // unless overriden on a token-by-token basis in the below array
            "royalties": [
                // you can have multiple recipients!
                {
                    // address of the recepient of royalties
                    "recipient": ROYALTY_RECEIVER_ADDRESS.toLowerCase(),
                    "percentage": 2.5
                }
            ],
            // list of users that will receive token defined by the contract at the given address
            "users": [
                {
                    // address of the (IMX registered!) user we want to mint this token to
                    // received as the first argument in mintFor() inside your L1 contract
                    "etherKey": store.getState().address.toLowerCase(),
                    // list of tokens to be minted to the above address
                    "tokens": [
                        // you can add multiple tokens (of the same type and from the same contract!)
                        {
                            // ID of the token (received as a part of the 3rd argument {tokenId}:{blueprint} in mintFor), positive integer string
                            "id": tokenId,
                            // blueprint - can't be left empty, but if you're not going to take advantage
                            // of on-chain metadata, just keep it to a minimum - in this case a single character
                            // gets passed as the 3rd argument formed as {tokenId}:{blueprint (whatever you decide to put in it when calling this function)}
                            "blueprint": message,
                            // overriding "global" royalties we have added at the top level on a token basis
                            // this is completely! optional!
                            "royalties": [
                                {
                                    // user doesn't have to be the same, done for simplicity reasons
                                    "recipient": ROYALTY_RECEIVER_ADDRESS.toLowerCase(),
                                    "percentage": 5.5
                                }
                            ],
                        }
                    ]
                }
            ]
        }
    ])

    /*
        Minting results formatted like

        {
            "first_tx_id": string,
            "mint_count": int
        }
    */
    
    console.log('Minting success!', result);

    // operation can fail if the request is malformed or the tokenId provided already exists
}

// function mintNFT() {
//     main()
// }

export default mintNFT;

// main()