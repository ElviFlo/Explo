const BASE_URL = "https://rickandmortyapi.com/api/character";

export async function fetchCharacters({ page = 1, name = "", status = "" } = {}) {
  const params = new URLSearchParams();

  params.set("page", page);

  if (name.trim()) {
    params.set("name", name.trim());
  }

  if (status && status !== "all") {
    params.set("status", status);
  }

  const url = `${BASE_URL}?${params.toString()}`;
  const response = await fetch(url);

  if (!response.ok) {
    if (
      response.status === 404 &&
      (name.trim() || (status && status !== "all"))
    ) {
      return {
        info: {
          count: 0,
          pages: 0,
          next: null,
          prev: null,
        },
        results: [],
      };
    }

    throw new Error("No se pudo cargar la información.");
  }

  const data = await response.json();
  return data;
}

export async function fetchCharacterById(id) {
  const response = await fetch(`${BASE_URL}/${id}`);

  if (!response.ok) {
    throw new Error("No se pudo cargar la información.");
  }

  const data = await response.json();
  return data;
}