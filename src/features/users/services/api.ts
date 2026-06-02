const API_BASE_URL = 'http://localhost:3000/app/v1';
//Traigo la URL de la API desde el .env
//const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// Función genérica para solicitudes, actualmente repetimos lógica en 
// las funciones get, post, etc. Acá se centraliza

async function request<T>(
  endPoint: string,
  options: RequestInit = {}
): Promise<T> {
    const token = localStorage.getItem('token');

    const response = await fetch(`${API_BASE_URL}/${endPoint}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...options.headers,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Error en la solicitud');
    }
    return data;
};
export const apiClient = {
  async get<T>(endpoint: string) {
    return request<T>(endpoint,{
      method: 'GET'
    });
  },

  // <--Comentario de café-->
  // La T precede de los parámetros para declarar que estos son genéricos
  async post<TResponse,TBody = unknown>(
    endpoint: string, 
    data: TBody) : Promise<TResponse> {
    return request<TResponse>(endpoint, {
      method: 'POST',
      body: JSON.stringify(data),
    })
  } 
};
