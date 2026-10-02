import sqlite3
from typing import Optional
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

# 1. Inicializamos la aplicación del servidor FastAPI
app = FastAPI(title="Backend - Sistema Médico Comunitario")

# Habilitamos CORS (para permitir conexiones desde el navegador)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Definimos el nombre del archivo de la base de datos SQLite
DATABASE = "base_datos.db"


# 2. Función para conectar a la base de datos SQLite
def get_db():
  conn = sqlite3.connect(DATABASE)
  conn.row_factory = sqlite3.Row  # Nos permite leer los campos por nombre
  return conn


# 3. Función para inicializar las tablas de la base de datos
def init_db():
  conn = get_db()
  cursor = conn.cursor()

  # Activar el soporte para claves foráneas
  cursor.execute("PRAGMA foreign_keys = ON;")

  # Tabla de Pacientes
  cursor.execute("""
        CREATE TABLE IF NOT EXISTS pacientes (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            cedula TEXT UNIQUE NOT NULL,
            nombre TEXT NOT NULL,
            apellido TEXT NOT NULL,
            telefono TEXT
        )
    """)

  # Tabla de Citas
  cursor.execute("""
        CREATE TABLE IF NOT EXISTS citas (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            paciente_id INTEGER NOT NULL,
            fecha_hora TEXT NOT NULL,
            motivo TEXT NOT NULL,
            estado TEXT DEFAULT 'Pendiente',
            FOREIGN KEY (paciente_id) REFERENCES pacientes(id) ON DELETE CASCADE
        )
    """)

  # Tabla de Expedientes Médicos
  cursor.execute("""
        CREATE TABLE IF NOT EXISTS expedientes (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            paciente_id INTEGER NOT NULL,
            fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            diagnostico TEXT NOT NULL,
            tratamiento TEXT,
            observaciones TEXT,
            FOREIGN KEY (paciente_id) REFERENCES pacientes(id) ON DELETE CASCADE
        )
    """)

  conn.commit()
  conn.close()


# Ejecutamos la creación de tablas al cargar el script
init_db()