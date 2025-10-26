from flask import Flask, request, jsonify
from flask_cors import CORS
import mysql.connector
from datetime import datetime

app = Flask(__name__)
CORS(app)


# CONEXIÓN A LA BASE DE DATOS

def conect():
    return mysql.connector.connect(
        host="localhost",
        user="root",
        password="",
        database="bottleroyal"
    )


# FUNCIÓN 1: OBTENER EMPLEADO LOGEADO: sign in depsues de ingresar informacion

def EmployeeLogin(id_user):
    conexion = conect()
    cursor = conexion.cursor(dictionary=True)
    cursor.execute("""
        SELECT idFacility
        FROM employee
        WHERE idEmployee = %s
    """, (id_user,))
    Facility = cursor.fetchone()
    cursor.close()
    conexion.close()
    return Facility


# FUNCIÓN 2: OBTENER DATOS DEL VUELO: boton hola

def FligthRegister(no_flight):
    conexion = conect()
    cursor = conexion.cursor(dictionary=True)
    cursor.execute("""
        SELECT idArrival
        FROM flight
        WHERE idFlight = %s
    """, (no_flight,))
    Country = cursor.fetchone()
    cursor.close()
    conexion.close()
    return Country


# FUNCIÓN 2.1: OBTENER Y DESPLEGAR LAS AEREOLINEAS RECOMENDADAS POR FACILITY se activa al hacer clic a login

@app.route('/api/airline', methods=['POST'])
def getAirlines():
    data = request.get_json()
    Facility = data.get("Facility")

    conexion = conect()
    cursor = conexion.cursor()
    # get airline ids related to facility
    cursor.execute("""
        SELECT idAirline
        FROM work
        WHERE idFacility = %s
    """, (Facility,))

    airline_rows = cursor.fetchall()
    airline_ids = [row[0] for row in airline_rows] if airline_rows else []

    recomended_airlines = []
    if airline_ids:
        # fetch airline names
        format_strings = ','.join(['%s'] * len(airline_ids))
        cursor.execute(f"SELECT idAirline, name FROM airline WHERE idAirline IN ({format_strings})", tuple(airline_ids))
        recomended_airlines = [{'idAirline': r[0], 'name': r[1]} for r in cursor.fetchall()]

    cursor.close()
    conexion.close()

    # Se devuelve una lista de objetos JSON
    return jsonify(recomended_airlines)

# FUNCIÓN 2.2: OBTENER Y DESPLEGAR LOS VUELOS RECOMENDADOS POR AEREOLINEA : al seleccionar la aerolinea

@app.route('/api/flight', methods=['POST'])
def getFlights():
    data = request.get_json()
    airline = data.get("airline", "")

    if not airline:
        return jsonify({"error": "No se recibió la aerolínea"}), 400

    conexion = conect()
    cursor = conexion.cursor()
    # get airline id by name
    cursor.execute("""
        SELECT idAirline
        FROM airline
        WHERE name = %s
    """, (airline,))
    row = cursor.fetchone()
    if not row:
        cursor.close()
        conexion.close()
        return jsonify({"error": "Aerolínea no encontrada"}), 404

    airline_id = row[0]
    cursor.execute("""
        SELECT idFlight, code, origin, destination
        FROM flight
        WHERE idAirline = %s
    """, (airline_id,))
    recomended_flights = [{'idFlight': r[0], 'code': r[1] if len(r)>1 else None, 'origin': r[2] if len(r)>2 else None, 'destination': r[3] if len(r)>3 else None} for r in cursor.fetchall()]

    cursor.close()
    conexion.close()

    # Se devuelve una lista de objetos JSON
    return jsonify(recomended_flights)


# API: login -> returns facility and recommended airlines for the employee
@app.route('/api/login', methods=['POST'])
def api_login():
    data = request.get_json() or {}
    idEmployee = data.get('idEmployee')
    if not idEmployee:
        return jsonify({'error': 'missing idEmployee'}), 400

    facility = EmployeeLogin(idEmployee)
    if not facility:
        return jsonify({'error': 'employee not found'}), 404

    # recommended airlines for facility
    conexion = conect()
    cursor = conexion.cursor()
    cursor.execute("SELECT idAirline FROM work WHERE idFacility = %s", (facility.get('idFacility'),))
    rows = cursor.fetchall()
    airline_ids = [r[0] for r in rows] if rows else []
    recomended_airlines = []
    if airline_ids:
        format_strings = ','.join(['%s'] * len(airline_ids))
        cursor.execute(f"SELECT idAirline, name FROM airline WHERE idAirline IN ({format_strings})", tuple(airline_ids))
        recomended_airlines = [{'idAirline': r[0], 'name': r[1]} for r in cursor.fetchall()]

    cursor.close()
    conexion.close()

    return jsonify({'facility': facility, 'airlines': recomended_airlines})


