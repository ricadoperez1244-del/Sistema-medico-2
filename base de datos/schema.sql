-- ============================================================================
-- SISTEMA PRM ASO HORIZONTE - Esquema de Base de Datos SQLite (schema.sql)
-- ============================================================================

PRAGMA foreign_keys = ON;

-- 1. Tabla de Cola de Atención Diaria de Pacientes
CREATE TABLE IF NOT EXISTS cola_pacientes (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    cedula TEXT NOT NULL,
    arrivalTime TEXT NOT NULL,
    specialty TEXT NOT NULL CHECK(specialty IN ('Medicina General', 'Odontología')),
    reason TEXT NOT NULL,
    status TEXT DEFAULT 'en_espera' CHECK(status IN ('en_espera', 'en_consulta', 'atendido')),
    timestamp INTEGER NOT NULL
);

-- 2. Tabla de Archivo General de Pacientes y Expedientes
CREATE TABLE IF NOT EXISTS pacientes (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    cedula TEXT UNIQUE NOT NULL,
    age INTEGER,
    gender TEXT,
    bloodType TEXT,
    phone TEXT,
    allergies TEXT,            -- Formato JSON: array de strings
    chronicDiseases TEXT,      -- Formato JSON: array de strings
    lastVisit TEXT,
    historyCount INTEGER DEFAULT 1
);

-- 3. Tabla de Personal Médico y Administrativo
CREATE TABLE IF NOT EXISTS personal (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    role TEXT NOT NULL,
    code TEXT UNIQUE NOT NULL,
    status TEXT DEFAULT 'online' CHECK(status IN ('online', 'busy', 'offline')),
    shift TEXT NOT NULL,
    avatar TEXT
);

-- 4. Tabla de Insumos Médicos, Odontología y Farmacia
CREATE TABLE IF NOT EXISTS medicamentos (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    category TEXT NOT NULL,
    currentStock INTEGER NOT NULL,
    monthlyAverage INTEGER NOT NULL,
    minStock INTEGER NOT NULL,
    unit TEXT,
    status TEXT DEFAULT 'optimo' CHECK(status IN ('optimo', 'bajo', 'critico'))
);

