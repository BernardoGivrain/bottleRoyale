import React, { useState } from "react";
import { Link } from "react-router-dom";
import AirlineSearch from "../components/airlineSearch";
import "../App.css";

export default function Forms(){
  const [airline, setAirline] = useState('');

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
                  <AirlineSearch airline={airline} setAirline={setAirline} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Link to="/forms2"><button style={{backgroundColor:'white'}}>Hola</button></Link>
    </div>
  );
}
