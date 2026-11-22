/**
 * ============================================================================
 * SISTEMA PRM ASO HORIZONTE - src/router/router.js
 * ============================================================================
 * Enrutador SPA (Single Page Application) basado en Hash.
 * 
 * Responsabilidades:
 * 1. Mapear rutas Hash (#/home, #/login, etc.) a sus vistas correspondientes.
 * 2. Aplicar validación de credenciales médicas mediante `authGuard.canActivate()`.
 * 3. Gestionar el ciclo de vida del layout:
 *    - En rutas públicas (ej: #/login), oculta el menú superior (Navbar).
 *    - En rutas autenticadas, renderiza el Navbar superior y el contenedor `#app-view-container`.
 * 4. Escuchar eventos de cambio de Hash (`hashchange`) y expiración de sesión.
 */

import { authGuard } from '../services/authGuard.js';
import { Navbar } from '../components/navbar/Navbar.js';

export class Router {
  constructor(routes = {}) {
    this.routes = routes;
    this.appElement = null;
    this.navbar = null;
    this.currentPath = '';
  }

  /**
   * Inicializa el enrutador montándolo sobre el elemento raíz `#app`
   * @param {string|HTMLElement} rootSelector - Selector o nodo DOM contenedor
   */
  init(rootSelector = '#app') {
    this.appElement = typeof rootSelector === 'string'
      ? document.querySelector(rootSelector)
      : rootSelector;

    if (!this.appElement) {
      console.error('[Router] No se encontró el contenedor raíz de la aplicación.');
      return;
    }

    // Instanciamos el Navbar institucional
    this.navbar = new Navbar(this);

    // Escuchadores de eventos de navegación
    window.addEventListener('hashchange', () => this._handleRouteChange());
    window.addEventListener('load', () => this._handleRouteChange());

    // Escuchador de cambios de autenticación para re-evaluar la vista
    window.addEventListener('aso:auth-change', () => this._handleRouteChange());
    window.addEventListener('aso:auth-expired', () => {
      alert('Su sesión médica ha expirado. Por favor, vuelva a ingresar sus credenciales.');
      this.navigate('#/login');
    });

    // Disparar la primera evaluación de ruta
    this._handleRouteChange();
  }

  /**
   * Navega de manera programática a una ruta determinada
   * @param {string} path - Ruta Hash (ej: '#/home')
   */
  navigate(path) {
    if (window.location.hash !== path) {
      window.location.hash = path;
    } else {
      this._handleRouteChange();
    }
  }

  /**
   * Evalúa la ruta actual, valida permisos de acceso y monta la vista
   */
  async _handleRouteChange() {
    let hash = window.location.hash || '#/home';

    // Normalizar ruta raíz
    if (hash === '' || hash === '#' || hash === '#/') {
      hash = '#/home';
    }

    // 1. Verificación del Guardián de Autenticación
    const isAllowed = authGuard.canActivate(hash);

    if (!isAllowed) {
      console.warn(`[Router] Acceso denegado a "${hash}". Redirigiendo a pantalla de login.`);
      this.navigate('#/login');
      return;
    }

    // Si ya está autenticado e intenta ir a login, redirigir a #/home
    if (hash === '#/login' && authGuard.isAuthenticated()) {
      this.navigate('#/home');
      return;
    }

    this.currentPath = hash;

    // 2. Buscar la clase de la vista asociada a la ruta
    const ViewClass = this.routes[hash];

    if (!ViewClass) {
      console.error(`[Router] Ruta no encontrada: ${hash}`);
      this._renderNotFound();
      return;
    }

    // 3. Renderizar Estructura (Layout) según el tipo de pantalla
    if (hash === '#/login') {
      // Vista limpia de autenticación (sin navbar)
      this.appElement.innerHTML = `<div id="login-module-container"></div>`;
      const loginContainer = this.appElement.querySelector('#login-module-container');
      const viewInstance = new ViewClass(this);
      await viewInstance.render(loginContainer);
    } else {
      // Vistas clínicas protegidas (con Navbar superior y layout estándar)
      this.appElement.innerHTML = `
        <div class="main-layout">
          <div id="app-navbar-slot"></div>
          <main class="main-content" id="app-view-container"></main>
        </div>
      `;

      // Renderizar el Navbar
      const navSlot = this.appElement.querySelector('#app-navbar-slot');
      this.navbar.render(navSlot, hash);

      // Renderizar la Vista activa
      const viewContainer = this.appElement.querySelector('#app-view-container');
      const viewInstance = new ViewClass(this);
      await viewInstance.render(viewContainer);
    }

    // Scroll suave hacia arriba en cambios de ruta
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  /**
   * Pantalla de error 404 para rutas inexistentes
   */
  _renderNotFound() {
    this.appElement.innerHTML = `
      <div style="min-height: 80vh; display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; padding: 2rem;">
        <h1 style="font-size: 3rem; color: var(--color-danger); margin-bottom: 0.5rem;">404</h1>
        <h2>Módulo Clínico No Encontrado</h2>
        <p style="margin: 1rem 0 1.5rem 0;">La ruta ${window.location.hash} no corresponde a ningún servicio de Aso Horizonte.</p>
        <button class="btn btn-primary" onclick="window.location.hash='#/home'">
          Volver a Atención Diaria
        </button>
      </div>
    `;
  }
}
