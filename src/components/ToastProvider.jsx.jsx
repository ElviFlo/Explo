export default function ToastContainer({ toasts, onClose }) {
  return (
    <div
      className="fixed right-4 top-20 z-50 flex w-[min(360px,calc(100vw-2rem))] flex-col gap-3"
      aria-live="polite"
      aria-atomic="true"
    >
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`rounded-xl border px-4 py-3 shadow-lg ${
            toast.type === "success"
              ? "border-emerald-200 bg-emerald-50 text-emerald-800"
              : toast.type === "error"
              ? "border-red-200 bg-red-50 text-red-800"
              : "border-cyan-200 bg-cyan-50 text-cyan-800"
          }`}
          role="status"
        >
          <div className="flex items-start justify-between gap-3">
            <p className="text-sm font-medium">{toast.message}</p>
            <button
              onClick={() => onClose(toast.id)}
              aria-label="Cerrar notificación"
              className="text-xs font-bold"
            >
              ✕
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}