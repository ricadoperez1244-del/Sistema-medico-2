/**
 * ============================================================================
 * SISTEMA PRM ASO HORIZONTE - src/modules/personal/PersonalView.js
 * ============================================================================
 * Vista: Directorio de Personal Médico y Administrativo en Guardia.
 * 
 * Muestra el estado en tiempo real del personal médico, enfermería y
 * recepcionistas activos en el ambulatorio, su turno y disponibilidad.
 */

import { api } from '../../services/api.js';

export class PersonalView {
  constructor(router) {
    this.router = router;
    this.staffList = [];
    this.currentFilter = 'online';
    this.searchQuery = '';
    this.container = null;
  }

  /**
   * Renderiza el módulo de personal
   */
  async render(container) {
    this.container = container;

    container.innerHTML = `
      <section class="personal-view animate-fade-in">
        <header class="page-header">
          <div class="page-header-title">
            <h1>Personal en Guardia y Turnos</h1>
            <span class="page-header-subtitle">
              Directorio de profesionales médicos y administrativos disponibles y en servicio activo.
            </span>
          </div>
          <div>
            <span class="badge badge-success" style="font-size: var(--font-size-sm); padding: 0.5rem 0.85rem;">
              ● Servicio de Urgencias y Consultas Activo
            </span>
          </div>
        </header>

        <!-- Filtros y Búsqueda -->
        <div class="queue-controls-bar">
          <div class="queue-filter-tabs">
            <button class="queue-tab-btn active" data-filter="online">Personal Online / Activo</button>
            <button class="queue-tab-btn" data-filter="all">Todos los Registrados</button>
          </div>

          <input 
            type="search" 
            id="search-staff-input" 
            class="form-input queue-search-input" 
            placeholder="Buscar por nombre o especialidad..."
          />
        </div>

        <!-- Rejilla de Tarjetas de Personal -->
        <div id="staff-cards-grid" class="staff-grid">
          <!-- Inyectado dinámicamente -->
        </div>
      </section>
    `;

    await this._loadStaff();
    this._bindEvents();
  }

  /**
   * Carga la lista de personal desde la API
   */
  async _loadStaff() {
    try {
      const response = await api.get('/personal');
      this.staffList = response.data || [];
      this._renderGrid();
    } catch (err) {
      console.error('[PersonalView] Error al cargar lista de personal:', err);
    }
  }

  /**
   * Renderiza las tarjetas de personal según el filtro
   */
  _renderGrid() {
    const grid = this.container.querySelector('#staff-cards-grid');
    if (!grid) return;

    let filtered = [...this.staffList];

    if (this.currentFilter === 'online') {
      filtered = filtered.filter((s) => s.status === 'online');
    }

    if (this.searchQuery.trim() !== '') {
      const q = this.searchQuery.toLowerCase();
      filtered = filtered.filter((s) =>
        s.name.toLowerCase().includes(q) ||
        s.role.toLowerCase().includes(q) ||
        s.code.toLowerCase().includes(q)
      );
    }

    if (filtered.length === 0) {
      grid.innerHTML = `
        <div class="empty-queue-state" style="grid-column: 1 / -1;">
          <h3>No se encontró personal disponible</h3>
          <p>Verifique los criterios de búsqueda o el filtro seleccionado.</p>
        </div>
      `;
      return;
    }

    grid.innerHTML = filtered.map((staff) => {
      const isOnline = staff.status === 'online';
      const statusLabel = isOnline ? '🟢 Activo en Guardia' : '⚪ Fuera de Turno';
      const statusClass = isOnline ? 'badge-success' : 'badge-secondary';

      return `
        <article class="staff-card animate-fade-in">
          <div class="staff-card-header">
            <div class="staff-avatar-wrapper">
              <div class="staff-avatar">${staff.avatar || 'DR'}</div>
              <div class="staff-status-indicator ${staff.status}"></div>
            </div>
            <div class="staff-details">
              <h3 class="staff-name">${staff.name}</h3>
              <span class="staff-role">${staff.role}</span>
              <span class="staff-code">Colegiado: ${staff.code}</span>
            </div>
          </div>

          <div class="staff-info-box">
            <div class="staff-info-row">
              <span class="staff-info-label">Estado de Conexión:</span>
              <span class="badge ${statusClass}">${statusLabel}</span>
            </div>
            <div class="staff-info-row">
              <span class="staff-info-label">Turno Asignado:</span>
              <span class="staff-info-value">${staff.shift}</span>
            </div>
          </div>

          <div style="display: flex; gap: 0.5rem; margin-top: auto;">
            <button class="btn btn-sm btn-secondary" style="flex: 1;" onclick="alert('Conectando por intercomunicador con ${staff.name} (${staff.code})...')">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
              </svg>
              <span>Contactar</span>
            </button>
          </div>
        </article>
      `;
    }).join('');
  }

  /**
   * Vincula interactividad a los filtros
   */
  _bindEvents() {
    const tabs = this.container.querySelectorAll('.queue-tab-btn');
    tabs.forEach((tab) => {
      tab.addEventListener('click', () => {
        tabs.forEach((t) => t.classList.remove('active'));
        tab.classList.add('active');
        this.currentFilter = tab.getAttribute('data-filter');
        this._renderGrid();
      });
    });

    const searchInput = this.container.querySelector('#search-staff-input');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        this.searchQuery = e.target.value;
        this._renderGrid();
      });
    }
  }
}
