import { Link, ERC721TokenType } from '@imtbl/imx-sdk';

// Mainnet
// const linkAddress = 'https://link.x.immutable.com';

// Ropsten Testnet
const linkAddress = 'https://link.ropsten.x.immutable.com';

// Link SDK
const link = new Link(linkAddress);

export const setUpAccount = async () => {
    const { address, starkPublicKey } = await link.setup({});

    localStorage.setItem('WALLET_ADDRESS', address);
    localStorage.setItem('STARK_PUBLIC_KEY', starkPublicKey);

    return address;
}

export const sign = async (message) => {
    if (link) {
        const signer = await link.sign({
            message: message,
            description: 'To post, a signature request will be sent to your wallet.',
        });

        return signer.result;
    }
}

export const prepareWithdraw = async (signature) => {
    const response = await link.prepareWithdrawal({
        type: ERC721TokenType.ERC721,
        tokenId: "170",
        tokenAddress: "0xa503e5325c59147b42dc4bc71cd5692402a67fd2",
    })
    
     console.log(response)

     // WithdrawalId = 4564362
}

export const completeWithdrawal = async () => {
    const response = await link.completeWithdrawal({
        type: ERC721TokenType.ERC721,
        tokenId: "170",
        tokenAddress: "0xa503e5325c59147b42dc4bc71cd5692402a67fd2",
    })
    
     console.log(response)
     // returns { transactionId: '0x...' }
}

export const getHistory = async () => {
    const response = await link.history();
    console.log(response);
}