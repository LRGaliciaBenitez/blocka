import React from "react"
import Header from "../components/Header"
import MobileMenu from "../components/MobileMenu.jsx"
import CardTopCoins from "../components/cards/cardTopCoins/CardTopCoins.jsx"
import CardTrending from "../components/cards/CardTrending/CardTrending.jsx"
import SearchContainer from "../components/SearchContainer.jsx"

const Home = () => {

    return (
        <div className="bg-bg-main w-full h-screen flex flex-col items-center py-4">
            <Header />
            <SearchContainer />
            <MobileMenu />
            <div className="bg-bg-card w-[90vw] max-h-[calc(100vh-12rem)] rounded-xl shadow-card p-6">
                <div className="w-full h-[calc(100vh-15rem)] grid grid-cols-1 gap-4 md:grid-cols-4 md:grid-rows-4">
                    <div className="col-start-1 col-end-5 row-start-1 row-end-3 md:col-end-3 md:row-end-5 max-h-[100%] overflow-hidden md:max-h-[100%]">
                        <CardTopCoins />
                    </div>
                    <div className="col-start-1 col-end-5 row-start-3 row-end-5 md:col-start-3 md:col-end-5 md:row-start-1 md:row-end-5 max-h-[100%] overflow-hidden md:max-h-[100%]">
                        <CardTrending />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home
