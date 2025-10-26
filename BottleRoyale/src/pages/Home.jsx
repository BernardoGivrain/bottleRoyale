import React from "react";
import { Link } from "react-router-dom";
import { SpotlightNewDemo } from "../components/SpotlightNewDemo";

export default function Home(){
    return(
        <div>
        <div className="navbar bg-base-100 shadow-sm" style={{backgroundColor:'black'}}>
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
                    </div>
                <ul tabIndex="-1" className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
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
          <Link to="/forms" className="btn">Start now</Link>
        </div>
      </div>
      <SpotlightNewDemo />
      <div style={{padding: 24}}>
      </div>
    </div>
  );
}