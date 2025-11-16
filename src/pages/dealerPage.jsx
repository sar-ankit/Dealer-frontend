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
    <div>
      <h2>Dealer Management</h2>
      <form onSubmit={handleSubmit}>
        <input name="name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Name" />
        <input name="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="Email" />
        <select value={form.subscriptionType} onChange={(e) => setForm({ ...form, subscriptionType: e.target.value })}>
          <option value="BASIC">BASIC</option>
          <option value="PREMIUM">PREMIUM</option>
        </select>
        <button type="submit">Add Dealer</button>
      </form>

      <ul>
        {dealers.map((dealer) => (
          <li key={dealer.id}>
            {dealer.name} ({dealer.email}) - {dealer.subscriptionType}
            <button onClick={() => handleDelete(dealer.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default DealerPage;