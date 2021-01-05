import React from "react";
import Web3 from "web3";
import { Button } from "@material-ui/core";
import BotContractABI from "./abi/box.json";
import "./App.css";

import { BigNumber } from "@ethersproject/bignumber";
import { gql, useQuery } from "@apollo/client";

const OUR_ADDRESS = "0xa8A0a2461E2Ba869A91281E75A01CD9Cd9171605";
const BOT_ADDRESS = "0xa8A0a2461E2Ba869A91281E75A01CD9Cd9171605";

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
const contract = new web3.eth.Contract(BotContractABI.abi, BOT_ADDRESS);

function App() {
  const { loading, data } = useQuery(query);

  const handleSellAll = async addr => {
    const accounts = await window.ethereum.enable();
    const account = accounts[0];

    const result = await contract.methods.sellAll(addr).send({
      from: account,
      gasPrice: DEFAULT_GAS_PRICE.toHexString(),
      gasLimit: DEFAULT_GAS_LIMIT.toHexString()
    });
    console.log(result);
  };

  if (loading) return <p>Loading tokens...</p>;

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
