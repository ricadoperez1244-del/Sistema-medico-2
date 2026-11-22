/**
 * ============================================================================
 * SISTEMA PRM ASO HORIZONTE - src/modules/pacientes/PacientesView.js
 * ============================================================================
 * Vista: Archivo General de Pacientes e Historial Médico Clínico.
 * 
 * Permite buscar expedientes médicos por Cédula o Nombre, visualizar
 * antecedentes (alergias, enfermedades crónicas) y revisar consultas previas.
 */

import { api } from '../../services/api.js';

export class PacientesView {
  constructor(router) {
    this.router = router;
    this.patientsList = [];
    this.searchQuery = '';
    this.container = null;
    this.selectedPatient = null;
  }

  /**
   * Renderizado principal del archivo de pacientes
   */
  async render(container) {
    this.container = container;

    container.innerHTML = `
      <section class="pacientes-view animate-fade-in">
        <header class="page-header">
          <div class="page-header-title">
            <h1>Archivo General de Pacientes</h1>
            <span class="page-header-subtitle">
              Expedientes médicos, antecedentes clínicos y registro histórico de consultas.
            </span>
          </div>
          <div>
            <button class="btn btn-primary" id="btn-new-patient-archive">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
              </svg>
              <span>Nuevo Expediente</span>
            </button>
          </div>
        </header>

        <!-- Barra de Búsqueda de Expedientes -->
        <div class="queue-controls-bar">
          <div style="flex: 1; max-width: 480px;">
            <input 
              type="search" 
              id="search-patients-archive" 
              class="form-input" 
              placeholder="Buscar por cédula de identidad, nombre o condición..."
            />
          </div>
          <span class="badge badge-info" id="patients-count-badge">
            Cargando registros...
          </span>
        </div>

        <!-- Tabla de Expedientes Médicos -->
        <div class="patient-table-card">
          <div class="table-responsive">
            <table class="data-table">
              <thead>
                <tr>
                  <th>Cédula</th>
                  <th>Paciente</th>
                  <th>Edad / Sexo</th>
                  <th>Grupo Sang.</th>
                  <th>Alergias Conocidas</th>
                  <th>Patologías Crónicas</th>
                  <th>Consultas</th>
                  <th style="text-align: right;">Acciones</th>
                </tr>
              </thead>
              <tbody id="patients-table-body">
                <!-- Inyectado dinámicamente -->
              </tbody>
            </table>
          </div>
        </div>

        <!-- Modal de Historial Clínico (Contenedor) -->
        <div id="patient-modal-container"></div>
      </section>
    `;

    await this._loadPatients();
    this._bindEvents();
  }

  /**
   * Carga los expedientes desde la API
   */
  async _loadPatients() {
    try {
      const response = await api.get('/pacientes');
      this.patientsList = response.data || [];
      this._renderTable();
    } catch (err) {
      console.error('[PacientesView] Error al cargar pacientes:', err);
    }
  }

  /**
   * Renderiza las filas de la tabla de pacientes
   */
  _renderTable() {
    const tbody = this.container.querySelector('#patients-table-body');
    const badgeCount = this.container.querySelector('#patients-count-badge');
    if (!tbody) return;

    let filtered = [...this.patientsList];

    if (this.searchQuery.trim() !== '') {
      const q = this.searchQuery.toLowerCase();
      filtered = filtered.filter((p) =>
        p.name.toLowerCase().includes(q) ||
        p.cedula.toLowerCase().includes(q) ||
        (p.allergies && p.allergies.some(a => a.toLowerCase().includes(q))) ||
        (p.chronicDiseases && p.chronicDiseases.some(c => c.toLowerCase().includes(q)))
      );
    }

    if (badgeCount) {
      badgeCount.textContent = `${filtered.length} Pacientes Registrados`;
    }

    if (filtered.length === 0) {
      tbody.innerHTML = `
        <tr>
          <td colspan="8" style="text-align: center; padding: 3rem;">
            <p style="color: var(--slate-400);">No se encontraron expedientes que coincidan con la búsqueda.</p>
          </td>
        </tr>
      `;
      return;
    }

    tbody.innerHTML = filtered.map((patient) => {
      const allergiesHtml = patient.allergies && patient.allergies.length > 0
        ? patient.allergies.map(a => `<span class="allergy-tag">⚠️ ${a}</span>`).join('')
        : '<span style="color: var(--slate-400); font-size: 0.75rem;">Sin alergias registradas</span>';

      const chronicHtml = patient.chronicDiseases && patient.chronicDiseases.length > 0
        ? patient.chronicDiseases.map(c => `<span class="chronic-tag">${c}</span>`).join('')
        : '<span style="color: var(--slate-400); font-size: 0.75rem;">Ninguna</span>';

      return `
        <tr>
          <td><strong>${patient.cedula}</strong></td>
          <td>
            <div style="font-weight: 700; color: var(--slate-900);">${patient.name}</div>
            <div style="font-size: 0.75rem; color: var(--slate-400);">${patient.phone || 'Sin teléfono'}</div>
          </td>
          <td>${patient.age} años • ${patient.gender || 'N/A'}</td>
          <td><span class="badge badge-primary">${patient.bloodType || 'N/D'}</span></td>
          <td>${allergiesHtml}</td>
          <td>${chronicHtml}</td>
          <td><strong>${patient.historyCount || 1}</strong> visitas</td>
          <td style="text-align: right;">
            <div style="display: inline-flex; gap: 0.4rem;">
              <button class="btn btn-sm btn-secondary" data-action="view-history" data-id="${patient.id}">
                Ver Historial
              </button>
              <button class="btn btn-sm btn-primary" data-action="send-queue" data-id="${patient.id}" title="Ingresar a Sala de Espera Hoy">
                + Triage
              </button>
            </div>
          </td>
        </tr>
      `;
    }).join('');
  }

