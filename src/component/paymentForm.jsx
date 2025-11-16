import React, { useState } from 'react';

function PaymentForm({ dealers, onSubmit }) {
  const [payment, setPayment] = useState({ dealerId: '', amount: '', method: 'CARD' });

  const handleChange = (e) => setPayment({ ...payment, [e.target.name]: e.target.value });

  return (
    <form onSubmit={(e) => { e.preventDefault(); onSubmit(payment); }}>
      <select name="dealerId" onChange={handleChange}>
        {dealers.map(d => <option key={d.id} value={d.id}>{d.name}</option>)}
      </select>
      <input name="amount" type="number" placeholder="Amount" onChange={handleChange} />
      <select name="method" onChange={handleChange}>
        <option value="CARD">CARD</option>
        <option value="UPI">UPI</option>
        <option value="NETBANKING">NETBANKING</option>
      </select>
      <button type="submit">Pay</button>
    </form>
  );
}

export default PaymentForm;