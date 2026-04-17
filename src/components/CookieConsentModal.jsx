import { useEffect, useRef } from "react";

export default function CookieConsentModal({
  isOpen,
  onAccept,
  onReject,
  onCustomize,
}) {
  const dialogRef = useRef(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (isOpen && !dialog.open) {
      dialog.showModal();
    }

    if (!isOpen && dialog.open) {
      dialog.close();
    }
  }, [isOpen]);

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby="cookie-dialog-title"
      className="m-auto w-[92%] max-w-[460px] rounded-[24px] border-0 p-0 shadow-[0_20px_50px_rgba(15,23,42,0.28)] backdrop:bg-black/45"
    >
      <div className="bg-white px-6 py-6 sm:px-7 sm:py-7">
        <div className="flex items-start gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-amber-100 text-2xl">
            🍪
          </div>

          <div>
            <h2
              id="cookie-dialog-title"
              className="text-lg font-extrabold text-slate-900"
            >
              Usamos cookies para mejorar tu experiencia
            </h2>

            <p className="mt-2 text-sm leading-6 text-slate-600">
              Utilizamos cookies para personalizar contenido, analizar el tráfico
              y ofrecer una mejor experiencia dentro de la plataforma.
            </p>
          </div>
        </div>

        <div className="mt-6 rounded-2xl bg-slate-50 p-4">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
            Preferencias recomendadas
          </p>
          <p className="mt-2 text-sm text-slate-600">
            Aceptar todas las cookies nos ayuda a brindarte una experiencia más
            rápida y personalizada.
          </p>
        </div>

        <div className="mt-6 flex flex-col gap-3">
          <button
            type="button"
            onClick={onAccept}
            className="rounded-xl bg-cyan-500 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400"
          >
            Aceptar todas
          </button>

          <button
            type="button"
            onClick={onCustomize}
            className="rounded-xl bg-slate-100 px-5 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-200"
          >
            Personalizar
          </button>

          <button
            type="button"
            onClick={onReject}
            className="text-xs font-medium text-slate-400 transition hover:text-slate-500"
          >
            Rechazar
          </button>
        </div>

        {/*
          Dark pattern intencional:
          "Aceptar todas" es el botón más grande, más visible y con más contraste,
          mientras que "Rechazar" queda minimizado como un texto pequeño.
          Esto empuja visualmente al usuario hacia la opción favorable.
          En esta tarea es decorativo y no almacena cookies reales.
        */}
      </div>
    </dialog>
  );
}