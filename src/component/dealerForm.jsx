import React, { useState } from 'react';

function DealerForm({ onSubmit }) {
  const [dealer, setDealer] = useState({ name: '', email: '', subscriptionType: 'BASIC' });

  const handleChange = (e) => setDealer({ ...dealer, [e.target.name]: e.target.value });

  return (
    <form onSubmit={(e) => { e.preventDefault(); onSubmit(dealer); }}className="bg-white shadow p-4 rounded">
      
      <div className="mb-2" > 
        <label className="block text-sm">Name</label>
        <input name="name" placeholder="Name"  required className="border p-2 w-full rounded"  onChange={handleChange} />

      </div>



      <div className="mb-2">
        <label className="block text-sm">Email</label>
       <input name="email" placeholder="Email"  required className="border p-2 w-full rounded" onChange={handleChange} />
      </div>
      

        <div className="mb-2">
           <select name="subscriptionType" onChange={handleChange}>
        <option value="BASIC">BASIC</option>
        <option value="PREMIUM">PREMIUM</option>
      </select>

        </div>

      
     
      <button className="bg-blue-600 text-white px-4 py-2 rounded"  type="submit">Submit</button>
    </form>
  );
}

export default DealerForm;