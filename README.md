# Sistema PRM / CRM de Gestión de Pacientes - Ambulatorio Aso Horizonte

Plataforma Web Frontend desarrollada con **JavaScript ES6 Modular (Vanilla JS / Vite)** y diseñada bajo una **Arquitectura Basada en Características (Feature-Based Architecture)** para facilitar el trabajo colaborativo en equipos distribuidos y la expansión incremental del sistema en fases posteriores.

---

## 📁 Estructura del Proyecto

```text
Sistema Aso Horizonte/
│
├── assets/
│   └── css/
│       └── global.css          # Variables institucionales, tokens de diseño y reset CSS
│
├── src/
│   ├── components/             # Componentes compartidos y reutilizables
│   │   └── navbar/
│   │       ├── Navbar.js       # Menú superior institucional reactivo a autenticación
│   │       ├── navbar.css      # Estilos del menú y perfil médico
│   │       └── index.js        # Barrel export del Navbar
│   │
│   ├── modules/                # Módulos aislados por característica (Feature-Based)
│   │   ├── auth/
│   │   │   ├── LoginView.js    # Pantalla de acceso y validación de credenciales médicas
│   │   │   ├── auth.css        # Estilos visuales del login
│   │   │   └── index.js        # Barrel export de autenticación
│   │   │
│   │   ├── home/
│   │   │   ├── HomeView.js     # Cola de atención diaria y triaje (orden descendente)
│   │   │   ├── PatientCard.js  # Componente de tarjeta de paciente en sala/consulta
│   │   │   ├── home.css        # Estilos del tablero de triaje
│   │   │   └── index.js        # Barrel export de home
│   │   │
│   │   ├── personal/
│   │   │   ├── PersonalView.js # Directorio de médicos y administrativos online
│   │   │   ├── personal.css    # Estilos del directorio de personal
│   │   │   └── index.js        # Barrel export de personal
│   │   │
│   │   ├── pacientes/
│   │   │   ├── PacientesView.js # Archivo general de expedientes, buscador e historial
│   │   │   ├── pacientes.css   # Estilos de la tabla de expedientes y modal
│   │   │   └── index.js        # Barrel export de pacientes
│   │   │
│   │   └── medicamentos/
│   │       ├── MedicamentosView.js # Control de inventario y media mensual de consumo
│   │       ├── medicamentos.css    # Estilos de métricas y barras de cobertura
│   │       └── index.js        # Barrel export de medicamentos
│   │
│   ├── router/
│   │   ├── router.js           # Enrutador cliente SPA (Hash routing) con AuthGuard
│   │   └── index.js            # Barrel export del router
│   │
│   ├── services/
│   │   ├── api.js              # Cliente Fetch centralizado con Bearer Token y Mock DB
│   │   ├── authGuard.js        # Lógica de validación de credencial médica y sesión
│   │   ├── mockData.js         # Datos institucionales iniciales para desarrollo autónomo
│   │   └── index.js            # Barrel export de servicios
│   │
│   └── index.js                # Bootstrap principal y registro de rutas
│
├── index.html                  # Plantilla SPA y contenedor raíz (#app)
├── package.json                # Configuración de dependencias y scripts de ejecución
└── README.md                   # Documentación de arquitectura y guía de desarrollo
```

---

## 🚀 Cómo Ejecutar el Proyecto

El proyecto está diseñado con módulos nativos de ES6 (`type="module"`), por lo que puede ejecutarse de múltiples formas:

### Opción 1: Con VS Code / Live Server (Sin necesidad de Node.js)
1. Abre la carpeta del proyecto en **VS Code**.
2. Haz clic derecho sobre `index.html` y selecciona **"Open with Live Server"**.

### Opción 2: Con Python (Servidor local inmediato)
Abre una terminal en la raíz del proyecto y ejecuta:
```bash
python -m http.server 3000
```
Luego abre tu navegador en `http://localhost:3000`.

### Opción 3: Con Node.js y Vite
Si tienes Node.js instalado:
```bash
npm install
npm run dev
```

---

## 🔑 Credenciales Médicas de Demostración
La pantalla de inicio de sesión incluye botones de acceso rápido con las siguientes credenciales para pruebas:

- **Dra. Valentina Morales (Triage):** `MED-8941` / `123456`
- **Lic. Mariana Gómez (Enfermería):** `ENF-1120` / `123456`
- **Lcdo. Carlos Peña (Admisión):** `ADM-0042` / `123456`

---

## 🛠️ Guía para el Equipo de Desarrollo Entrante (Modelo Incremental)

### ¿Cómo agregar una nueva característica o módulo?
Ejemplo: Agregar el módulo **Citas Programadas (`citas`)**:

1. **Crear la carpeta del módulo:**
   Crea la ruta `src/modules/citas/`.
2. **Crear los archivos internos:**
   - `CitasView.js`: Lógica y renderizado del módulo.
   - `citas.css`: Estilos visuales exclusivos del módulo.
   - `index.js`: Archivo Barrel que exporta la vista (`export { CitasView } from './CitasView.js';`).
3. **Registrar la ruta en `src/index.js`:**
   ```javascript
   import { CitasView } from './modules/citas/index.js';

   const ROUTES = {
     // ... rutas existentes
     '#/citas': CitasView
   };
   ```
4. **Agregar el enlace en el menú (`src/components/navbar/Navbar.js`):**
   Agrega el objeto con el icono y título en el array `navItems`.
