// ...existing code...
import React, { useEffect, useState } from 'react';
import { getVehicles, createVehicle, deleteVehicle } from '../api/vehicleApi';
import { getDealers } from '../api/dealerApi';

function VehiclePage() {
  const [vehicles, setVehicles] = useState([]);
  const [dealers, setDealers] = useState([]);
  const [form, setForm] = useState({ model: '', price: '', vehicleStatus: 'AVAILABLE', dealerId: '', image: null });
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchVehicles();
    fetchDealers();
    // eslint-disable-next-line
  }, []);

  const fetchVehicles = async () => {
    try {
      setLoading(true);
      const res = await getVehicles();
      setVehicles(res.data || []);
      setError('');
    } catch (err) {
      console.error('fetchVehicles error', err);
      setError('Error loading vehicles: ' + (err?.response?.data?.message || err.message || err.statusText));
      setVehicles([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchDealers = async () => {
    try {
      const res = await getDealers();
      setDealers(res.data || []);
    } catch (err) {
      console.error('fetchDealers error', err);
      // keep dealers empty but don't block page
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!form.model || !form.price || !form.dealerId) {
      setError('Please fill model, price and select a dealer.');
      return;
    }

    setSubmitting(true);
    try {
      // If user selected an image, send FormData (multipart)
      if (form.image instanceof File) {
        const fd = new FormData();
        fd.append('model', form.model);
        fd.append('price', form.price);
        fd.append('vehicleStatus', form.vehicleStatus);
        fd.append('dealerId', form.dealerId);
        fd.append('image', form.image);

        // Use direct fetch for multipart (api helper may not support FormData)
        const resp = await fetch('/api/vehicles', {
          method: 'POST',
          body: fd
        });

        if (!resp.ok) {
          const text = await resp.text();
          throw new Error(text || `HTTP ${resp.status}`);
        }
      } else {
        // No image: use existing API helper (assumes JSON)
        await createVehicle({
          model: form.model,
          price: form.price,
          vehicleStatus: form.vehicleStatus,
          dealerId: form.dealerId
        });
      }

      // refresh list and clear form
      await fetchVehicles();
      setForm({ model: '', price: '', vehicleStatus: 'AVAILABLE', dealerId: '', image: null });
    } catch (err) {
      console.error('handleSubmit error', err);
      // Better error message from axios/fetch
      const msg = err?.response?.data?.message || err?.message || 'Unknown error';
      setError('Failed to add vehicle: ' + msg);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteVehicle(id);
      await fetchVehicles();
    } catch (err) {
      console.error('deleteVehicle error', err);
      setError('Failed to delete vehicle: ' + (err?.response?.data?.message || err?.message || ''));
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Vehicle Management</h2>

      <form onSubmit={handleSubmit} style={{ marginBottom: 20 }}>
        <div>
          <input
            name="model"
            value={form.model}
            onChange={(e) => setForm({ ...form, model: e.target.value })}
            placeholder="Model"
          />
        </div>

        <div>
          <input
            name="price"
            type="number"
            value={form.price}
            onChange={(e) => setForm({ ...form, price: e.target.value })}
            placeholder="Price"
          />
        </div>

        <div>
          <select
            value={form.vehicleStatus}
            onChange={(e) => setForm({ ...form, vehicleStatus: e.target.value })}
          >
            <option value="AVAILABLE">AVAILABLE</option>
            <option value="SOLD">SOLD</option>
          </select>
        </div>

        <div>
          <select
            value={form.dealerId}
            onChange={(e) => setForm({ ...form, dealerId: e.target.value })}
          >
            <option value="">Select Dealer</option>
            {dealers.map((d) => (
              <option key={d.id} value={d.id}>{d.name}</option>
            ))}
          </select>
        </div>

        <div>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setForm({ ...form, image: e.target.files && e.target.files[0] ? e.target.files[0] : null })}
          />
          <small>Optional: attach vehicle image</small>
        </div>

        <div style={{ marginTop: 8 }}>
          <button type="submit" disabled={submitting}>
            {submitting ? 'Adding...' : 'Add Vehiclee'}
          </button>
        </div>
      </form>

      {loading ? (
        <p>Loading vehicles...</p>
      ) : error ? (
        <div style={{ color: 'red', marginBottom: 12 }}>{error}</div>
      ) : (
        <ul>
          {vehicles.map((v) => (
            <li key={v.id} style={{ marginBottom: 8 }}>
              {v.model} - ₹{v.price} ({v.vehicleStatus}) [{v.dealer?.name || `Dealer #${v.dealerId || 'N/A'}`}]
              <button onClick={() => handleDelete(v.id)} style={{ marginLeft: 8 }}>Delete</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default VehiclePage;
// ...existing code...