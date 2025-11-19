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
  <div className="max-w-2xl mx-auto mt-10 p-6 bg-white shadow-xl rounded-xl">
    <h2 className="text-2xl font-bold mb-6 text-center">Payment Management</h2>

    {/* Form */}
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 mb-8">

      <select
        value={form.dealerId}
        onChange={(e) => setForm({ ...form, dealerId: e.target.value })}
        className="border rounded-lg p-3 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="">Select Dealer</option>
        {dealers.map((d) => (
          <option key={d.id} value={d.id}>
            {d.name}
          </option>
        ))}
      </select>

      <input
        name="amount"
        type="number"
        value={form.amount}
        onChange={(e) => setForm({ ...form, amount: e.target.value })}
        placeholder="Amount"
        className="border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <select
        value={form.method}
        onChange={(e) => setForm({ ...form, method: e.target.value })}
        className="border rounded-lg p-3 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="CARD">CARD</option>
        <option value="UPI">UPI</option>
        <option value="NETBANKING">NETBANKING</option>
      </select>

      <button
        type="submit"
        className="bg-green-600 text-white p-3 rounded-lg hover:bg-green-700 transition"
      >
        Make Payment
      </button>
    </form>

    {/* Payments List */}
    <ul className="space-y-4">
      {payments.map((p) => (
        <li
          key={p.id}
          className="bg-gray-100 p-4 rounded-lg shadow flex justify-between"
        >
          <div>
            <p className="font-semibold">
              Dealer #{p.dealerId}
            </p>
            <p className="text-sm text-gray-700">
              ₹{p.amount} — {p.method}
            </p>
          </div>

          <span
            className={`px-3 py-1 rounded-lg text-white text-sm ${
              p.status === "SUCCESS"
                ? "bg-green-600"
                : p.status === "PENDING"
                ? "bg-yellow-500"
                : "bg-red-600"
            }`}
          >
            {p.status}
          </span>
        </li>
      ))}
    </ul>
  </div>
);

}

export default PaymentPage;