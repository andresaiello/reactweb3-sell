import React, { useState } from "react";
import Web3 from "web3";
import BotContractABI from "./abi/box.json";
import "./App.css";

import { BigNumber } from "@ethersproject/bignumber";

const DEFAULT_GAS_PRICE = BigNumber.from("80000000000");
const DEFAULT_GAS_LIMIT = BigNumber.from("350000");

const web3 = new Web3(Web3.givenProvider);
const contractAddr = "0x1b2988299c4932a66269c47b1ac6d49e2fee9e1c";
const SimpleContract = new web3.eth.Contract(BotContractABI.abi, contractAddr);

function App() {
  const [addr, setAddr] = useState(
    "0x6B175474E89094C44Da98b954EedeAC495271d0F"
  );

  const handleSet = async e => {
    e.preventDefault();
    const accounts = await window.ethereum.enable();
    const account = accounts[0];

    const result = await SimpleContract.methods.sellAll(addr).send({
      from: account,
      gasPrice: DEFAULT_GAS_PRICE.toHexString(),
      gasLimit: DEFAULT_GAS_LIMIT.toHexString()
    });
    console.log(result);
  };

  return (
    <div className="App">
      <header className="App-header">
        <form onSubmit={handleSet}>
          <label>
            Address:
            <input
              type="text"
              name="name"
              value={addr}
              onChange={e => setAddr(e.target.value)}
            />
          </label>
          <input type="submit" value="Sell All" />
        </form>
      </header>
    </div>
  );
}

export default App;
