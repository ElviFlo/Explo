import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <section className="flex flex-1 w-full items-center justify-center px-4 text-center">
      <div className="flex flex-col items-center">
        <p className="text-7xl font-extrabold text-cyan-500 md:text-8xl">
          404
        </p>

        <h1 className="mt-4 text-3xl font-bold text-slate-900">
          Página no encontrada
        </h1>

        <p className="mt-2 text-slate-500">
          La ruta que buscas no existe en esta aplicación.
        </p>

        <Link
          to="/"
          className="mt-8 rounded-xl bg-cyan-500 px-8 py-3 font-semibold text-slate-950 transition hover:bg-cyan-400"
        >
          Volver al inicio
        </Link>
      </div>
    </section>
  );
}