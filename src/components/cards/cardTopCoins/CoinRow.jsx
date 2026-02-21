import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const CoinRow = ({ coin }) => {
  const isPositive = coin.price_change_percentage_24h >= 0;

  const navigate = useNavigate();

  const currency = useSelector((state) => state.currency.value);

  const symbol = currency === "usd" ? "$" : "MXN";

  return (
    <div 
      onClick={() => navigate(`/coin/${coin.id}`)}
      className="flex items-center justify-between p-2 rounded-lg hover:bg-bg-hover transition cursor-pointer"
    >
      
      {/* Left */}
      <div className="flex items-center gap-3">
        <img
          src={coin.image}
          alt={coin.name}
          className="w-6 h-6"
        />
        <div>
          <p className="text-text-primary font-semibold uppercase">
            {coin.symbol}
          </p>
          <p className="text-xs text-text-secondary">
            {coin.name}
          </p>
        </div>
      </div>

      {/* Right */}
      <div className="text-right">
        <p className="text-text-primary font-mono text-sm">
          {symbol} {coin.current_price.toLocaleString()}
        </p>
        <p
          className={`text-xs font-semibold ${
            isPositive ? "text-green-500" : "text-red-500"
          }`}
        >
          {isPositive ? "+" : ""}
          {coin.price_change_percentage_24h !== null
            ? `${coin.price_change_percentage_24h.toFixed(2)}%`
            : "—"}
        </p>
      </div>
    </div>
  );
};

export default CoinRow;
