import { useEffect, useRef, useState } from "react";

const STATUS_OPTIONS = [
  { label: "Todos los estados", value: "all" },
  { label: "Vivo", value: "Alive" },
  { label: "Muerto", value: "Dead" },
  { label: "Desconocido", value: "unknown" },
];

export default function SearchBar({
  search,
  setSearch,
  statusFilter,
  setStatusFilter,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const selectedOption =
    STATUS_OPTIONS.find((option) => option.value === statusFilter) ||
    STATUS_OPTIONS[0];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!dropdownRef.current?.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSelect = (value) => {
    setStatusFilter(value);
    setIsOpen(false);
  };

  return (
    <div className="flex flex-col items-center gap-3 lg:flex-row lg:items-center lg:justify-center">
      <div className="flex w-full max-w-[500px] overflow-hidden rounded-xl bg-white shadow-[0_6px_18px_rgba(15,23,42,0.10)]">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Buscar personaje..."
          aria-label="Buscar personaje"
          className="w-full px-4 py-3 text-base text-slate-700 outline-none placeholder:text-slate-400"
        />

        <button
          type="button"
          aria-label="Buscar"
          className="bg-cyan-500 px-6 py-3 text-base font-semibold text-slate-950 transition hover:bg-cyan-400"
        >
          Buscar
        </button>
      </div>

      <div ref={dropdownRef} className="relative w-full max-w-[260px]">
        <button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          aria-haspopup="listbox"
          aria-expanded={isOpen}
          aria-label="Filtrar por estado"
          className="flex w-full items-center justify-between rounded-xl bg-white px-4 py-3 text-left text-base text-slate-800 shadow-[0_8px_24px_rgba(15,23,42,0.10)] outline-none transition hover:bg-slate-50 focus:ring-2 focus:ring-cyan-200"
        >
          <span>{selectedOption.label}</span>

          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className={`h-5 w-5 text-slate-500 transition-transform ${
              isOpen ? "rotate-180" : ""
            }`}
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M5.23 7.21a.75.75 0 0 1 1.06.02L10 11.168l3.71-3.938a.75.75 0 1 1 1.08 1.04l-4.25 4.51a.75.75 0 0 1-1.08 0l-4.25-4.51a.75.75 0 0 1 .02-1.06Z"
              clipRule="evenodd"
            />
          </svg>
        </button>

        {isOpen && (
          <div
            role="listbox"
            aria-label="Opciones de estado"
            className="absolute left-0 right-0 top-[calc(100%+8px)] z-30 overflow-hidden rounded-xl bg-white shadow-[0_12px_30px_rgba(15,23,42,0.18)]"
          >
            {STATUS_OPTIONS.map((option) => {
              const isSelected = option.value === statusFilter;

              return (
                <button
                  key={option.value}
                  type="button"
                  role="option"
                  aria-selected={isSelected}
                  onClick={() => handleSelect(option.value)}
                  className={`flex w-full items-center px-4 py-3 text-left text-base transition ${
                    isSelected
                      ? "bg-cyan-500 font-semibold text-slate-950"
                      : "text-slate-700 hover:bg-slate-100"
                  }`}
                >
                  {option.label}
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}