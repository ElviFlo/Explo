import { useMemo, useState } from "react";
import toast from "react-hot-toast";

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [sending, setSending] = useState(false);
  const [touched, setTouched] = useState({});

  const errors = useMemo(() => {
    const newErrors = {};

    if (!form.name.trim()) {
      newErrors.name = "El nombre es obligatorio";
    } else if (form.name.trim().length < 3) {
      newErrors.name = "Debe tener al menos 3 caracteres";
    }

    if (!form.email.trim()) {
      newErrors.email = "El correo es obligatorio";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = "Ingresa un email válido";
    }

    if (!form.message.trim()) {
      newErrors.message = "El mensaje es obligatorio";
    } else if (form.message.trim().length < 10) {
      newErrors.message = "El mensaje debe tener al menos 10 caracteres";
    }

    return newErrors;
  }, [form]);

  const isValid = Object.keys(errors).length === 0;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleBlur = (e) => {
    setTouched((prev) => ({ ...prev, [e.target.name]: true }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setTouched({ name: true, email: true, message: true });

    if (!isValid) {
      toast.error("Corrige el formulario antes de enviar");
      return;
    }

    try {
      setSending(true);

      await new Promise((resolve) => setTimeout(resolve, 1200));

      toast.success("Mensaje enviado con éxito");
      setForm({ name: "", email: "", message: "" });
      setTouched({});
    } finally {
      setSending(false);
    }
  };

  return (
    <section className="w-full px-4 py-10">
      <div className="mx-auto max-w-[520px]">
        <h1 className="mb-2 text-3xl font-extrabold text-slate-900">
          Contacto
        </h1>

        <p className="mb-8 text-slate-600">
          ¿Tienes preguntas o sugerencias? Escríbenos un mensaje.
        </p>

        <form
          onSubmit={handleSubmit}
          className="w-full rounded-2xl bg-white p-6 shadow"
          noValidate
        >
          <div className="mb-5">
            <label htmlFor="name" className="mb-2 block font-medium text-slate-800">
              Nombre
            </label>
            <input
              id="name"
              name="name"
              type="text"
              value={form.name}
              onChange={handleChange}
              onBlur={handleBlur}
              aria-invalid={Boolean(touched.name && errors.name)}
              className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-cyan-500"
            />
            {touched.name && errors.name && (
              <p className="mt-2 text-sm text-red-600">{errors.name}</p>
            )}
          </div>

          <div className="mb-5">
            <label htmlFor="email" className="mb-2 block font-medium text-slate-800">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              onBlur={handleBlur}
              aria-invalid={Boolean(touched.email && errors.email)}
              className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-cyan-500"
            />
            {touched.email && errors.email && (
              <p className="mt-2 text-sm text-red-600">{errors.email}</p>
            )}
          </div>

          <div className="mb-5">
            <label htmlFor="message" className="mb-2 block font-medium text-slate-800">
              Mensaje
            </label>
            <textarea
              id="message"
              name="message"
              rows="5"
              value={form.message}
              onChange={handleChange}
              onBlur={handleBlur}
              aria-invalid={Boolean(touched.message && errors.message)}
              className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-cyan-500"
            />
            {touched.message && errors.message && (
              <p className="mt-2 text-sm text-red-600">{errors.message}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={!isValid || sending}
            className="w-full rounded-lg bg-cyan-400 px-5 py-3 font-semibold text-slate-950 transition hover:bg-cyan-300 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {sending ? "Enviando..." : "Enviar mensaje"}
          </button>
        </form>
      </div>
    </section>
  );
}