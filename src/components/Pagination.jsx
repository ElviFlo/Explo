export default function Pagination({ currentPage, totalPages, onPageChange }) {
  if (totalPages <= 1) return null;

  const getPages = () => {
    const pages = [];

    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i += 1) {
        pages.push(i);
      }
      return pages;
    }

    if (currentPage <= 3) {
      return [1, 2, 3, 4, 5];
    }

    if (currentPage >= totalPages - 2) {
      return [
        totalPages - 4,
        totalPages - 3,
        totalPages - 2,
        totalPages - 1,
        totalPages,
      ];
    }

    return [
      currentPage - 2,
      currentPage - 1,
      currentPage,
      currentPage + 1,
      currentPage + 2,
    ];
  };

  const visiblePages = getPages();

  return (
    <nav
      className="mt-10 flex flex-wrap items-center justify-center gap-2"
      aria-label="Paginación"
    >
      <button
        type="button"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="rounded-lg bg-slate-200 px-4 py-2 text-sm font-medium text-slate-800 transition hover:bg-slate-300 disabled:cursor-not-allowed disabled:opacity-50"
      >
        Anterior
      </button>

      {visiblePages[0] > 1 && (
        <>
          <button
            type="button"
            onClick={() => onPageChange(1)}
            className="rounded-lg bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow hover:bg-slate-100"
          >
            1
          </button>
          {visiblePages[0] > 2 && <span className="px-1 text-slate-500">...</span>}
        </>
      )}

      {visiblePages.map((page) => (
        <button
          key={page}
          type="button"
          onClick={() => onPageChange(page)}
          aria-label={`Ir a la página ${page}`}
          aria-current={currentPage === page ? "page" : undefined}
          className={`rounded-lg px-4 py-2 text-sm font-medium shadow transition ${
            currentPage === page
              ? "bg-cyan-500 text-white"
              : "bg-white text-slate-700 hover:bg-slate-100"
          }`}
        >
          {page}
        </button>
      ))}

      {visiblePages[visiblePages.length - 1] < totalPages && (
        <>
          {visiblePages[visiblePages.length - 1] < totalPages - 1 && (
            <span className="px-1 text-slate-500">...</span>
          )}
          <button
            type="button"
            onClick={() => onPageChange(totalPages)}
            className="rounded-lg bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow hover:bg-slate-100"
          >
            {totalPages}
          </button>
        </>
      )}

      <button
        type="button"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="rounded-lg bg-slate-200 px-4 py-2 text-sm font-medium text-slate-800 transition hover:bg-slate-300 disabled:cursor-not-allowed disabled:opacity-50"
      >
        Siguiente
      </button>
    </nav>
  );
}