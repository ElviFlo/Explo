import { useEffect, useRef, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { fetchCharacterById } from "../services/api";
import LoadingState from "../components/LoadingState";
import ErrorState from "../components/ErrorState";
import ConfirmDialog from "../components/ConfirmDialog";
import { useFavorites } from "../context/FavoritesContext";

function translateStatus(status) {
  if (status === "Alive") return "Vivo";
  if (status === "Dead") return "Muerto";
  return "Desconocido";
}

function translateSpecies(species) {
  if (species === "Human") return "Humano";
  return species || "Desconocida";
}

function translateGender(gender) {
  if (gender === "Male") return "Masculino";
  if (gender === "Female") return "Femenino";
  if (gender === "Genderless") return "Sin género";
  return "Desconocido";
}

function translateLocation(name) {
  if (name === "Citadel of Ricks") return "Ciudadela de Ricks";
  if (name === "Earth (C-137)") return "Tierra (C-137)";
  if (name === "Earth (Replacement Dimension)") return "Tierra (Reemplazo)";
  return name || "Desconocida";
}

export default function CharacterDetailPage() {
  const { id } = useParams();
  const location = useLocation();

  const backTo = location.state?.from || "/explorar";
  const backLabel =
    backTo === "/favoritos" ? "← Volver a favoritos" : "← Volver a explorar";

  const [character, setCharacter] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  const { addFavorite, removeFavorite, isFavorite } = useFavorites();
  const hasShownInitialToast = useRef(false);

  const loadCharacter = async ({ showSuccessToast = false } = {}) => {
    try {
      setLoading(true);
      setError("");

      const data = await fetchCharacterById(id);
      setCharacter(data);

      if (showSuccessToast || !hasShownInitialToast.current) {
        toast.success("Datos cargados correctamente", {
          id: `detail-page-loaded-${id}`,
        });
        hasShownInitialToast.current = true;
      }
    } catch (err) {
      setError(err.message);
      toast.error("Falló la carga del detalle", {
        id: `detail-page-error-${id}`,
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    hasShownInitialToast.current = false;
    loadCharacter();
  }, [id]);

  if (loading) return <LoadingState message="Cargando detalle..." />;

  if (error) {
    return (
      <ErrorState
        message={error}
        onRetry={() => loadCharacter({ showSuccessToast: true })}
      />
    );
  }

  const favorite = isFavorite(character.id);

  const handleFavoriteAction = () => {
    if (favorite) {
      setIsConfirmOpen(true);
      return;
    }

    addFavorite(character);
  };

  const handleConfirmRemove = () => {
    removeFavorite(character.id);
    setIsConfirmOpen(false);
  };

  return (
    <>
      <section className="w-full px-4 py-8">
        <div className="mx-auto max-w-[820px]">
          <p className="mb-6 text-sm font-medium text-cyan-600">
            <Link to={backTo} className="hover:underline">
              {backLabel}
            </Link>
          </p>

          <div className="overflow-hidden rounded-[24px] bg-white shadow-[0_8px_24px_rgba(15,23,42,0.08)]">
            <div className="grid items-stretch md:grid-cols-[320px_1fr]">
              <div className="h-full">
                <img
                  src={character.image}
                  alt={`Imagen de ${character.name}`}
                  className="h-full min-h-[390px] w-full object-cover"
                />
              </div>

              <div className="flex flex-col justify-between px-8 py-8 md:px-10 md:py-8">
                <div>
                  <h1 className="text-3xl font-extrabold leading-none text-slate-900 md:text-4xl">
                    {character.name}
                  </h1>

                  <div className="mt-5 space-y-3 text-base text-slate-500">
                    <p>
                      Estado:{" "}
                      <span className="text-slate-900">
                        {translateStatus(character.status)}
                      </span>
                    </p>
                    <p>
                      Especie:{" "}
                      <span className="text-slate-900">
                        {translateSpecies(character.species)}
                      </span>
                    </p>
                    <p>
                      Género:{" "}
                      <span className="text-slate-900">
                        {translateGender(character.gender)}
                      </span>
                    </p>
                    <p>
                      Origen:{" "}
                      <span className="text-slate-900">
                        {translateLocation(character.origin?.name)}
                      </span>
                    </p>
                    <p>
                      Ubicación:{" "}
                      <span className="text-slate-900">
                        {translateLocation(character.location?.name)}
                      </span>
                    </p>
                    <p>
                      Episodios:{" "}
                      <span className="text-slate-900">
                        {character.episode?.length ?? 0}
                      </span>
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleFavoriteAction}
                  className={`mt-7 inline-flex w-fit items-center gap-2.5 rounded-xl px-5 py-2.5 text-sm font-semibold transition ${
                    favorite
                      ? "bg-red-500 text-white hover:bg-red-600"
                      : "bg-cyan-500 text-slate-950 hover:bg-cyan-400"
                  }`}
                >
                  {favorite ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="h-4 w-4"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.5 4.478a49.152 49.152 0 0 0-9 0 2.25 2.25 0 0 0-2.114 1.836L4.57 10.5H3a.75.75 0 0 0 0 1.5h.99l.85 7.083A2.25 2.25 0 0 0 7.074 21h9.852a2.25 2.25 0 0 0 2.234-1.917L20.01 12H21a.75.75 0 0 0 0-1.5h-1.57l-.816-4.186A2.25 2.25 0 0 0 16.5 4.478ZM9.75 8.25a.75.75 0 0 1 .75.75v6a.75.75 0 0 1-1.5 0V9a.75.75 0 0 1 .75-.75Zm4.5 0A.75.75 0 0 1 15 9v6a.75.75 0 0 1-1.5 0V9a.75.75 0 0 1 .75-.75Z"
                        clipRule="evenodd"
                      />
                      <path d="M9 3.75A1.5 1.5 0 0 1 10.5 2.25h3A1.5 1.5 0 0 1 15 3.75V4.5H9V3.75Z" />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="h-4 w-4"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l1.082 2.605a1.125 1.125 0 0 0 .95.69l2.81.225c1.162.093 1.636 1.538.75 2.305l-2.14 1.85a1.125 1.125 0 0 0-.364 1.118l.653 2.754c.27 1.139-.964 2.005-1.96 1.396l-2.41-1.473a1.125 1.125 0 0 0-1.172 0l-2.41 1.473c-.996.61-2.23-.257-1.96-1.396l.653-2.754a1.125 1.125 0 0 0-.364-1.118l-2.14-1.85c-.886-.767-.412-2.212.75-2.305l2.81-.225a1.125 1.125 0 0 0 .95-.69l1.082-2.605Z"
                        clipRule="evenodd"
                      />
                    </svg>
                  )}

                  {favorite ? "Quitar de favoritos" : "Agregar a favoritos"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <ConfirmDialog
        isOpen={isConfirmOpen}
        characterName={character.name}
        onClose={() => setIsConfirmOpen(false)}
        onConfirm={handleConfirmRemove}
      />
    </>
  );
}