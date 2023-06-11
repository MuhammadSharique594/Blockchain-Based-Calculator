// connection to web3

var Web3 = require('web3');
const providers = new Web3.providers.HttpProvider('http://127.0.0.1:8545/')
var web3 = new Web3(providers);
const Calculator = require('../build/contracts/Calculator.json');

async function connection(){
    accounts = await web3.eth.getAccounts();
    console.log("accounts:", accounts);
}

//connection();

async function createContractInstance()
{
    var accounts = await web3.eth.getAccounts();
    const network_id = await web3.eth.net.getId();
    const {address} = Calculator.networks[network_id];

    var instance = await new web3.eth.Contract(
        Calculator.abi,
        address
    )
    console.log("Address: ", address);

    return {accounts, instance}
}

//createContractInstance();

module.exports = {createContractInstance}