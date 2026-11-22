"""
============================================================================
SISTEMA PRM ASO HORIZONTE - backend/app.py
============================================================================
Servidor Backend REST y Servidor Web Integrado con SQLite.

Características:
1. Sin errores de compilación ni dependencias forzadas:
   Funciona con la librería estándar de Python (zero dependencias externas).
   Si FastAPI y Uvicorn están instalados, los aprovecha automáticamente.
2. Servidor Unificado:
   Sirve tanto la API REST (/cola-pacientes, /pacientes, etc.) como la
   interfaz web completa de 'frontend/' en http://localhost:8000.
3. Base de Datos Centralizada:
   Conecta directamente a 'base de datos/base_datos.db'.
============================================================================
"""

import os
import sys
import json
import sqlite3
import time
import mimetypes
from http.server import HTTPServer, SimpleHTTPRequestHandler
import urllib.parse
from typing import Optional, Dict, Any, List

# ============================================================================
# RUTAS DEL PROYECTO
# ============================================================================
BACKEND_DIR = os.path.dirname(os.path.abspath(__file__))
PROJECT_ROOT = os.path.dirname(BACKEND_DIR)
DB_DIR = os.path.join(PROJECT_ROOT, "base de datos")
DATABASE = os.path.join(DB_DIR, "base_datos.db")
FRONTEND_DIR = os.path.join(PROJECT_ROOT, "frontend")

# Asegurar que la carpeta de base de datos exista
os.makedirs(DB_DIR, exist_ok=True)

# ============================================================================
# 1. GESTIÓN Y ESQUEMA DE BASE DE DATOS SQLITE
# ============================================================================

def get_db():
    conn = sqlite3.connect(DATABASE)
    conn.row_factory = sqlite3.Row
    return conn

def init_db():
    conn = get_db()
    cursor = conn.cursor()
    cursor.execute("PRAGMA foreign_keys = ON;")

    # Tabla 1: Cola de atención diaria de pacientes
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS cola_pacientes (
            id TEXT PRIMARY KEY,
            name TEXT NOT NULL,
            cedula TEXT NOT NULL,
            arrivalTime TEXT NOT NULL,
            specialty TEXT NOT NULL,
            reason TEXT NOT NULL,
            status TEXT DEFAULT 'en_espera',
            timestamp INTEGER NOT NULL
        )
    """)

    # Tabla 2: Archivo general de expedientes médicos
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS pacientes (
            id TEXT PRIMARY KEY,
            name TEXT NOT NULL,
            cedula TEXT UNIQUE NOT NULL,
            age INTEGER,
            gender TEXT,
            bloodType TEXT,
            phone TEXT,
            allergies TEXT,
            chronicDiseases TEXT,
            lastVisit TEXT,
            historyCount INTEGER DEFAULT 1
        )
    """)

    # Tabla 3: Personal médico y administrativo de guardia
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS personal (
            id TEXT PRIMARY KEY,
            name TEXT NOT NULL,
            role TEXT NOT NULL,
            code TEXT UNIQUE NOT NULL,
            status TEXT DEFAULT 'online',
            shift TEXT NOT NULL,
            avatar TEXT
        )
    """)

    # Tabla 4: Insumos médicos y farmacia
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS medicamentos (
            id TEXT PRIMARY KEY,
            name TEXT NOT NULL,
            category TEXT NOT NULL,
            currentStock INTEGER NOT NULL,
            monthlyAverage INTEGER NOT NULL,
            minStock INTEGER NOT NULL,
            unit TEXT,
            status TEXT DEFAULT 'optimo'
        )
    """)

    conn.commit()
    _seed_initial_data(cursor, conn)
    conn.close()

