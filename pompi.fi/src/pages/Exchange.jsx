import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import TokenLaunchpadAbi from "../abis/TokenLaunchpad.json";
import {
  Contract,
  formatEther,
  parseEther,
  BrowserProvider,
  parseUnits,
  toBigInt,
} from "ethers";
import {
  useWeb3ModalProvider,
  useWeb3ModalAccount,
} from "@web3modal/ethers/react";

const tokenPair = [
  {
    ticker: "$PP",
    logoUrl:
      "https://assets.coingecko.com/coins/images/29850/large/pepe-token.jpeg?1696528776",
  },
  {
    ticker: "$NEON",
    logoUrl: "https://s2.coinmarketcap.com/static/img/coins/64x64/23015.png",
  },
];

const Exchange = () => {
  const { address } = useParams();
  const [token1Amount, setToken1Amount] = useState(0);
  const [token2Amount, setToken2Amount] = useState(0);
  const [tokenPrice, setTokenPrice] = useState(0);
  const [account, setAccount] = useState("");
  const [swapToggle, setSwapToggle] = useState(true);
  const { walletProvider } = useWeb3ModalProvider();
  const { useraddress, chainId, isConnected } = useWeb3ModalAccount();

  const handleToken1Change = (e) => {
    const amount = e.target.value;
    setToken1Amount(amount);
    const token2Amount = swapToggle ? amount * tokenPrice : amount / tokenPrice;
    setToken2Amount(token2Amount);
  };

  useEffect(() => {
    async function connectToProvider() {
      try {
        // Connect to Ethereum provider
        const provider = new BrowserProvider(walletProvider);
        await provider.send("eth_requestAccounts", []);
        const signer = await provider.getSigner();
        setAccount(signer);
        const tokenLaunchpadAddress =
          "0x9c670237cfdE371eb6b2C250637d0a13A8b7a281";
        const tokenAddress = address;

        console.log("tokenAddress", tokenAddress);

        const TokenLaunchpad = new Contract(
          tokenLaunchpadAddress,
          TokenLaunchpadAbi.abi,
          signer
        );

        // Show token price
        let price = await TokenLaunchpad.getTokenPrice(tokenAddress);

        setTokenPrice(price.toString());
      } catch (error) {
        console.error("Error connecting to provider:", error);
      }
    }

    connectToProvider();
  }, [address, walletProvider]);

  const swap = async () => {
    if (swapToggle) {
      await sellToken();
    } else {
      await buyToken();
    }
  };

  const buyToken = async () => {
    try {
      const provider = new BrowserProvider(walletProvider);
      await provider.send("eth_requestAccounts", []);
      const signer = await provider.getSigner();

      const tokenLaunchpadAddress =
        "0x9c670237cfdE371eb6b2C250637d0a13A8b7a281";
      const tokenAddress = address;

      const TokenLaunchpad = new Contract(
        tokenLaunchpadAddress,
        TokenLaunchpadAbi.abi,
        signer
      );

      // Buy tokens

      let buyprice = await TokenLaunchpad.getTokenPrice(tokenAddress);

      const buyValue = buyprice * toBigInt(token1Amount);
      console.log("Buy click");
      console.log("buyValue", buyValue);
      console.log("token1Amount", token1Amount);

      const buyTx = await TokenLaunchpad.buyToken(
        tokenAddress,
        token1Amount.toString(),
        {
          value: buyValue,
        }
      );
      await buyTx.wait();

      // Show token price after buying
      let priceAfterBuying = await TokenLaunchpad.getTokenPrice(tokenAddress);
      setTokenPrice(parseFloat(formatEther(priceAfterBuying)));
    } catch (error) {
      console.error("Error buying tokens:", error);
    }
  };

  const sellToken = async () => {
    try {
      const provider = new BrowserProvider(walletProvider);
      await provider.send("eth_requestAccounts", []);
      const signer = await provider.getSigner();

      const tokenLaunchpadAddress =
        "0x9c670237cfdE371eb6b2C250637d0a13A8b7a281";
      const tokenAddress = address;

      const TokenLaunchpad = new Contract(
        tokenLaunchpadAddress,
        TokenLaunchpadAbi.abi,
        signer
      );

      // Sell tokens
      const sellTx = await TokenLaunchpad.sellToken(
        tokenAddress,
        toBigInt(token1Amount)
      );
      await sellTx.wait();

      // Show token price after selling
      let priceAfterSelling = await TokenLaunchpad.getTokenPrice(tokenAddress);
      setTokenPrice(parseFloat(formatEther(priceAfterSelling)));
    } catch (error) {
      console.error("Error selling tokens:", error);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-4 rounded-md">
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <img
            src={swapToggle ? tokenPair[0].logoUrl : tokenPair[1].logoUrl}
            alt="Token 1"
            className="h-6 w-6 mr-2"
          />
          <label
            htmlFor="token1"
            className="text-sm font-semibold text-foreground"
          >
            {swapToggle ? tokenPair[0].ticker : tokenPair[1].ticker}
          </label>
        </div>
        <input
          id="token1"
          type="number"
          value={token1Amount}
          onChange={handleToken1Change}
          className="w-4/6 py-1 px-2 border rounded focus:outline-none text-foreground"
        />
      </div>
      <div className="flex justify-center items-center my-4">
        <button
          onClick={() => {
            setSwapToggle(!swapToggle);
            setToken1Amount(0);
            setToken2Amount(0);
          }}
          className="text-pink focus:outline-none"
        >
          <svg
            width="800px"
            height="800px"
            className="h-6 w-6"
            stroke="currentColor"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M16 3.93a.75.75 0 0 1 1.177-.617l4.432 3.069a.75.75 0 0 1 0 1.233l-4.432 3.069A.75.75 0 0 1 16 10.067V8H4a1 1 0 0 1 0-2h12V3.93zm-9.177 9.383A.75.75 0 0 1 8 13.93V16h12a1 1 0 1 1 0 2H8v2.067a.75.75 0 0 1-1.177.617l-4.432-3.069a.75.75 0 0 1 0-1.233l4.432-3.069z"
              fill="#000000"
            />
          </svg>
        </button>
      </div>
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <img
            src={swapToggle ? tokenPair[1].logoUrl : tokenPair[0].logoUrl}
            alt="Token 2"
            className="h-6 w-6 mr-2"
          />
          <label
            htmlFor="token2"
            className="text-sm font-semibold text-foreground"
          >
            {swapToggle ? tokenPair[1].ticker : tokenPair[0].ticker}
          </label>
        </div>
        <input
          id="token2"
          type="number"
          value={token2Amount}
          className="w-4/6 py-1 px-2 border rounded focus:outline-none text-foreground"
          disabled
        />
      </div>
      <div className="flex justify-center mt-4">
        <button
          className="bg-purple-900 hover:bg-pink mt-2 font-bold py-2 px-4 w-full"
          onClick={() => swap()}
        >
          Swap
        </button>
      </div>
    </div>
  );
};

export default Exchange;
