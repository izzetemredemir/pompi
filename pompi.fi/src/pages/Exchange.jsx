import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import TokenLaunchpadAbi from "../abis/TokenLaunchpad.json";
import { createChart, ColorType } from 'lightweight-charts';

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
    ticker: "$ETH",
    logoUrl: "https://cryptologos.cc/logos/ethereum-eth-logo.png",
  },
];

export const ChartComponent = props => {
  const {
      data,
      colors: {
          backgroundColor = '#2D2C3D', // Dracula background
          upColor = '#50fa7b', // Dracula green for up bars
          downColor = '#ff5555', // Dracula red for down bars
          textColor = '#f8f8f2', // Dracula text color
      } = {},
  } = props;

  const chartContainerRef = useRef();

  useEffect(() => {
      const handleResize = () => {
          chart.applyOptions({ width: chartContainerRef.current.clientWidth });
      };

      const chart = createChart(chartContainerRef.current, {
          layout: {
              background: { type: ColorType.Solid, color: backgroundColor },
              textColor,
          },
          width: chartContainerRef.current.clientWidth,
          height: 360,
      });
      chart.timeScale().fitContent();

      const barSeries = chart.addCandlestickSeries({
          upColor,
          downColor,
          borderUpColor: upColor,
          borderDownColor: downColor,
          wickUpColor: upColor,
          wickDownColor: downColor,
      });
      barSeries.setData(data);

      window.addEventListener('resize', handleResize);

      return () => {
          window.removeEventListener('resize', handleResize);
          chart.remove();
      };
  }, [data, backgroundColor, upColor, downColor, textColor]);

  return (
      <div
          ref={chartContainerRef}
          style={{ width: '100%', height: '300px' }}
      />
  );
};


