(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),t.credentials=e.crossOrigin===`use-credentials`?`include`:e.crossOrigin===`anonymous`?`omit`:`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var e=[{id:`st-01`,name:`Dra. Valentina Morales`,role:`Médico Cirujano / Medicina General`,code:`MED-8941`,status:`online`,shift:`Mañana (07:00 - 13:00)`,avatar:`VM`},{id:`st-02`,name:`Dr. Alejandro Rivas`,role:`Odontólogo Especialista`,code:`ODO-4512`,status:`online`,shift:`Mañana (07:00 - 13:00)`,avatar:`AR`},{id:`st-03`,name:`Lic. Mariana Gómez`,role:`Enfermera de Guardia`,code:`ENF-1120`,status:`online`,shift:`Completo (24h)`,avatar:`MG`},{id:`st-04`,name:`Lcdo. Carlos Peña`,role:`Administración y Recepción`,code:`ADM-0042`,status:`online`,shift:`Mañana (08:00 - 14:00)`,avatar:`CP`},{id:`st-05`,name:`Dra. Sofía Blanco`,role:`Odontología General`,code:`ODO-7731`,status:`offline`,shift:`Tarde (13:00 - 19:00)`,avatar:`SB`}],t=[{id:`pq-001`,arrivalTime:`08:15 AM`,timestamp:Date.now()-108e5,name:`Carmen Elena Benítez`,cedula:`V-14.892.410`,age:48,specialty:`Medicina General`,reason:`Control de hipertensión y cefalea persistente`,status:`atendido`},{id:`pq-002`,arrivalTime:`09:40 AM`,timestamp:Date.now()-72e5,name:`Santiago Andrés Salazar`,cedula:`V-31.054.218`,age:12,specialty:`Odontología`,reason:`Dolor agudo en molar inferior y revisión de caries`,status:`en_consulta`},{id:`pq-003`,arrivalTime:`10:55 AM`,timestamp:Date.now()-18e5,name:`Héctor José Mendoza`,cedula:`V-18.421.993`,age:36,specialty:`Medicina General`,reason:`Control de hipertensión arterial y evaluación médica`,status:`en_espera`},{id:`pq-004`,arrivalTime:`11:20 AM`,timestamp:Date.now()-6e5,name:`Lucía Mercedes Navarro`,cedula:`V-26.714.502`,age:27,specialty:`Odontología`,reason:`Limpieza dental profunda y profilaxis`,status:`en_espera`}],n=[{id:`pac-101`,name:`Carmen Elena Benítez`,cedula:`V-14.892.410`,age:48,gender:`Femenino`,bloodType:`O+`,phone:`+58 414-5550192`,allergies:[`Penicilina`,`Sulfas`],chronicDiseases:[`Hipertensión Arterial Grado 1`],lastVisit:`2026-10-09`,historyCount:6},{id:`pac-102`,name:`Santiago Andrés Salazar`,cedula:`V-31.054.218`,age:12,gender:`Masculino`,bloodType:`A+`,phone:`+58 424-7788123`,allergies:[`Ninguna conocida`],chronicDiseases:[`Asma bronquial intermitente`],lastVisit:`2026-10-09`,historyCount:3},{id:`pac-103`,name:`Héctor José Mendoza`,cedula:`V-18.421.993`,age:36,gender:`Masculino`,bloodType:`B+`,phone:`+58 412-3344556`,allergies:[`AINES (Ibuprofeno)`],chronicDiseases:[`Ninguna`],lastVisit:`2026-10-09`,historyCount:2},{id:`pac-104`,name:`Lucía Mercedes Navarro`,cedula:`V-26.714.502`,age:27,gender:`Femenino`,bloodType:`O+`,phone:`+58 416-9900112`,allergies:[`Ninguna conocida`],chronicDiseases:[`Ninguna`],lastVisit:`2026-10-09`,historyCount:5},{id:`pac-105`,name:`Roberto Gómez Bolaños`,cedula:`V-08.112.943`,age:72,gender:`Masculino`,bloodType:`O-`,phone:`+58 414-1122334`,allergies:[`Dipirona`],chronicDiseases:[`Diabetes Mellitus Tipo 2`,`Artrosis`],lastVisit:`2026-09-28`,historyCount:14}],r=[{id:`med-01`,name:`Paracetamol 500mg (Comprimidos)`,category:`Analgésicos / Antipiréticos`,currentStock:480,monthlyAverage:620,minStock:150,unit:`Cajas de 20 uds`,status:`optimo`},{id:`med-02`,name:`Amoxicilina + Ácido Clavulánico 875/125mg`,category:`Antibióticos`,currentStock:75,monthlyAverage:240,minStock:90,unit:`Frascos / Blíster`,status:`bajo`},{id:`med-03`,name:`Solución Fisiológica 0.9% 500ml`,category:`Soluciones Parenterales`,currentStock:28,monthlyAverage:310,minStock:50,unit:`Bolsas infusión`,status:`critico`},{id:`med-04`,name:`Losartán Potásico 50mg`,category:`Cardiovascular / Antihipertensivo`,currentStock:520,monthlyAverage:450,minStock:120,unit:`Cajas`,status:`optimo`},{id:`med-05`,name:`Ibuprofeno 400mg`,category:`Antiinflamatorios (AINE)`,currentStock:310,monthlyAverage:380,minStock:100,unit:`Cajas`,status:`optimo`},{id:`med-06`,name:`Jeringas Desechables 5ml c/ Aguja 21G`,category:`Insumos Médicos Descartables`,currentStock:1200,monthlyAverage:1400,minStock:300,unit:`Unidades`,status:`optimo`}],i=new class{constructor(){this.baseURL=typeof window<`u`&&window.__ENV__?.API_URL||`http://127.0.0.1:8000`,this.tokenStorageKey=`aso_auth_token`,this.sessionStorageKey=`aso_auth_user`,this._initLocalDatabase()}getToken(){return localStorage.getItem(this.tokenStorageKey)||null}setToken(e){e?localStorage.setItem(this.tokenStorageKey,e):localStorage.removeItem(this.tokenStorageKey)}_buildHeaders(e={}){let t={"Content-Type":`application/json`,Accept:`application/json`,...e},n=this.getToken();return n&&(t.Authorization=`Bearer ${n}`),t}async request(e,t={}){let n=`${this.baseURL}${e}`,r=this._buildHeaders(t.headers);try{let e=await fetch(n,{...t,headers:r});if(e.status===401)throw this.setToken(null),window.dispatchEvent(new CustomEvent(`aso:auth-expired`)),Error(`Sesión médica caducada. Por favor inicie sesión nuevamente.`);if(!e.ok){let t=await e.json().catch(()=>({}));throw Error(t.message||`Error del servidor HTTP ${e.status}`)}return await e.json()}catch(n){return console.warn(`[ApiClient] Red no disponible para ${e}. Usando Mock DB local:`,n.message),this._mockFallback(e,t)}}get(e,t={}){return this.request(e,{method:`GET`,headers:t})}post(e,t={},n={}){return this.request(e,{method:`POST`,headers:n,body:JSON.stringify(t)})}put(e,t={},n={}){return this.request(e,{method:`PUT`,headers:n,body:JSON.stringify(t)})}delete(e,t={}){return this.request(e,{method:`DELETE`,headers:t})}_initLocalDatabase(){localStorage.getItem(`aso_db_queue`)||localStorage.setItem(`aso_db_queue`,JSON.stringify(t)),localStorage.getItem(`aso_db_staff`)||localStorage.setItem(`aso_db_staff`,JSON.stringify(e)),localStorage.getItem(`aso_db_patients`)||localStorage.setItem(`aso_db_patients`,JSON.stringify(n)),localStorage.getItem(`aso_db_medicamentos`)||localStorage.setItem(`aso_db_medicamentos`,JSON.stringify(r))}async _mockFallback(e,t){if(await new Promise(e=>setTimeout(e,150)),e.startsWith(`/cola-pacientes`)){let e=JSON.parse(localStorage.getItem(`aso_db_queue`)||`[]`);if(t.method===`POST`){let n=JSON.parse(t.body),r={id:`pq-`+Date.now(),timestamp:Date.now(),status:`en_espera`,...n};return e.unshift(r),localStorage.setItem(`aso_db_queue`,JSON.stringify(e)),{success:!0,data:r}}if(t.method===`PUT`){let n=JSON.parse(t.body);return e=e.map(e=>e.id===n.id?{...e,...n}:e),localStorage.setItem(`aso_db_queue`,JSON.stringify(e)),{success:!0,data:n}}return{success:!0,data:e}}return e.startsWith(`/personal`)?{success:!0,data:JSON.parse(localStorage.getItem(`aso_db_staff`)||`[]`)}:e.startsWith(`/pacientes`)?{success:!0,data:JSON.parse(localStorage.getItem(`aso_db_patients`)||`[]`)}:e.startsWith(`/medicamentos`)?{success:!0,data:JSON.parse(localStorage.getItem(`aso_db_medicamentos`)||`[]`)}:{success:!0,message:`Operación simulada completada exitosamente`}}},a=`aso_auth_user`,o=new class{constructor(){this.currentUser=this._loadUserFromStorage()}_loadUserFromStorage(){try{let e=localStorage.getItem(a);return e?JSON.parse(e):null}catch(e){return console.error(`[AuthGuard] Error al parsear usuario de sesión:`,e),null}}isAuthenticated(){let e=!!i.getToken(),t=!!this.currentUser;return e&&t}getUser(){return this.currentUser}async login(e){let{medicalCode:t,password:n,shift:r=`Guardia Diurna`}=e;if(!t||!n)throw Error(`Debe proporcionar su Código de Colegiado/Médico y contraseña.`);let o=`jwt_aso_med_`+btoa(t+`:`+Date.now()),s=`Médico de Guardia`,c=`Dr(a). Profesional`,l=t.toUpperCase();l.startsWith(`MED`)?(s=`Médico Medicina General`,c=`Dra. Valentina Morales`):l.startsWith(`ODO`)?(s=`Odontólogo Especialista`,c=`Dr. Alejandro Rivas`):l.startsWith(`ENF`)?(s=`Enfermería de Guardia`,c=`Lic. Mariana Gómez`):l.startsWith(`ADM`)?(s=`Administrador de Centro`,c=`Lcdo. Carlos Peña`):c=`Dr. Colegiado ${t}`;let u={medicalCode:l,name:c,role:s,shift:r,loggedAt:new Date().toISOString()};return i.setToken(o),localStorage.setItem(a,JSON.stringify(u)),this.currentUser=u,window.dispatchEvent(new CustomEvent(`aso:auth-change`,{detail:{isAuthenticated:!0,user:u}})),{success:!0,user:u}}logout(){i.setToken(null),localStorage.removeItem(a),this.currentUser=null,window.dispatchEvent(new CustomEvent(`aso:auth-change`,{detail:{isAuthenticated:!1,user:null}}))}canActivate(e){return[`#/login`,`/login`,`#/`].includes(e)?!0:this.isAuthenticated()}},s=class{constructor(e){this.router=e,this.mobileOpen=!1}_getInitials(e=``){let t=e.trim().split(` `);return t.length>=2?(t[0][0]+t[1][0]).toUpperCase():(e[0]||`DR`).toUpperCase()}render(e,t=window.location.hash||`#/home`){if(!o.isAuthenticated()){e.innerHTML=``;return}let n=o.getUser()||{name:`Dr. Personal Médico`,role:`Médico de Guardia`,medicalCode:`MED-0000`},r=this._getInitials(n.name),i=[{path:`#/home`,label:`Atención Diaria`,icon:`
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>`},{path:`#/personal`,label:`Personal de Guardia`,icon:`
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
          </svg>`},{path:`#/pacientes`,label:`Pacientes`,icon:`
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
          </svg>`},{path:`#/medicamentos`,label:`Medicamentos & Stock`,icon:`
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.942A4.5 4.5 0 0115.9 16.5H8.1a4.5 4.5 0 01-2.33-.658L4.2 14.9" />
          </svg>`}].map(e=>{let n=t.startsWith(e.path);return`
          <li>
            <a href="${e.path}" class="navbar-link ${n?`active`:``}" data-nav-link>
              ${e.icon}
              <span>${e.label}</span>
            </a>
          </li>
        `}).join(``);e.innerHTML=`
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
            
            <ul class="navbar-nav ${this.mobileOpen?`is-open`:``}" id="navbar-links-list">
              <li>
                <a href="#/home" class="menu__navbar-brand">
                  <div class="navbar-logo-icon">
                    <span>+</span>
                  </div>
                  <div class="navbar-brand-text">
                    <span class="navbar-brand-name">ASO HORIZONTE</span>
                    <span class="navbar-brand-tagline">Sistema PRM Clínico</span>
                  </div>
                </a>
              </li>
              ${i}
            </ul>
          </nav>

          <!-- Acciones de Usuario y Salida -->
          <div class="navbar-actions">
            <div class="user-badge" title="Credencial: ${n.medicalCode}">
              <div class="user-avatar">${r}</div>
              <div class="user-info">
                <span class="user-name">${n.name}</span>
                <span class="user-role">${n.role} (${n.medicalCode})</span>
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
    `,this._bindEvents(e)}_bindEvents(e){let t=e.querySelector(`#btn-logout`);t&&t.addEventListener(`click`,e=>{e.preventDefault(),window.confirm(`¿Desea cerrar la sesión clínica actual y registrar su salida?`)&&(o.logout(),this.router?this.router.navigate(`#/login`):window.location.hash=`#/login`)});let n=e.querySelector(`#btn-nav-toggle`),r=e.querySelector(`#navbar-links-list`);n&&r&&n.addEventListener(`click`,()=>{this.mobileOpen=!this.mobileOpen,r.classList.toggle(`is-open`,this.mobileOpen)}),e.querySelectorAll(`[data-nav-link]`).forEach(e=>{e.addEventListener(`click`,()=>{this.mobileOpen=!1,r&&r.classList.remove(`is-open`)})})}},c=class{constructor(e={}){this.routes=e,this.appElement=null,this.navbar=null,this.currentPath=``}init(e=`#app`){this.appElement=typeof e==`string`?document.querySelector(e):e,this.appElement?(this.navbar=new s(this),window.addEventListener(`hashchange`,()=>this._handleRouteChange()),window.addEventListener(`load`,()=>this._handleRouteChange()),window.addEventListener(`aso:auth-change`,()=>this._handleRouteChange()),window.addEventListener(`aso:auth-expired`,()=>{alert(`Su sesión médica ha expirado. Por favor, vuelva a ingresar sus credenciales.`),this.navigate(`#/login`)}),this._handleRouteChange()):console.error(`[Router] No se encontró el contenedor raíz de la aplicación.`)}navigate(e){window.location.hash===e?this._handleRouteChange():window.location.hash=e}async _handleRouteChange(){let e=window.location.hash||`#/home`;if((e===``||e===`#`||e===`#/`)&&(e=`#/home`),!o.canActivate(e)){console.warn(`[Router] Acceso denegado a "${e}". Redirigiendo a pantalla de login.`),this.navigate(`#/login`);return}if(e===`#/login`&&o.isAuthenticated()){this.navigate(`#/home`);return}this.currentPath=e;let t=this.routes[e];if(!t)console.error(`[Router] Ruta no encontrada: ${e}`),this._renderNotFound();else{if(e===`#/login`){this.appElement.innerHTML=`<div id="login-module-container"></div>`;let e=this.appElement.querySelector(`#login-module-container`);await new t(this).render(e)}else{this.appElement.innerHTML=`
        <div class="main-layout">
          <div id="app-navbar-slot"></div>
          <main class="main-content" id="app-view-container"></main>
        </div>
      `;let n=this.appElement.querySelector(`#app-navbar-slot`);this.navbar.render(n,e);let r=this.appElement.querySelector(`#app-view-container`);await new t(this).render(r)}window.scrollTo({top:0,behavior:`smooth`})}}_renderNotFound(){this.appElement.innerHTML=`
      <div style="min-height: 80vh; display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; padding: 2rem;">
        <h1 style="font-size: 3rem; color: var(--color-danger); margin-bottom: 0.5rem;">404</h1>
        <h2>Módulo Clínico No Encontrado</h2>
        <p style="margin: 1rem 0 1.5rem 0;">La ruta ${window.location.hash} no corresponde a ningún servicio de Aso Horizonte.</p>
        <button class="btn btn-primary" onclick="window.location.hash='#/home'">
          Volver a Atención Diaria
        </button>
      </div>
    `}},l=class{constructor(e){this.router=e}render(e){o.isAuthenticated()?this.router.navigate(`#/home`):(e.innerHTML=`
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
                <button type="button" class="auth-quick-chip-btn" data-code="MED-8941" data-role="Dra. Valentina Morales (Medicina General)">
                  <span>🩺 <strong>Dra. Morales</strong> (Medicina General)</span>
                  <span class="auth-quick-chip-badge">MED-8941</span>
                </button>
                <button type="button" class="auth-quick-chip-btn" data-code="ODO-4512" data-role="Dr. Alejandro Rivas (Odontología)">
                  <span>🦷 <strong>Dr. Rivas</strong> (Odontología)</span>
                  <span class="auth-quick-chip-badge">ODO-4512</span>
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
    `,this._bindEvents(e))}_bindEvents(e){let t=e.querySelector(`#medical-login-form`),n=e.querySelector(`#medical-code`),r=e.querySelector(`#medical-password`),i=e.querySelector(`#medical-shift`),a=e.querySelector(`#btn-submit-login`),s=e.querySelector(`#login-error-alert`),c=e.querySelector(`#login-error-text`);e.querySelectorAll(`.auth-quick-chip-btn`).forEach(e=>{e.addEventListener(`click`,()=>{let t=e.getAttribute(`data-code`);n.value=t,r.value=`123456`})}),t.addEventListener(`submit`,async e=>{e.preventDefault(),s.classList.remove(`is-visible`);let t=n.value.trim(),l=r.value.trim(),u=i.value;if(!t||!l)c.textContent=`Por favor complete todos los campos de credencial médica.`,s.classList.add(`is-visible`);else{a.disabled=!0,a.innerHTML=`<span>Verificando credencial...</span>`;try{await o.login({medicalCode:t,password:l,shift:u}),this.router.navigate(`#/home`)}catch(e){c.textContent=e.message||`Error al validar credencial médica.`,s.classList.add(`is-visible`),a.disabled=!1,a.innerHTML=`
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" />
          </svg>
          <span>Validar Credencial y Acceder</span>
        `}}})}},u=class{static renderHTML(e){let{id:t,name:n,cedula:r=`Sin Cédula`,arrivalTime:i,specialty:a=`Medicina General`,reason:o=`Consulta de rutina`,priority:s=`normal`,status:c=`en_espera`}=e,l=``,u=``;return c===`en_espera`?(l=`<span class="badge badge-warning">En Sala de Espera</span>`,u=`
        <button class="btn btn-sm btn-primary" data-action="attend" data-id="${t}">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
          </svg>
          <span>Llamar a Consulta</span>
        </button>
      `):c===`en_consulta`?(l=`<span class="badge badge-info">En Consulta Médica</span>`,u=`
        <button class="btn btn-sm btn-secondary" style="border-color: var(--color-success); color: var(--color-success);" data-action="finish" data-id="${t}">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" />
          </svg>
          <span>Finalizar Atención</span>
        </button>
      `):(l=`<span class="badge badge-success">Atendido</span>`,u=`
        <span style="font-size: var(--font-size-xs); color: var(--slate-400); font-weight: 600;">
          ✓ Atención completada
        </span>
      `),`
      <article class="patient-card animate-fade-in" id="card-${t}">
        <div class="patient-card-top">
          <div class="patient-identity">
            <h3 class="patient-name">${n}</h3>
            <div class="patient-meta">
              <span class="patient-meta-item">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5zm6-10.125a1.875 1.875 0 11-3.75 0 1.875 1.875 0 013.75 0zm1.294 6.336a6.721 6.721 0 01-3.17.789 6.721 6.721 0 01-3.168-.789 3.376 3.376 0 016.338 0z" />
                </svg>
                <strong>${r}</strong>
              </span>
              <span>•</span>
              <span class="patient-meta-item" title="Hora de Registro">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Llegada: <strong>${i}</strong>
              </span>
            </div>
          </div>

          <div class="patient-card-badges">
            <span class="badge badge-primary">${a}</span>
          </div>
        </div>

        <div class="patient-reason-box">
          <span class="patient-reason-label">Motivo de Consulta:</span>
          <span>${o}</span>
        </div>

        <div class="patient-card-footer">
          <div>
            ${l}
          </div>
          <div class="patient-actions">
            ${u}
          </div>
        </div>
      </article>
    `}},d={"#/login":l,"#/home":class{constructor(e){this.router=e,this.patientsQueue=[],this.currentFilter=`todos`,this.searchQuery=``,this.container=null}_getCurrentFormattedTime(){return new Date().toLocaleTimeString([],{hour:`2-digit`,minute:`2-digit`,hour12:!0})}async render(e){this.container=e,e.innerHTML=`
      <section class="home-view animate-fade-in">
        <!-- Encabezado de la Página -->
        <header class="page-header">
          <div class="page-header-title">
            <h1>Atención Diaria y Consultas</h1>
            <span class="page-header-subtitle">
              Gestión en tiempo real del flujo de pacientes en sala de espera y consulta médica.
            </span>
          </div>
          <div>
            <span class="badge badge-primary" style="font-size: var(--font-size-sm); padding: 0.5rem 0.85rem;">
              📅 Guardia de Hoy: ${new Date().toLocaleDateString(`es-ES`,{weekday:`long`,day:`numeric`,month:`long`,year:`numeric`})}
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
                  <option value="Odontología">Odontología</option>
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
    `,await this._loadPatientsQueue(),this._bindEvents()}async _loadPatientsQueue(){try{let e=(await i.get(`/cola-pacientes`)).data||[];this.patientsQueue=e.sort((e,t)=>(t.timestamp||0)-(e.timestamp||0)),this._renderStats(),this._renderQueueList()}catch(e){console.error(`[HomeView] Error al cargar la cola de pacientes:`,e)}}_renderStats(){let e=this.container.querySelector(`#home-stats-container`);e&&(e.innerHTML=`
      <div class="stat-card">
        <div class="stat-info">
          <span class="stat-label">Total Ingresos Hoy</span>
          <span class="stat-value">${this.patientsQueue.length}</span>
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
          <span class="stat-value" style="color: var(--color-warning);">${this.patientsQueue.filter(e=>e.status===`en_espera`).length}</span>
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
          <span class="stat-value" style="color: var(--color-info);">${this.patientsQueue.filter(e=>e.status===`en_consulta`).length}</span>
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
          <span class="stat-value" style="color: var(--color-success);">${this.patientsQueue.filter(e=>e.status===`atendido`).length}</span>
        </div>
        <div class="stat-icon green">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
      </div>
    `)}_renderQueueList(){let e=this.container.querySelector(`#queue-list-wrapper`);if(!e)return;let t=[...this.patientsQueue];if(this.currentFilter!==`todos`&&(t=t.filter(e=>e.status===this.currentFilter)),this.searchQuery.trim()!==``){let e=this.searchQuery.toLowerCase();t=t.filter(t=>t.name&&t.name.toLowerCase().includes(e)||t.cedula&&t.cedula.toLowerCase().includes(e)||t.specialty&&t.specialty.toLowerCase().includes(e))}e.innerHTML=t.length===0?`
        <div class="empty-queue-state animate-fade-in">
          <div class="empty-queue-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
            </svg>
          </div>
          <h3>No hay pacientes registrados</h3>
          <p>No se encontraron registros para el filtro o término de búsqueda seleccionado.</p>
        </div>
      `:t.map(e=>u.renderHTML(e)).join(``)}_bindEvents(){let e=this.container.querySelector(`#form-patient-arrival`);e&&e.addEventListener(`submit`,async t=>{t.preventDefault();let n=this.container.querySelector(`#input-patient-name`).value.trim(),r=this.container.querySelector(`#input-patient-cedula`).value.trim(),a=this.container.querySelector(`#input-patient-time`).value.trim(),o=this.container.querySelector(`#select-patient-specialty`).value,s=this.container.querySelector(`#input-patient-reason`).value.trim(),c={name:n,cedula:r,arrivalTime:a||this._getCurrentFormattedTime(),specialty:o,reason:s,status:`en_espera`};try{let t=(await i.post(`/cola-pacientes`,c)).data||c;this.patientsQueue.unshift(t),e.reset(),this.container.querySelector(`#input-patient-time`).value=this._getCurrentFormattedTime(),this._renderStats(),this._renderQueueList()}catch(e){alert(`Error al registrar llegada del paciente: `+e.message)}});let t=this.container.querySelectorAll(`.queue-tab-btn`);t.forEach(e=>{e.addEventListener(`click`,()=>{t.forEach(e=>e.classList.remove(`active`)),e.classList.add(`active`),this.currentFilter=e.getAttribute(`data-filter`),this._renderQueueList()})});let n=this.container.querySelector(`#search-patient-queue`);n&&n.addEventListener(`input`,e=>{this.searchQuery=e.target.value,this._renderQueueList()});let r=this.container.querySelector(`#queue-list-wrapper`);r&&r.addEventListener(`click`,async e=>{let t=e.target.closest(`button[data-action]`);if(!t)return;let n=t.getAttribute(`data-action`),r=t.getAttribute(`data-id`),a=``;if(n===`attend`&&(a=`en_consulta`),n===`finish`&&(a=`atendido`),a)try{await i.put(`/cola-pacientes`,{id:r,status:a}),this.patientsQueue=this.patientsQueue.map(e=>e.id===r?{...e,status:a}:e),this._renderStats(),this._renderQueueList()}catch(e){alert(`Error al actualizar estado del paciente: `+e.message)}})}},"#/personal":class{constructor(e){this.router=e,this.staffList=[],this.currentFilter=`online`,this.searchQuery=``,this.container=null}async render(e){this.container=e,e.innerHTML=`
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
    `,await this._loadStaff(),this._bindEvents()}async _loadStaff(){try{let e=await i.get(`/personal`);this.staffList=e.data||[],this._renderGrid()}catch(e){console.error(`[PersonalView] Error al cargar lista de personal:`,e)}}_renderGrid(){let e=this.container.querySelector(`#staff-cards-grid`);if(!e)return;let t=[...this.staffList];if(this.currentFilter===`online`&&(t=t.filter(e=>e.status===`online`)),this.searchQuery.trim()!==``){let e=this.searchQuery.toLowerCase();t=t.filter(t=>t.name.toLowerCase().includes(e)||t.role.toLowerCase().includes(e)||t.code.toLowerCase().includes(e))}e.innerHTML=t.length===0?`
        <div class="empty-queue-state" style="grid-column: 1 / -1;">
          <h3>No se encontró personal disponible</h3>
          <p>Verifique los criterios de búsqueda o el filtro seleccionado.</p>
        </div>
      `:t.map(e=>{let t=e.status===`online`,n=t?`🟢 Activo en Guardia`:`⚪ Fuera de Turno`,r=t?`badge-success`:`badge-secondary`;return`
        <article class="staff-card animate-fade-in">
          <div class="staff-card-header">
            <div class="staff-avatar-wrapper">
              <div class="staff-avatar">${e.avatar||`DR`}</div>
              <div class="staff-status-indicator ${e.status}"></div>
            </div>
            <div class="staff-details">
              <h3 class="staff-name">${e.name}</h3>
              <span class="staff-role">${e.role}</span>
              <span class="staff-code">Colegiado: ${e.code}</span>
            </div>
          </div>

          <div class="staff-info-box">
            <div class="staff-info-row">
              <span class="staff-info-label">Estado de Conexión:</span>
              <span class="badge ${r}">${n}</span>
            </div>
            <div class="staff-info-row">
              <span class="staff-info-label">Turno Asignado:</span>
              <span class="staff-info-value">${e.shift}</span>
            </div>
          </div>

          <div style="display: flex; gap: 0.5rem; margin-top: auto;">
            <button class="btn btn-sm btn-secondary" style="flex: 1;" onclick="alert('Conectando por intercomunicador con ${e.name} (${e.code})...')">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
              </svg>
              <span>Contactar</span>
            </button>
          </div>
        </article>
      `}).join(``)}_bindEvents(){let e=this.container.querySelectorAll(`.queue-tab-btn`);e.forEach(t=>{t.addEventListener(`click`,()=>{e.forEach(e=>e.classList.remove(`active`)),t.classList.add(`active`),this.currentFilter=t.getAttribute(`data-filter`),this._renderGrid()})});let t=this.container.querySelector(`#search-staff-input`);t&&t.addEventListener(`input`,e=>{this.searchQuery=e.target.value,this._renderGrid()})}},"#/pacientes":class{constructor(e){this.router=e,this.patientsList=[],this.searchQuery=``,this.container=null,this.selectedPatient=null}async render(e){this.container=e,e.innerHTML=`
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
    `,await this._loadPatients(),this._bindEvents()}async _loadPatients(){try{let e=await i.get(`/pacientes`);this.patientsList=e.data||[],this._renderTable()}catch(e){console.error(`[PacientesView] Error al cargar pacientes:`,e)}}_renderTable(){let e=this.container.querySelector(`#patients-table-body`),t=this.container.querySelector(`#patients-count-badge`);if(!e)return;let n=[...this.patientsList];if(this.searchQuery.trim()!==``){let e=this.searchQuery.toLowerCase();n=n.filter(t=>t.name.toLowerCase().includes(e)||t.cedula.toLowerCase().includes(e)||t.allergies&&t.allergies.some(t=>t.toLowerCase().includes(e))||t.chronicDiseases&&t.chronicDiseases.some(t=>t.toLowerCase().includes(e)))}t&&(t.textContent=`${n.length} Pacientes Registrados`),e.innerHTML=n.length===0?`
        <tr>
          <td colspan="8" style="text-align: center; padding: 3rem;">
            <p style="color: var(--slate-400);">No se encontraron expedientes que coincidan con la búsqueda.</p>
          </td>
        </tr>
      `:n.map(e=>{let t=e.allergies&&e.allergies.length>0?e.allergies.map(e=>`<span class="allergy-tag">⚠️ ${e}</span>`).join(``):`<span style="color: var(--slate-400); font-size: 0.75rem;">Sin alergias registradas</span>`,n=e.chronicDiseases&&e.chronicDiseases.length>0?e.chronicDiseases.map(e=>`<span class="chronic-tag">${e}</span>`).join(``):`<span style="color: var(--slate-400); font-size: 0.75rem;">Ninguna</span>`;return`
        <tr>
          <td><strong>${e.cedula}</strong></td>
          <td>
            <div style="font-weight: 700; color: var(--slate-900);">${e.name}</div>
            <div style="font-size: 0.75rem; color: var(--slate-400);">${e.phone||`Sin teléfono`}</div>
          </td>
          <td>${e.age} años • ${e.gender||`N/A`}</td>
          <td><span class="badge badge-primary">${e.bloodType||`N/D`}</span></td>
          <td>${t}</td>
          <td>${n}</td>
          <td><strong>${e.historyCount||1}</strong> visitas</td>
          <td style="text-align: right;">
            <div style="display: inline-flex; gap: 0.4rem;">
              <button class="btn btn-sm btn-secondary" data-action="view-history" data-id="${e.id}">
                Ver Historial
              </button>
              <button class="btn btn-sm btn-primary" data-action="send-queue" data-id="${e.id}" title="Ingresar a Sala de Espera Hoy">
                + Consulta
              </button>
            </div>
          </td>
        </tr>
      `}).join(``)}_showPatientHistoryModal(e){let t=this.container.querySelector(`#patient-modal-container`);if(!t)return;t.innerHTML=`
      <div class="modal-backdrop animate-fade-in" id="history-modal-backdrop">
        <div class="modal-card">
          <div class="modal-header">
            <div>
              <h2>Historial Clínico: ${e.name}</h2>
              <span style="font-size: var(--font-size-xs); color: var(--slate-500);">Cédula: ${e.cedula} | Tipo de Sangre: ${e.bloodType}</span>
            </div>
            <button class="btn btn-sm btn-secondary" id="btn-close-modal">✕</button>
          </div>

          <div class="modal-body">
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; background: var(--slate-50); padding: 1rem; border-radius: var(--radius-md);">
              <div>
                <strong>Alergias Conocidas:</strong>
                <p style="color: var(--color-danger); font-size: 0.85rem; margin-top: 0.25rem;">
                  ${e.allergies?e.allergies.join(`, `):`Ninguna`}
                </p>
              </div>
              <div>
                <strong>Patologías Crónicas:</strong>
                <p style="color: var(--slate-700); font-size: 0.85rem; margin-top: 0.25rem;">
                  ${e.chronicDiseases?e.chronicDiseases.join(`, `):`Ninguna`}
                </p>
              </div>
            </div>

            <div>
              <h3 style="font-size: var(--font-size-sm); margin-bottom: 0.75rem;">Últimas Consultas Registradas:</h3>
              <div style="border-left: 2px solid var(--color-primary); padding-left: 1rem; display: flex; flex-direction: column; gap: 0.75rem;">
                <div>
                  <div style="font-size: var(--font-size-xs); color: var(--slate-400);">Última Atención: ${e.lastVisit} • Dr. Morales</div>
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
            <button class="btn btn-primary" id="btn-send-to-triage-modal">Ingresar a Sala de Espera</button>
          </div>
        </div>
      </div>
    `;let n=()=>{t.innerHTML=``};t.querySelector(`#btn-close-modal`).addEventListener(`click`,n),t.querySelector(`#btn-close-modal-footer`).addEventListener(`click`,n),t.querySelector(`#btn-send-to-triage-modal`).addEventListener(`click`,async()=>{await this._sendPatientToQueue(e),n(),this.router.navigate(`#/home`)})}async _sendPatientToQueue(e){let t=new Date().toLocaleTimeString([],{hour:`2-digit`,minute:`2-digit`,hour12:!0});await i.post(`/cola-pacientes`,{name:e.name,cedula:e.cedula,arrivalTime:t,specialty:`Medicina General`,reason:`Consulta programada de seguimiento clínico.`,status:`en_espera`})}_bindEvents(){let e=this.container.querySelector(`#search-patients-archive`);e&&e.addEventListener(`input`,e=>{this.searchQuery=e.target.value,this._renderTable()});let t=this.container.querySelector(`#btn-new-patient-archive`);t&&t.addEventListener(`click`,()=>{let e=prompt(`Ingrese Nombre y Apellido del Paciente:`);if(!e)return;let t=prompt(`Ingrese Cédula de Identidad (ej: V-25.111.222):`);if(!t)return;let n={id:`pac-`+Date.now(),name:e,cedula:t,age:30,gender:`Indefinido`,bloodType:`O+`,phone:`N/A`,allergies:[],chronicDiseases:[],lastVisit:new Date().toISOString().split(`T`)[0],historyCount:1};this.patientsList.unshift(n),this._renderTable()});let n=this.container.querySelector(`#patients-table-body`);n&&n.addEventListener(`click`,async e=>{let t=e.target.closest(`button[data-action]`);if(!t)return;let n=t.getAttribute(`data-action`),r=t.getAttribute(`data-id`),i=this.patientsList.find(e=>e.id===r);i&&(n===`view-history`?this._showPatientHistoryModal(i):n===`send-queue`&&(await this._sendPatientToQueue(i),alert(`El paciente ${i.name} ha sido ingresado a la Sala de Espera de hoy.`),this.router.navigate(`#/home`)))})}},"#/medicamentos":class{constructor(e){this.router=e,this.medicinesList=[],this.container=null,this.searchQuery=``}async render(e){this.container=e,e.innerHTML=`
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
    `,await this._loadMedicines(),this._bindEvents()}async _loadMedicines(){try{let e=await i.get(`/medicamentos`);this.medicinesList=e.data||[],this._renderStats(),this._renderTable()}catch(e){console.error(`[MedicamentosView] Error al cargar medicamentos:`,e)}}_renderStats(){let e=this.container.querySelector(`#med-stats-grid`);if(!e)return;let t=this.medicinesList.length,n=this.medicinesList.reduce((e,t)=>e+(t.monthlyAverage||0),0),r=this.medicinesList.filter(e=>e.status===`critico`).length,i=Math.round(n/(t||1));e.innerHTML=`
      <div class="stat-card">
        <div class="stat-info">
          <span class="stat-label">Insumos Catalogados</span>
          <span class="stat-value">${t}</span>
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
          <span class="stat-value" style="color: var(--color-primary);">${n.toLocaleString()}</span>
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
          <span class="stat-value">${i} <span style="font-size: 1rem; color: var(--slate-400);">uds/mes</span></span>
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
          <span class="stat-value" style="color: var(--color-danger);">${r}</span>
        </div>
        <div class="stat-icon yellow">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
          </svg>
        </div>
      </div>
    `}_renderTable(){let e=this.container.querySelector(`#med-table-body`);if(!e)return;let t=[...this.medicinesList];if(this.searchQuery.trim()!==``){let e=this.searchQuery.toLowerCase();t=t.filter(t=>t.name.toLowerCase().includes(e)||t.category.toLowerCase().includes(e))}e.innerHTML=t.length===0?`
        <tr>
          <td colspan="7" style="text-align: center; padding: 3rem;">
            <p style="color: var(--slate-400);">No se encontraron insumos con ese nombre.</p>
          </td>
        </tr>
      `:t.map(e=>{let t=Math.min(100,Math.round(e.currentStock/(e.monthlyAverage||100)*100)),n=`<span class="badge badge-success">Óptimo</span>`,r=`optimo`;return e.status===`critico`||e.currentStock<=e.minStock?(n=`<span class="badge badge-danger">Crítico</span>`,r=`critico`):(e.status===`bajo`||t<30)&&(n=`<span class="badge badge-warning">Bajo</span>`,r=`bajo`),`
        <tr>
          <td>
            <div style="font-weight: 700; color: var(--slate-900);">${e.name}</div>
            <div style="font-size: 0.75rem; color: var(--slate-400);">${e.unit}</div>
          </td>
          <td><span class="badge badge-info">${e.category}</span></td>
          <td>
            <strong style="font-size: 1.05rem; color: var(--slate-900);">${e.currentStock}</strong>
            <span style="font-size: 0.75rem; color: var(--slate-400);">/ mín: ${e.minStock}</span>
          </td>
          <td>
            <div class="consumption-metric-badge">
              <span>📈 ${e.monthlyAverage} uds/mes</span>
            </div>
          </td>
          <td style="min-width: 160px;">
            <div style="display: flex; justify-content: space-between; font-size: 0.75rem; font-weight: 600;">
              <span>Cobertura mensual</span>
              <span>${t}%</span>
            </div>
            <div class="stock-progress-bar-bg">
              <div class="stock-progress-bar-fill ${r}" style="width: ${t}%;"></div>
            </div>
          </td>
          <td>${n}</td>
          <td style="text-align: right;">
            <button class="btn btn-sm btn-secondary" data-action="adjust-stock" data-id="${e.id}">
              Modificar Stock
            </button>
          </td>
        </tr>
      `}).join(``)}_bindEvents(){let e=this.container.querySelector(`#search-med-input`);e&&e.addEventListener(`input`,e=>{this.searchQuery=e.target.value,this._renderTable()});let t=this.container.querySelector(`#btn-add-medicine`);t&&t.addEventListener(`click`,()=>{let e=prompt(`Nombre del medicamento o insumo médico:`);if(!e)return;let t=prompt(`Categoría (ej: Antibióticos, Soluciones, Descartables):`)||`General`,n=parseInt(prompt(`Cantidad de unidades a ingresar:`)||`100`,10),r=parseInt(prompt(`Estimado de consumo medio mensual:`)||`150`,10),i={id:`med-`+Date.now(),name:e,category:t,currentStock:n,monthlyAverage:r,minStock:Math.round(r*.25),unit:`Unidades`,status:n>50?`optimo`:`bajo`};this.medicinesList.unshift(i),this._renderStats(),this._renderTable()});let n=this.container.querySelector(`#med-table-body`);n&&n.addEventListener(`click`,e=>{let t=e.target.closest(`button[data-action="adjust-stock"]`);if(!t)return;let n=t.getAttribute(`data-id`),r=this.medicinesList.find(e=>e.id===n);if(!r)return;let i=prompt(`Ajuste de inventario para ${r.name}:\n(Ingrese un número positivo para entrada de lote o negativo para despacho por fórmula)`,`10`);if(i&&!isNaN(i)){let e=parseInt(i,10);r.currentStock=Math.max(0,r.currentStock+e),r.status=r.currentStock<=r.minStock?`critico`:`optimo`,this._renderStats(),this._renderTable()}})}}};function f(){console.log(`%c[Aso Horizonte PRM] Iniciando plataforma médica...`,`color: #0f766e; font-weight: bold; font-size: 13px;`),new c(d).init(`#app`)}document.readyState===`loading`?document.addEventListener(`DOMContentLoaded`,f):f();