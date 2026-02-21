import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { fetchCoinDetail } from "../redux/coinDetailSlice";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "../components/Spinner.jsx";
import Header from "../components/Header.jsx";
import MobileMenu from "../components/MobileMenu.jsx";
import SearchContainer from "../components/SearchContainer.jsx";
import FavoriteButton from "../components/FavoriteButton.jsx";

const CoinDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCoinDetail(id));
  }, [id, dispatch]);

  const { results: coin, loading, error } = useSelector(
    (state) => state.coinDetail
  );

  const currency = useSelector((state) => state.currency.value);

  return (
    <section className="w-full min-h-screen bg-bg-main text-text-primary flex flex-col items-center p-6">

      <Header />
      <SearchContainer />
      <MobileMenu />

      {/* Loading */}
      {loading && (
        <div className="w-full h-screen flex items-center justify-center">
          <Spinner />
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="w-full flex items-center justify-center text-red-500">
          Error al cargar datos
        </div>
      )}

      {!loading && !error && coin && (() => {
        const price = coin.market_data.current_price[ currency ];
        const change24h = coin.market_data.price_change_percentage_24h ?? 0;

        return (
          <div className="w-[90vw] my-6">
            {/* Header */}
            <div className="flex items-center gap-4 mb-6">
              <img src={coin.image.large} alt={coin.name} className="w-14 h-14" />
              <div>
                <h1 className="text-2xl font-bold">
                  {coin.name}
                  <span className="uppercase text-text-secondary">
                    ({coin.symbol})
                  </span>
                </h1>
                <p className="text-sm text-text-secondary">
                  Rank #{coin.market_cap_rank}
                </p>
              </div>
              <div className="self-end ml-auto md:ml-4">
                <FavoriteButton 
                  coin={coin}
                />
              </div>
            </div>

            {/* Price */}
            <div className="bg-bg-card rounded-xl p-6 mb-6">
              <p className="text-3xl font-bold">
                ${price.toLocaleString()}
              </p>
              <p className={`mt-1 ${change24h >= 0 ? "text-green-500" : "text-red-500"}`}>
                {change24h.toFixed(2)}% (24h)
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <Stat label="Market Cap" value={`$${coin.market_data.market_cap[currency].toLocaleString()}`} />
              <Stat label="Volume 24h" value={`$${coin.market_data.total_volume[currency].toLocaleString()}`} />
              <Stat label="Circulating Supply" value={coin.market_data.circulating_supply.toLocaleString()} />
              <Stat label="Max Supply" value={coin.market_data.max_supply?.toLocaleString() || "∞"} />
            </div>

            {/* Description */}
            <div className="bg-bg-card rounded-xl p-6 mb-6">
              <h2 className="text-lg font-semibold mb-2">About</h2>
              <p className="text-sm text-text-secondary leading-relaxed">
                {coin.description?.en
                  ? `${coin.description.en.slice(0, 400)}...`
                  : "No description available."}
              </p>
            </div>

            {/* Links */}
            <div className="flex flex-wrap gap-4">
              {coin.links.homepage[0] && (
                <a href={coin.links.homepage[0]} target="_blank" className="btn hover:bg-blue-600 text-white px-4 py-2 rounded-lg">
                  Website
                </a>
              )}
              {coin.links.blockchain_site[0] && (
                <a href={coin.links.blockchain_site[0]} target="_blank" className="btn hover:bg-blue-600 text-white px-4 py-2 rounded-lg">
                  Explorer
                </a>
              )}
              {coin.links.repos_url.github[0] && (
                <a href={coin.links.repos_url.github[0]} target="_blank" className="btn hover:bg-blue-600 text-white px-4 py-2 rounded-lg">
                  GitHub
                </a>
              )}
            </div>
          </div>
        );
      })()}
    </section>
  );
};

const Stat = ({ label, value }) => (
  <div className="bg-bg-card rounded-xl p-4">
    <p className="text-sm text-text-secondary">{label}</p>
    <p className="font-semibold mt-1">{value}</p>
  </div>
);

export default CoinDetail;
