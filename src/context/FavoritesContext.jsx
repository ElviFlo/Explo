import { createContext, useContext, useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";

const FavoritesContext = createContext();

export function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem("rm-favorites");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("rm-favorites", JSON.stringify(favorites));
  }, [favorites]);

  const isFavorite = (id) => favorites.some((item) => item.id === id);

  const addFavorite = (character) => {
    if (isFavorite(character.id)) return;

    setFavorites((prev) => [...prev, character]);

    toast(
      <span>
        <strong>{character.name}</strong> agregado a favoritos
      </span>,
      { icon: "⭐" }
    );
  };

  const removeFavorite = (id) => {
    const characterToRemove = favorites.find((item) => item.id === id);

    setFavorites((prev) => prev.filter((item) => item.id !== id));

    if (characterToRemove) {
      toast(
        <span>
          <strong>{characterToRemove.name}</strong> quitado de favoritos
        </span>,
        { icon: "🗑️" }
      );
    } else {
      toast("Personaje quitado de favoritos", { icon: "🗑️" });
    }
  };

  const value = useMemo(() => {
    return {
      favorites,
      addFavorite,
      removeFavorite,
      isFavorite,
    };
  }, [favorites]);

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  return useContext(FavoritesContext);
}