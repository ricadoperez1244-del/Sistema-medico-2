/**
 * ============================================================================
 * SISTEMA PRM ASO HORIZONTE - src/components/navbar/Navbar.js
 * ============================================================================
 * Componente: Menú de Navegación Superior Institucional.
 * 
 * Responsabilidades:
 * 1. Renderizar los accesos a los módulos clínicos clave:
 *    - Atención Diaria (Home / Triaje)
 *    - Personal en Guardia
 *    - Archivo de Pacientes
 *    - Medicamentos e Insumos
 * 2. Visualizar la credencial del médico/personal activo.
 * 3. Gestionar el cierre de sesión seguro mediante `authGuard.logout()`.
 * 4. Resaltar la ruta activa según el Hash actual.
 */

import { authGuard } from '../../services/authGuard.js';

export class Navbar {
  constructor(router) {
    this.router = router;
    this.mobileOpen = false;
  }

  /**
   * Obtiene las iniciales de una persona para el avatar
   */
  _getInitials(name = '') {
    const parts = name.trim().split(' ');
    if (parts.length >= 2) {
      return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return (name[0] || 'DR').toUpperCase();
  }

  /**
   * Renderiza el componente Navbar dentro de un elemento contenedor
   * @param {HTMLElement} container - Elemento padre donde se inyectará el navbar
   * @param {string} currentPath - Ruta Hash actual para marcar el enlace activo
   */
  render(container, currentPath = window.location.hash || '#/home') {
    // Si el usuario no está autenticado, no renderizamos el Navbar
    if (!authGuard.isAuthenticated()) {
      container.innerHTML = '';
      return;
    }

    const user = authGuard.getUser() || {
      name: 'Dr. Personal Médico',
      role: 'Médico de Guardia',
      medicalCode: 'MED-0000'
    };

    const initials = this._getInitials(user.name);

    // Definición de enlaces del sistema
    const navItems = [
      {
        path: '#/home',
        label: 'Atención Diaria',
        icon: `
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>`
      },
      {
        path: '#/personal',
        label: 'Personal de Guardia',
        icon: `
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
          </svg>`
      },
      {
        path: '#/pacientes',
        label: 'Pacientes',
        icon: `
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
          </svg>`
      },
      {
        path: '#/medicamentos',
        label: 'Medicamentos & Stock',
        icon: `
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.942A4.5 4.5 0 0115.9 16.5H8.1a4.5 4.5 0 01-2.33-.658L4.2 14.9" />
          </svg>`
      }
    ];

    const navLinksHtml = navItems
      .map((item) => {
        const isActive = currentPath.startsWith(item.path);
        return `
          <li>
            <a href="${item.path}" class="navbar-link ${isActive ? 'active' : ''}" data-nav-link>
              ${item.icon}
              <span>${item.label}</span>
            </a>
          </li>
        `;
      })
      .join('');

    container.innerHTML = `
      <header class="app-navbar">
        <div class="navbar-inner">
          <!-- Logotipo / Identidad Ambulatorio Aso Horizonte -->
          <a href="#/home" class="navbar-brand">
            <div class="navbar-logo-icon">
              <span>+</span>
            </div>
            <div class="navbar-brand-text">
              <span class="navbar-brand-name">ASO HORIZONTE</span>
              <span class="navbar-brand-tagline">Sistema PRM Clínico</span>
            </div>
          </a>

          <!-- Botón Toggle en Móvil -->
          <button class="navbar-toggle-btn" id="btn-nav-toggle" aria-label="Abrir menú">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
          </button>

          <!-- Menú Principal -->
          <nav>
            <ul class="navbar-nav ${this.mobileOpen ? 'is-open' : ''}" id="navbar-links-list">
              ${navLinksHtml}
            </ul>
          </nav>

          <!-- Acciones de Usuario y Salida -->
          <div class="navbar-actions">
            <div class="user-badge" title="Credencial: ${user.medicalCode}">
              <div class="user-avatar">${initials}</div>
              <div class="user-info">
                <span class="user-name">${user.name}</span>
                <span class="user-role">${user.role} (${user.medicalCode})</span>
              </div>
            </div>

            <button class="btn-logout" id="btn-logout" title="Finalizar guardia / Salir del sistema">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
              </svg>
              <span>Salir</span>
            </button>
          </div>
        </div>
      </header>
    `;

    this._bindEvents(container);
  }

  /**
   * Vincula interactividad al Navbar (Toggle móvil y logout)
   */
  _bindEvents(container) {
    // 1. Cerrar Sesión
    const btnLogout = container.querySelector('#btn-logout');
    if (btnLogout) {
      btnLogout.addEventListener('click', (e) => {
        e.preventDefault();
        const confirmExit = window.confirm('¿Desea cerrar la sesión clínica actual y registrar su salida?');
        if (confirmExit) {
          authGuard.logout();
          if (this.router) {
            this.router.navigate('#/login');
          } else {
            window.location.hash = '#/login';
          }
        }
      });
    }

    // 2. Mobile Menu Toggle
    const btnToggle = container.querySelector('#btn-nav-toggle');
    const linksList = container.querySelector('#navbar-links-list');
    if (btnToggle && linksList) {
      btnToggle.addEventListener('click', () => {
        this.mobileOpen = !this.mobileOpen;
        linksList.classList.toggle('is-open', this.mobileOpen);
      });
    }

    // Cerrar menú móvil al hacer clic en un enlace
    const navLinks = container.querySelectorAll('[data-nav-link]');
    navLinks.forEach((link) => {
      link.addEventListener('click', () => {
        this.mobileOpen = false;
        if (linksList) linksList.classList.remove('is-open');
      });
    });
  }
}
