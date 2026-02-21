import { Route, Routes } from "react-router-dom"
import React from "react"
import Home from "./pages/Home.jsx"
import Market from "./pages/Market.jsx"
import Favoritos from "./pages/Favoritos.jsx"
import CoinDetail from "./pages/CoinDetail.jsx";


function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/market" element={<Market />} />
        <Route path="/favoritos" element={<Favoritos />} />
        <Route path="/coin/:id" element={<CoinDetail />} />
      </Routes>
    </>
  )
}

export default App
