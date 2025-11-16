import React, { useState } from 'react';

function VehicleForm({ dealers, onSubmit }) {
  const [vehicle, setVehicle] = useState({ model: '', price: '', vehicleStatus: 'AVAILABLE', dealerId: '' });

  const handleChange = (e) => setVehicle({ ...vehicle, [e.target.name]: e.target.value });

  return (
    
    <form onSubmit={(e) => { e.preventDefault(); onSubmit(vehicle); }}>
      <input name="model" placeholder="Model" onChange={handleChange} />
      <input name="price" type="number" placeholder="Price" onChange={handleChange} />
      <select name="vehicleStatus" onChange={handleChange}>
        <option value="AVAILABLE">AVAILABLE</option>
        <option value="SOLD">SOLD</option>
      </select>
      <select name="dealerId" onChange={handleChange}>
        {dealers.map(d => <option key={d.id} value={d.id}>{d.name}</option>)}
      </select>
      <button type="submit">Submit</button>
    </form>

  );
}

export default VehicleForm;