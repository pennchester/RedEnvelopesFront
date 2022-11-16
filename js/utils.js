/**
 * power by pennchester@qq.com
 */
var Url = "http://"+window.location.host
var Msg = {
    metaMaskAlert:"未找到钱包，请尝试安装或重试！",
    metaMaskError:"链接钱包异常，请尝试刷新或重试！",
}
async function createRE(total,num,reType){
    const account = web3.eth.accounts.create();
    const url = new URL(Url);
    url.searchParams.set('t', 'claim');
    url.searchParams.set('p', account.privateKey);
	const v = total*BASE
	await CurrentContract.methods._avgSend(v.toString(),num,account.address).send({
		from:currentUser,
		value:v,
	});
    return{url,addr:account.address}
}
async function claimRE(p){
	const account = web3.eth.accounts.privateKeyToAccount(p)
    const msg = web3.utils.keccak256(web3.eth.abi.encodeParameter('bytes32',account.address+Date.now().toString()));
    const signedData = account.sign(msg);
	console.log(msg)
	console.log(signedData)
	await CurrentContract.methods._avgClaim(account.address,signedData.messageHash,signedData.r,signedData.s,signedData.v).send({
		from:currentUser
	})

}
function getUrlParam(param){
	let url = window.location.href
	let p=url.split('?')[1]
	let params=new URLSearchParams(p)
	return params.get(param)
  }


var ContractAddr="0x5d547a69b7c3c0bE1407213ADDCE0409d371B24f"

var ContractABI=[
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "addr",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "enum REType",
				"name": "t",
				"type": "uint8"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "value",
				"type": "uint256"
			}
		],
		"name": "RedEnvelopeClaim",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "enum REType",
				"name": "t",
				"type": "uint8"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "total",
				"type": "uint256"
			}
		],
		"name": "RedEnvelopeSend",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "pwd_",
				"type": "address"
			},
			{
				"internalType": "bytes32",
				"name": "msg_",
				"type": "bytes32"
			},
			{
				"internalType": "bytes32",
				"name": "r_",
				"type": "bytes32"
			},
			{
				"internalType": "bytes32",
				"name": "s_",
				"type": "bytes32"
			},
			{
				"internalType": "uint8",
				"name": "v_",
				"type": "uint8"
			}
		],
		"name": "_avgClaim",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "total_",
				"type": "uint256"
			},
			{
				"internalType": "uint8",
				"name": "num_",
				"type": "uint8"
			},
			{
				"internalType": "address",
				"name": "pwd_",
				"type": "address"
			}
		],
		"name": "_avgSend",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "withdraw",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"inputs": [],
		"name": "getOwner",
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
		"inputs": [
			{
				"internalType": "address",
				"name": "addr",
				"type": "address"
			}
		],
		"name": "getREInfo",
		"outputs": [
			{
				"components": [
					{
						"internalType": "uint256",
						"name": "Total",
						"type": "uint256"
					},
					{
						"internalType": "uint8",
						"name": "Num",
						"type": "uint8"
					},
					{
						"internalType": "uint256",
						"name": "Single",
						"type": "uint256"
					},
					{
						"internalType": "enum REType",
						"name": "Type",
						"type": "uint8"
					},
					{
						"internalType": "bool",
						"name": "Init",
						"type": "bool"
					}
				],
				"internalType": "struct RedEnvelopeModel",
				"name": "",
				"type": "tuple"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]

var CurrentContract = new web3.eth.Contract(ContractABI,ContractAddr)
