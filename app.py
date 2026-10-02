import sqlite3
from typing import Optional
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel


app = FastAPI(title="Backend - Sistema Médico Comunitario")


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


DATABASE = "base_datos.db"


def get_db():
  conn = sqlite3.connect(DATABASE)
  conn.row_factory = sqlite3.Row  # Nos permite leer los campos por nombre
  return conn



def init_db():
  conn = get_db()
  cursor = conn.cursor()

  cursor.execute("PRAGMA foreign_keys = ON;")


  cursor.execute("""
        CREATE TABLE IF NOT EXISTS pacientes (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            cedula TEXT UNIQUE NOT NULL,
            nombre TEXT NOT NULL,
            apellido TEXT NOT NULL,
            telefono TEXT
        )
    """)


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


init_db()
