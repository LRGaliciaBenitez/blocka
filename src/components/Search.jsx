import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { fetchSearchCoins } from "../redux/searchCoinsSlice";
import { clearSearch } from "../redux/searchCoinsSlice";

const Search = () => {

    const [query, setQuery] = useState("");

    const dispatch = useDispatch();

    const handleSearch = () => {

        if(query.trim() === "") {
            dispatch(clearSearch());
            return;
        }

        dispatch(fetchSearchCoins(query));
    }

    return (
        <div className="w-[80%] h-12 md:h-14 bg-bg-card rounded-lg shadow-card flex">
            <input
                type="text"
                placeholder="Search..."
                value={query}
                onChange={(e) => {
                    const value = e.target.value;
                    setQuery(value);

                    if (value.trim() === "") {
                        dispatch(clearSearch());
                    }
                }}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                className="w-full h-full bg-bg-input rounded-lg px-4 text-text-primary placeholder-text-placeholder focus:outline-none"
            />
            <button 
                className="w-12 h-full flex items-center justify-center text-text-primary hover:text-text-secondary"
                onClick={handleSearch}
            >
                <i className="bi bi-search text-2xl"></i>
            </button>
        </div>
    )
}

export default Search;