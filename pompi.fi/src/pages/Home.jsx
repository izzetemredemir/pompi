import Token from "../components/Token";
import { useEffect, useState } from "react";

// const data = [
//     {
//         address: "0xCD9bf60062093860f3698e9214D4D71Ba68258F3",
//         logoUrl:"https://assets.coingecko.com/coins/images/29850/large/pepe-token.jpeg?1696528776",
//         name:"pepe",
//         ticker:"$PP",
//         description:"a fun fren wit no utility",
//     },
//     {
//         address: "0x1",
//         logoUrl:"https://assets.coingecko.com/coins/images/29850/large/pepe-token.jpeg?1696528776",
//         name:"pepe2",
//         ticker:"$PP",
//         description:"a fun fren wit no utility",
//     },
//     {
//         address: "0x2",
//         logoUrl:"https://assets.coingecko.com/coins/images/29850/large/pepe-token.jpeg?1696528776",
//         name:"pepe3",
//         ticker:"$PP",
//         description:"a fun fren wit no utility",
//     },
//     {
//         address: "0x3",
//         logoUrl:"https://assets.coingecko.com/coins/images/29850/large/pepe-token.jpeg?1696528776",
//         name:"pepe",
//         ticker:"$PP",
//         description:"a fun fren wit no utility",
//     },
// ]

const Home = () => {
  const [search, setSearch] = useState("");
  const [tokens, setTokens] = useState([]);

  const fetchData = async () => {
    try {
      const response = await fetch(
        "https://steadfast-prosperity-e813c26e87.strapiapp.com/api/memes"
      );
      const result = await response.json();
      const data = result.data.map((item) => ({
        address: item.attributes.address,
        logoUrl:
          "https://assets.coingecko.com/coins/images/29850/large/pepe-token.jpeg?1696528776",
        name: item.attributes.name,
        ticker: item.attributes.ticker,
        description: item.attributes.desc || "No description available",
      }));
      setTokens(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleSearch = () => {
    setTokens((prevTokens) =>
      prevTokens.filter(
        (token) => token.address.includes(search) || token.name.includes(search)
      )
    );
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    handleSearch();
  }, [search]);

  return (
    <div className="page-layout">
      <input
        className="shadow appearance-none border rounded w-full py-2 px-3 text-foreground leading-tight focus:outline-none focus:shadow-outline mt-5 mb-1"
        style={{ backgroundColor: "#282A36" }}
        id="name"
        type="text"
        name="name"
        placeholder="search by token name, or token address"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <div className="grid grid-cols-3">
        {tokens.map((token) => {
          return (
            <Token
              logoUrl={token.logoUrl}
              name={token.name}
              ticker={token.ticker}
              description={token.description}
              address={token.address}
              key={token.address}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Home;
