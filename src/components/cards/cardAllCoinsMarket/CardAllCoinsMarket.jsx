import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  fetchAllCoins,
  nextPage,
  prevPage,
} from "../../../redux/allCoinsSlice.js";
import Spinner from "../../Spinner.jsx";

/* ===== Helpers ===== */
const formatNumber = (value, currency) => {
  if (value === null || value === undefined) return "—";

  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency.toUpperCase(),
    currencyDisplay: "code", // MXN / USD
    minimumFractionDigits: 2,
  }).format(value);
};

/* ===== Component ===== */
const CardAllCoinsMarket = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { results, loading, page, error } = useSelector((s) => s.allCoins);
  const currency = useSelector((s) => s.currency.value);

  useEffect(() => {
    dispatch(fetchAllCoins());
  }, [dispatch, currency, page]);

  return (
    <div className="w-full min-h-[400px] bg-bg-card rounded-xl flex flex-col items-center p-4">
      <h2 className="text-xl font-bold mb-4 w-[90%] text-text-primary">
        All Coins
      </h2>

      {loading && (
        <div className="w-full flex justify-center items-center h-[200px]">
          <Spinner />
        </div>
      )}

      {error && (
        <p className="text-red-500 w-full h-[200px] text-center">
          Error al cargar las monedas. Intenta más tarde.
        </p>
      )}

      {!loading && !error && (
        <>
          {/* Header */}
          <div className="grid grid-cols-3 md:grid-cols-4 gap-5 md:gap-0 text-sm w-[90%] text-text-secondary mb-2">
            <span>Coin</span>
            <span>Price</span>
            <span>24h</span>
            <span className="hidden md:block">Market Cap</span>
          </div>

          {/* Rows */}
          {results.map((coin) => (
            <div
              key={coin.id}
              onClick={() => navigate(`/coin/${coin.id}`)}
              className="w-[90%] grid grid-cols-3 md:grid-cols-4 gap-5 md:gap-0 items-center py-2 cursor-pointer hover:bg-bg-main rounded-lg"
            >
              <div className="flex items-center gap-2 truncate">
                <img src={coin.image} alt={coin.name} className="w-6 h-6" />
                <span className="text-text-primary text-sm md:text-base uppercase font-semibold truncate">
                  {coin.symbol}
                </span>
              </div>

              <span className="text-text-primary truncate">
                {formatNumber(coin.current_price, currency)}
              </span>

              <span
                className={
                  coin.price_change_percentage_24h >= 0
                    ? "text-green-400"
                    : "text-red-400"
                }
              >
                {coin.price_change_percentage_24h?.toFixed(2) ?? "—"}%
              </span>

              <span className="text-text-secondary truncate hidden md:block">
                {formatNumber(coin.market_cap, currency)}
              </span>
            </div>
          ))}

          {/* Pagination */}
          <div className="w-[90%] flex justify-between mt-4 md:w-[50%]">
            <button
              onClick={() => dispatch(prevPage())}
              disabled={page === 1}
              className="px-4 py-2 rounded-lg bg-blue-500 text-sm text-text-primary hover:bg-blue-600 transition md:text-base disabled:opacity-40"
            >
              ⬅ Prev
            </button>

            <span className="text-sm text-text-secondary self-center">Page {page}</span>

            <button
              onClick={() => dispatch(nextPage())}
              className="px-4 py-2 rounded-lg bg-blue-500 text-sm text-text-primary hover:bg-blue-600 transition md:text-base"
            >
              Next ➡
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default CardAllCoinsMarket;
