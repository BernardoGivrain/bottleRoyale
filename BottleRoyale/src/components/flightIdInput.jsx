import React from 'react';

export default function FlightIdInput({ value = '', onChange = () => {} }){
  return (
    <div style={{width: '100%', maxWidth: 420}}>
      <input
        value={value}
        onChange={e => onChange(e.target.value)}
        className="input input-bordered w-full"
        placeholder="Enter flight ID (e.g., AF123)"
      />
    </div>
  )
}
