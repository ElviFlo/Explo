import { useEffect, useRef } from "react";

export default function ConfirmDialog({
  isOpen,
  onClose,
  onConfirm,
  characterName,
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
      aria-labelledby="dialog-title"
      className="m-auto w-[92%] max-w-[520px] rounded-[24px] border-0 p-0 shadow-[0_20px_50px_rgba(15,23,42,0.22)] backdrop:bg-black/45"
      onCancel={onClose}
    >
      <div className="bg-white px-7 py-6 sm:px-8 sm:py-7">
        <div className="flex flex-col items-center text-center">
          <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-amber-100">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="h-7 w-7 text-amber-500"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M9.401 3.003c1.155-2 4.043-2 5.198 0l6.196 10.732c1.154 1.999-.289 4.498-2.598 4.498H5.803c-2.309 0-3.752-2.5-2.598-4.498L9.4 3.003Zm2.599 4.247a.75.75 0 0 1 .75.75v4.5a.75.75 0 0 1-1.5 0V8a.75.75 0 0 1 .75-.75Zm0 8.5a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z"
                clipRule="evenodd"
              />
            </svg>
          </div>

          <h2
            id="dialog-title"
            className="text-xl font-extrabold text-slate-900 sm:text-2xl"
          >
            Quitar de favoritos?
          </h2>

          <p className="mt-2 max-w-[420px] text-base leading-7 text-slate-500">
            Estas seguro de que quieres quitar a{" "}
            <span className="font-bold text-slate-700">{characterName}</span> de tus
            favoritos?
          </p>

          <div className="mt-6 flex items-center justify-center gap-3">
            <button
              type="button"
              onClick={onClose}
              className="rounded-2xl bg-slate-200 px-6 py-2.5 text-base font-semibold text-slate-600 transition hover:bg-slate-300"
            >
              Cancelar
            </button>

            <button
              type="button"
              onClick={onConfirm}
              className="rounded-2xl bg-red-500 px-6 py-2.5 text-base font-semibold text-white transition hover:bg-red-600"
            >
              Quitar
            </button>
          </div>
        </div>
      </div>
    </dialog>
  );
}