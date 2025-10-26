import React, { useState } from "react";
import { Link } from "react-router-dom";
import AirlineSearch from "../components/airlineSearch";
import FlightIdInput from "../components/flightIdInput";
import "../App.css";

export default function Forms(){
  const [airline, setAirline] = useState('');
  const [flightId, setFlightId] = useState('');
  const [flights, setFlights] = useState([]);

  // when airline changes, fetch flights from backend
  React.useEffect(()=>{
    if(!airline) return;
    (async ()=>{
      try{
        const res = await fetch('http://localhost:5001/api/flight', {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({ airline })
        });
        const json = await res.json();
        if(res.ok){
          setFlights(json);
          localStorage.setItem('flights', JSON.stringify(json));
        }else{
          console.warn('flight fetch', json);
        }
      }catch(err){ console.warn('network', err); }
    })();
  }, [airline]);

  return (
    <div>
      <div className="navbar bg-base-100 shadow-sm" style={{backgroundColor:'black'}}>
        <div className="navbar-start">
          <Link to="/" className="btn btn-ghost text-xl no-border-hover" style={{fontFamily:'Nunito sans', color:'#f5f5f5'}}>gate<b>group</b></Link>
        </div>
      </div>

      <div className="p-4 max-w-7xl mx-auto relative z-50 w-full pt-20 md:pt-0">
        <h1 className="text-4xl md:text-7xl font-bold text-center" style={{fontFamily: 'Raleway', fontWeight: '300', color: '#e0d163ff'}}>What is the name of your airline?</h1>
        <p className="mt-4 font-normal text-base text-neutral-300 max-w-lg text-center mx-auto" style={{fontFamily: 'Nunito Sans', color: '#ffffffff', fontSize: '18px'}}>Provide the name of your airline.</p>
      </div>

      <div className="relative mt-8 mb-12">
        <div className="max-w-4xl mx-auto px-4">
          <div className="relative">
            <div className="relative mb-6 card-outer" style={{transform: 'translateY(0px)', zIndex: 40}}>
              <div className="card-inner p-6">
                <h3 className="text-lg font-semibold mb-2">Airline</h3>
                <p className="text-sm text-neutral-800/90">Provide the name of the airline.</p>
                <div className="mt-4 flex justify-center">
                  <AirlineSearch airline={airline} setAirline={setAirline} onSelect={(a) => setAirline(a)} />
                </div>
              </div>
            </div>

            <div className="relative mb-6 card-outer" style={{transform: 'translateY(12px)', zIndex: 30}}>
              <div className="card-inner p-6 mt-6">
                <h3 className="text-lg font-semibold mb-2">Flight ID</h3>
                <p className="text-sm text-neutral-800/90">Provide the ID of the flight.</p>
                <div className="mt-4 flex justify-center">
                  <FlightIdInput value={flightId} onChange={setFlightId} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Link to="/forms2"><button style={{backgroundColor:'white'}} onClick={async ()=>{
        // when Hola button pressed on Forms, create bottle management using stored employee and selected flight
        try{
          const emp = JSON.parse(localStorage.getItem('employeeData') || '{}');
          const selectedFlight = flights && flights[0] ? flights[0] : null;
          const idFlight = selectedFlight ? selectedFlight.idFlight : (localStorage.getItem('selectedFlight') || null);
          const idEmployee = emp && emp.employee ? emp.employee : null;
          if(!idEmployee || !idFlight) return;
          const res = await fetch('http://localhost:5001/api/create_bm', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ idEmployee, idFlight })
          });
          const json = await res.json();
          if(res.ok){
            localStorage.setItem('idBM', json.idBM);
          }
        }catch(err){ console.warn('create bm', err); }
      }}>Hola</button></Link>
    </div>
  );
}
