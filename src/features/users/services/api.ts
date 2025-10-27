//const API_BASE_URL = 'http://localhost:3000/app/v1';
//Traigo la URL de la API desde el .env
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const apiClient = {
  async post(endpoint: string, data: any) {
    try {
      const token = localStorage.getItem('token');
      const headers: any = {
        'Content-Type': 'application/json'
      };
      if (token) {
        headers.Authorization = `Bearer ${token}`;
      }
      const response = await fetch(`${API_BASE_URL}/${endpoint}`, {
        method: 'POST',
        headers,
        body: JSON.stringify(data)
      });
      const responseData = await response.json();
      if (!response.ok) {
        throw new Error(responseData.message || 'API request failed');
      }
      return responseData;
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  },
  async get(endpoint: string) {
    const token = localStorage.getItem('token');

    const headers: any = {
      'Content-Type': 'application/json'
    };

    // Agregar token si existe (para rutas protegidas)
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    const response = await fetch(`${API_BASE_URL}/${endpoint}`, {
      method: 'GET',
      headers
    });

    const responseData = await response.json();

    if (!response.ok) {
      throw new Error(responseData.message || `Error HTTP: ${response.status}`);
    }

    return responseData;
  }
};
