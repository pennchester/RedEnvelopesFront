/**
 * power by pennchester@qq.com
 */
var Url = "http://localhost"
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
    const msg = web3.utils.keccak256(web3.eth.abi.encodeParameter('bytes32',account.address));
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


var ContractAddr="0x34eE23bE2Ca1E90A2fcD98D3274c193A7A6cC0c6"

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
	}
]

var CurrentContract = new web3.eth.Contract(ContractABI,ContractAddr)