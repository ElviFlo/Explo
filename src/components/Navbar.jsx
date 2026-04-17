import { NavLink, useLocation } from "react-router-dom";
import { useState } from "react";
import InlineLogo from "./InlineLogo";

const linkBase =
  "px-3 py-2 text-sm font-medium transition hover:text-cyan-400";
const activeClass = "text-cyan-400 border-b-2 border-cyan-400";
const mobileLinkBase =
  "block rounded-lg px-4 py-3 text-sm font-medium transition hover:bg-slate-900 hover:text-cyan-400";
const mobileActiveClass = "bg-slate-900 text-cyan-400";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const closeMenu = () => setIsOpen(false);

  const detailFrom = location.pathname.startsWith("/explorar/")
    ? location.state?.from
    : null;

  const isInicioActive = location.pathname === "/";
  const isExplorarActive =
    location.pathname === "/explorar" ||
    (location.pathname.startsWith("/explorar/") && detailFrom !== "/favoritos");
  const isFavoritosActive =
    location.pathname === "/favoritos" ||
    (location.pathname.startsWith("/explorar/") && detailFrom === "/favoritos");
  const isContactoActive = location.pathname === "/contacto";

  return (
    <header className="sticky top-0 z-40 bg-slate-950 text-white shadow">
      <nav className="mx-auto max-w-7xl px-4 py-4" aria-label="Navegación principal">
        <div className="flex items-center justify-between gap-4">
          <NavLink
            to="/"
            className="flex min-w-0 items-center"
            aria-label="Ir al inicio"
            onClick={closeMenu}
          >
            <InlineLogo />
          </NavLink>

          <button
            type="button"
            onClick={() => setIsOpen((prev) => !prev)}
            className="inline-flex items-center justify-center rounded-lg p-2 text-white transition hover:bg-slate-900 md:hidden"
            aria-label={isOpen ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
          >
            {isOpen ? (
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-6 w-6" aria-hidden="true">
                <path d="M6 6l12 12M18 6L6 18" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-6 w-6" aria-hidden="true">
                <path d="M4 7h16M4 12h16M4 17h16" />
              </svg>
            )}
          </button>

          <div className="hidden items-center gap-2 md:flex">
            <NavLink to="/" className={`${linkBase} ${isInicioActive ? activeClass : ""}`}>
              Inicio
            </NavLink>

            <NavLink to="/explorar" className={`${linkBase} ${isExplorarActive ? activeClass : ""}`}>
              Explorar
            </NavLink>

            <NavLink to="/favoritos" className={`${linkBase} ${isFavoritosActive ? activeClass : ""}`}>
              Favoritos
            </NavLink>

            <NavLink to="/contacto" className={`${linkBase} ${isContactoActive ? activeClass : ""}`}>
              Contacto
            </NavLink>
          </div>
        </div>

        {isOpen && (
          <div id="mobile-menu" className="mt-4 rounded-2xl bg-slate-950/95 p-2 shadow-lg md:hidden">
            <NavLink to="/" onClick={closeMenu} className={`${mobileLinkBase} ${isInicioActive ? mobileActiveClass : ""}`}>
              Inicio
            </NavLink>

            <NavLink to="/explorar" onClick={closeMenu} className={`${mobileLinkBase} ${isExplorarActive ? mobileActiveClass : ""}`}>
              Explorar
            </NavLink>

            <NavLink to="/favoritos" onClick={closeMenu} className={`${mobileLinkBase} ${isFavoritosActive ? mobileActiveClass : ""}`}>
              Favoritos
            </NavLink>

            <NavLink to="/contacto" onClick={closeMenu} className={`${mobileLinkBase} ${isContactoActive ? mobileActiveClass : ""}`}>
              Contacto
            </NavLink>
          </div>
        )}
      </nav>
    </header>
  );
}