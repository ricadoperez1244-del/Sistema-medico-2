/**
 * ============================================================================
 * SISTEMA PRM ASO HORIZONTE - src/modules/auth/LoginView.js
 * ============================================================================
 * Vista: Pantalla de Autenticación de Credenciales Médicas.
 * 
 * Permite al personal de salud y administrativo autenticarse en el sistema
 * mediante su código de colegiado/empleado institucional y contraseña.
 */

import { authGuard } from '../../services/authGuard.js';

export class LoginView {
  constructor(router) {
    this.router = router;
  }

  /**
   * Renderiza el formulario de inicio de sesión
   * @param {HTMLElement} container - Contenedor principal donde se monta la vista
   */
  render(container) {
    // Si ya está autenticado, redirigir directamente al panel de atención
    if (authGuard.isAuthenticated()) {
      this.router.navigate('#/home');
      return;
    }

    container.innerHTML = `
      <div class="auth-wrapper animate-fade-in">
        <div class="auth-bg-blob-1"></div>
        <div class="auth-bg-blob-2"></div>

        <div class="auth-container">
          <div class="auth-card">
            <header class="auth-header">
              <div class="auth-icon-badge">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>
              </div>
              <h1 class="auth-title">Ambulatorio Aso Horizonte</h1>
              <p class="auth-subtitle">Sistema PRM de Gestión de Pacientes y Triaje Médico</p>
            </header>

            <!-- Alerta de Error -->
            <div id="login-error-alert" class="auth-error" role="alert">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
              </svg>
              <span id="login-error-text">Credenciales inválidas</span>
            </div>

            <!-- Formulario de Acceso -->
            <form id="medical-login-form">
              <div class="form-group">
                <label for="medical-code" class="form-label">Código de Colegiado / Empleado</label>
                <input 
                  type="text" 
                  id="medical-code" 
                  class="form-input" 
                  placeholder="Ej: MED-8941 o ENF-1120" 
                  required 
                  autocomplete="username"
                  value="MED-8941"
                />
              </div>

              <div class="form-group">
                <label for="medical-password" class="form-label">Contraseña de Acceso</label>
                <input 
                  type="password" 
                  id="medical-password" 
                  class="form-input" 
                  placeholder="••••••••" 
                  required 
                  autocomplete="current-password"
                  value="123456"
                />
              </div>

              <div class="form-group">
                <label for="medical-shift" class="form-label">Turno de Guardia Asignado</label>
                <select id="medical-shift" class="form-select">
                  <option value="Mañana (07:00 - 13:00)">Guardia Mañana (07:00 - 13:00)</option>
                  <option value="Tarde (13:00 - 19:00)">Guardia Tarde (13:00 - 19:00)</option>
                  <option value="Noche (19:00 - 07:00)">Guardia Nocturna (19:00 - 07:00)</option>
                  <option value="Completo (24 Horas)">Retén 24 Horas</option>
                </select>
              </div>

              <button type="submit" id="btn-submit-login" class="btn btn-primary" style="width: 100%; margin-top: 0.75rem;">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" />
                </svg>
                <span>Validar Credencial y Acceder</span>
              </button>
            </form>

            <!-- Acceso Rápido para Pruebas / Onboarding de nuevos desarrolladores -->
            <div class="auth-quick-select">
              <div class="auth-quick-title">Cuentas demo para desarrollo rápido</div>
              <div class="auth-quick-chips">
                <button type="button" class="auth-quick-chip-btn" data-code="MED-8941" data-role="Dra. Valentina Morales (Triage)">
                  <span>🩺 <strong>Dra. Morales</strong> (Triage)</span>
                  <span class="auth-quick-chip-badge">MED-8941</span>
                </button>
                <button type="button" class="auth-quick-chip-btn" data-code="ENF-1120" data-role="Lic. Mariana Gómez (Enfermería)">
                  <span>💉 <strong>Lic. Gómez</strong> (Enfermería)</span>
                  <span class="auth-quick-chip-badge">ENF-1120</span>
                </button>
                <button type="button" class="auth-quick-chip-btn" data-code="ADM-0042" data-role="Lcdo. Carlos Peña (Admisión)">
                  <span>📋 <strong>Lcdo. Peña</strong> (Admisión)</span>
                  <span class="auth-quick-chip-badge">ADM-0042</span>
                </button>
              </div>
            </div>

            <footer class="auth-footer">
              Aso Horizonte Ambulatorio © 2026 • Plataforma PRM Segura
            </footer>
          </div>
        </div>
      </div>
    `;

    this._bindEvents(container);
  }

  /**
   * Vincula los controladores de eventos al formulario de Login
   */
  _bindEvents(container) {
    const form = container.querySelector('#medical-login-form');
    const inputCode = container.querySelector('#medical-code');
    const inputPass = container.querySelector('#medical-password');
    const selectShift = container.querySelector('#medical-shift');
    const submitBtn = container.querySelector('#btn-submit-login');
    const errorAlert = container.querySelector('#login-error-alert');
    const errorText = container.querySelector('#login-error-text');

    // Botones de carga rápida
    const quickButtons = container.querySelectorAll('.auth-quick-chip-btn');
    quickButtons.forEach((btn) => {
      btn.addEventListener('click', () => {
        const code = btn.getAttribute('data-code');
        inputCode.value = code;
        inputPass.value = '123456';
      });
    });

    // Envío del Formulario
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      errorAlert.classList.remove('is-visible');

      const medicalCode = inputCode.value.trim();
      const password = inputPass.value.trim();
      const shift = selectShift.value;

      if (!medicalCode || !password) {
        errorText.textContent = 'Por favor complete todos los campos de credencial médica.';
        errorAlert.classList.add('is-visible');
        return;
      }

      // Feedback visual de carga
      submitBtn.disabled = true;
      submitBtn.innerHTML = `<span>Verificando credencial...</span>`;

      try {
        await authGuard.login({ medicalCode, password, shift });
        // Redireccionar al módulo principal
        this.router.navigate('#/home');
      } catch (err) {
        errorText.textContent = err.message || 'Error al validar credencial médica.';
        errorAlert.classList.add('is-visible');
        submitBtn.disabled = false;
        submitBtn.innerHTML = `
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" />
          </svg>
          <span>Validar Credencial y Acceder</span>
        `;
      }
    });
  }
}
