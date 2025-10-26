import React from "react";
import { useNavigate } from "react-router-dom";

export default function Login(){
  const [submitted, setSubmitted] = React.useState(null);
  const navigate = useNavigate();

  function onSubmit(e){
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget));
    setSubmitted(data);
    // call backend login to get facility and recommended airlines
    (async ()=>{
      try{
        const res = await fetch('http://localhost:5001/api/login', {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({ idEmployee: data.email })
        });
        const json = await res.json();
        if(res.ok){
          // persist minimal info for next pages
          localStorage.setItem('employeeData', JSON.stringify({ employee: data.email, facility: json.facility, airlines: json.airlines }));
        }else{
          console.warn('login error', json);
        }
      }catch(err){ console.warn('network', err); }
      navigate('/forms');
    })();
  }

  return (
  <div className="min-h-screen flex items-center justify-center p-6" style={{backgroundColor: 'hsla(252, 62%, 2.5%)'}}>
      <form onSubmit={onSubmit} className="bg-white/90 p-6 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-semibold mb-4">Sign in</h2>
        <label className="block mb-2">
          <span className="text-sm">Employee ID</span>
          <input name="email" required className="input input-bordered w-full mt-1" placeholder="A01412609" />
        </label>
        <label className="block mb-4">
          <span className="text-sm">Password</span>
          <input name="password" type="password" required className="input input-bordered w-full mt-1" placeholder="••••••" />
        </label>
        <div className="flex justify-end">
          <button className="btn btn-neutral">Sign in</button>
        </div>
        {submitted && <pre className="mt-4 text-xs">{JSON.stringify(submitted, null, 2)}</pre>}
      </form>
    </div>
  )
}