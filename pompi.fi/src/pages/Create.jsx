import {useState} from 'react'
import TokenLaunchpadAbi from "../abis/TokenLaunchpad.json"
// const ethers = require("ethers")
import { useWeb3ModalProvider, useWeb3ModalAccount } from '@web3modal/ethers/react'
import { BrowserProvider, Contract, Interface } from 'ethers'

const Create = () => {
    const [formData, setFormData] = useState({
            name: '',
            ticker: '',
            description: '',
            image: '',
            telegramLink: '',
        });

    const { address, chainId, isConnected } = useWeb3ModalAccount()
    const { walletProvider } = useWeb3ModalProvider()

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
          ...formData,
          [name]: value,
        });
    };
    

    async function createToken(name, symbol) {
        try {
            // Connect to provider
            const provider = new BrowserProvider(walletProvider);
            await provider.send("eth_requestAccounts", []);
        
            // Get signer
            const signer = await provider.getSigner();
            console.log("Using account:", address);
        
            // Contract instance
            const tokenLaunchpadAddress = "0x9c670237cfdE371eb6b2C250637d0a13A8b7a281";
            const TokenLaunchpad = new Contract(
                tokenLaunchpadAddress,
                TokenLaunchpadAbi.abi,
                signer
            );
            // Create token
            const tx = await TokenLaunchpad.createToken(name, symbol);
            const receipt = await tx.wait();
        
            console.log("Transaction receipt:", receipt);
        
            // Parse event
            const eventAbi = [
                "event TokenCreated(address indexed tokenAddress, string name, string symbol)",
            ];
            const iface = new Interface(eventAbi);
        
            let newTokenAddress;
            for (let log of receipt.logs) {
                try {
                const parsedLog = iface.parseLog(log);
                if (parsedLog.name === "TokenCreated") {
                    newTokenAddress = parsedLog.args.tokenAddress;
                    console.log("Token Address:", parsedLog.args.tokenAddress);
                    console.log("Name:", parsedLog.args.name);
                    console.log("Symbol:", parsedLog.args.symbol);
                    break;
                }
                } catch (e) {
                // log not parsed
                }
            }
        } catch (error) {
            console.log(`Error: ${error.message}`);
        }
      }
      

      const handleSubmit = async (e) => {
        e.preventDefault();

        await createToken(formData.name, formData.ticker)
        // Handle form submission here
        console.log(formData);
      };
  return (
    <div className="w-full max-w-md mx-auto mt-5">
    <form onSubmit={handleSubmit} className="bg-background px-8 pt-6 pb-8 mb-4">
    <div className="mb-4">
        <label className="block text-foreground text-sm font-bold mb-2" htmlFor="name">
        name
        </label>
        <input
        className="shadow appearance-none border rounded w-full py-2 px-3 text-foreground leading-tight focus:outline-none focus:shadow-outline"
        style={{backgroundColor: "#282A36"}}
        id="name"
        type="text"
        name="name"
        placeholder="Name"
        value={formData.name}
        onChange={handleChange}
        />
    </div>
    <div className="mb-4">
        <label className="block text-foreground text-sm font-bold mb-2" htmlFor="ticker">
        ticker
        </label>
        <input
        className="shadow appearance-none border rounded w-full py-2 px-3 text-foreground leading-tight focus:outline-none focus:shadow-outline"
        style={{backgroundColor: "#282A36"}}
        id="ticker"
        type="text"
        name="ticker"
        placeholder="Ticker"
        value={formData.ticker}
        onChange={handleChange}
        />
    </div>
    <div className="mb-4">
        <label className="block text-foreground text-sm font-bold mb-2" htmlFor="description">
        description
        </label>
        <textarea
        className="shadow appearance-none border rounded w-full py-2 px-3 text-foreground leading-tight focus:outline-none focus:shadow-outline"
        style={{backgroundColor: "#282A36"}}
        id="description"
        name="description"
        placeholder="Description"
        value={formData.description}
        onChange={handleChange}
        />
    </div>
    <div className="mb-4">
        <label className="block text-foreground text-sm font-bold mb-2" htmlFor="image">
        image
        </label>
        <input
        className="shadow appearance-none border rounded w-full py-2 px-3 text-foreground leading-tight focus:outline-none focus:shadow-outline"
        style={{backgroundColor: "#282A36"}}
        id="image"
        type="file"
        name="image"
        accept="image/*"
        onChange={handleChange}
        />
    </div>
    <div className="mb-4">
        <label className="block text-foreground text-sm font-bold mb-2" htmlFor="telegramLink">
        telegram link
        </label>
        <input
        className="shadow appearance-none border rounded w-full py-2 px-3 text-foreground leading-tight focus:outline-none focus:shadow-outline"
        style={{backgroundColor: "#282A36"}}
        id="telegramLink"
        type="text"
        name="telegramLink"
        placeholder="Telegram Link"
        value={formData.telegramLink}
        onChange={handleChange}
        />
    </div>
    <div className="flex items-center justify-between">
        <button
        className="bg-purple-900 hover:bg-pink mt-2 font-bold py-2 px-4 w-full"
        type="submit"
        >
        Submit
        </button>
    </div>
    </form>
</div>
    )
}

export default Create