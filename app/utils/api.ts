const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000/api/v1";

//  ROTAS DE USUÁRIO

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
    const error = await response.json().catch(() => ({}));
    throw new Error(error.detail || "Falha ao registrar usuário.");
  }

  return await response.json();
}

// Login
export async function loginUser(data: { email: string; password: string }) {
  const response = await fetch(`${API_URL}/users/signin`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.detail || "Falha ao fazer login.");
  }

  return await response.json();
}

// Buscar usuário atual
export async function getCurrentUser(token: string) {
  const response = await fetch(`${API_URL}/users/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.detail || "Falha ao obter dados do usuário.");
  }

  return await response.json();
}

// Atualizar usuário
export async function updateCurrentUser(
  token: string,
  data: { name: string; email?: string; phone?: string; avatar?: string }
) {
  const response = await fetch(`${API_URL}/users/me`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.detail || "Falha ao atualizar usuário.");
  }

  return await response.json();
}

// Deletar usuário
export async function deleteUser(token: string, soft: boolean = true) {
  const response = await fetch(`${API_URL}/users/me?soft=${soft}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.detail || "Falha ao deletar usuário.");
  }

  return true;
}

//  ROTAS DE CENTROS ESPORTIVOS

// Buscar centros esportivos por cidade
export async function getSportsCentersByCity(cityName: string) {
  const response = await fetch(`${API_URL}/sports_center/city/${cityName}`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.detail || "Falha ao buscar centros esportivos.");
  }

  return await response.json();
}
