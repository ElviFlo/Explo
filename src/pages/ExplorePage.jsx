import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { fetchCharacters } from "../services/api";
import SearchBar from "../components/SearchBar";
import CharacterGrid from "../components/CharacterGrid";
import LoadingState from "../components/LoadingState";
import ErrorState from "../components/ErrorState";
import ConfirmDialog from "../components/ConfirmDialog";
import Pagination from "../components/Pagination";
import { useFavorites } from "../context/FavoritesContext";

export default function ExplorePage() {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

  const [selectedToRemove, setSelectedToRemove] = useState(null);

  const { removeFavorite } = useFavorites();

  const hasShownInitialToast = useRef(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setCurrentPage(1);
    }, 300);

    return () => clearTimeout(timeout);
  }, [search, statusFilter]);

  useEffect(() => {
    const loadCharacters = async () => {
      try {
        setLoading(true);
        setError("");

        const data = await fetchCharacters({
          page: currentPage,
          name: search,
          status: statusFilter,
        });

        setCharacters(data.results);
        setTotalPages(data.info.pages || 1);
        setTotalResults(data.info.count || 0);

        if (
          !hasShownInitialToast.current &&
          currentPage === 1 &&
          search.trim() === "" &&
          statusFilter === "all"
        ) {
          toast.success("Datos cargados correctamente", {
            id: "explore-page-loaded",
          });
          hasShownInitialToast.current = true;
        }
      } catch (err) {
        setError(err.message);
        toast.error("Falló la carga de personajes", {
          id: "explore-page-error",
        });
      } finally {
        setLoading(false);
      }
    };

    loadCharacters();
  }, [currentPage, search, statusFilter]);

  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleRetry = async () => {
    try {
      setLoading(true);
      setError("");

      const data = await fetchCharacters({
        page: currentPage,
        name: search,
        status: statusFilter,
      });

      setCharacters(data.results);
      setTotalPages(data.info.pages || 1);
      setTotalResults(data.info.count || 0);

      toast.success("Datos cargados correctamente", {
        id: "explore-retry-success",
      });
    } catch (err) {
      setError(err.message);
      toast.error("Falló la carga de personajes", {
        id: "explore-retry-error",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleConfirmRemove = () => {
    if (!selectedToRemove) return;
    removeFavorite(selectedToRemove.id);
    setSelectedToRemove(null);
  };

  return (
    <section>
      <div className="bg-[linear-gradient(90deg,#0b1731_0%,#132846_100%)] text-white">
        <div className="mx-auto max-w-6xl px-4 py-10 md:py-12">
          <div className="text-center">
            <h1 className="text-3xl font-extrabold md:text-5xl">
              Explorar <span className="text-cyan-400">Personajes</span>
            </h1>

            <p className="mx-auto mt-2 max-w-2xl text-base text-slate-300">
              Datos obtenidos en tiempo real desde la API
            </p>
          </div>

          <div className="mx-auto mt-8 max-w-3xl">
            <SearchBar
              search={search}
              setSearch={setSearch}
              statusFilter={statusFilter}
              setStatusFilter={setStatusFilter}
            />
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-4 py-10">
        {loading && <LoadingState message="Cargando personajes..." />}

        {error && !loading && (
          <ErrorState
            message={error}
            onRetry={handleRetry}
          />
        )}

        {!loading && !error && (
          <>
            <div className="mb-4 flex flex-col gap-2 text-sm text-slate-500 md:flex-row md:items-center md:justify-between">
              <p>
                Mostrando <span className="font-semibold">{characters.length}</span> resultados en esta página
              </p>
              <p>
                Total encontrados: <span className="font-semibold">{totalResults}</span>
              </p>
            </div>

            {characters.length > 0 ? (
              <>
                <CharacterGrid
                  characters={characters}
                  onAskRemove={setSelectedToRemove}
                />

                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                />
              </>
            ) : (
              <div className="rounded-2xl bg-white p-12 text-center shadow">
                <p className="text-slate-600">
                  No se encontraron personajes con esos filtros.
                </p>
              </div>
            )}
          </>
        )}
      </div>

      <ConfirmDialog
        isOpen={Boolean(selectedToRemove)}
        characterName={selectedToRemove?.name}
        onClose={() => setSelectedToRemove(null)}
        onConfirm={handleConfirmRemove}
      />
    </section>
  );
}