from flask import Flask, request, jsonify
import mysql.connector
from datetime import datetime

app = Flask(__name__)


# CONEXIÓN A LA BASE DE DATOS

def conect():
    return mysql.connector.connect(
        host="localhost",
        user="root",
        password="",
        database="bottleroyal"
    )


# FUNCIÓN 1: OBTENER EMPLEADO LOGEADO

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


# FUNCIÓN 2: OBTENER DATOS DEL VUELO

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


# FUNCIÓN 2.1: OBTENER Y DESPLEGAR LAS AEREOLINEAS RECOMENDADAS POR FACILITY

@app.route('/api/airline', methods=['POST'])
def getAirlines():
    data = request.get_json()
    Facility = data.get("Facility")

    conexion = conect()
    cursor = conexion.cursor()
    cursor.execute(""" 
        SELECT idAirline
        FROM work
        WHERE idFacility = %s
    """, (Facility))

    airline = cursor.fetchone()

    cursor.execute("""
        SELECT name
        FROM airline
        WHERE idAirline = %s
    """, (airline,))
    recomended_airlines = cursor.fetchall()

    cursor.close()
    conexion.close()

    # Se devuelve una lista de objetos JSON
    return jsonify(recomended_airlines)

# FUNCIÓN 2.2: OBTENER Y DESPLEGAR LOS VUELOS RECOMENDADOS POR AEREOLINEA

@app.route('/api/flight', methods=['POST'])
def getFlights():
    data = request.get_json()
    airline = data.get("airline", "")

    if not airline:
        return jsonify({"error": "No se recibió la aerolínea"}), 400

    conexion = conect()
    cursor = conexion.cursor()
    cursor.execute(""" 
        SELECT idAirline
        FROM airline
        WHERE name = %s
    """, (airline))

    airline = cursor.fetchone()

    cursor.execute("""
        SELECT idFlight
        FROM flight
        WHERE idAirline = %s
    """, (airline,))
    recomended_flights = cursor.fetchall()

    cursor.close()
    conexion.close()

    # Se devuelve una lista de objetos JSON
    return jsonify(recomended_flights)


# FUNCIÓN 3: CREAR REGISTRO DE MANEJO DE BOTELLAS

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


# FUNCIÓN 4: REGISTRAR BOTELLA INDIVIDUAL

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
