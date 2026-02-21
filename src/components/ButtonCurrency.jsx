import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { toggleCurrency } from "../redux/currencySlice.js";


const ButtonCurrency = () => {
    const dispatch = useDispatch();
    const currency = useSelector((state) => state.currency.value);

    return (
        <button
            onClick={() => dispatch(toggleCurrency())}
            className="px-3 py-1 h-10 rounded-lg bg-blue-500 text-text-primary text-sm font-bold hover:bg-blue-600 transition"
        >
            {currency === "usd" ? "USD $" : "MXN $"}
        </button>
    );
};

export default ButtonCurrency;