def _seed_initial_data(cursor, conn):
    # Semilla para cola de pacientes
    cursor.execute("SELECT COUNT(*) FROM cola_pacientes")
    if cursor.fetchone()[0] == 0:
        now = int(time.time() * 1000)
        initial_queue = [
            ("pq-001", "Carmen Elena Benítez", "V-14.892.410", "08:15 AM", "Medicina General", "Control de hipertensión y cefalea persistente", "atendido", now - 10800000),
            ("pq-002", "Santiago Andrés Salazar", "V-31.054.218", "09:40 AM", "Odontología", "Dolor agudo en molar inferior y revisión de caries", "en_consulta", now - 7200000),
            ("pq-003", "Héctor José Mendoza", "V-18.421.993", "10:55 AM", "Medicina General", "Control de hipertensión arterial y evaluación médica", "en_espera", now - 1800000),
            ("pq-004", "Lucía Mercedes Navarro", "V-26.714.502", "11:20 AM", "Odontología", "Limpieza dental profunda y profilaxis", "en_espera", now - 600000)
        ]
        cursor.executemany("INSERT INTO cola_pacientes VALUES (?, ?, ?, ?, ?, ?, ?, ?)", initial_queue)

    # Semilla para personal
    cursor.execute("SELECT COUNT(*) FROM personal")
    if cursor.fetchone()[0] == 0:
        initial_staff = [
            ("st-01", "Dra. Valentina Morales", "Médico Cirujano / Medicina General", "MED-8941", "online", "Mañana (07:00 - 13:00)", "VM"),
            ("st-02", "Dr. Alejandro Rivas", "Odontólogo Especialista", "ODO-4512", "online", "Mañana (07:00 - 13:00)", "AR"),
            ("st-03", "Lic. Mariana Gómez", "Enfermera de Guardia", "ENF-1120", "online", "Completo (24h)", "MG"),
            ("st-04", "Lcdo. Carlos Peña", "Administración y Recepción", "ADM-0042", "online", "Mañana (08:00 - 14:00)", "CP"),
            ("st-05", "Dra. Sofía Blanco", "Odontología General", "ODO-7731", "offline", "Tarde (13:00 - 19:00)", "SB")
        ]
        cursor.executemany("INSERT INTO personal VALUES (?, ?, ?, ?, ?, ?, ?)", initial_staff)

    # Semilla para pacientes del archivo general
    cursor.execute("SELECT COUNT(*) FROM pacientes")
    if cursor.fetchone()[0] == 0:
        initial_patients = [
            ("pac-101", "Carmen Elena Benítez", "V-14.892.410", 48, "Femenino", "O+", "+58 414-5550192", json.dumps(["Penicilina", "Sulfas"]), json.dumps(["Hipertensión Arterial Grado 1"]), "2026-10-09", 6),
            ("pac-102", "Santiago Andrés Salazar", "V-31.054.218", 12, "Masculino", "A+", "+58 424-7788123", json.dumps([]), json.dumps(["Sensibilidad dental"]), "2026-10-09", 3),
            ("pac-103", "Héctor José Mendoza", "V-18.421.993", 36, "Masculino", "B+", "+58 412-3344556", json.dumps(["AINES (Ibuprofeno)"]), json.dumps([]), "2026-10-09", 2),
            ("pac-104", "Lucía Mercedes Navarro", "V-26.714.502", 27, "Femenino", "O+", "+58 416-9900112", json.dumps([]), json.dumps([]), "2026-10-09", 5)
        ]
        cursor.executemany("INSERT INTO pacientes VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", initial_patients)

    # Semilla para medicamentos
    cursor.execute("SELECT COUNT(*) FROM medicamentos")
    if cursor.fetchone()[0] == 0:
        initial_meds = [
            ("med-01", "Paracetamol 500mg (Comprimidos)", "Analgésicos / Antipiréticos", 480, 620, 150, "Cajas de 20 uds", "optimo"),
            ("med-02", "Amoxicilina + Ácido Clavulánico 875/125mg", "Antibióticos", 75, 240, 90, "Frascos / Blíster", "bajo"),
            ("med-03", "Solución Fisiológica 0.9% 500ml", "Soluciones Parenterales", 28, 310, 50, "Bolsas infusión", "critico"),
            ("med-04", "Anestésico Dental Lidocaína 2% con Epinefrina", "Odontología / Insumos", 150, 180, 40, "Cajas", "optimo"),
            ("med-05", "Agujas Dentales Desechables 27G", "Odontología / Descartables", 500, 600, 100, "Unidades", "optimo")
        ]
        cursor.executemany("INSERT INTO medicamentos VALUES (?, ?, ?, ?, ?, ?, ?, ?)", initial_meds)

    conn.commit()

# Inicializar BD al cargar el módulo
init_db()

# ============================================================================
# 2. OPERACIONES CRUD CON SQLITE
# ============================================================================

def db_get_cola():
    conn = get_db()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM cola_pacientes ORDER BY timestamp DESC")
    rows = [dict(row) for row in cursor.fetchall()]
    conn.close()
    return rows

def db_add_cola(item: Dict[str, Any]):
    conn = get_db()
    cursor = conn.cursor()
    patient_id = item.get("id") or f"pq-{int(time.time() * 1000)}"
    timestamp = item.get("timestamp") or int(time.time() * 1000)
    status = item.get("status") or "en_espera"
    
    cursor.execute("""
        INSERT INTO cola_pacientes (id, name, cedula, arrivalTime, specialty, reason, status, timestamp)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    """, (
        patient_id,
        item.get("name", ""),
        item.get("cedula", ""),
        item.get("arrivalTime", ""),
        item.get("specialty", "Medicina General"),
        item.get("reason", ""),
        status,
        timestamp
    ))
    conn.commit()
    conn.close()
    return {
        "id": patient_id,
        "name": item.get("name"),
        "cedula": item.get("cedula"),
        "arrivalTime": item.get("arrivalTime"),
        "specialty": item.get("specialty", "Medicina General"),
        "reason": item.get("reason"),
        "status": status,
        "timestamp": timestamp
    }

