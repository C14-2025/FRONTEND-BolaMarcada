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
  try {
    const response = await fetch(`${API_URL}/users/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      let errorMessage = "Falha ao registrar usuário.";
      
      try {
        const error = await response.json();
        console.log("Erro do backend:", error);
        
        // Tenta extrair mensagem de várias formas possíveis
        if (typeof error.detail === 'string') {
          errorMessage = error.detail;
        } else if (error.detail && typeof error.detail === 'object') {
          errorMessage = JSON.stringify(error.detail);
        } else if (error.message) {
          errorMessage = error.message;
        } else if (typeof error === 'string') {
          errorMessage = error;
        }
      } catch (e) {
        console.error("Erro ao parsear resposta:", e);
        errorMessage = `Erro ${response.status}: ${response.statusText}`;
      }
      
      throw new Error(errorMessage);
    }

    return await response.json();
  } catch (error) {
    console.error("Erro na requisição:", error);
    throw error;
  }
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

//  ROTAS DE CAMPOS

// Criar novo campo
export async function createField(
  token: string,
  data: {
    name: string;
    address: string;
    city: string;
    sportType: string;
    description: string;
    images: string[];
    schedule: Array<{
      dayOfWeek: string;
      startTime: string;
      endTime: string;
      price: string;
    }>;
  }
) {
  const response = await fetch(`${API_URL}/fields`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    const errorMessage = error.detail || error.message || "Falha ao cadastrar campo.";
    throw new Error(errorMessage);
  }

  return await response.json();
}

// Buscar todos os campos
export async function getFields(filters?: {
  city?: string;
  sportType?: string;
}) {
  let url = `${API_URL}/fields`;
  
  if (filters) {
    const params = new URLSearchParams();
    if (filters.city) params.append("city", filters.city);
    if (filters.sportType) params.append("sportType", filters.sportType);
    
    const queryString = params.toString();
    if (queryString) url += `?${queryString}`;
  }

  const response = await fetch(url, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.detail || "Falha ao buscar campos.");
  }

  return await response.json();
}

// Buscar campo por ID
export async function getFieldById(id: string) {
  const response = await fetch(`${API_URL}/fields/${id}`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.detail || "Falha ao buscar campo.");
  }

  return await response.json();
}

// Atualizar campo
export async function updateField(
  token: string,
  id: string,
  data: Partial<{
    name: string;
    address: string;
    city: string;
    sportType: string;
    description: string;
    images: string[];
    schedule: Array<{
      dayOfWeek: string;
      startTime: string;
      endTime: string;
      price: string;
    }>;
  }>
) {
  const response = await fetch(`${API_URL}/fields/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.detail || "Falha ao atualizar campo.");
  }

  return await response.json();
}

// Deletar campo
export async function deleteField(token: string, id: string) {
  const response = await fetch(`${API_URL}/fields/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.detail || "Falha ao deletar campo.");
  }

  return true;
}
