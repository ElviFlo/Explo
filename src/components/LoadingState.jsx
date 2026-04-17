export default function LoadingState({ message = "Cargando datos..." }) {
  return (
    <div
      className="flex min-h-[65vh] flex-col items-center justify-center"
      role="status"
      aria-live="polite"
    >
      <div className="mb-4 h-10 w-10 animate-spin rounded-full border-4 border-cyan-300 border-t-cyan-600"></div>
      <p className="text-slate-600">{message}</p>
    </div>
  );
}