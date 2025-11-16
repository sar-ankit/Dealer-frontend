import React, { useEffect, useState } from 'react';
import { getPayments, createPayment } from '../api/paymentApi';
import { getDealers } from '../api/dealerApi';

function PaymentPage() {
  const [payments, setPayments] = useState([]);
  const [dealers, setDealers] = useState([]);
  const [form, setForm] = useState({ dealerId: '', amount: '', method: 'CARD' });

  useEffect(() => {
    fetchPayments();
    fetchDealers();
  }, []);

  const fetchPayments = async () => {
    const res = await getPayments();
    setPayments(res.data);
  };

  const fetchDealers = async () => {
    const res = await getDealers();
    setDealers(res.data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createPayment(form);
    setForm({ dealerId: '', amount: '', method: 'CARD' });
    fetchPayments();
  };

  return (
    <div>
      <h2>Payment Management</h2>
      <form onSubmit={handleSubmit}>
        <select value={form.dealerId} onChange={(e) => setForm({ ...form, dealerId: e.target.value })}>
          <option value="">Select Dealer</option>
          {dealers.map((d) => (
            <option key={d.id} value={d.id}>{d.name}</option>
          ))}
        </select>
        <input name="amount" type="number" value={form.amount} onChange={(e) => setForm({ ...form, amount: e.target.value })} placeholder="Amount" />
        <select value={form.method} onChange={(e) => setForm({ ...form, method: e.target.value })}>
          <option value="CARD">CARD</option>
          <option value="UPI">UPI</option>
          <option value="NETBANKING">NETBANKING</option>
        </select>
        <button type="submit">Make Payment</button>
      </form>

      <ul>
        {payments.map((p) => (
          <li key={p.id}>
            Dealer #{p.dealerId} - ₹{p.amount} via {p.method} [{p.status}]
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PaymentPage;