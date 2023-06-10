import { ethers, Wallet, utils } from "ethers";
import { SimpleAccountAPI } from '@account-abstraction/sdk'
import entryPoint from './entrypointAbi.json'   assert { type: 'json' };


const json = entryPoint;


const url = process.env.MUMBAI_RCP;

//const provider =  ethers.getDefaultProvider(url);




const contractAbi = [
	{
		"inputs": [],
		"name": "acceptOwnership",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "bytes32",
				"name": "id",
				"type": "bytes32"
			}
		],
		"name": "ChainlinkCancelled",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "bytes32",
				"name": "id",
				"type": "bytes32"
			}
		],
		"name": "ChainlinkFulfilled",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "bytes32",
				"name": "id",
				"type": "bytes32"
			}
		],
		"name": "ChainlinkRequested",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "bytes32",
				"name": "_requestId",
				"type": "bytes32"
			},
			{
				"internalType": "string",
				"name": "urlRequest",
				"type": "string"
			}
		],
		"name": "fulfill",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "to",
				"type": "address"
			}
		],
		"name": "OwnershipTransferRequested",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "to",
				"type": "address"
			}
		],
		"name": "OwnershipTransferred",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "url_with_prompt",
				"type": "string"
			},
			{
				"internalType": "address",
				"name": "to",
				"type": "address"
			}
		],
		"name": "requestImage",
		"outputs": [
			{
				"internalType": "bytes32",
				"name": "requestId",
				"type": "bytes32"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "bytes32",
				"name": "requestId",
				"type": "bytes32"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "url",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "address",
				"name": "to",
				"type": "address"
			}
		],
		"name": "RequestImage",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "to",
				"type": "address"
			}
		],
		"name": "transferOwnership",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "withdrawLink",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "owner",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "volume",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
];

export const sendMessageNFT = async (phone_number, urlNFT) => {

    const provider = new  ethers.providers.JsonRpcProvider(url);

    const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider)
    const beneficiary = await wallet.getAddress()

    const contractAddress = '0xE73d02936c04811f918756fd749975bd9d51929A';
    const entryPointAddress = json.address;//munbai entry point
    const index = phone_number //phone number;

    const contract = new ethers.Contract(contractAddress, contractAbi, wallet);
    const entryPoint = new ethers.Contract(entryPointAddress, json.abi, wallet);
    const factoryAddress = '0x58ed6520958feb1be53c1C30f87C8e659d76ec2f';

    const walletAPI = new SimpleAccountAPI({
        provider,
        entryPointAddress: entryPointAddress,
        owner: wallet,
        factoryAddress, 
        index: ethers.BigNumber.from(index)
    });

    const accountAddress = await walletAPI.getAccountAddress();

    await wallet.sendTransaction({
        to: accountAddress,
        value: utils.parseUnits('0.01', 'ether')
    });

    const op = await walletAPI.createSignedUserOp({
        target: contract.address,
        data: contract.interface.encodeFunctionData('requestImage', [urlNFT, accountAddress])
    });


    let respo = await entryPoint.handleOps([op], beneficiary, {
        gasLimit: 5000000})

    console.log(respo)

}
// example endpoint use. Real interaction is with whatsapp.
export const postTestAccount = async (req, res) => {
    await sendMessageNFT('573058149030', 'https://554f-204-199-66-50.ngrok.io/api/image?prompt=eeie');

    return res.status(200);
}