const Exchange = () => {
  const { address } = useParams();
  const [token1Amount, setToken1Amount] = useState(0);
  const [token2Amount, setToken2Amount] = useState(0);
  const [tokenPrice, setTokenPrice] = useState(0);
  const [account, setAccount] = useState("");
  const [comOrTrade, setComOrTrade] = useState("comment");
  const [swapToggle, setSwapToggle] = useState(true);
  const { walletProvider } = useWeb3ModalProvider();
  const { useraddress, chainId, isConnected } = useWeb3ModalAccount();

  const customData = [
    { time: '2023-06-01', open: 50, high: 52, low: 48, close: 51 },
    { time: '2023-06-02', open: 51, high: 53, low: 50, close: 52 },
    { time: '2023-06-03', open: 52, high: 54, low: 50, close: 53 },
    { time: '2023-06-04', open: 53, high: 55, low: 52, close: 54 },
    { time: '2023-06-05', open: 54, high: 56, low: 53, close: 55 },
    { time: '2023-06-06', open: 55, high: 57, low: 54, close: 56 },
    { time: '2023-06-07', open: 56, high: 57, low: 54, close: 55 },
    { time: '2023-06-08', open: 55, high: 56, low: 53, close: 54 },
    { time: '2023-06-09', open: 54, high: 55, low: 52, close: 53 },
    { time: '2023-06-10', open: 53, high: 54, low: 51, close: 52 },
    { time: '2023-06-11', open: 52, high: 54, low: 50, close: 53 },
    { time: '2023-06-12', open: 53, high: 55, low: 52, close: 54 },
    { time: '2023-06-13', open: 54, high: 56, low: 53, close: 55 },
    { time: '2023-06-14', open: 55, high: 57, low: 54, close: 56 },
    { time: '2023-06-15', open: 56, high: 58, low: 55, close: 57 },
    { time: '2023-06-16', open: 57, high: 59, low: 56, close: 58 },
    { time: '2023-06-17', open: 58, high: 60, low: 57, close: 59 },
    { time: '2023-06-18', open: 59, high: 61, low: 58, close: 60 },
    { time: '2023-06-19', open: 60, high: 62, low: 59, close: 61 },
    { time: '2023-06-20', open: 61, high: 63, low: 60, close: 62 },
    { time: '2023-06-21', open: 62, high: 64, low: 61, close: 63 },
    { time: '2023-06-22', open: 63, high: 65, low: 62, close: 64 },
    { time: '2023-06-23', open: 64, high: 66, low: 63, close: 65 },
    { time: '2023-06-24', open: 65, high: 67, low: 64, close: 66 },
    { time: '2023-06-25', open: 66, high: 68, low: 65, close: 67 },
    { time: '2023-06-26', open: 67, high: 69, low: 66, close: 68 },
    { time: '2023-06-27', open: 68, high: 70, low: 67, close: 69 },
    { time: '2023-06-28', open: 69, high: 71, low: 68, close: 70 },
    { time: '2023-06-29', open: 70, high: 72, low: 69, close: 71 },
    { time: '2023-06-30', open: 71, high: 73, low: 70, close: 72 },
    { time: '2023-07-01', open: 72, high: 74, low: 71, close: 73 },
    { time: '2023-07-02', open: 73, high: 75, low: 72, close: 74 },
    { time: '2023-07-03', open: 74, high: 76, low: 73, close: 75 },
    { time: '2023-07-04', open: 75, high: 77, low: 74, close: 76 },
    { time: '2023-07-05', open: 76, high: 78, low: 75, close: 77 },
    { time: '2023-07-06', open: 77, high: 79, low: 76, close: 78 },
    { time: '2023-07-07', open: 78, high: 80, low: 77, close: 79 },
    { time: '2023-07-08', open: 79, high: 81, low: 78, close: 80 },
    { time: '2023-07-09', open: 80, high: 82, low: 79, close: 81 },
    { time: '2023-07-10', open: 81, high: 83, low: 80, close: 82 },
  ];


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
    <div className="grid grid-cols-4 w-4/5 m-auto mt-10 grid-rows-2 gap-4 ">
      <div className="col-span-3" style={{border: '1px #bd93f932 solid', padding: '10px', paddingBottom:'70px', borderRadius:'10px', backgroundColor:'#2D2C3D'}}>
        <ChartComponent data={customData} />
      </div>
      <div className="row-span-2 col-span-1 flex flex-col gap-5">
        <div className="max-w-md mx-auto  p-5 rounded-xl row-span-1 bg-[#613980]/[.09] flex flex-col justify-center	border border-[#bd93f932]">
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
              className="bg-[#BD93F9] text-[#282934] rounded hover:bg-pink mt-2 font-bold py-2 px-4 w-full"
              onClick={() => swap()}
            >
              Swap
            </button>
          </div>
        </div>
        <div className="col-span-1 bg-[#613980]/[.09] rounded-xl p-5 row-span-1 border border-[#bd93f932] h-min">
          <p className="font-bold text-xl">about $PP</p>
          <hr style={{borderTop: '1px solid #BD93F9'}}/>
          <p>this token rox the meme token world. and there is our lovely frog pepe and has no utility except having a big mouth.</p>
        </div>
        <div className="col-span-1 bg-[#613980]/[.09] rounded-xl p-5 row-span-1 border border-[#bd93f932] h-min">
        <p className="font-bold text-xl">holders distribution</p>
          <hr style={{borderTop: '1px solid #BD93F9'}}/>
          <ol className="list-decimal	list-inside">
            <li>0xB4B1d7e9(%4)</li>
            <li>0x3D1f0E94(%3)</li>
            <li>0xD5F4E1Bc(%4)</li>
            <li>0xFfB92221(%1)</li>
            <li>0xB4B1d7e9(bonding curve)(%88)</li>
          </ol>
        </div>
      </div>
      <div className="col-span-3 bg-[#613980]/[.09] rounded-xl p-5 border border-[#bd93f932] h-min">
        <div className="flex flex-row gap-2">
          <p className={comOrTrade==='comment' ? "font-bold text-l mb-3 cursor-pointer bg-[#9f71de] text-[#f2f2f2] p-1 px-2 rounded-lg" : "font-bold text-l mb-3 cursor-pointer text-[#f2f2f2] bg-[#bd93f958] p-1 px-2 rounded-lg"} onClick={() => setComOrTrade("comment")}>comments</p>
          <p className={comOrTrade==='trade' ? "font-bold text-l mb-3 cursor-pointer bg-[#9f71de] text-[#f2f2f2] p-1 px-2 rounded-lg" : "font-bold text-l mb-3 cursor-pointer text-[#f2f2f2] bg-[#bd93f958] p-1 px-2 rounded-lg"} onClick={() => setComOrTrade("trade")}>trades</p>
        </div>
        <hr style={{borderTop: '1px solid #BD93F9'}}/>
        {comOrTrade === "comment" ?
          <>
            <div className="grid grid-cols-10 gap-2 my-3">
              <input className=" rounded focus:outline-none text-foreground w-full col-span-9"/>
              <button
                className="bg-[#BD93F9] text-[#282934] rounded hover:bg-pink font-bold py-1 px-1 mr-2 w-full col-span-1"
              >
                submit
              </button>
            </div>
            <div className="mt-2">
              <hr style={{borderTop: '1px solid #BD93F9'}}/>
              <p className="font-bold text-sm mt-1">0xB4B1d7e9E</p>
              <p className="mt-1">let's pump it</p>
            </div>
            <div className="mt-2">
              <hr style={{borderTop: '1px solid #BD93F9'}}/>
              <p className="font-bold text-sm mt-1">0xFfB922215B</p>
              <p className="mt-1">devs are owsome</p>
            </div>
            <div className="mt-2">
              <hr style={{borderTop: '1px solid #BD93F9'}}/>
              <p className="font-bold text-sm mt-1">0x3D1f0E94E3</p>
              <p className="mt-1">popmpi itt!!!</p>
            </div>
            <div className="mt-2">
              <hr style={{borderTop: '1px solid #BD93F9'}}/>
              <p className="font-bold text-sm mt-1">0xD5F4E1Bc7E</p>
              <p className="mt-1">hodling!</p>
            </div>
          </>:
            <>
            <div>
              <div>
                <p className="font-bold text-sm mt-1">0xB4B1d7e9E swapped 0.023 $ETH for 125004 $PP</p>
                <hr style={{borderTop: '1px solid #BD93F9'}}/>
                <p className="font-bold text-sm mt-1">0xB4B1d7e9E swapped 0.023 $ETH for 125004 $PP</p>
                <hr style={{borderTop: '1px solid #BD93F9'}}/>
                <p className="font-bold text-sm mt-1">0xB4B1d7e9E swapped 0.023 $ETH for 125004 $PP</p>
                <hr style={{borderTop: '1px solid #BD93F9'}}/>
                <p className="font-bold text-sm mt-1">0xB4B1d7e9E swapped 0.023 $ETH for 125004 $PP</p>
                <hr style={{borderTop: '1px solid #BD93F9'}}/>
                <p className="font-bold text-sm mt-1">0xB4B1d7e9E swapped 0.023 $ETH for 125004 $PP</p>
                <hr style={{borderTop: '1px solid #BD93F9'}}/>
              </div>
            </div>
            </>
            }
    </div>
  </div>
  );
};

export default Exchange;
