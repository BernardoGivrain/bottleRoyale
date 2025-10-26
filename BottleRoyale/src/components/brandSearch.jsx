import React, { useState, useEffect } from "react";

export default function BrandSearch({ brand: propBrand = '', setBrand = () => {} }) {
  const brands = [
    "Absolut",
    "Baileys",
    "Bombay Sapphire",
    "Château Legrand",
    "Château Rivière",
    "Cloudy Bay",
    "Cointreau",
    "Disaronno",
    "Gleinlivet",
    "Grand Marnier",
    "Johnie Walker",
    "Kahlúa",
    "Laurent-Perrier",
    "Moët & Chandon",
    "Penfolds",
    "Piper-Heidsieck",
    "Robert Mondavi",
    "Taittinger",
    "Tanqueray",
    "Veuve Clicquot",
    "Villa Maria",
  ];

  const [query, setQuery] = useState(propBrand || "");
  const [results, setResults] = useState([]);

  function handleSubmit(e) {
    e.preventDefault();
  }

  useEffect(() => {
    if (query.trim() === "") {
      setResults([]);
      return;
    }

    const timeoutId = setTimeout(() => {
      const filtered = brands.filter((brand) =>
        brand.toLowerCase().includes(query.toLowerCase())
      );
      setResults(filtered);
    }, 300); 

    return () => clearTimeout(timeoutId);
  }, [query]);

  useEffect(() => {
    if (setBrand) setBrand(query);
  }, [query]);

  return (
    <div style={{ width: '100%', maxWidth: 420 }}>
      <form onSubmit={handleSubmit}>
        <input
          id="search-input"
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="input input-bordered w-full"
          placeholder="Type brand name"
        />
      </form>

      <div className="mt-2 bg-white/90 rounded-md p-2 shadow-sm">
        {results.length > 0 ? (
          results.map((item) => (
            <div key={item} className="py-1 px-2 hover:bg-gray-100 rounded cursor-pointer" onMouseDown={() => setQuery(item)}>
              {item}
            </div>
          ))
        ) : (
          <div className="text-sm text-gray-500">No results found</div>
        )}
      </div>
    </div>
  );
}