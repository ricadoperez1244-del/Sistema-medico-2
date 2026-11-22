/**
 * ============================================================================
 * SISTEMA PRM ASO HORIZONTE - src/services/authGuard.js
 * ============================================================================
 * Guardián de Autenticación y Gestión de Sesión Médica.
 * 
 * Verifica que el profesional cuente con una credencial médica activa y válida
 * en el almacenamiento antes de permitir el ingreso a cualquier módulo clínico.
 */

import { api } from './api.js';

const STORAGE_KEY_USER = 'aso_auth_user';

class AuthGuard {
  constructor() {
    this.currentUser = this._loadUserFromStorage();
  }

  /**
   * Carga los datos de sesión almacenados
   */
  _loadUserFromStorage() {
    try {
      const stored = localStorage.getItem(STORAGE_KEY_USER);
      return stored ? JSON.parse(stored) : null;
    } catch (err) {
      console.error('[AuthGuard] Error al parsear usuario de sesión:', err);
      return null;
    }
  }

  /**
   * Verifica si existe un profesional médico autenticado con token válido
   * @returns {boolean}
   */
  isAuthenticated() {
    const hasToken = !!api.getToken();
    const hasUser = !!this.currentUser;
    return hasToken && hasUser;
  }

  /**
   * Retorna el objeto del usuario en sesión activa
   */
  getUser() {
    return this.currentUser;
  }

  /**
   * Autentica al personal médico con credenciales (código médico / password)
   * @param {object} credentials - { medicalCode, password, shift }
   */
  async login(credentials) {
    const { medicalCode, password, shift = 'Guardia Diurna' } = credentials;

    // Validación básica
    if (!medicalCode || !password) {
      throw new Error('Debe proporcionar su Código de Colegiado/Médico y contraseña.');
    }

    // Simulación de login con token JWT emitido
    const mockToken = 'jwt_aso_med_' + btoa(medicalCode + ':' + Date.now());
    
    // Asignación de rol según prefijo de credencial
    let role = 'Médico de Guardia';
    let name = 'Dr(a). Profesional';

    const upperCode = medicalCode.toUpperCase();
    if (upperCode.startsWith('MED')) {
      role = 'Médico Especialista';
      name = 'Dra. Valentina Morales';
    } else if (upperCode.startsWith('ENF')) {
      role = 'Enfermería de Guardia';
      name = 'Lic. Mariana Gómez';
    } else if (upperCode.startsWith('ADM')) {
      role = 'Administrador de Centro';
      name = 'Lcdo. Carlos Peña';
    } else {
      name = `Dr. Colegiado ${medicalCode}`;
    }

    const userData = {
      medicalCode: upperCode,
      name,
      role,
      shift,
      loggedAt: new Date().toISOString()
    };

    // Almacenamos token y credencial
    api.setToken(mockToken);
    localStorage.setItem(STORAGE_KEY_USER, JSON.stringify(userData));
    this.currentUser = userData;

    // Notificar cambio de estado en la aplicación
    window.dispatchEvent(new CustomEvent('aso:auth-change', { detail: { isAuthenticated: true, user: userData } }));

    return { success: true, user: userData };
  }

  /**
   * Cierra la sesión médica actual y limpia almacenamiento local
   */
  logout() {
    api.setToken(null);
    localStorage.removeItem(STORAGE_KEY_USER);
    this.currentUser = null;

    // Notificar a toda la aplicación
    window.dispatchEvent(new CustomEvent('aso:auth-change', { detail: { isAuthenticated: false, user: null } }));
  }

  /**
   * Interceptor de ruta: valida si la ruta solicitada requiere credencial médica
   * @param {string} targetRoute - Ruta destino (ej: '#/home')
   * @returns {boolean} - true si tiene permiso, false si debe redirigir a login
   */
  canActivate(targetRoute) {
    const publicRoutes = ['#/login', '/login', '#/'];

    // Si la ruta es pública, permitimos acceso
    if (publicRoutes.includes(targetRoute)) {
      return true;
    }

    // Si la ruta es protegida, exigimos sesión
    return this.isAuthenticated();
  }
}

export const authGuard = new AuthGuard();
