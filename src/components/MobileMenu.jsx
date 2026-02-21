import React from 'react';
import { NavLink } from 'react-router-dom';
import { useUI } from "../hooks/useComponentsUI.jsx";

const MobileMenu = () => {

    const {
        isOpen,
        toggleMenu,
    } = useUI();

    return (
       <div className={`w-[50vw] h-screen bg-bg-card shadow-card fixed top-0 right-0 z-50 flex flex-col p-6 space-y-8 md:hidden ${isOpen ? "translate-x-0" : "translate-x-full"} transition-transform duration-300`}>
            <i 
                className="bi bi-x-lg text-white text-3xl hover:cursor-pointer hover:text-red-600 self-end"
                aria-label="Cerrar menú"
                onClick={toggleMenu}
            ></i>
            <nav className='w-full'>
                <NavLink
                to="/"
                end
                onClick={toggleMenu}
                className={({ isActive }) =>
                    `relative block px-4 py-3 mb-4 rounded-lg font-sans font-bold text-lg
                    transition-all duration-300 overflow-hidden
                    ${
                    isActive
                        ? "bg-blue-500 text-white"
                        : "bg-card text-text-primary hover:text-white"
                    }
                    before:content-[''] before:absolute before:inset-0
                    before:bg-blue-500 before:scale-x-0
                    before:origin-left before:transition-transform before:duration-300
                    hover:before:scale-x-100
                    ${isActive ? "before:scale-x-100" : ""}
                    `
                }
                >
                <span className="relative z-10">Home</span>
                </NavLink>

                <NavLink
                to="/market"
                onClick={toggleMenu}
                className={({ isActive }) =>
                    `relative block px-4 py-3 mb-4 rounded-lg font-sans font-bold text-lg
                    transition-all duration-300 overflow-hidden
                    ${
                        isActive
                            ? "bg-blue-500 text-white"
                            : "bg-card text-text-primary hover:text-white"
                    }
                    before:content-[''] before:absolute before:inset-0
                    before:bg-blue-500 before:scale-x-0
                    before:origin-left before:transition-transform before:duration-300
                    hover:before:scale-x-100
                    ${isActive ? "before:scale-x-100" : ""}
                    `
                }
                >
                <span className="relative z-10">Market</span>
                </NavLink>

                <NavLink
                to="/favoritos"
                onClick={toggleMenu}
                className={({ isActive }) =>
                    `relative block px-4 py-3 mb-4 rounded-lg font-sans font-bold text-lg
                    transition-all duration-300 overflow-hidden
                    ${
                        isActive
                            ? "bg-blue-500 text-white"
                            : "bg-card text-text-primary hover:text-white"
                    }
                    before:content-[''] before:absolute before:inset-0
                    before:bg-blue-500 before:scale-x-0
                    before:origin-left before:transition-transform before:duration-300
                    hover:before:scale-x-100
                    ${isActive ? "before:scale-x-100" : ""}
                    `
                }
                >
                <span className="relative z-10">Favoritos</span>
                </NavLink>
            </nav>
       </div>
    )
}

export default MobileMenu