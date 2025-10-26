import React, { useState } from "react";
import BrandSearch from "../components/brandSearch";
import { Link } from "react-router-dom";
import "../App.css";

export default function Forms2(){
  const [drinkType, setDrinkType] = useState(null);
  const [sizeMl, setSizeMl] = useState(null);
  const [brand, setBrand] = useState('');

  function selectDrink(type){
    setDrinkType(type === drinkType ? null : type);
  }

  function selectSize(size){
    setSizeMl(size === sizeMl ? null : size);
  }

  return(
    <div>
              <div className="navbar bg-base-100 shadow-sm" style={{backgroundColor:'black'}}>
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
            </div>
            <ul
              tabIndex="-1"
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
              <li><a>Item 1</a></li>
              <li>
                <a>Parent</a>
                <ul className="p-2">
                  <li style={{fontFamily:'Nunito sans', color:'#f5f5f5'}}><a>Submenu 1</a></li>
                  <li style={{fontFamily:'Nunito sans', color:'#f5f5f5'}}><a>Submenu 2</a></li>
                </ul>
              </li>
              <li><a>Item 3</a></li>
            </ul>
          </div>
          <Link to="/" className="btn btn-ghost text-xl no-border-hover" style={{fontFamily:'Nunito sans', color:'#f5f5f5'}}>gate<b>group</b></Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            <li style={{fontFamily:'Nunito sans', color:'#f5f5f5'}}><a>Item 1</a></li>
            <li>
              <details>
                <summary style={{fontFamily:'Nunito sans', color:'#f5f5f5'}}>Parent</summary>
                <ul className="p-2">
                  <li style={{fontFamily:'Nunito sans', color:'#f5f5f5'}}><a>Submenu 1</a></li>
                  <li style={{fontFamily:'Nunito sans', color:'#f5f5f5'}}><a>Submenu 2</a></li>
                </ul>
              </details>
            </li>
            <li style={{fontFamily:'Nunito sans', color:'#f5f5f5'}}><a>Item 3</a></li>
          </ul>
        </div>
        <div className="navbar-end">
        </div>
      </div>
            <div className=" p-4 max-w-7xl  mx-auto relative z-50  w-full pt-20 md:pt-0">
        <h1
          className="text-4xl md:text-7xl font-bold text-center" style={{fontFamily: 'Raleway', fontWeight: '300', color: '#e0d163ff'}}>
          Just a few questions
        </h1>
        <p
          className="mt-4 font-normal text-base text-neutral-300 max-w-lg text-center mx-auto" style={{fontFamily: 'Nunito Sans', color: '#ffffffff', fontSize: '18px'}}>
          Answer some questions to register the bottle accurately.
        </p>
      </div>
      <div className="relative mt-8 mb-12">
        <div className="max-w-4xl mx-auto px-4">
          <div className="relative">
              {[1,2,3,4].map((i)=>{
                const offset = (i-1) * 22;
                const z = 40 - i;
                return (
                  <div
                    key={i}
                    style={{transform: `translateY(${offset}px)`, zIndex: z}}
                    className={`relative mb-6 card-outer`}>
                    <div className="card-inner p-6">
                      <h3 className="text-lg font-semibold mb-2">{ i === 1 ? 'Type of drink' : i === 2 ? 'Brand' : i === 3 ? 'Size (ml)' : `Question ${i}` }</h3>
                      <p className="text-sm text-neutral-800/90">
                        { i === 1 ? 'Select the type of alcoholic beverage of the bottle.' :
                          i === 2 ? 'Provide the brand of the beverage.' :
                          i === 3 ? 'Select the bottle size, in milliliters.' :
                          'Short question text or instruction goes here.' }
                      </p>
                      { i === 1 && (
                        <div className="mt-4 flex gap-3 justify-center">
                          {['Liqueur','Spirits','Wine','Champagne'].map((t) => (
                            <button
                              key={t}
                              onClick={() => selectDrink(t)}
                              className={`btn ${drinkType===t ? 'btn-selected' : 'btn-outline'} btn-sm`}
                            >{t}</button>
                          ))}
                        </div>
                      )}

                      { i === 2 && (
                        <div className="mt-4 flex justify-center">
                          <BrandSearch brand={brand} setBrand={setBrand} />
                        </div>
                      )}

                      { i === 3 && (
                        <div className="mt-4 flex gap-3 justify-center">
                          {['750ml','1000ml'].map((s) => (
                            <button
                              key={s}
                              onClick={() => selectSize(s)}
                              className={`btn ${sizeMl===s ? 'btn-selected' : 'btn-outline'} btn-sm`}
                            >{s}</button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                )
              })}
          </div>
        </div>
      </div>
    </div>
  );
}
