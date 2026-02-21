import React from "react";
import { useEffect } from "react";
import { fetchTrending } from "../../../redux/trendingSlice.js";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Spinner from "../../Spinner.jsx";


const CardTrendingMarket = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { results: coins, loading , error } = useSelector(state => state.trending);

  useEffect(() => {
    dispatch(fetchTrending());
  }, [dispatch]);

  let numeracion = 0;


  return (
    <div className="w-[100%] min-h-[400px] bg-bg-card rounded-xl flex flex-col justify-center items-center p-4">
      <h2 className="text-xl text-text-primary font-bold mb-4 w-full md:text-center">Trending 🔥</h2>

      {loading && (
        <div className="w-[100%] flex justify-center items-center h-[200px]">
          <Spinner />
        </div>
      )}

      {error && (
        <p className="text-red-500 w-[100%] h-[200px] text-center">
          Error al cargar las monedas. Intenta de nuevo más tarde.
        </p>
      )}

      {!loading && !error &&
        coins.map(({ item }) => (
          <div
            key={item.id}
            onClick={() => navigate(`/coin/${item.id}`)}
            className="w-full md:w-[60%] flex justify-between items-center gap-3 py-2 cursor-pointer hover:bg-bg-main rounded-lg"
          >
            <div className="w-[50%] flex items-center justify-start gap-1 px-2">
              <span className="text-text-secondary font-bold mr-1">{++numeracion}</span>
              <img src={item.small} className="w-6 h-6" />
              <span className="font-semibold text-text-primary truncate">{item.name}</span>
            </div>
            <div className="w-[25%] text-center">
              <span className="ml-auto text-text-secondary">
              #{item.market_cap_rank}
            </span>
            </div>
          </div>
        ))
      };

    </div>
  );
};

export default CardTrendingMarket;
