/**
 * ============================================================================
 * SISTEMA PRM ASO HORIZONTE - src/modules/home/PatientCard.js
 * ============================================================================
 * Componente: Tarjeta de Paciente en Cola de Atención Diaria.
 * 
 * Renderiza la información del paciente:
 * - Hora de llegada
 * - Nombre completo y documento de identidad (Cédula)
 * - Especialidad requerida y Motivo de consulta
 * - Nivel de Triaje (Urgente, Moderado, Normal)
 * - Estado de atención (En Espera, En Consulta, Atendido)
 * - Acciones clínicas rápidas
 */

export class PatientCard {
  /**
   * Genera el HTML correspondiente a un paciente en la lista de atención
   * @param {object} patient - Objeto de datos del paciente
   * @returns {string} Fragmento HTML del componente
   */
  static renderHTML(patient) {
    const {
      id,
      name,
      cedula = 'Sin Cédula',
      arrivalTime,
      specialty = 'Medicina General',
      reason = 'Consulta de rutina',
      priority = 'normal',
      status = 'en_espera'
    } = patient;

    // Badges de prioridad de triaje
    let priorityBadge = '';
    if (priority === 'urgente') {
      priorityBadge = `<span class="badge badge-danger">🔴 Urgente (Triage I)</span>`;
    } else if (priority === 'moderada') {
      priorityBadge = `<span class="badge badge-warning">🟡 Moderada (Triage II)</span>`;
    } else {
      priorityBadge = `<span class="badge badge-success">🟢 Normal (Triage III)</span>`;
    }

    // Badges de estado de atención
    let statusBadge = '';
    let actionButtons = '';

    if (status === 'en_espera') {
      statusBadge = `<span class="badge badge-warning">En Sala de Espera</span>`;
      actionButtons = `
        <button class="btn btn-sm btn-primary" data-action="attend" data-id="${id}">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
          </svg>
          <span>Llamar a Consulta</span>
        </button>
      `;
    } else if (status === 'en_consulta') {
      statusBadge = `<span class="badge badge-info">En Consulta Médica</span>`;
      actionButtons = `
        <button class="btn btn-sm btn-secondary" style="border-color: var(--color-success); color: var(--color-success);" data-action="finish" data-id="${id}">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" />
          </svg>
          <span>Finalizar Atención</span>
        </button>
      `;
    } else {
      statusBadge = `<span class="badge badge-success">Atendido</span>`;
      actionButtons = `
        <span style="font-size: var(--font-size-xs); color: var(--slate-400); font-weight: 600;">
          ✓ Atención completada
        </span>
      `;
    }

    return `
      <article class="patient-card priority-${priority} animate-fade-in" id="card-${id}">
        <div class="patient-card-top">
          <div class="patient-identity">
            <h3 class="patient-name">${name}</h3>
            <div class="patient-meta">
              <span class="patient-meta-item">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5zm6-10.125a1.875 1.875 0 11-3.75 0 1.875 1.875 0 013.75 0zm1.294 6.336a6.721 6.721 0 01-3.17.789 6.721 6.721 0 01-3.168-.789 3.376 3.376 0 016.338 0z" />
                </svg>
                <strong>${cedula}</strong>
              </span>
              <span>•</span>
              <span class="patient-meta-item" title="Hora de Registro">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Llegada: <strong>${arrivalTime}</strong>
              </span>
            </div>
          </div>

          <div class="patient-card-badges">
            <span class="badge badge-primary">${specialty}</span>
            ${priorityBadge}
          </div>
        </div>

        <div class="patient-reason-box">
          <span class="patient-reason-label">Motivo de Consulta:</span>
          <span>${reason}</span>
        </div>

        <div class="patient-card-footer">
          <div>
            ${statusBadge}
          </div>
          <div class="patient-actions">
            ${actionButtons}
          </div>
        </div>
      </article>
    `;
  }
}
