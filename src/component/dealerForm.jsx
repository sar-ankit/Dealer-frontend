import React, { useState } from 'react';

function DealerForm({ onSubmit }) {
  const [dealer, setDealer] = useState({ name: '', email: '', subscriptionType: 'BASIC' });

  const handleChange = (e) => setDealer({ ...dealer, [e.target.name]: e.target.value });

  return (
    <form onSubmit={(e) => { e.preventDefault(); onSubmit(dealer); }}>
      <input name="name" placeholder="Name" onChange={handleChange} />
      <input name="email" placeholder="Email" onChange={handleChange} />
      <select name="subscriptionType" onChange={handleChange}>
        <option value="BASIC">BASIC</option>
        <option value="PREMIUM">PREMIUM</option>
      </select>
      <button type="submit">Submit</button>
    </form>
  );
}

export default DealerForm;