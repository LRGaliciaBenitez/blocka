import React from "react"
import logo from "../assets/logo_brocka.png";
import { NavLink } from "react-router-dom";
import ButtonCurrency from "./ButtonCurrency.jsx";
import { useUI } from "../hooks/useComponentsUI.jsx";

const Header = () => {

    const {
        toggleMenu,
        toggleSearch,
    } = useUI();

    return (
        <header className="bg-bg-card w-[90vw] h-32 shadow-card px-6 py-4 mb-4 flex items-center justify-between rounded-xl">
            <img src={logo} alt="Logo" className="size-24 object-contain border-2 border-border rounded-full" />
            <nav className="hidden md:flex space-x-6 items-center">
                <NavLink
                    to="/"
                    end
                    className={({ isActive }) =>
                    `relative font-sans font-bold text-lg lg:text-xl transition-colors duration-200
                    ${isActive ? "text-blue-500" : "text-text-primary hover:text-text-secondary"}
                    after:content-[''] after:absolute after:left-0 after:-bottom-1
                    after:h-[2px] after:w-full after:bg-blue-500
                    after:origin-left after:scale-x-0
                    after:transition-transform after:duration-300
                    hover:after:scale-x-100
                    ${isActive ? "after:scale-x-100" : ""}
                    `
                    }
                >
                    Home
                </NavLink>

                <NavLink
                    to="/market"
                    className={({ isActive }) =>
                    `relative font-sans font-bold text-lg lg:text-xl transition-colors duration-200
                    ${isActive ? "text-blue-500" : "text-text-primary hover:text-text-secondary"}
                    after:content-[''] after:absolute after:left-0 after:-bottom-1
                    after:h-[2px] after:w-full after:bg-blue-500
                    after:origin-left after:scale-x-0
                    after:transition-transform after:duration-300
                    hover:after:scale-x-100
                    ${isActive ? "after:scale-x-100" : ""}
                    `
                    }
                >
                    Market
                </NavLink>

                <NavLink
                    to="/favoritos"
                    className={({ isActive }) =>
                    `relative font-sans font-bold text-lg lg:text-xl transition-colors duration-200
                    ${isActive ? "text-blue-500" : "text-text-primary hover:text-text-secondary"}
                    after:content-[''] after:absolute after:left-0 after:-bottom-1
                    after:h-[2px] after:w-full after:bg-blue-500
                    after:origin-left after:scale-x-0
                    after:transition-transform after:duration-300
                    hover:after:scale-x-100
                    ${isActive ? "after:scale-x-100" : ""}
                    `
                    }
                >
                    Favoritos
                </NavLink>
            </nav>
            <div className="flex h-6 space-x-6 items-center">
                <ButtonCurrency />
                <i 
                    className="bi bi-search text-text-primary text-2xl lg:text-3xl hover:cursor-pointer hover:text-text-secondary"
                    aria-label="Buscar"
                    onClick={toggleSearch}
                ></i>
                <i 
                    className="bi bi-list text-text-primary text-2xl md:hidden hover:cursor-pointer hover:text-text-secondary"
                    aria-label="Abrir menú"
                    onClick={toggleMenu}
                ></i>
            </div>
        </header>
    )
}

export default Header