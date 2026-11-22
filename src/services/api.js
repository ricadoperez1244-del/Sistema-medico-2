/**
 * ============================================================================
 * SISTEMA PRM ASO HORIZONTE - src/services/api.js
 * ============================================================================
 * Cliente HTTP Fetch Centralizado.
 * 
 * Gestiona:
 * 1. Base URL de la API del ambulatorio/clínica.
 * 2. Inyección automática de Headers (Content-Type, Bearer JWT Token).
 * 3. Interceptores de respuesta para manejo de códigos 401 (Sesión vencida) y errores.
 * 4. Fallback con persistencia en localStorage para desarrollo sin backend activo.
 */

import {
  INITIAL_PATIENTS_QUEUE,
  INITIAL_STAFF,
  INITIAL_ARCHIVE_PATIENTS,
  INITIAL_MEDICAMENTOS
} from './mockData.js';

class ApiClient {
  constructor() {
    // URL base configurable mediante variables de entorno o valor por defecto
    this.baseURL = (typeof window !== 'undefined' && window.__ENV__?.API_URL) 
      || 'https://api.asohorizonte.local/v1';
    this.tokenStorageKey = 'aso_auth_token';
    this.sessionStorageKey = 'aso_auth_user';

    // Inicializar almacenamiento local con datos de prueba si no existen
    this._initLocalDatabase();
  }

  /**
   * Obtiene el token de autenticación médica activo
   */
  getToken() {
    return localStorage.getItem(this.tokenStorageKey) || null;
  }

  /**
   * Establece el token JWT en el almacenamiento seguro del navegador
   */
  setToken(token) {
    if (token) {
      localStorage.setItem(this.tokenStorageKey, token);
    } else {
      localStorage.removeItem(this.tokenStorageKey);
    }
  }

  /**
   * Construye las cabeceras comunes de cada petición
   */
  _buildHeaders(customHeaders = {}) {
    const headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      ...customHeaders
    };

    const token = this.getToken();
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    return headers;
  }

  /**
   * Petición Fetch centralizada con control de excepciones y códigos HTTP
   * @param {string} endpoint - Ruta relativa del recurso (ej: '/pacientes')
   * @param {object} options - Opciones nativas de Fetch
   */
  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    const headers = this._buildHeaders(options.headers);

    try {
      const response = await fetch(url, {
        ...options,
        headers
      });

      // Manejo de token expirado o no autorizado
      if (response.status === 401) {
        this.setToken(null);
        window.dispatchEvent(new CustomEvent('aso:auth-expired'));
        throw new Error('Sesión médica caducada. Por favor inicie sesión nuevamente.');
      }

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `Error del servidor HTTP ${response.status}`);
      }

      return await response.json();
    } catch (networkError) {
      // Si la API remota no está activa, activamos el adaptador local (Mock Storage)
      // para garantizar fluidez de pruebas al equipo entrante
      console.warn(`[ApiClient] Red no disponible para ${endpoint}. Usando Mock DB local:`, networkError.message);
      return this._mockFallback(endpoint, options);
    }
  }

  // --- MÉTODOS HTTP CONVENIENTES ---
  get(endpoint, headers = {}) {
    return this.request(endpoint, { method: 'GET', headers });
  }

  post(endpoint, body = {}, headers = {}) {
    return this.request(endpoint, {
      method: 'POST',
      headers,
      body: JSON.stringify(body)
    });
  }

  put(endpoint, body = {}, headers = {}) {
    return this.request(endpoint, {
      method: 'PUT',
      headers,
      body: JSON.stringify(body)
    });
  }

  delete(endpoint, headers = {}) {
    return this.request(endpoint, { method: 'DELETE', headers });
  }

  // --- ADAPTADOR MOCK LOCAL (Para desarrollo sin backend) ---
  _initLocalDatabase() {
    if (!localStorage.getItem('aso_db_queue')) {
      localStorage.setItem('aso_db_queue', JSON.stringify(INITIAL_PATIENTS_QUEUE));
    }
    if (!localStorage.getItem('aso_db_staff')) {
      localStorage.setItem('aso_db_staff', JSON.stringify(INITIAL_STAFF));
    }
    if (!localStorage.getItem('aso_db_patients')) {
      localStorage.setItem('aso_db_patients', JSON.stringify(INITIAL_ARCHIVE_PATIENTS));
    }
    if (!localStorage.getItem('aso_db_medicamentos')) {
      localStorage.setItem('aso_db_medicamentos', JSON.stringify(INITIAL_MEDICAMENTOS));
    }
  }

  /**
   * Resuelve peticiones en memoria / localStorage cuando el backend no está disponible
   */
  async _mockFallback(endpoint, options) {
    await new Promise((resolve) => setTimeout(resolve, 150)); // Simular latencia de red de 150ms

    // 1. Cola de pacientes diaria (/cola-pacientes)
    if (endpoint.startsWith('/cola-pacientes')) {
      let queue = JSON.parse(localStorage.getItem('aso_db_queue') || '[]');
      
      if (options.method === 'POST') {
        const newPatient = JSON.parse(options.body);
        const record = {
          id: 'pq-' + Date.now(),
          timestamp: Date.now(),
          status: 'en_espera',
          ...newPatient
        };
        // Agregar al inicio (orden cronológico descendente)
        queue.unshift(record);
        localStorage.setItem('aso_db_queue', JSON.stringify(queue));
        return { success: true, data: record };
      }

      if (options.method === 'PUT') {
        const updateData = JSON.parse(options.body);
        queue = queue.map((p) => p.id === updateData.id ? { ...p, ...updateData } : p);
        localStorage.setItem('aso_db_queue', JSON.stringify(queue));
        return { success: true, data: updateData };
      }

      return { success: true, data: queue };
    }

    // 2. Personal online (/personal)
    if (endpoint.startsWith('/personal')) {
      const staff = JSON.parse(localStorage.getItem('aso_db_staff') || '[]');
      return { success: true, data: staff };
    }

    // 3. Archivo general de pacientes (/pacientes)
    if (endpoint.startsWith('/pacientes')) {
      const patients = JSON.parse(localStorage.getItem('aso_db_patients') || '[]');
      return { success: true, data: patients };
    }

    // 4. Insumos y medicamentos (/medicamentos)
    if (endpoint.startsWith('/medicamentos')) {
      const meds = JSON.parse(localStorage.getItem('aso_db_medicamentos') || '[]');
      return { success: true, data: meds };
    }

    return { success: true, message: 'Operación simulada completada exitosamente' };
  }
}

// Exportamos una única instancia (Singleton)
export const api = new ApiClient();
