import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

const tokenPair = [
    {
        ticker: "$PP",
        logoUrl: "https://assets.coingecko.com/coins/images/29850/large/pepe-token.jpeg?1696528776",
    },
    {
        ticker: "$NEON",
        logoUrl: "https://s2.coinmarketcap.com/static/img/coins/64x64/23015.png"
    }
]

const rate = 0.05;

const Exchange = () => {
    const { address } = useParams();
    const [token1Amount, setToken1Amount] = useState(0);
    const [token2Amount, setToken2Amount] = useState(0);
    const [swapToggle, setSwapToggle] = useState(true);

    const handleToken1Change = (e) => {
        const amount = e.target.value;
        setToken1Amount(amount);
        const token2Amount = swapToggle? amount * rate : amount / rate
        setToken2Amount(token2Amount);
    };


    return (
    <div className="max-w-md mx-auto mt-8 p-4 rounded-md">
        <div className="flex justify-between items-center">
            <div className="flex items-center">
                <img src={swapToggle?tokenPair[0].logoUrl : tokenPair[1].logoUrl} alt="Token 1" className="h-6 w-6 mr-2" />
                <label htmlFor="token1" className="text-sm font-semibold text-foreground">
                    {swapToggle?tokenPair[0].ticker : tokenPair[1].ticker}
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
            <button onClick={() => {
                setSwapToggle(!swapToggle)
                setToken1Amount(0)
                setToken2Amount(0)
                }} className="text-pink focus:outline-none">
            <svg width="800px" height="800px" className="h-6 w-6" stroke="currentColor" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M16 3.93a.75.75 0 0 1 1.177-.617l4.432 3.069a.75.75 0 0 1 0 1.233l-4.432 3.069A.75.75 0 0 1 16 10.067V8H4a1 1 0 0 1 0-2h12V3.93zm-9.177 9.383A.75.75 0 0 1 8 13.93V16h12a1 1 0 1 1 0 2H8v2.067a.75.75 0 0 1-1.177.617l-4.432-3.069a.75.75 0 0 1 0-1.233l4.432-3.069z" fill="#000000"/></svg>
            </button>
        </div>
        <div className="flex justify-between items-center">
            <div className="flex items-center">
            <img src={swapToggle?tokenPair[1].logoUrl : tokenPair[0].logoUrl} alt="Token 2" className="h-6 w-6 mr-2" />
            <label htmlFor="token2" className="text-sm font-semibold text-foreground">
                {swapToggle?tokenPair[1].ticker : tokenPair[0].ticker}
            </label>
            </div>
            <input
                id="token2"
                type="number"
                value={token2Amount}
                className="w-4/6 py-1 px-2 border rounded focus:outline-none focus:border-blue-400 text-foreground"
                disabled
            />
        </div>
        <div className="flex justify-center mt-4">
            <button className="bg-pink hover:bg-blue-600 text-foreground font-semibold py-2 px-4 rounded focus:outline-none">
            Swap
            </button>
        </div>
    </div>
  );
};

export default Exchange;
