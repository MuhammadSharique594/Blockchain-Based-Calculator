import Web3 from "web3";
import CalculatorContract from './contracts/Calculator.json';
const infuraProjectId = 'ef8fd7b4e20546569537ba60f5ff3614';

async function connectWeb3(){
    const provider = new Web3.providers.HttpProvider('HTTP://127.0.0.1:8545/');
    const web3 = new Web3(provider);
    const accounts = await web3.eth.getAccounts();
    const network_id = await web3.eth.net.getId();
    const deployedNetwork = await CalculatorContract.networks[network_id];
    const instance = new web3.eth.Contract(
        CalculatorContract.abi,
        deployedNetwork.address
    );

    return {instance, accounts}
}

async function connectWeb3Metamask(){
    const provider = window.ethereum;

  if (provider) {
    try {
      await provider.request({ method: 'eth_requestAccounts' });

      const web3 = new Web3(provider);
      const accounts = await web3.eth.getAccounts();
      const networkId = await web3.eth.net.getId();
      console.log('Injected web3 detected.', accounts, networkId);

      const deployedNetwork = await CalculatorContract.networks[networkId];
      const instance = new web3.eth.Contract(
        CalculatorContract.abi,
        deployedNetwork.address
      );

      return { instance, accounts };
    } catch (error) {
      console.error('Error connecting to MetaMask:', error);
      // Handle error condition
    }
  } else {
    console.error('MetaMask extension not detected.');
    // Handle missing MetaMask extension condition
  }
}

async function addFunction(contractInstance, account, num1, num2){
    let res2 = await contractInstance.methods.addNum(num1, num2);

    let call = await res2.call({from: account});
    console.log("call: ", call);

    try{
        let send = await res2.send({from: account});
        console.log("send: ", send);
    }
    catch(e)
    {
        console.log(e);
    }

    return call;
}

async function subFunction(contractInstance, account, num1, num2){
    let res2 = contractInstance.methods.subNum(num1, num2);
    let c= await res2.call({from: account})
    //let s= await res2.send({from: account})
    console.log("c: ", c);
    //console.log("s: ", s);

    return c;
}

async function mulFunction(contractInstance, account, num1, num2){
    let res2 = await contractInstance.methods.mulNum(num1, num2).call({from: account});
    console.log("Res: ", res2);

    return res2;
}

async function divFunction(contractInstance, account, num1, num2){
    let res2 = await contractInstance.methods.divNum(num1, num2).call({from: account});
    console.log("Res: ", res2);

    return res2;
}

export {connectWeb3, connectWeb3Metamask, addFunction, subFunction, mulFunction, divFunction}