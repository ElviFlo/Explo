import { Link, useLocation } from "react-router-dom";
import { useFavorites } from "../context/FavoritesContext";

export default function CharacterCard({ character, onAskRemove }) {
  const { addFavorite, isFavorite } = useFavorites();
  const location = useLocation();

  const locationName = character.location?.name || "Desconocida";
  const statusText = character.status || "Desconocido";
  const speciesText = character.species || "Desconocida";
  const favorite = isFavorite(character.id);

  const handleFavoriteClick = (event) => {
    event.preventDefault();
    event.stopPropagation();

    if (favorite) {
      onAskRemove?.(character);
      return;
    }

    addFavorite(character);
  };

  return (
    <article className="overflow-hidden rounded-[22px] bg-white shadow-[0_6px_18px_rgba(15,23,42,0.08)] transition hover:-translate-y-1 hover:shadow-[0_10px_24px_rgba(15,23,42,0.12)]">
      <Link
        to={`/explorar/${character.id}`}
        state={{ from: location.pathname }}
        aria-label={`Ver detalle de ${character.name}`}
        className="block"
      >
        <div className="relative">
          <img
            src={character.image}
            alt={`Imagen de ${character.name}`}
            className="h-56 w-full object-cover"
          />

          <button
            type="button"
            onClick={handleFavoriteClick}
            aria-label={
              favorite
                ? `Quitar a ${character.name} de favoritos`
                : `Agregar a ${character.name} a favoritos`
            }
            className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full bg-white/95 shadow-md transition hover:scale-105"
          >
            <span
              className={`text-xl ${
                favorite ? "text-amber-400" : "text-slate-400"
              }`}
            >
              ★
            </span>
          </button>
        </div>
      </Link>

      <div className="space-y-3 px-6 py-5">
        <Link
          to={`/explorar/${character.id}`}
          state={{ from: location.pathname }}
          aria-label={`Abrir detalle de ${character.name}`}
          className="block"
        >
          <h3 className="text-2xl font-extrabold text-slate-900">
            {character.name}
          </h3>
        </Link>

        <div className="space-y-1 text-base text-slate-600">
          <p>
            Estado: <span className="font-semibold text-slate-800">{statusText}</span>
          </p>
          <p>
            Especie: <span className="font-semibold text-slate-800">{speciesText}</span>
          </p>
        </div>

        <div className="pt-1">
          <span className="inline-flex rounded-full bg-cyan-100 px-4 py-1.5 text-sm font-semibold text-cyan-700">
            {locationName}
          </span>
        </div>
      </div>
    </article>
  );
}