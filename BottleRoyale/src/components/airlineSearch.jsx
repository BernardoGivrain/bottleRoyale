import React, { useState, useEffect } from 'react';

export default function AirlineSearch({ airline = '', setAirline = () => {}, onSelect = () => {} }){
  const airlines = [
    'Air France',
    'British Airways',
    'Cathay Pacific',
    'Emirates',
    'Etihad Airways',
    'Lufthansa',
    'Qatar Airways',
    'Singapore Airlines',
    'Swiss Intl Air Lines',
    'Turkish Airlines'
  ];

  const [query, setQuery] = useState(airline || '');
  const [results, setResults] = useState([]);

  useEffect(()=>{
    if(!query) { setResults([]); return; }
    const t = query.toLowerCase();
    setResults(airlines.filter(a => a.toLowerCase().includes(t)));
    setAirline(query);
  }, [query]);

  return (
    <div style={{width: '100%', maxWidth: 520}}>
      <input className="input input-bordered w-full" placeholder="Type or choose airline" value={query} onChange={e => setQuery(e.target.value)} />
      <div className="mt-2 bg-white/90 rounded-md p-2 shadow-sm">
        {results.length ? results.map(r => (
          <div key={r} className="py-1 px-2 hover:bg-gray-100 rounded cursor-pointer" onMouseDown={() => { setQuery(r); onSelect(r); }}>{r}</div>
        )) : <div className="text-sm text-gray-500">No results</div>}
      </div>
    </div>
  )
}