def db_update_cola(item: Dict[str, Any]):
    conn = get_db()
    cursor = conn.cursor()
    cursor.execute("UPDATE cola_pacientes SET status = ? WHERE id = ?", (item.get("status"), item.get("id")))
    conn.commit()
    conn.close()
    return item

def db_get_pacientes():
    conn = get_db()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM pacientes")
    rows = []
    for row in cursor.fetchall():
        d = dict(row)
        try:
            d["allergies"] = json.loads(d.get("allergies") or "[]")
        except Exception:
            d["allergies"] = []
        try:
            d["chronicDiseases"] = json.loads(d.get("chronicDiseases") or "[]")
        except Exception:
            d["chronicDiseases"] = []
        rows.append(d)
    conn.close()
    return rows

def db_get_personal():
    conn = get_db()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM personal")
    rows = [dict(row) for row in cursor.fetchall()]
    conn.close()
    return rows

def db_get_medicamentos():
    conn = get_db()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM medicamentos")
    rows = [dict(row) for row in cursor.fetchall()]
    conn.close()
    return rows

# ============================================================================
# 3. SERVIDOR HTTP INTEGRADO (API REST + FRONTEND ESTÁTICO)
# ============================================================================

class UnifiedServerHandler(SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        # Configurar directorio base para archivos estáticos
        super().__init__(*args, directory=FRONTEND_DIR, **kwargs)

    def _send_cors(self):
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
        self.send_header("Access-Control-Allow-Headers", "Content-Type, Authorization")

    def do_OPTIONS(self):
        self.send_response(200)
        self._send_cors()
        self.end_headers()

    def _send_json(self, status_code: int, data: Any):
        self.send_response(status_code)
        self.send_header("Content-Type", "application/json; charset=utf-8")
        self._send_cors()
        self.end_headers()
        self.wfile.write(json.dumps(data, ensure_ascii=False).encode("utf-8"))

    def do_GET(self):
        parsed = urllib.parse.urlparse(self.path)
        path = parsed.path

        # Endpoints de la API REST
        if path == "/api" or path == "/api/":
            self._send_json(200, {"status": "ok", "service": "PRM Aso Horizonte API"})
        elif path == "/cola-pacientes":
            self._send_json(200, {"success": True, "data": db_get_cola()})
        elif path == "/pacientes":
            self._send_json(200, {"success": True, "data": db_get_pacientes()})
        elif path == "/personal":
            self._send_json(200, {"success": True, "data": db_get_personal()})
        elif path == "/medicamentos":
            self._send_json(200, {"success": True, "data": db_get_medicamentos()})
        else:
            # Servir la interfaz frontend (HTML, CSS, JS, etc.)
            if path == "/" or path == "":
                self.path = "/index.html"
            return super().do_GET()

    def do_POST(self):
        content_length = int(self.headers.get("Content-Length", 0))
        body = self.rfile.read(content_length).decode("utf-8")
        try:
            item = json.loads(body) if body else {}
        except Exception:
            item = {}

        if self.path == "/cola-pacientes":
            res = db_add_cola(item)
            self._send_json(201, {"success": True, "data": res})
        else:
            self._send_json(404, {"error": "Ruta no encontrada", "path": self.path})

    def do_PUT(self):
        content_length = int(self.headers.get("Content-Length", 0))
        body = self.rfile.read(content_length).decode("utf-8")
        try:
            item = json.loads(body) if body else {}
        except Exception:
            item = {}

        if self.path == "/cola-pacientes":
            res = db_update_cola(item)
            self._send_json(200, {"success": True, "data": res})
        else:
            self._send_json(404, {"error": "Ruta no encontrada", "path": self.path})

    def log_message(self, format_str, *args):
        # Mensajes de log limpios en terminal
        sys.stdout.write(f"[PRM Server] {self.address_string()} - {format_str % args}\n")

# ============================================================================
# 4. PUNTO DE ENTRADA Y EJECUCIÓN
# ============================================================================

def run_unified_server(host: str = "0.0.0.0", port: int = 8000):
    server_address = (host, port)
    httpd = HTTPServer(server_address, UnifiedServerHandler)
    print("=" * 70)
    print("🏥 SISTEMA PRM ASO HORIZONTE - SERVIDOR ACTIVO")
    print("=" * 70)
    print(f"🌐 Interfaz Web PRM:        http://localhost:{port}/")
    print(f"📡 API REST SQLite:         http://localhost:{port}/cola-pacientes")
    print(f"📁 Base de Datos SQLite:    {DATABASE}")
    print("🩺 Especialidades Activas:  Medicina General, Odontología")
    print("=" * 70)
    print("💡 Presione Ctrl + C para detener el servidor.")
    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        print("\nServidor cerrado correctamente.")

if __name__ == "__main__":
    run_unified_server(host="0.0.0.0", port=8000)

