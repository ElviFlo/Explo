import { Link } from "react-router-dom";
import { useState } from "react";
import { useFavorites } from "../context/FavoritesContext";
import CharacterGrid from "../components/CharacterGrid";
import ConfirmDialog from "../components/ConfirmDialog";

export default function FavoritesPage() {
  const { favorites, removeFavorite } = useFavorites();
  const [selectedToRemove, setSelectedToRemove] = useState(null);

  const handleConfirmRemove = () => {
    if (!selectedToRemove) return;
    removeFavorite(selectedToRemove.id);
    setSelectedToRemove(null);
  };

  return (
    <section className="w-full px-8 py-10">
      <h1 className="text-4xl font-extrabold text-slate-900">
        Mis Favoritos
      </h1>

      <p className="mt-1 text-lg text-slate-500">
        {favorites.length} items guardados
      </p>

      {favorites.length > 0 ? (
        <div className="mt-8">
          <CharacterGrid
            characters={favorites}
            onAskRemove={setSelectedToRemove}
          />
        </div>
      ) : (
        <div className="flex min-h-[55vh] flex-col items-center justify-center text-center">
          <span className="text-7xl text-slate-300">★</span>

          <p className="mt-4 text-3xl text-slate-500">
            No tienes favoritos guardados
          </p>

          <Link
            to="/explorar"
            className="mt-5 text-2xl font-semibold text-cyan-500 transition hover:text-cyan-600"
          >
            Explorar y agregar algunos
          </Link>
        </div>
      )}

      <ConfirmDialog
        isOpen={Boolean(selectedToRemove)}
        characterName={selectedToRemove?.name}
        onClose={() => setSelectedToRemove(null)}
        onConfirm={handleConfirmRemove}
      />
    </section>
  );
}