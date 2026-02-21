import React from "react";
import Header from "../components/Header";
import MobileMenu from "../components/MobileMenu.jsx";
import SearchContainer from "../components/SearchContainer.jsx";
import CardTopCoinsMarket from "../components/cards/cardTopCoinsMarket/CardTopCoinsMarket.jsx";
import CardTrendingMarket from "../components/cards/CardTrendingMarket/CardTrendingMarket.jsx";
import CardAllCoinsMarket from "../components/cards/cardAllCoinsMarket/CardAllCoinsMarket.jsx";


const Market = () => {

    return (
        <div className="bg-bg-main w-full h-full flex flex-col justify-center items-center py-4">
            <Header />
            <SearchContainer />
            <MobileMenu />

            <div className="w-[90vw] flex flex-col items-center gap-4">
                <CardTopCoinsMarket />
                <CardAllCoinsMarket />
                <CardTrendingMarket />
            </div>

        </div>
    )
}

export default Market