import { Link } from "react-router-dom";

export default function Hero() {
  return (
    <section className="flex flex-1 bg-slate-900 text-white">
      <div className="mx-auto flex w-full max-w-6xl flex-1 flex-col items-center justify-center px-6 py-16 text-center">
        <p className="mb-3 text-xs uppercase tracking-[0.3em] text-cyan-400">
          Rick & Morty • Universo
        </p>

        <h1 className="mb-4 text-4xl font-extrabold md:text-6xl">
          Descubre el <span className="text-cyan-400">Universo</span>
        </h1>

        <p className="mb-8 max-w-2xl text-sm text-slate-300 md:text-base">
          Explora datos fascinantes de tu API favorita. Busca, filtra y guarda tus personajes favoritos.
        </p>

        <Link
          to="/explorar"
          className="rounded-lg bg-cyan-400 px-6 py-3 font-semibold text-slate-950 transition hover:bg-cyan-300"
        >
          Explorar ahora
        </Link>
      </div>
    </section>
  );
}