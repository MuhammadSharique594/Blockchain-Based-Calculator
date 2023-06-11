import logo from './logo.svg';
import './App.css';
import PrintHello from './components/hello.js'
import Calculator from './components/calculator.js'
import { useEffect, useState } from 'react';
import { connectWeb3, connectWeb3Metamask } from './web3_functions';

function App() {

  const [accounts, setAccounts] = useState();
  const [contractInstance, setContractInstance] = useState(null);

  async function setValues(ins, acc)
  {
    setAccounts(acc);
    setContractInstance(ins);
  }

  async function connect(){
    try{
      let {instance, accounts} = await connectWeb3Metamask();
      //let {instance, accounts} = await connectWeb3();
      await setValues(instance, accounts);  
    } 
    catch(err){
      alert('Failed to load web3, accounts, or contract. Check console for details');
      console.log(err);
    }
  }

  function GetCalculator() {
    if(!contractInstance){
      return <p>loading</p>
    }
    else{
      return  <Calculator contractInstance={contractInstance} account={accounts[0]}  />
    }
  }

  useEffect(() => {  
    connect();
  }, [])

  return (
    <div className="App">
      <PrintHello name="Welcome to DAPP Calculator"/>
     {GetCalculator()}

      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
    </div>
  );
}

export default App;
