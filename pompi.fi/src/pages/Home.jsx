import Token from "../components/Token";
import { useEffect, useState } from "react";

const Home = () => {
  const [search, setSearch] = useState("");
  const [tokens, setTokens] = useState([]);

  const fetchData = async () => {
    try {
      const response = await fetch(
        "https://api.pompi.xyz/api/memes?populate=*"
      );
      const result = await response.json();
      const data = result.data.map((item) => {
        const defaultLogoUrl =
          "https://assets.coingecko.com/coins/images/29850/large/pepe-token.jpeg?1696528776";
        const imageUrl = item.attributes.image?.data?.attributes?.url
          ? item.attributes.image.data.attributes.url
          : defaultLogoUrl;
        return {
          address: item.attributes.address,
          logoUrl: imageUrl,
          name: item.attributes.name,
          ticker: item.attributes.ticker,
          description: item.attributes.desc || "No description available",
        };
      });
      setTokens(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleSearch = () => {
    setTokens((prevTokens) =>
      prevTokens.filter(
        (token) =>
          token.address?.toLowerCase().includes(search.toLowerCase()) ||
          token.name.toLowerCase().includes(search.toLowerCase())
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
              key={token.address || token.name}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Home;
