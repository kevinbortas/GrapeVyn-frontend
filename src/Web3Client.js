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

    const tempAddress = "0xd1220a0cf47c7b9be7a2e6ba89f429762e7b9adb";
    const name = "alex.vandesande.eth";

    try {
        const resultName = await ens.getName(address);
        return (resultName.name);
    } catch (e) {
        return null;
    }
}

// import Web3 from 'web3';
// import nftContractBuild from 'contracts/NFT.json';
// import { decode } from './helper.js';
// import { storeAddress, menuSelected } from './redux/actions.js';
// import store from './redux/store';
// import userMenuStore from './redux/userMenuStore';
// import { setUpAccount } from './ImmuSDKClient.mjs';
// // import { ethers } from "ethers";

// let provider;
// let selectedAccount;
// let nftContract;
// let ownedBlocks;
// // let provider;
// let ensProvider;
// let isInitialised = false;
// let isWeb3Initialised = false;

// export const initWeb3 = async () => {
//     provider = window.ethereum;

//     const web3 = new Web3(provider);

//     const networkId = await web3.eth.net.getId();

//     ensProvider = web3.eth.ens;

//     // ens = new ethers.providers.Web3Provider(provider)

//     nftContract = new web3.eth.Contract(
//         nftContractBuild.abi, 
//         nftContractBuild.networks[networkId].address
//     );

//     isWeb3Initialised = true;
// }

// export const init = async () => {
//     if (typeof provider !== 'undefined'){
//       // metamask is installed
//       await provider
//         .request({method: 'eth_requestAccounts'})
//         .then(accounts => {
//             selectedAccount = accounts[0];
//             console.log(`Selected account is ${selectedAccount}`);
//             onWalletChanged(selectedAccount);
//         }).catch(err => {
//             onWalletChanged(null);
//             return;
//         });

//         window.ethereum.on('accountsChanged', function(accounts) {
//             selectedAccount = accounts[0];
//             console.log(`Selected account changed to ${selectedAccount}`);
//             onWalletChanged(selectedAccount);
//             setUpAccount();
//         });
//     }

//     await initWeb3();

//     if (selectedAccount !== null && selectedAccount !== undefined) {
//         isInitialised = true;
//     }

//     return { selectedAccount, isInitialised };

// }

// export const ifWalletConnected = async () => {
//     // Check if browser is running Metamask
//     let web3;
//     if (window.ethereum) {
//         web3 = new Web3(window.ethereum);
//     } else if (window.web3) {
//         web3 = new Web3(window.web3.currentProvider);
//     };

//     // Check if User is already connected by retrieving the accounts
//     web3.eth.getAccounts()
//         .then(async (address) => {
//             if (address[0] !== undefined && address[0] !== null) {
//                 console.log("here");
//                 store.dispatch(storeAddress(address[0], true));
//             }
//         });
// }

// // export const disconnect = async () => {
// //     console.log(provider);
// // }

// export const onWalletChanged = (address) => {
//     let isConnected = true;
//     let newAddress = address;

//     if (address === undefined || address === null) {
//         isConnected = false;
//         newAddress = null;
//         // let className = ["MenuSelector", "NONE", "NONE"]
//         // userMenuStore.dispatch(menuSelected(className, 0, ""));
//     }

//     store.dispatch(storeAddress(newAddress, isConnected));
// }

// export const getIsInitialised = () => {
//     if (isInitialised){
//         return true;
//     }
//     return false;
// }

// export const getSelectedAccount = () => {
//     let tempAccount = selectedAccount
//     return tempAccount;
// }

// export const mintToken = async (data) => {
//     if (!isInitialised){
//         await init();
//     }

//     return nftContract.methods
//         .mint(selectedAccount, data)
//         .send({ from: selectedAccount });
// }

// export const getOwnedTokens = async (currentAccount) => {
//     if (!isInitialised){
//         await init();
//     }

//     const currentBalance = await nftContract.methods.balanceOf(currentAccount).call({ from: currentAccount });

//     const ownedTokensArray = []

//     for (let i = 0; i < currentBalance; i++) {
//         const tokenId = await nftContract.methods.tokenOfOwnerByIndex(currentAccount, i).call();

//         let encodedTokenMetadata = await nftContract.methods.tokenURI(tokenId).call();

//         let decodedTokenMetadata = decode(encodedTokenMetadata.split(",")[1])

//         ownedTokensArray.push({message: decodedTokenMetadata.message, blockId: decodedTokenMetadata.blockId, timestamp: decodedTokenMetadata.timestamp});
//     }

//     return ownedTokensArray
// }

// export const getCurrentBlock = async () => {
//     if (!isWeb3Initialised){
//         await initWeb3();
//     }

//     const currentTokenId = await nftContract.methods.getCurrentTokenId().call();

//     return currentTokenId;
// }

// export const getAllTokensByIndex = async () => {
//     if (!isWeb3Initialised){
//         await initWeb3();
//     }

//     const currentTokenId = await nftContract.methods.getCurrentTokenId().call();

//     const tokensArray = []

//     for (let i = currentTokenId[0]; i > 0; i--) {
//         let encodedTokenMetadata = await nftContract.methods.tokenURI(i).call();

//         let decodedTokenMetadata = decode(encodedTokenMetadata.split(",")[1]);

//         tokensArray.push({message: decodedTokenMetadata.message, blockId: decodedTokenMetadata.blockId, timestamp: decodedTokenMetadata.timestamp});
//     }

//     return tokensArray;

// }

// export const getOwnerByIndex = async (id) => {
//     if (!isWeb3Initialised){
//         await initWeb3();
//     }

//     const owner = await nftContract.methods.ownerOf(id).call();

//     return owner;
// }

// export const getTokenById = async (id) => {
//     if (!isWeb3Initialised){
//         await initWeb3();
//     }

//     let encodedTokenMetadata = await nftContract.methods.tokenURI(id).call();
//     let decoded = decode(encodedTokenMetadata.split(",")[1]);

//     return decoded
// }

// // Throws error when testing on local blockchain
// export const getAddressWithEns = async () => {
//     if (!isWeb3Initialised){
//         await initWeb3();
//     }

//     const web3 = new Web3(window.ethereum);

//     web3.eth.ens.getAddress("ethereum.eth").then(function (address) {
//         console.log(address);
//     });
// }

// // export const getEnsByAddress = async () => {
// //     if (!isInitialised){
// //         await init();
// //     }

// //     let ensName = await ens.lookupAddress("0x5555763613a12D8F3e73be831DFf8598089d3dCa");
// //     console.log(ensName);

// // }