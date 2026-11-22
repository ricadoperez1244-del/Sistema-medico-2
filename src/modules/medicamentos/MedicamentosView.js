/**
 * ============================================================================
 * SISTEMA PRM ASO HORIZONTE - src/modules/medicamentos/MedicamentosView.js
 * ============================================================================
 * Vista: Métricas de Farmacia y Consumo Mensual de Medicamentos e Insumos.
 * 
 * Monitorea el inventario de fármacos, la media de utilización mensual
 * y las alertas automáticas de desabastecimiento para reposición inmediata.
 */

import { api } from '../../services/api.js';

export class MedicamentosView {
  constructor(router) {
    this.router = router;
    this.medicinesList = [];
    this.container = null;
    this.searchQuery = '';
  }

  /**
   * Renderizado de la vista
   */
  async render(container) {
    this.container = container;

    container.innerHTML = `
      <section class="medicamentos-view animate-fade-in">
        <header class="page-header">
          <div class="page-header-title">
            <h1>Insumos Médicos y Farmacia</h1>
            <span class="page-header-subtitle">
              Métricas de rotación, existencias y cálculo de la media del uso mensual institucional.
            </span>
          </div>
          <div>
            <button class="btn btn-secondary" id="btn-export-supplies" onclick="alert('Exportando informe analítico de insumos a PDF/Excel...')">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
              </svg>
              <span>Exportar Informe</span>
            </button>
          </div>
        </header>

        <!-- Métricas KPI Principales -->
        <div class="home-stats-grid" id="med-stats-grid">
          <!-- Inyectado dinámicamente -->
        </div>

        <!-- Controles de Búsqueda -->
        <div class="queue-controls-bar">
          <div style="flex: 1; max-width: 450px;">
            <input 
              type="search" 
              id="search-med-input" 
              class="form-input" 
              placeholder="Buscar por fármaco, solución o insumo..."
            />
          </div>
          <button class="btn btn-primary" id="btn-add-medicine">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
            <span>Registrar Lote / Insumo</span>
          </button>
        </div>

        <!-- Tabla de Insumos y Consumo Mensual -->
        <div class="patient-table-card">
          <div class="table-responsive">
            <table class="data-table">
              <thead>
                <tr>
                  <th>Fármaco / Insumo</th>
                  <th>Categoría</th>
                  <th>Stock Actual</th>
                  <th>Media Uso Mensual</th>
                  <th>Nivel de Abastecimiento</th>
                  <th>Estado</th>
                  <th style="text-align: right;">Acciones</th>
                </tr>
              </thead>
              <tbody id="med-table-body">
                <!-- Inyectado dinámicamente -->
              </tbody>
            </table>
          </div>
        </div>
      </section>
    `;

    await this._loadMedicines();
    this._bindEvents();
  }

  /**
   * Carga los datos de insumos desde la API
   */
  async _loadMedicines() {
    try {
      const response = await api.get('/medicamentos');
      this.medicinesList = response.data || [];
      this._renderStats();
      this._renderTable();
    } catch (err) {
      console.error('[MedicamentosView] Error al cargar medicamentos:', err);
    }
  }

  /**
   * Renderiza las tarjetas de estadísticas de consumo y stock
   */
  _renderStats() {
    const statsContainer = this.container.querySelector('#med-stats-grid');
    if (!statsContainer) return;

    const totalItems = this.medicinesList.length;
    
    // Suma de la media de uso mensual total de todos los fármacos
    const totalMonthlyUsage = this.medicinesList.reduce((acc, curr) => acc + (curr.monthlyAverage || 0), 0);
    
    // Medicamentos en nivel crítico
    const criticalItems = this.medicinesList.filter((m) => m.status === 'critico').length;
    
    // Promedio de cobertura
    const avgMonthly = Math.round(totalMonthlyUsage / (totalItems || 1));

    statsContainer.innerHTML = `
      <div class="stat-card">
        <div class="stat-info">
          <span class="stat-label">Insumos Catalogados</span>
          <span class="stat-value">${totalItems}</span>
        </div>
        <div class="stat-icon blue">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
          </svg>
        </div>
      </div>

      <div class="stat-card">
        <div class="stat-info">
          <span class="stat-label">Media Mensual de Uso</span>
          <span class="stat-value" style="color: var(--color-primary);">${totalMonthlyUsage.toLocaleString()}</span>
        </div>
        <div class="stat-icon teal">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
          </svg>
        </div>
      </div>

      <div class="stat-card">
        <div class="stat-info">
          <span class="stat-label">Promedio Consumo / Fármaco</span>
          <span class="stat-value">${avgMonthly} <span style="font-size: 1rem; color: var(--slate-400);">uds/mes</span></span>
        </div>
        <div class="stat-icon green">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 6a7.5 7.5 0 107.5 7.5h-7.5V6z" />
            <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 10.5H21A7.5 7.5 0 0013.5 3v7.5z" />
          </svg>
        </div>
      </div>

      <div class="stat-card">
        <div class="stat-info">
          <span class="stat-label">Alertas Críticas de Stock</span>
          <span class="stat-value" style="color: var(--color-danger);">${criticalItems}</span>
        </div>
        <div class="stat-icon yellow">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
          </svg>
        </div>
      </div>
    `;
  }