# API: create bottle management record
@app.route('/api/create_bm', methods=['POST'])
def api_create_bm():
    data = request.get_json() or {}
    idEmployee = data.get('idEmployee')
    idFlight = data.get('idFlight')
    if not idEmployee or not idFlight:
        return jsonify({'error': 'missing idEmployee or idFlight'}), 400

    conexion = conect()
    cursor = conexion.cursor()
    cursor.execute("INSERT INTO bottlemanagment (idEmployee, idFlight, dateAssigned) VALUES (%s, %s, %s)", (idEmployee, idFlight, datetime.now()))
    conexion.commit()
    idBM = cursor.lastrowid
    cursor.close()
    conexion.close()
    return jsonify({'idBM': idBM})


# API: register a bottle (simplified wrapper for BottleRegister)
@app.route('/api/register_bottle', methods=['POST'])
def api_register_bottle():
    data = request.get_json() or {}
    idBM = data.get('idBM')
    size = data.get('size')
    licor = data.get('licor')
    brand = data.get('brand')
    fillLevel = data.get('fillLevel')
    if not idBM:
        return jsonify({'error': 'missing idBM'}), 400

    # Perform a simplified insert into botellas and return success/decision
    conexion = conect()
    cursor = conexion.cursor()
    cursor.execute("INSERT INTO botellas (idBM, size, licor, brand, decision) VALUES (%s, %s, %s, %s, %s)", (idBM, size, licor, brand, 'unknown'))
    conexion.commit()
    idBottle = cursor.lastrowid
    cursor.close()
    conexion.close()
    return jsonify({'idBottle': idBottle, 'decision': 'registered'})


# FUNCIÓN 3: CREAR REGISTRO DE MANEJO DE BOTELLAS: al presionar hola

def BottleManagmentRegister(idEmployee, idFlight):
    conexion = conect()
    cursor = conexion.cursor()
    cursor.execute("""
        INSERT INTO bottlemanagment (idEmployee, idFlight, dateAssigned)
        VALUES (%s, %s, %s)
    """, (idEmployee, idFlight, datetime.now()))
    conexion.commit()
    idBM = cursor.fetchone()
    cursor.close()
    conexion.close()
    return idBM


# FUNCIÓN 4: REGISTRAR BOTELLA INDIVIDUAL: al presionar el boton azul de registrar

def BottleRegister(idBM, Country, size, licor, brand, fillLevel):
    conexion = conect()
    cursor = conexion.cursor()
    cursor.execute("""
        SELECT rule, range
        FROM country
        WHERE idCountry = %s
    """, (Country))
    Country_rule = cursor.fetchone()
    cursor.execute("""
        SELECT idFligth
        FROM bottlemanagment
        WHERE idBM = %s
    """, (idBM))
    idFlight = cursor.fetchone()
    cursor.execute("""
        SELECT idAirline
        FROM flight
        WHERE idflight = %s
    """, (idFlight))
    idAirline = cursor.fetchone()
    cursor.execute("""
        SELECT rule, range
        FROM airline
        WHERE idAirline = %s
    """, (idAirline))
    Airline_rule = cursor.fetchone()
    if licor == "Wine" || licor == "Champagne"
        if Country_rule[0]== False :
            decision = "Discart"
        elif Airline_rule[0] == False :
            decision = "Discart"
        else:
            if Airline_rule[1] > fillLevel :
                decision = "Discart"
            else:
                decision = "Keep"
    cursor.execute("""
        INSERT INTO botellas (idBM, size, licor, brand, decision)
        VALUES (%s, %s, %s, %s, %s)
    """, (idBM, size, licor, brand, decision))
    conexion.commit()
    idBottle = cursor.fetchone()
    cursor.close()
    conexion.close()
    return decision

if __name__ == "__main__":
    app.run(debug=True)

