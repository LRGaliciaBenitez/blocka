import React from "react";
import { useNavigate } from "react-router-dom";

const SearchCard = ({ coin, toggleSearch }) => {

  const navigate = useNavigate();

  return (
    <div className="bg-bg-card rounded-xl shadow-card p-4 flex flex-col items-center text-center gap-3
                    hover:scale-105 transition-transform duration-200 cursor-pointer">

      {/* Header */}
      <img
        src={coin.large}
        alt={coin.name}
        className="w-14 h-14"
      />

      <h2 className="text-2xl font-bold uppercase text-text-primary">
        {coin.symbol}
      </h2>

      <p className="text-sm text-text-secondary">
        {coin.name}
      </p>

      {/* Divider */}
      <div className="w-full h-px bg-border my-2" />

      {/* Body */}
      <div className="flex flex-col gap-1 text-sm text-text-primary">
        <span>Rank: #{coin.market_cap_rank ?? "N/A"}</span>
      </div>

      {/* Footer */}
      <button
        onClick={() => {
          navigate(`/coin/${coin.id}`);
          toggleSearch();
        }}
        className="mt-2 text-sm text-blue-500 hover:text-blue-400 transition-colors"
      >
        Ver detalles
      </button>
    </div>
  );
};

export default SearchCard;