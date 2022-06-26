import { Link } from '@imtbl/imx-sdk';
import { config } from 'Constants/constants.js'

const linkAddress = config.LINK_ADDRESS;

// Link SDK
const link = new Link(linkAddress);

export const setUpAccount = async () => {
    const { address, starkPublicKey } = await link.setup({ providerPreference: "none" });

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