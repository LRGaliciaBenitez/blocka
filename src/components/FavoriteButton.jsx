import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { toggleFavorite } from "../redux/favoritesSlice";

const FavoriteButton = ({coin}) => {
  const dispatch = useDispatch();

  const favorites = useSelector(state => state.favorites.coins);

  if (!coin) return null;

  const isFavorite = favorites.some(c => c.id === coin.id);

  return (
    <motion.button
      onClick={() =>
        dispatch(
          toggleFavorite({
            id: coin.id,
            name: coin.name,
            symbol: coin.symbol,
            image: coin.image.small,
          })
        )
      }
      whileTap={{ scale: 1.4, rotate: 15 }}
      whileHover={{ scale: 1.1 }}
      transition={{ type: "spring", stiffness: 400, damping: 15 }}
      className={`w-12 h-12 rounded-full flex items-center justify-center
        ${isFavorite ? "bg-yellow-400 text-black" : "bg-bg-card text-text-secondary"}`}
    >
      <i className={`bi ${isFavorite ? "bi-star-fill" : "bi-star"} text-xl`} />
    </motion.button>
  );
};

export default FavoriteButton;