  /**
   * Muestra el modal con el detalle del historial del paciente
   */
  _showPatientHistoryModal(patient) {
    const modalContainer = this.container.querySelector('#patient-modal-container');
    if (!modalContainer) return;

    modalContainer.innerHTML = `
      <div class="modal-backdrop animate-fade-in" id="history-modal-backdrop">
        <div class="modal-card">
          <div class="modal-header">
            <div>
              <h2>Historial Clínico: ${patient.name}</h2>
              <span style="font-size: var(--font-size-xs); color: var(--slate-500);">Cédula: ${patient.cedula} | Tipo de Sangre: ${patient.bloodType}</span>
            </div>
            <button class="btn btn-sm btn-secondary" id="btn-close-modal">✕</button>
          </div>

          <div class="modal-body">
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; background: var(--slate-50); padding: 1rem; border-radius: var(--radius-md);">
              <div>
                <strong>Alergias Conocidas:</strong>
                <p style="color: var(--color-danger); font-size: 0.85rem; margin-top: 0.25rem;">
                  ${patient.allergies ? patient.allergies.join(', ') : 'Ninguna'}
                </p>
              </div>
              <div>
                <strong>Patologías Crónicas:</strong>
                <p style="color: var(--slate-700); font-size: 0.85rem; margin-top: 0.25rem;">
                  ${patient.chronicDiseases ? patient.chronicDiseases.join(', ') : 'Ninguna'}
                </p>
              </div>
            </div>

            <div>
              <h3 style="font-size: var(--font-size-sm); margin-bottom: 0.75rem;">Últimas Consultas Registradas:</h3>
              <div style="border-left: 2px solid var(--color-primary); padding-left: 1rem; display: flex; flex-direction: column; gap: 0.75rem;">
                <div>
                  <div style="font-size: var(--font-size-xs); color: var(--slate-400);">Última Atención: ${patient.lastVisit} • Dr. Morales</div>
                  <div style="font-size: var(--font-size-sm); color: var(--slate-800); font-weight: 600;">Control general de signos vitales y formulación médica.</div>
                </div>
                <div>
                  <div style="font-size: var(--font-size-xs); color: var(--slate-400);">Atención Previa • Dr. Rivas</div>
                  <div style="font-size: var(--font-size-sm); color: var(--slate-800); font-weight: 600;">Evaluación periódica y recetas de insumos.</div>
                </div>
              </div>
            </div>
          </div>

          <div class="modal-footer">
            <button class="btn btn-secondary" id="btn-close-modal-footer">Cerrar</button>
            <button class="btn btn-primary" id="btn-send-to-triage-modal">Enviar a Triaje Diaria</button>
          </div>
        </div>
      </div>
    `;

    // Eventos del modal
    const closeModal = () => { modalContainer.innerHTML = ''; };
    modalContainer.querySelector('#btn-close-modal').addEventListener('click', closeModal);
    modalContainer.querySelector('#btn-close-modal-footer').addEventListener('click', closeModal);
    modalContainer.querySelector('#btn-send-to-triage-modal').addEventListener('click', async () => {
      await this._sendPatientToQueue(patient);
      closeModal();
      this.router.navigate('#/home');
    });
  }

  /**
   * Envía un paciente existente a la cola diaria
   */
  async _sendPatientToQueue(patient) {
    const now = new Date();
    const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });

    await api.post('/cola-pacientes', {
      name: patient.name,
      cedula: patient.cedula,
      arrivalTime: timeStr,
      specialty: 'Medicina General',
      priority: 'normal',
      reason: 'Consulta programada de seguimiento clínico.',
      status: 'en_espera'
    });
  }

  /**
   * Vincula interactividad
   */
  _bindEvents() {
    const searchInput = this.container.querySelector('#search-patients-archive');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        this.searchQuery = e.target.value;
        this._renderTable();
      });
    }

    const btnNew = this.container.querySelector('#btn-new-patient-archive');
    if (btnNew) {
      btnNew.addEventListener('click', () => {
        const name = prompt('Ingrese Nombre y Apellido del Paciente:');
        if (!name) return;
        const cedula = prompt('Ingrese Cédula de Identidad (ej: V-25.111.222):');
        if (!cedula) return;

        const newPatient = {
          id: 'pac-' + Date.now(),
          name,
          cedula,
          age: 30,
          gender: 'Indefinido',
          bloodType: 'O+',
          phone: 'N/A',
          allergies: [],
          chronicDiseases: [],
          lastVisit: new Date().toISOString().split('T')[0],
          historyCount: 1
        };

        this.patientsList.unshift(newPatient);
        this._renderTable();
      });
    }

    // Delegación de eventos en tabla
    const tbody = this.container.querySelector('#patients-table-body');
    if (tbody) {
      tbody.addEventListener('click', async (e) => {
        const btn = e.target.closest('button[data-action]');
        if (!btn) return;

        const action = btn.getAttribute('data-action');
        const patientId = btn.getAttribute('data-id');
        const patient = this.patientsList.find((p) => p.id === patientId);

        if (!patient) return;

        if (action === 'view-history') {
          this._showPatientHistoryModal(patient);
        } else if (action === 'send-queue') {
          await this._sendPatientToQueue(patient);
          alert(`El paciente ${patient.name} ha sido ingresado a la Sala de Espera de hoy.`);
          this.router.navigate('#/home');
        }
      });
    }
  }
}