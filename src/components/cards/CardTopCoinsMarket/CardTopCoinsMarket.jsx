import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchTopCoins } from "../../../redux/topCoinsSlice.js";
import Spinner from "../../Spinner.jsx";

const formatNumber = (value, options = {}) =>
  value !== null && value !== undefined
    ? <p className="text-text-primary truncate">{value.toLocaleString("en-US", options)}</p>
    : "—";


const CardTopCoinsMarket = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [page, setPage] = useState(1);

  const { results: coins, loading, error } = useSelector(state => state.topCoins);
  const currency = useSelector(state => state.currency.value);

  useEffect(() => {
    dispatch(fetchTopCoins({currency, page}));
  }, [currency, page, dispatch]);

  return (
    <div className="w-[100%] min-h-[400px] bg-bg-card rounded-xl flex flex-col justify-center items-center p-4">
      <h2 className="text-xl font-bold mb-4 text-left w-[90%] text-text-primary">Top Coins</h2>

      <div className="grid grid-cols-3 md:grid-cols-4 gap-5 md:gap-0 text-sm w-[90%] text-text-secondary mb-2 ">
        <span>Coin</span>
        <span>Precio</span>
        <span>24h</span>
        <span className="hidden md:block">Market Cap</span>
      </div>

      {error && (
        <p className="text-red-500 w-[100%] text-center">
          Error al cargar las monedas. Intenta de nuevo más tarde.
        </p>
      )}

      {loading && (
        <div className="w-[100%] flex justify-center items-center h-[200px]">
          <Spinner />
        </div>
       )}

       {!error && !loading &&
          coins.map((coin) => (
            <div
              key={coin.id}
              onClick={() => navigate(`/coin/${coin.id}`)}
              className="w-[90%] grid grid-cols-3 md:grid-cols-4 gap-5 md:gap-0 items-center py-2 cursor-pointer hover:bg-bg-main rounded-lg"
            >
              <div className="flex items-center gap-2">
                <img src={coin.image} className="w-6 h-6" />
                <span className="font-semibold uppercase text-sm md:text-base truncate text-text-primary">
                  {coin.symbol}
                </span>
              </div>

              <span>
                {formatNumber(coin.current_price, {
                  style: "currency",
                  currency: currency.toUpperCase(),
                })}
              </span>

              <span
                className={`truncate ${
                  coin.price_change_percentage_24h >= 0
                    ? "text-green-400"
                    : "text-red-400"
                }`}
              >
                {coin.price_change_percentage_24h != null
                  ? `${coin.price_change_percentage_24h.toFixed(2)}%`
                  : "—"}
              </span>

              <span className="hidden md:block">
                {formatNumber(coin.market_cap, { notation: "compact" })}
              </span>
            </div>
          ))
        }

      
      <div className="w-[90%] flex justify-between mt-4 md:w-[50%]">
        <button
          disabled={page === 1}
          onClick={() => setPage(p => p - 1)}
          className="px-4 py-2 rounded-lg bg-blue-500 text-sm text-text-primary hover:bg-blue-600 transition md:text-base disabled:opacity-40"
        >
          ← Prev
        </button>

        <span className="text-sm text-text-secondary self-center">
          Top {page * 10 - 9} – {page * 10}
        </span>

        <button
          onClick={() => setPage(p => p + 1)}
          className="px-4 py-2 rounded-lg bg-blue-500 text-sm text-text-primary hover:bg-blue-600 transition md:text-base"
        >
          Next →
        </button>
      </div>

    </div>
  );
};

export default CardTopCoinsMarket;
