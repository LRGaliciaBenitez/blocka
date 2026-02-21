import { useState } from "react";
import Header from "../components/Header";
import MobileMenu from "../components/MobileMenu.jsx";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toggleFavorite } from "../redux/favoritesSlice.js";
import SearchContainer from "../components/SearchContainer.jsx";


const Favoritos = () => {
  const favorites = useSelector(state => state.favorites.coins);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <section className="bg-bg-main min-h-screen w-full flex flex-col items-center p-6">

      <Header />
      <SearchContainer />
      <MobileMenu />

      {!favorites.length ? (
        <p className="text-center mt-10 text-text-secondary">
          No tienes favoritos aún ⭐
        </p>
      ) : (
        <div className={`w-[90vw]  grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 overflow-y-auto ${favorites.length < 3 ? "h-[50vh]" : "h-[70vh]"} md:${favorites.length < 5 ? "h-[50vh]" : "h-[70vh]"}`}>
          {favorites.map(coin => (
            <div
              key={coin.id}
              className="bg-bg-card p-4 rounded-xl gap-2 flex flex-col items-center"
            > 
              <div className="w-full flex justify-end">
                <button
                  onClick={() => dispatch(toggleFavorite(coin))}
                  className=" text-red-500 hover:text-red-700"
                  aria-label={`Eliminar ${coin.symbol} de favoritos`}
                >
                  <i className="bi bi-x-lg text-lg" />
                </button>
              </div>
              
              <div className="h-[90%] w-full flex flex-col items-center justify-center gap-4">
                <img src={coin.image} alt={coin.symbol} className="w-10" />
                <p className="font-bold uppercase text-text-primary">{coin.symbol}</p>

                <button
                  onClick={() => navigate(`/coin/${coin.id}`)}
                  className="text-sm text-blue-400 hover:underline"
                >
                  Ver
                </button>
              </div>
              
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default Favoritos;
