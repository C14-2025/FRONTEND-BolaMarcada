const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000/api/v1";

// Registrar novo usuário
export async function registerUser(data: {
  name: string;
  email: string;
  password: string;
  cpf: string;
}) {
  const response = await fetch(`${API_URL}/users/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.detail || "Falha ao registrar usuário.");
  }

  return await response.json();
}

// Login de usuário
export async function loginUser(data: { email: string; password: string }) {
  const response = await fetch(`${API_URL}/users/signin`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.detail || "Falha ao fazer login.");
  }

  return await response.json();
}

// Buscar dados do usuário logado
export async function getCurrentUser(token: string) {
  const response = await fetch(`${API_URL}/users/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Falha ao obter dados do usuário.");
  }

  return await response.json();
}

// Buscar centros esportivos por cidade
export async function getSportsCentersByCity(cityName: string) {
  const response = await fetch(`${API_URL}/sports_center/city/${cityName}`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.detail || "Falha ao buscar centros esportivos.");
  }

  return await response.json();
}
