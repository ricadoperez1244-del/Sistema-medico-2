/**
 * ============================================================================
 * SISTEMA PRM ASO HORIZONTE - src/index.js
 * ============================================================================
 * Punto de Entrada Principal (Application Bootstrap).
 * 
 * Arquitectura: Modular Basada en Características (Feature-Based Architecture).
 * 
 * Guía para el Equipo de Desarrollo Entrante:
 * ----------------------------------------------------------------------------
 * 1. Para agregar un nuevo módulo o característica (ej: 'reportes' o 'citas'):
 *    - Cree la carpeta `src/modules/<nuevo_modulo>/`
 *    - Incorpore su vista `NuevoModuloView.js`, estilos `<nuevo_modulo>.css`
 *      y un archivo `index.js` para exponer la vista (Barrel Pattern).
 *    - Registre la nueva ruta en el mapa de rutas `ROUTES` de este archivo.
 *    - Agregue el enlace de navegación en `src/components/navbar/Navbar.js`.
 * 
 * 2. Autenticación y Rutas Protegidas:
 *    - El enrutador (`Router`) consulta automáticamente a `authGuard` antes de
 *      renderizar cualquier ruta que no sea pública (#/login).
 *    - La sesión médica persiste en localStorage y simula llamadas seguras con Bearer Token.
 * ============================================================================
 */

import { Router } from './router/index.js';

// Importación modular de Vistas (Barrel Exports)
import { LoginView } from './modules/auth/index.js';
import { HomeView } from './modules/home/index.js';
import { PersonalView } from './modules/personal/index.js';
import { PacientesView } from './modules/pacientes/index.js';
import { MedicamentosView } from './modules/medicamentos/index.js';

/**
 * Tabla de Rutas de la Aplicación (Hash-based Routing)
 */
const ROUTES = {
  '#/login': LoginView,
  '#/home': HomeView,
  '#/personal': PersonalView,
  '#/pacientes': PacientesView,
  '#/medicamentos': MedicamentosView
};

/**
 * Función de Inicialización del Sistema Clínico
 */
function bootstrapApp() {
  console.log('%c[Aso Horizonte PRM] Iniciando plataforma médica...', 'color: #0f766e; font-weight: bold; font-size: 13px;');

  // Inicializar el router SPA sobre el contenedor raíz
  const router = new Router(ROUTES);
  router.init('#app');
}

// Iniciar cuando el DOM esté listo
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', bootstrapApp);
} else {
  bootstrapApp();
}
