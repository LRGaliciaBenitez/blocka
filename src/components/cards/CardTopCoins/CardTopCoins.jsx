import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchTopCoins } from '../../../redux/topCoinsSlice.js'
import { NavLink } from 'react-router-dom'
import CoinRow from './CoinRow.jsx'

const CardTopCoins = () => {
  const dispatch = useDispatch();
  const { results, loading, error } = useSelector(
    (state) => state.topCoins
  );

  const currency = useSelector((state) => state.currency.value);

  const SkeletonRow = () => (
  <div className="flex items-center justify-between p-2 animate-pulse w-full overflow-hidden">
      
      {/* Left */}
      <div className="flex items-center gap-3 min-w-0">
      <div className="w-6 h-6 bg-bg-hover rounded-full shrink-0" />

      <div className="space-y-1 min-w-0">
          <div className="h-3 bg-bg-hover rounded w-20 sm:w-24" />
          <div className="h-2 bg-bg-hover rounded w-12 sm:w-16" />
      </div>
      </div>

      {/* Right */}
      <div className="space-y-1 text-right shrink-0">
      <div className="h-3 bg-bg-hover rounded w-14 sm:w-20" />
      <div className="h-2 bg-bg-hover rounded w-10 sm:w-14" />
      </div>
  </div>
  );

  useEffect(() => {
    dispatch(fetchTopCoins());
  }, [dispatch, currency]);

  return (
    <div className="bg-bg-card w-full h-full rounded-xl shadow-card p-6 flex flex-col min-h-0">
      
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-text-primary font-bold text-xl">
          Top Coins
        </h2>

        <span className="text-text-secondary text-sm">
          Market Cap
        </span>
      </div>

      {/* Loading */}
      {loading && (
        <div className="flex-1 overflow-y-auto overflow-x-hidden space-y-3">
          {[...Array(4)].map((_, i) => (
            <SkeletonRow key={i} />
          ))}
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="flex-1 flex items-center justify-center text-red-500">
          Error al cargar datos
        </div>
      )}

      {/* List */}
      {!loading && !error && (
        <div className="flex-1 overflow-y-auto overflow-x-hidden space-y-3">
          {results.slice(0, 10).map((coin) => (
            <CoinRow key={coin.id} coin={coin} />
          ))}
        </div>
      )}

      {/* Footer */}
      <div className="mt-4 text-right">
        <NavLink
          to="/market"
          state={{ from: 'topCoins' }}
          className="text-blue-500 text-sm hover:underline"
        >
          Ver todas →
        </NavLink>
      </div>
    </div>
  );
};

export default CardTopCoins