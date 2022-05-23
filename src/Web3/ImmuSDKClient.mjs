import { Link } from '@imtbl/imx-sdk';

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