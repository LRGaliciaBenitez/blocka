import React from "react";
import Search from "./Search";
import { useSelector } from "react-redux";
import Spinner from "./Spinner.jsx";
import SearchCard from "./cards/searchCard/searchCard.jsx";
import { useUI } from "../hooks/useComponentsUI.jsx";

const SearchContainer = () => {

    const {
        searchOpen,
        toggleSearch,
    } = useUI();

    const { results, loading, error } = useSelector(
        (state) => state.searchCoins
    );

    return(
        <section className={`w-full h-screen bg-bg-main fixed inset-0 z-[999] flex flex-col items-center p-6
        ${searchOpen ? "translate-x-0" : "translate-x-full"} transition-transform duration-300`}>

            <i 
                className="bi bi-x text-white text-3xl hover:cursor-pointer hover:text-red-600 self-end"
                onClick={toggleSearch}
            ></i>

            <Search />

            <div 
                className="w-[90%] h-[70vh] mt-6 p-4 overflow-y-auto"
            >

                {/* Loading */}
                {loading && (
                    <div className="w-full flex items-center justify-center">
                        <Spinner />
                    </div>
                )}

                {/* Error */}
                {error && (
                    <div className="w-full flex items-center justify-center text-red-500">
                        Error al cargar datos
                    </div>
                )}

                {/* List */}
                {!loading && !error && Array.isArray(results) && (
                    <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {results.map((coin) => (
                            <SearchCard key={coin.id} coin={coin} toggleSearch={toggleSearch} />
                        ))}
                    </div>
                )}

                {!loading && !error && results.length === 0 && (
                    <p className="text-text-secondary mt-4">
                        No se encontraron resultados
                    </p>
                )}

            </div>

        </section>
    )
}

export default SearchContainer