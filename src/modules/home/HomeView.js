/**
 * ============================================================================
 * SISTEMA PRM ASO HORIZONTE - src/modules/home/HomeView.js
 * ============================================================================
 * Vista: Atención Diaria y Triaje de Pacientes.
 * 
 * Responsabilidades:
 * 1. Cargar la cola de atención médica del día desde la API central.
 * 2. Ordenar cronológicamente en orden descendente (el más reciente al inicio).
 * 3. Formulario para registrar inmediatamente la llegada de nuevos pacientes.
 * 4. Filtrar por estado (Todos, En Espera, En Consulta, Atendidos).
 * 5. Búsqueda reactiva por Cédula o Nombre.
 * 6. Actualización dinámica del estado del paciente (Llamar a consulta / Finalizar).
 */

import { api } from '../../services/api.js';
import { PatientCard } from './PatientCard.js';

export class HomeView {
  constructor(router) {
    this.router = router;
    this.patientsQueue = [];
    this.currentFilter = 'todos';
    this.searchQuery = '';
    this.container = null;
  }

  /**
   * Obtiene la hora actual formateada en 12 horas con AM/PM
   */
  _getCurrentFormattedTime() {
    const now = new Date();
    return now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });
  }

  /**
   * Renderizado principal de la vista
   * @param {HTMLElement} container - Contenedor del contenido principal
   */
  async render(container) {
    this.container = container;

    container.innerHTML = `
      <section class="home-view animate-fade-in">
        <!-- Encabezado de la Página -->
        <header class="page-header">
          <div class="page-header-title">
            <h1>Atención Diaria y Triaje</h1>
            <span class="page-header-subtitle">
              Gestión en tiempo real del flujo de pacientes en sala de espera y consulta médica.
            </span>
          </div>
          <div>
            <span class="badge badge-primary" style="font-size: var(--font-size-sm); padding: 0.5rem 0.85rem;">
              📅 Guardia de Hoy: ${new Date().toLocaleDateString('es-ES', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
            </span>
          </div>
        </header>

        <!-- Métricas y Resumen de la Jornada -->
        <div class="home-stats-grid" id="home-stats-container">
          <!-- Renderizado dinámicamente -->
        </div>

        <!-- Contenedor Dividido: Formulario de Ingreso + Cola de Pacientes -->
        <div class="queue-layout">
          <!-- Columna Izquierda: Formulario de Registro de Llegada -->
          <aside class="ingress-card">
            <div class="ingress-card-header">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="color: var(--color-primary);">
                <path stroke-linecap="round" stroke-linejoin="round" d="M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.765z" />
              </svg>
              <h2 class="ingress-card-title">Registrar Llegada</h2>
            </div>

            <form id="form-patient-arrival">
              <div class="form-group">
                <label for="input-patient-name" class="form-label">Nombre del Paciente *</label>
                <input type="text" id="input-patient-name" class="form-input" placeholder="Nombre y Apellidos" required />
              </div>

              <div class="form-group">
                <label for="input-patient-cedula" class="form-label">Cédula de Identidad *</label>
                <input type="text" id="input-patient-cedula" class="form-input" placeholder="V-00.000.000" required />
              </div>

              <div class="form-group">
                <label for="input-patient-time" class="form-label">Hora de Llegada</label>
                <input type="text" id="input-patient-time" class="form-input" value="${this._getCurrentFormattedTime()}" required />
              </div>

              <div class="form-group">
                <label for="select-patient-specialty" class="form-label">Especialidad Requerida</label>
                <select id="select-patient-specialty" class="form-select">
                  <option value="Medicina General">Medicina General</option>
                  <option value="Pediatría">Pediatría</option>
                  <option value="Traumatología">Traumatología</option>
                  <option value="Ginecología y Obstetricia">Ginecología y Obstetricia</option>
                  <option value="Cardiología">Cardiología</option>
                  <option value="Enfermería / Curas">Enfermería / Curas</option>
                </select>
              </div>

              <div class="form-group">
                <label for="select-patient-priority" class="form-label">Nivel de Triaje</label>
                <select id="select-patient-priority" class="form-select">
                  <option value="normal">🟢 Normal (Triage III)</option>
                  <option value="moderada">🟡 Moderada (Triage II)</option>
                  <option value="urgente">🔴 Urgente (Triage I)</option>
                </select>
              </div>

              <div class="form-group">
                <label for="input-patient-reason" class="form-label">Motivo de Consulta / Síntomas *</label>
                <textarea id="input-patient-reason" class="form-textarea" rows="3" placeholder="Descripción breve del motivo o signos de alerta..." required></textarea>
              </div>

              <button type="submit" class="btn btn-primary" style="width: 100%;">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>
                <span>Añadir a la Cola</span>
              </button>
            </form>
          </aside>

          <!-- Columna Derecha: Listado en Orden Descendente -->
          <main>
            <!-- Barra de Controles (Filtros por Estado y Buscador) -->
            <div class="queue-controls-bar">
              <div class="queue-filter-tabs">
                <button class="queue-tab-btn active" data-filter="todos">Todos</button>
                <button class="queue-tab-btn" data-filter="en_espera">En Espera</button>
                <button class="queue-tab-btn" data-filter="en_consulta">En Consulta</button>
                <button class="queue-tab-btn" data-filter="atendido">Atendidos</button>
              </div>

              <input 
                type="search" 
                id="search-patient-queue" 
                class="form-input queue-search-input" 
                placeholder="Buscar por cédula o nombre..."
              />
            </div>

            <!-- Contenedor de Tarjetas de Pacientes -->
            <div id="queue-list-wrapper" class="queue-list-container">
              <!-- Se inyecta dinámicamente con PatientCard -->
            </div>
          </main>
        </div>
      </section>
    `;

    // Cargar datos iniciales y vincular eventos
    await this._loadPatientsQueue();
    this._bindEvents();
  }

  /**
   * Carga los datos de la cola de pacientes desde la API
   */
  async _loadPatientsQueue() {
    try {
      const response = await api.get('/cola-pacientes');
      const list = response.data || [];

      // Ordenar en orden cronológico descendente (el más reciente al principio)
      this.patientsQueue = list.sort((a, b) => (b.timestamp || 0) - (a.timestamp || 0));

      this._renderStats();
      this._renderQueueList();
    } catch (err) {
      console.error('[HomeView] Error al cargar la cola de pacientes:', err);
    }
  }

  /**
   * Renderiza el resumen de métricas diarias
   */
  _renderStats() {
    const statsContainer = this.container.querySelector('#home-stats-container');
    if (!statsContainer) return;

    const total = this.patientsQueue.length;
    const enEspera = this.patientsQueue.filter((p) => p.status === 'en_espera').length;
    const enConsulta = this.patientsQueue.filter((p) => p.status === 'en_consulta').length;
    const atendidos = this.patientsQueue.filter((p) => p.status === 'atendido').length;

    statsContainer.innerHTML = `
      <div class="stat-card">
        <div class="stat-info">
          <span class="stat-label">Total Ingresos Hoy</span>
          <span class="stat-value">${total}</span>
        </div>
        <div class="stat-icon blue">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
          </svg>
        </div>
      </div>

      <div class="stat-card">
        <div class="stat-info">
          <span class="stat-label">En Sala de Espera</span>
          <span class="stat-value" style="color: var(--color-warning);">${enEspera}</span>
        </div>
        <div class="stat-icon yellow">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
      </div>

      <div class="stat-card">
        <div class="stat-info">
          <span class="stat-label">En Consulta Activa</span>
          <span class="stat-value" style="color: var(--color-info);">${enConsulta}</span>
        </div>
        <div class="stat-icon teal">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
          </svg>
        </div>
      </div>

      <div class="stat-card">
        <div class="stat-info">
          <span class="stat-label">Completados / Atendidos</span>
          <span class="stat-value" style="color: var(--color-success);">${atendidos}</span>
        </div>
        <div class="stat-icon green">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
      </div>
    `;
  }

  /**
   * Renderiza el listado de tarjetas según filtros activos
   */
  _renderQueueList() {
    const listWrapper = this.container.querySelector('#queue-list-wrapper');
    if (!listWrapper) return;

    let filtered = [...this.patientsQueue];

    // 1. Filtrado por Estado
    if (this.currentFilter !== 'todos') {
      filtered = filtered.filter((p) => p.status === this.currentFilter);
    }

    // 2. Filtrado por Buscador
    if (this.searchQuery.trim() !== '') {
      const q = this.searchQuery.toLowerCase();
      filtered = filtered.filter((p) => 
        (p.name && p.name.toLowerCase().includes(q)) ||
        (p.cedula && p.cedula.toLowerCase().includes(q)) ||
        (p.specialty && p.specialty.toLowerCase().includes(q))
      );
    }

    // 3. Renderizar lista vacía si no hay registros
    if (filtered.length === 0) {
      listWrapper.innerHTML = `
        <div class="empty-queue-state animate-fade-in">
          <div class="empty-queue-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
            </svg>
          </div>
          <h3>No hay pacientes registrados</h3>
          <p>No se encontraron registros para el filtro o término de búsqueda seleccionado.</p>
        </div>
      `;
      return;
    }

    // 4. Renderizar tarjetas de pacientes
    listWrapper.innerHTML = filtered.map((patient) => PatientCard.renderHTML(patient)).join('');
  }

  /**
   * Vincula interactividad y controladores de eventos
   */
  _bindEvents() {
    // 1. Envío del Formulario de Ingreso de Paciente
    const formArrival = this.container.querySelector('#form-patient-arrival');
    if (formArrival) {
      formArrival.addEventListener('submit', async (e) => {
        e.preventDefault();

        const name = this.container.querySelector('#input-patient-name').value.trim();
        const cedula = this.container.querySelector('#input-patient-cedula').value.trim();
        const arrivalTime = this.container.querySelector('#input-patient-time').value.trim();
        const specialty = this.container.querySelector('#select-patient-specialty').value;
        const priority = this.container.querySelector('#select-patient-priority').value;
        const reason = this.container.querySelector('#input-patient-reason').value.trim();

        const newPatientData = {
          name,
          cedula,
          arrivalTime: arrivalTime || this._getCurrentFormattedTime(),
          specialty,
          priority,
          reason,
          status: 'en_espera'
        };

        try {
          const response = await api.post('/cola-pacientes', newPatientData);
          const savedPatient = response.data || newPatientData;

          // Insertar al inicio de la cola para preservar orden descendente (más reciente arriba)
          this.patientsQueue.unshift(savedPatient);

          // Limpiar formulario y resetear hora
          formArrival.reset();
          this.container.querySelector('#input-patient-time').value = this._getCurrentFormattedTime();

          // Actualizar vista
          this._renderStats();
          this._renderQueueList();
        } catch (err) {
          alert('Error al registrar llegada del paciente: ' + err.message);
        }
      });
    }

    // 2. Filtrado por Pestañas de Estado
    const tabs = this.container.querySelectorAll('.queue-tab-btn');
    tabs.forEach((tab) => {
      tab.addEventListener('click', () => {
        tabs.forEach((t) => t.classList.remove('active'));
        tab.classList.add('active');
        this.currentFilter = tab.getAttribute('data-filter');
        this._renderQueueList();
      });
    });

    // 3. Búsqueda Reactiva en tiempo real
    const searchInput = this.container.querySelector('#search-patient-queue');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        this.searchQuery = e.target.value;
        this._renderQueueList();
      });
    }

    // 4. Delegación de Eventos en Tarjetas (Llamar a consulta / Finalizar atención)
    const listWrapper = this.container.querySelector('#queue-list-wrapper');
    if (listWrapper) {
      listWrapper.addEventListener('click', async (e) => {
        const btnAction = e.target.closest('button[data-action]');
        if (!btnAction) return;

        const action = btnAction.getAttribute('data-action');
        const patientId = btnAction.getAttribute('data-id');

        let nextStatus = '';
        if (action === 'attend') nextStatus = 'en_consulta';
        if (action === 'finish') nextStatus = 'atendido';

        if (nextStatus) {
          try {
            await api.put('/cola-pacientes', { id: patientId, status: nextStatus });
            
            // Actualizar en el estado local en memoria
            this.patientsQueue = this.patientsQueue.map((p) => 
              p.id === patientId ? { ...p, status: nextStatus } : p
            );

            this._renderStats();
            this._renderQueueList();
          } catch (err) {
            alert('Error al actualizar estado del paciente: ' + err.message);
          }
        }
      });
    }
  }
}
