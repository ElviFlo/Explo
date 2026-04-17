export default function ErrorState({ message = "No se pudo cargar la información.", onRetry }) {
  return (
    <div
      className="mx-auto my-8 max-w-md rounded-xl bg-white p-6 text-center shadow"
      role="alert"
      aria-live="assertive"
    >
      <p className="mb-4 text-red-600">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="rounded-lg bg-red-500 px-4 py-2 text-white hover:bg-red-600"
        >
          Reintentar
        </button>
      )}
    </div>
  );
}