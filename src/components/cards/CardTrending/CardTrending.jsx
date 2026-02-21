import React, {useEffect} from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchTrending } from "../../../redux/trendingSlice";
import { useNavigate } from "react-router-dom";


const CardTrending = () => {
    
    const dispatch = useDispatch();

    const navigate = useNavigate();

    const { results, loading, error } = useSelector(
        (state) => state.trending
    );

    useEffect(() => {
        if (results.length === 0) {
            dispatch(fetchTrending());
        }
    }, [dispatch, results.length]);

    return (
        <div className="bg-bg-card w-full h-full rounded-xl shadow-card p-6">
        
        <h2 className="text-text-primary font-bold text-xl mb-4">
            🔥 Trending
        </h2>

        {/* Loading */}
        {loading && (
            <div className="grid grid-cols-2 gap-4 animate-pulse">
            {[...Array(4)].map((_, i) => (
                <div key={i} className="h-16 bg-bg-hover rounded-lg" />
            ))}
            </div>
        )}

        {/* Error */}
        {error && (
            <div className="text-red-500 text-sm text-center py-6">
            Error al cargar trending
            </div>
        )}

        {/* Content */}
        {!loading && !error && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 overflow-y-auto overflow-x-hidden h-full py-5 px-2 lg:py-0">
            {results.slice(0, 6).map(({ item }) => (
                <div
                key={item.id}
                onClick={() => navigate(`/coin/${item.id}`)}
                className="flex items-center gap-3 px-2 bg-bg-hover rounded-lg
                            hover:scale-[1.02] transition cursor-pointer"
                >
                    <img
                        src={item.small}
                        alt={item.name}
                        className="w-8 h-8"
                    />

                    <div className="min-w-0">
                        <p className="text-text-primary font-semibold truncate">
                        {item.name}
                        </p>
                        <p className="text-text-secondary text-sm">
                        {item.symbol.toUpperCase()}
                        </p>
                    </div>
                </div>
            ))}
            </div>
        )}

        </div>
    );
}

export default CardTrending;