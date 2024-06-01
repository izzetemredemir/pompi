import { useState } from "react";
import TokenLaunchpadAbi from "../abis/TokenLaunchpad.json";
import {
  useWeb3ModalProvider,
  useWeb3ModalAccount,
} from "@web3modal/ethers/react";
import { BrowserProvider, Contract, Interface } from "ethers";

const Create = () => {
  const [formData, setFormData] = useState({
    name: "",
    ticker: "",
    description: "",
    image: null,
    telegramLink: "",
  });

  const { address, chainId, isConnected } = useWeb3ModalAccount();
  const { walletProvider } = useWeb3ModalProvider();

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "image") {
      setFormData({
        ...formData,
        image: e.target.files[0],
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const uploadImage = async (image) => {
    const imageData = new FormData();
    imageData.append("files", image);

    const response = await fetch(
      "https://steadfast-prosperity-e813c26e87.strapiapp.com/api/upload",
      {
        method: "POST",
        body: imageData,
      }
    );

    const result = await response.json();
    return result[0].id;
  };

  const createToken = async (name, symbol) => {
    try {
      const provider = new BrowserProvider(walletProvider);
      await provider.send("eth_requestAccounts", []);
      const signer = await provider.getSigner();
      const tokenLaunchpadAddress =
        "0x9c670237cfdE371eb6b2C250637d0a13A8b7a281";
      const TokenLaunchpad = new Contract(
        tokenLaunchpadAddress,
        TokenLaunchpadAbi.abi,
        signer
      );

      const tx = await TokenLaunchpad.createToken(name, symbol);
      const receipt = await tx.wait();

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
      return newTokenAddress;
    } catch (error) {
      console.log(`Error: ${error.message}`);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newTokenAddress = await createToken(formData.name, formData.ticker);
      if (newTokenAddress) {
        const imageId = await uploadImage(formData.image);
        const response = await fetch(
          "https://steadfast-prosperity-e813c26e87.strapiapp.com/api/memes",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              data: {
                name: formData.name,
                ticker: formData.ticker,
                desc: formData.description,
                address: newTokenAddress,
                telegram: formData.telegramLink,
                image: imageId,
              },
            }),
          }
        );
        const result = await response.json();
        console.log("Content created:", result);
      } else {
        console.error("Token creation failed, no address returned.");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto mt-5">
      <form
        onSubmit={handleSubmit}
        className="bg-background px-8 pt-6 pb-8 mb-4"
      >
        <div className="mb-4">
          <label
            className="block text-foreground text-sm font-bold mb-2"
            htmlFor="name"
          >
            Name
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-foreground leading-tight focus:outline-none focus:shadow-outline"
            style={{ backgroundColor: "#282A36" }}
            id="name"
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-foreground text-sm font-bold mb-2"
            htmlFor="ticker"
          >
            Ticker
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-foreground leading-tight focus:outline-none focus:shadow-outline"
            style={{ backgroundColor: "#282A36" }}
            id="ticker"
            type="text"
            name="ticker"
            placeholder="Ticker"
            value={formData.ticker}
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-foreground text-sm font-bold mb-2"
            htmlFor="description"
          >
            Description
          </label>
          <textarea
            className="shadow appearance-none border rounded w-full py-2 px-3 text-foreground leading-tight focus:outline-none focus:shadow-outline"
            style={{ backgroundColor: "#282A36" }}
            id="description"
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-foreground text-sm font-bold mb-2"
            htmlFor="image"
          >
            Image
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-foreground leading-tight focus:outline-none focus:shadow-outline"
            style={{ backgroundColor: "#282A36" }}
            id="image"
            type="file"
            name="image"
            accept="image/*"
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-foreground text-sm font-bold mb-2"
            htmlFor="telegramLink"
          >
            Telegram Link
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-foreground leading-tight focus:outline-none focus:shadow-outline"
            style={{ backgroundColor: "#282A36" }}
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
  );
};

export default Create;
