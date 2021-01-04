import React from "react";
import Web3 from "web3";
import { Button } from "@material-ui/core";
import BotContractABI from "./abi/box.json";
import "./App.css";

import { BigNumber } from "@ethersproject/bignumber";
import { gql, useQuery } from "@apollo/client";

const OUR_ADDRESS = "0xBad79d832671d91b4Bba85f600932FAeC0E5fD7c";

export const query = gql`
query {
  ethereum {
    address(address: {is: "${OUR_ADDRESS}"}) {
      balances {
        currency {
          symbol,
          address
        }
        value
      }
    }
  }

}
`;

const DEFAULT_GAS_PRICE = BigNumber.from("80000000000");
const DEFAULT_GAS_LIMIT = BigNumber.from("350000");

const web3 = new Web3(Web3.givenProvider);
const contractAddr = "0x1b2988299c4932a66269c47b1ac6d49e2fee9e1c";
const SimpleContract = new web3.eth.Contract(BotContractABI.abi, contractAddr);

function App() {
  const { loading, data } = useQuery(query);

  const handleSellAll = async addr => {
    const accounts = await window.ethereum.enable();
    const account = accounts[0];

    const result = await SimpleContract.methods.sellAll(addr).send({
      from: account,
      gasPrice: DEFAULT_GAS_PRICE.toHexString(),
      gasLimit: DEFAULT_GAS_LIMIT.toHexString()
    });
    console.log(result);
  };

  if (loading) return <p>Loading Masterpieces...</p>;

  console.log(data);
  return (
    <div className="App">
      <h3 className="address-title">Address: {OUR_ADDRESS}</h3>
      <div>
        {data &&
          data.ethereum.address[0].balances
            .filter(({ value }) => parseInt(value) > 0)
            .map(token => (
              <div className="token-row">
                <label className="token-data">
                  {token.currency.symbol}: {token.value}
                </label>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handleSellAll(token.currency.address)}
                >
                  Sell All
                </Button>
              </div>
            ))}
      </div>
    </div>
  );
}

export default App;
