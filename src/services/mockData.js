/**
 * ============================================================================
 * SISTEMA PRM ASO HORIZONTE - src/services/mockData.js
 * ============================================================================
 * Conjunto de datos simulados para permitir desarrollo autónomo e interactivo
 * del frontend antes o durante la integración con el backend REST / GraphQL.
 */

export const INITIAL_STAFF = [
  {
    id: 'st-01',
    name: 'Dra. Valentina Morales',
    role: 'Médico Cirujano / Triage',
    code: 'MED-8941',
    status: 'online', // 'online', 'busy', 'offline'
    shift: 'Mañana (07:00 - 13:00)',
    avatar: 'VM'
  },
  {
    id: 'st-02',
    name: 'Dr. Alejandro Rivas',
    role: 'Pediatra General',
    code: 'MED-4512',
    status: 'online',
    shift: 'Mañana (07:00 - 13:00)',
    avatar: 'AR'
  },
  {
    id: 'st-03',
    name: 'Lic. Mariana Gómez',
    role: 'Enfermera Jefe de Guardia',
    code: 'ENF-1120',
    status: 'online',
    shift: 'Completo (24h)',
    avatar: 'MG'
  },
  {
    id: 'st-04',
    name: 'Lcdo. Carlos Peña',
    role: 'Administración y Recepción',
    code: 'ADM-0042',
    status: 'online',
    shift: 'Mañana (08:00 - 14:00)',
    avatar: 'CP'
  },
  {
    id: 'st-05',
    name: 'Dr. Fernando Castro',
    role: 'Traumatólogo Especialista',
    code: 'MED-7731',
    status: 'offline',
    shift: 'Tarde (13:00 - 19:00)',
    avatar: 'FC'
  }
];

export const INITIAL_PATIENTS_QUEUE = [
  {
    id: 'pq-001',
    arrivalTime: '08:15 AM',
    timestamp: Date.now() - 3600000 * 3, // hace 3 horas
    name: 'Carmen Elena Benítez',
    cedula: 'V-14.892.410',
    age: 48,
    specialty: 'Medicina General',
    reason: 'Control de hipertensión y cefalea persistente',
    priority: 'moderada', // 'urgente', 'moderada', 'normal'
    status: 'atendido'    // 'en_espera', 'en_consulta', 'atendido'
  },
  {
    id: 'pq-002',
    arrivalTime: '09:40 AM',
    timestamp: Date.now() - 3600000 * 2, // hace 2 horas
    name: 'Santiago Andrés Salazar',
    cedula: 'V-31.054.218',
    age: 12,
    specialty: 'Pediatría',
    reason: 'Cuadro febril de 38.5°C y tos productiva',
    priority: 'urgente',
    status: 'en_consulta'
  },
  {
    id: 'pq-003',
    arrivalTime: '10:55 AM',
    timestamp: Date.now() - 1800000, // hace 30 min
    name: 'Héctor José Mendoza',
    cedula: 'V-18.421.993',
    age: 36,
    specialty: 'Traumatología',
    reason: 'Esguince en tobillo derecho por caída deportiva',
    priority: 'moderada',
    status: 'en_espera'
  },
  {
    id: 'pq-004',
    arrivalTime: '11:20 AM',
    timestamp: Date.now() - 600000, // hace 10 min
    name: 'Lucía Mercedes Navarro',
    cedula: 'V-26.714.502',
    age: 27,
    specialty: 'Ginecología y Obstetricia',
    reason: 'Control prenatal de 28 semanas de gestación',
    priority: 'normal',
    status: 'en_espera'
  }
];

export const INITIAL_ARCHIVE_PATIENTS = [
  {
    id: 'pac-101',
    name: 'Carmen Elena Benítez',
    cedula: 'V-14.892.410',
    age: 48,
    gender: 'Femenino',
    bloodType: 'O+',
    phone: '+58 414-5550192',
    allergies: ['Penicilina', 'Sulfas'],
    chronicDiseases: ['Hipertensión Arterial Grado 1'],
    lastVisit: '2026-10-09',
    historyCount: 6
  },
  {
    id: 'pac-102',
    name: 'Santiago Andrés Salazar',
    cedula: 'V-31.054.218',
    age: 12,
    gender: 'Masculino',
    bloodType: 'A+',
    phone: '+58 424-7788123',
    allergies: ['Ninguna conocida'],
    chronicDiseases: ['Asma bronquial intermitente'],
    lastVisit: '2026-10-09',
    historyCount: 3
  },
  {
    id: 'pac-103',
    name: 'Héctor José Mendoza',
    cedula: 'V-18.421.993',
    age: 36,
    gender: 'Masculino',
    bloodType: 'B+',
    phone: '+58 412-3344556',
    allergies: ['AINES (Ibuprofeno)'],
    chronicDiseases: ['Ninguna'],
    lastVisit: '2026-10-09',
    historyCount: 2
  },
  {
    id: 'pac-104',
    name: 'Lucía Mercedes Navarro',
    cedula: 'V-26.714.502',
    age: 27,
    gender: 'Femenino',
    bloodType: 'O+',
    phone: '+58 416-9900112',
    allergies: ['Ninguna conocida'],
    chronicDiseases: ['Ninguna'],
    lastVisit: '2026-10-09',
    historyCount: 5
  },
  {
    id: 'pac-105',
    name: 'Roberto Gómez Bolaños',
    cedula: 'V-08.112.943',
    age: 72,
    gender: 'Masculino',
    bloodType: 'O-',
    phone: '+58 414-1122334',
    allergies: ['Dipirona'],
    chronicDiseases: ['Diabetes Mellitus Tipo 2', 'Artrosis'],
    lastVisit: '2026-09-28',
    historyCount: 14
  }
];

export const INITIAL_MEDICAMENTOS = [
  {
    id: 'med-01',
    name: 'Paracetamol 500mg (Comprimidos)',
    category: 'Analgésicos / Antipiréticos',
    currentStock: 480,
    monthlyAverage: 620, // Media mensual
    minStock: 150,
    unit: 'Cajas de 20 uds',
    status: 'optimo'
  },
  {
    id: 'med-02',
    name: 'Amoxicilina + Ácido Clavulánico 875/125mg',
    category: 'Antibióticos',
    currentStock: 75,
    monthlyAverage: 240,
    minStock: 90,
    unit: 'Frascos / Blíster',
    status: 'bajo'
  },
  {
    id: 'med-03',
    name: 'Solución Fisiológica 0.9% 500ml',
    category: 'Soluciones Parenterales',
    currentStock: 28,
    monthlyAverage: 310,
    minStock: 50,
    unit: 'Bolsas infusión',
    status: 'critico'
  },
  {
    id: 'med-04',
    name: 'Losartán Potásico 50mg',
    category: 'Cardiovascular / Antihipertensivo',
    currentStock: 520,
    monthlyAverage: 450,
    minStock: 120,
    unit: 'Cajas',
    status: 'optimo'
  },
  {
    id: 'med-05',
    name: 'Ibuprofeno 400mg',
    category: 'Antiinflamatorios (AINE)',
    currentStock: 310,
    monthlyAverage: 380,
    minStock: 100,
    unit: 'Cajas',
    status: 'optimo'
  },
  {
    id: 'med-06',
    name: 'Jeringas Desechables 5ml c/ Aguja 21G',
    category: 'Insumos Médicos Descartables',
    currentStock: 1200,
    monthlyAverage: 1400,
    minStock: 300,
    unit: 'Unidades',
    status: 'optimo'
  }
];
