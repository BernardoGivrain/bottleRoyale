import React, { useState, useRef, useEffect } from "react";
import BrandSearch from "../components/brandSearch";
import { Link, useNavigate } from "react-router-dom";
import "../App.css";

import {Button} from "@heroui/react";

export const UserIcon = ({fill = "currentColor", size, height, width, ...props}) => {
  return (
    <svg
      data-name="Iconly/Curved/Profile"
      height={size || height || 24}
      viewBox="0 0 24 24"
      width={size || width || 24}
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g
        fill="none"
        stroke={fill}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeMiterlimit={10}
        strokeWidth={1.5}
      >
        <path
          d="M11.845 21.662C8.153 21.662 5 21.088 5 18.787s3.133-4.425 6.845-4.425c3.692 0 6.845 2.1 6.845 4.4s-3.134 2.9-6.845 2.9z"
          data-name="Stroke 1"
        />
        <path d="M11.837 11.174a4.372 4.372 0 10-.031 0z" data-name="Stroke 3" />
      </g>
    </svg>
  );
};

export const CameraIcon = ({fill = "currentColor", size, height, width, ...props}) => {
  return (
    <svg
      height={size || height || 24}
      viewBox="0 0 24 24"
      width={size || width || 24}
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <rect x="3" y="6" width="18" height="12" rx="2" stroke={fill} fill="none" strokeWidth="1.5" />
      <circle cx="12" cy="12" r="3" stroke={fill} fill="none" strokeWidth="1.5" />
      <path d="M7 6l1-2h8l1 2" stroke={fill} fill="none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
};

export default function Forms2(){
  const [drinkType, setDrinkType] = useState(null);
  const [sizeMl, setSizeMl] = useState(null);
  const [brand, setBrand] = useState('');
  const [cameraOpen, setCameraOpen] = useState(false);
  const videoRef = useRef(null);
  const streamRef = useRef(null);
  const [captured, setCaptured] = useState(null);
  const [prediction, setPrediction] = useState(null);
  const [predicting, setPredicting] = useState(false);
  const [showResultCard, setShowResultCard] = useState(false);
  const [postRegisterOptions, setPostRegisterOptions] = useState(false);
  const navigate = useNavigate();

  function selectDrink(type){
    setDrinkType(type === drinkType ? null : type);
  }

  function selectSize(size){
    setSizeMl(size === sizeMl ? null : size);
  }

  async function openCamera(){
    try{
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' }, audio: false });
      streamRef.current = stream;
      setCameraOpen(true);
    }catch(e){
      console.error('camera error', e);
      alert('Unable to access camera: ' + (e && e.message ? e.message : e));
    }
  }

  useEffect(() => {
    if(cameraOpen && streamRef.current && videoRef.current){
      try{
        videoRef.current.srcObject = streamRef.current;
        videoRef.current.onloadedmetadata = () => {
          try{ videoRef.current.play(); }catch(err){ console.warn('play failed', err); }
        };
        (async ()=>{
          try{ await videoRef.current.play(); }catch(err){ }
        })();
      }catch(err){ console.error('attach stream error', err); }
    }
  }, [cameraOpen]);

  function closeCamera(){
    setCameraOpen(false);
    if(streamRef.current){
      streamRef.current.getTracks().forEach(t => t.stop());
      streamRef.current = null;
    }
    if(videoRef.current){
      try{ videoRef.current.pause(); videoRef.current.srcObject = null; }catch(e){}
    }
    setCaptured(null);
    setPredicting(false);
    if(prediction){
      setShowResultCard(true);
    } else {
      setShowResultCard(false);
    }
  }

  function capturePhoto(){
    if(!videoRef.current) return;
    const video = videoRef.current;
    const canvas = document.createElement('canvas');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    const dataUrl = canvas.toDataURL('image/png');
    setCaptured(dataUrl);
    sendPrediction(dataUrl);
  }

  async function sendPrediction(dataUrl){
    try{
      setPrediction(null);
      setPredicting(true);
      const res = await fetch('http://localhost:5001/predict', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ image: dataUrl })
      });
      const json = await res.json();
      if(res.ok){
        setPrediction(json.prediction || 'unknown');
      }else{
        setPrediction('error: ' + (json.error || res.statusText));
      }
    }catch(err){
      setPrediction('network error');
    }
    setPredicting(false);
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
  <div className="relative mt-8 mb-20 pb-12">
        <div className="max-w-4xl mx-auto px-4">
          <div className="relative">
              {[1,2,3,4].map((i)=>{
        const offset = (i-1) * 18; 
                const z = 40 - i;
                return (
                  <div
                    key={i}
                    style={{transform: `translateY(${offset}px)`, zIndex: z}}
                    className={`relative mb-6 card-outer`}>
                    <div className="card-inner p-6">
                      <h3 className="text-lg font-semibold mb-2">{ i === 1 ? 'Type of drink' : i === 2 ? 'Brand' : i === 3 ? 'Size (ml)' : `Register the fill level of the bottle` }</h3>
                      <p className="text-sm text-neutral-800/90">
                        { i === 1 ? 'Select the type of alcoholic beverage of the bottle.' :
                          i === 2 ? 'Provide the brand of the beverage.' :
                          i === 3 ? 'Select the bottle size, in milliliters.' :
                          'Register the fill level of the bottle.' }
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

                      { i === 4 && (
                        <div className="mt-6 flex justify-center">
                          <Button
                            color="success"
                            endContent={<CameraIcon />}
                            className="justify-center text-center"
                            style={{display: 'inline-flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem', backgroundColor: '#16a34a', color: '#ffffff', borderColor: '#15803d', padding: '0.75rem 1.25rem', fontSize: '1rem', borderRadius: '0.75rem'}}
                            onClick={openCamera}
                          >
                            Register level
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                )
              })}
          </div>
        </div>
      </div>
    {}
    {cameraOpen && (
      <div className="fixed inset-0 z-60 flex items-center justify-center bg-black/60">
        <div className="bg-white rounded-lg p-4 max-w-lg w-full">
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-semibold">Camera</h3>
            <div>
              <button className="btn btn-sm btn-ghost" onClick={closeCamera}>Close</button>
            </div>
          </div>
          <div className="w-full bg-black rounded">
            <video ref={videoRef} className="w-full rounded" playsInline muted />
          </div>
          <div className="mt-3 flex gap-3 justify-center">
            <button className="btn btn-success" onClick={capturePhoto} disabled={predicting}>
              {predicting ? (
                <span className="loading loading-spinner loading-sm" />
              ) : (
                'Capture'
              )}
            </button>
            <button className="btn btn-outline" onClick={closeCamera} disabled={predicting}>Cancel</button>
          </div>
        </div>
      </div>
    )}

    {captured && (
      <div className="fixed bottom-6 right-6 z-70">
        <div className="bg-white p-2 rounded shadow">
          <img src={captured} alt="captured" style={{width:200, height:'auto'}} />
          <div className="mt-2 text-sm">Prediction: <strong>{prediction || '—'}</strong>
            {predicting && <span className="ml-2 loading loading-spinner loading-sm" />}
          </div>
        </div>
      </div>
    )}
    {showResultCard && (
      <div className="fixed inset-0 z-80 flex items-center justify-center bg-black/40">
        <div className="bg-white rounded-lg p-6 shadow-lg max-w-md w-full text-center">
          <h3 className="text-lg font-semibold mb-4">Result</h3>
          <p className="mb-4">Result: <strong>{prediction}</strong></p>
          <div className="flex justify-center gap-3">
            <button className="btn btn-primary" onClick={() => { setShowResultCard(false); setPostRegisterOptions(true); }}>Register</button>
            <button className="hidden" id="triggerRegister" />
            <button className="btn btn-ghost" onClick={() => { setPrediction(null); setShowResultCard(false); openCamera(); }}>Repeat photo</button>
          </div>
        </div>
      </div>
    )}
    {postRegisterOptions && (
      <div className="fixed inset-0 z-90 flex items-center justify-center bg-black/40">
        <div className="bg-white rounded-lg p-6 shadow-lg max-w-md w-full text-center">
          <h3 className="text-lg font-semibold mb-4">Register actions</h3>
          <p className="mb-4">Choose what to do next</p>
          <div className="flex justify-center gap-3">
            <button
              className="btn btn-primary"
              onClick={async () => {
                // Call backend to register bottle using idBM
                try{
                  const idBM = localStorage.getItem('idBM');
                  if(!idBM){ alert('No idBM available'); return; }
                  const res = await fetch('http://localhost:5001/api/register_bottle', {
                    method: 'POST',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify({ idBM, size: sizeMl, licor: drinkType, brand, fillLevel: 50 })
                  });
                  const json = await res.json();
                  if(res.ok){
                    alert('Bottle registered: ' + JSON.stringify(json));
                    setPostRegisterOptions(false);
                    setPrediction(null);
                    setCaptured(null);
                    openCamera();
                  }else{
                    alert('Error: ' + JSON.stringify(json));
                  }
                }catch(err){ console.warn('register bottle', err); alert('network error'); }
              }}
            >
              Register another bottle
            </button>
            <button
              className="btn btn-ghost"
              onClick={() => {
                setPostRegisterOptions(false);
                navigate('/');
              }}
            >
              End register
            </button>
          </div>
        </div>
      </div>
    )}
    </div>
  );
}
