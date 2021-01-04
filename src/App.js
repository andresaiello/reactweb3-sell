import React, { useState } from "react";
import Web3 from "web3";
import BotContractABI from "./abi/box.json";
import "./App.css";

import { BigNumber } from "@ethersproject/bignumber";

const DEFAULT_GAS_PRICE = BigNumber.from("80000000000");
const DEFAULT_GAS_LIMIT = BigNumber.from("350000");

const web3 = new Web3(Web3.givenProvider);
const contractAddr = "0x805fE47D1FE7d86496753bB4B36206953c1ae660";
const SimpleContract = new web3.eth.Contract(BotContractABI.abi, contractAddr);

function App() {
  const [number, setNumber] = useState(0);
  const [getNumber, setGetNumber] = useState(0);

  const handleSet = async e => {
    e.preventDefault();
    const accounts = await window.ethereum.enable();
    const account = accounts[0];

    const result = await SimpleContract.methods
      .sellAll("0x6B175474E89094C44Da98b954EedeAC495271d0F")
      .send({
        from: account,
        gasPrice: DEFAULT_GAS_PRICE.toHexString(),
        gasLimit: DEFAULT_GAS_LIMIT.toHexString()
      });
    console.log(result);
  };

  const handleGet = async e => {
    e.preventDefault();
    const result = await SimpleContract.methods.get().call();
    setGetNumber(result);
    console.log(result);
  };

  return (
    <div className="App">
      <header className="App-header">
        <form onSubmit={handleSet}>
          <label>
            Set Number:
            <input
              type="text"
              name="name"
              value={number}
              onChange={e => setNumber(e.target.value)}
            />
          </label>
          <input type="submit" value="Set Number" />
        </form>
        <br />
        <button onClick={handleGet} type="button">
          Get Number
        </button>
        {getNumber}
      </header>
    </div>
  );
}

export default App;