  /**
   * Renderiza la tabla de inventario con porcentajes y medias
   */
  _renderTable() {
    const tbody = this.container.querySelector('#med-table-body');
    if (!tbody) return;

    let filtered = [...this.medicinesList];

    if (this.searchQuery.trim() !== '') {
      const q = this.searchQuery.toLowerCase();
      filtered = filtered.filter((m) =>
        m.name.toLowerCase().includes(q) ||
        m.category.toLowerCase().includes(q)
      );
    }

    if (filtered.length === 0) {
      tbody.innerHTML = `
        <tr>
          <td colspan="7" style="text-align: center; padding: 3rem;">
            <p style="color: var(--slate-400);">No se encontraron insumos con ese nombre.</p>
          </td>
        </tr>
      `;
      return;
    }

    tbody.innerHTML = filtered.map((med) => {
      // Cálculo del ratio de disponibilidad respecto al stock de seguridad
      const percentage = Math.min(100, Math.round((med.currentStock / (med.monthlyAverage || 100)) * 100));

      let statusBadge = '<span class="badge badge-success">Óptimo</span>';
      let progressClass = 'optimo';

      if (med.status === 'critico' || med.currentStock <= med.minStock) {
        statusBadge = '<span class="badge badge-danger">Crítico</span>';
        progressClass = 'critico';
      } else if (med.status === 'bajo' || percentage < 30) {
        statusBadge = '<span class="badge badge-warning">Bajo</span>';
        progressClass = 'bajo';
      }

      return `
        <tr>
          <td>
            <div style="font-weight: 700; color: var(--slate-900);">${med.name}</div>
            <div style="font-size: 0.75rem; color: var(--slate-400);">${med.unit}</div>
          </td>
          <td><span class="badge badge-info">${med.category}</span></td>
          <td>
            <strong style="font-size: 1.05rem; color: var(--slate-900);">${med.currentStock}</strong>
            <span style="font-size: 0.75rem; color: var(--slate-400);">/ mín: ${med.minStock}</span>
          </td>
          <td>
            <div class="consumption-metric-badge">
              <span>📈 ${med.monthlyAverage} uds/mes</span>
            </div>
          </td>
          <td style="min-width: 160px;">
            <div style="display: flex; justify-content: space-between; font-size: 0.75rem; font-weight: 600;">
              <span>Cobertura mensual</span>
              <span>${percentage}%</span>
            </div>
            <div class="stock-progress-bar-bg">
              <div class="stock-progress-bar-fill ${progressClass}" style="width: ${percentage}%;"></div>
            </div>
          </td>
          <td>${statusBadge}</td>
          <td style="text-align: right;">
            <button class="btn btn-sm btn-secondary" data-action="adjust-stock" data-id="${med.id}">
              Modificar Stock
            </button>
          </td>
        </tr>
      `;
    }).join('');
  }

  /**
   * Vincula interactividad
   */
  _bindEvents() {
    const searchInput = this.container.querySelector('#search-med-input');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        this.searchQuery = e.target.value;
        this._renderTable();
      });
    }

    const btnAdd = this.container.querySelector('#btn-add-medicine');
    if (btnAdd) {
      btnAdd.addEventListener('click', () => {
        const name = prompt('Nombre del medicamento o insumo médico:');
        if (!name) return;
        const category = prompt('Categoría (ej: Antibióticos, Soluciones, Descartables):') || 'General';
        const stock = parseInt(prompt('Cantidad de unidades a ingresar:') || '100', 10);
        const monthlyAverage = parseInt(prompt('Estimado de consumo medio mensual:') || '150', 10);

        const newMed = {
          id: 'med-' + Date.now(),
          name,
          category,
          currentStock: stock,
          monthlyAverage,
          minStock: Math.round(monthlyAverage * 0.25),
          unit: 'Unidades',
          status: stock > 50 ? 'optimo' : 'bajo'
        };

        this.medicinesList.unshift(newMed);
        this._renderStats();
        this._renderTable();
      });
    }

    // Delegación de modificación de stock
    const tbody = this.container.querySelector('#med-table-body');
    if (tbody) {
      tbody.addEventListener('click', (e) => {
        const btn = e.target.closest('button[data-action="adjust-stock"]');
        if (!btn) return;

        const medId = btn.getAttribute('data-id');
        const item = this.medicinesList.find((m) => m.id === medId);
        if (!item) return;

        const delta = prompt(`Ajuste de inventario para ${item.name}:\n(Ingrese un número positivo para entrada de lote o negativo para despacho por fórmula)`, '10');
        if (delta && !isNaN(delta)) {
          const added = parseInt(delta, 10);
          item.currentStock = Math.max(0, item.currentStock + added);
          item.status = item.currentStock <= item.minStock ? 'critico' : 'optimo';
          this._renderStats();
          this._renderTable();
        }
      });
    }
  }
}
