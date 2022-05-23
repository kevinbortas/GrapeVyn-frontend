import ENS, { getEnsAddress } from '@ensdomains/ensjs';
import Web3 from 'web3';

export const checkIfAddressValid = async (address) => {
    return Web3.utils.isAddress(address)
}

export const getAddressFromEns = async (name) => {
    const provider = window.web3.currentProvider;
    const ens = new ENS({ provider, ensAddress: getEnsAddress('1') })

    try {
        const resultName = await ens.name(name).getAddress();
        return (resultName)
    } catch (e) {
        return null
    }
}

export const reverseLookUp = async (address) => {
    const provider = window.web3.currentProvider;
    const ens = new ENS({ provider, ensAddress: getEnsAddress('1') })

    // const tempAddress = "0xd1220a0cf47c7b9be7a2e6ba89f429762e7b9adb";
    // const name = "alex.vandesande.eth";

    try {
        const resultName = await ens.getName(address);
        return (resultName.name);
    } catch (e) {
        return null;
    }
}