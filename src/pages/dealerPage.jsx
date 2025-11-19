import React, { useEffect, useState } from 'react';
import { getDealers, createDealer, deleteDealer } from '../api/dealerApi';

function DealerPage() {
  const [dealers, setDealers] = useState([]);
  const [form, setForm] = useState({ name: '', email: '', subscriptionType: 'BASIC' });

  useEffect(() => {
    fetchDealers();
  }, []);

  const fetchDealers = async () => {
    const res = await getDealers();
    setDealers(res.data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createDealer(form);
    setForm({ name: '', email: '', subscriptionType: 'BASIC' });
    fetchDealers();
  };

  const handleDelete = async (id) => {
    await deleteDealer(id);
    fetchDealers();
  };

  return (
  <div className="max-w-2xl mx-auto mt-10 p-6 bg-white shadow-xl rounded-xl">
    <h2 className="text-2xl font-bold mb-6 text-center">Dealer Management</h2>

    {/* Form */}
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 mb-8"
    >
      <input
        name="name"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
        placeholder="Name"
        className="border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <input
        name="email"
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
        placeholder="Email"
        className="border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <select
        value={form.subscriptionType}
        onChange={(e) =>
          setForm({ ...form, subscriptionType: e.target.value })
        }
        className="border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="BASIC">BASIC</option>
        <option value="PREMIUM">PREMIUM</option>
      </select>

      <button
        type="submit"
        className="bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition"
      >
        Add Dealer
      </button>
    </form>

    {/* Dealer List */}
    <ul className="space-y-4">
      {dealers.map((dealer) => (
        <li
          key={dealer.id}
          className="flex justify-between items-center bg-gray-100 p-4 rounded-lg shadow"
        >
          <div>
            <p className="font-semibold">{dealer.name}</p>
            <p className="text-sm text-gray-600">{dealer.email}</p>
            <p className="text-xs text-gray-500 mt-1">
              Subscription: <span className="font-medium">{dealer.subscriptionType}</span>
            </p>
          </div>

          <button
            onClick={() => handleDelete(dealer.id)}
            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
          >
            Delete
          </button>
        </li>
      ))}
    </ul>
  </div>
);
}

export default DealerPage;