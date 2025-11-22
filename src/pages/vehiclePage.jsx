
import React, { useEffect, useState } from 'react';
import { getVehicles, createVehicle, deleteVehicle } from '../api/vehicleApi';
import { getDealers } from '../api/dealerApi';

function VehiclePage() {
  const [vehicles, setVehicles] = useState([]);
  const [dealers, setDealers] = useState([]);
  const [form, setForm] = useState({ model: '', price: '', vehicleStatus: 'AVAILABLE', dealerId: '' });
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchVehicles();
    fetchDealers();

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
     
      if (form.image instanceof File) {
        const fd = new FormData();
        fd.append('model', form.model);
        fd.append('price', form.price);
        fd.append('vehicleStatus', form.vehicleStatus);
        fd.append('dealerId', form.dealerId);
        // fd.append('image', form.image);

       
        const resp = await fetch('api/vehicles', {
          method: 'POST',
          body: fd
        });

        if (!resp.ok) {
          const text = await resp.text();
          throw new Error(text || `HTTP ${resp.status}`);
        }
      } else {
 
        await createVehicle({
          model: form.model,
          price: form.price,
          vehicleStatus: form.vehicleStatus,
          dealer: { id: form.dealerId }
         
        });
      }

   
      await fetchVehicles();
      setForm({ model: '', price: '', vehicleStatus: 'AVAILABLE', dealerId: '' });
    } catch (err) {
      console.error('handleSubmit error', err);
   
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
  <div className="max-w-3xl mx-auto mt-10 p-6 bg-white shadow-xl rounded-xl">
    <h2 className="text-2xl font-bold mb-6 text-center">Vehicle Management</h2>

    {/* Form */}
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 mb-8">

      {/* Model */}
      <input
        name="model"
        value={form.model}
        onChange={(e) => setForm({ ...form, model: e.target.value })}
        placeholder="Model"
        className="border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      {/* Price */}
      <input
        name="price"
        type="number"
        value={form.price}
        onChange={(e) => setForm({ ...form, price: e.target.value })}
        placeholder="Price"
        className="border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      {/* Status */}
      <select
        value={form.vehicleStatus}
        onChange={(e) =>
          setForm({ ...form, vehicleStatus: e.target.value })
        }
        className="border rounded-lg p-3 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="AVAILABLE">AVAILABLE</option>
        <option value="SOLD">SOLD</option>
      </select>

      {/* Dealer */}
      <select
        value={form.dealerId}
        onChange={(e) =>
          setForm({ ...form, dealerId: e.target.value })
        }
        className="border rounded-lg p-3 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="">Select Dealer</option>
        {dealers.map((d) => (
          <option key={d.id} value={d.id}>
            {d.name}
          </option>
        ))}
      </select>

      {/* Image Upload */}
      {/* <div>
        <input
          type="file"
          accept="image/*"
          onChange={(e) =>
            setForm({
              ...form,
              image:
                e.target.files && e.target.files[0]
                  ? e.target.files[0]
                  : null,
            })
          }
          className="block w-full text-sm text-gray-700 border rounded-lg cursor-pointer bg-gray-50 p-2"
        />
        <small className="text-gray-500">Optional: attach vehicle image</small>
      </div> */}

      {/* Submit */}
      <button
        type="submit"
        disabled={submitting}
        className={`p-3 rounded-lg text-white transition ${
          submitting
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-blue-600 hover:bg-blue-700"
        }`}
      >
        {submitting ? "Adding..." : "Add Vehicle"}
      </button>
    </form>

    {/* Vehicle List */}
{loading ? (
  <p className="text-center text-gray-600">Loading vehicles...</p>
) : error ? (
  <div className="text-red-600 mb-4 font-medium">{error}</div>
) : (
  <ul className="space-y-4">
    {vehicles.map((v) => (
      <li
        key={v.id}
        className="flex justify-between items-center bg-gray-100 p-4 rounded-lg shadow"
      >
        <div>
          <p className="font-semibold">{v.model}</p>
          <p className="text-sm text-gray-700">₹{v.price}</p>
          <p className="text-xs text-gray-600">{v.vehicleStatus}</p>

          <p className="text-xs mt-1 text-gray-500">
            Dealer:{" "}
            {v.dealer?.name
              ? v.dealer.name
              : v.dealer?.id
              ? `#${v.dealer.id}`
              : "Dealer N/A"}
          </p>
        </div>

        <button
          onClick={() => handleDelete(v.id)}
          className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
        >
          Delete
        </button>
      </li>
    ))}
  </ul>
)}
  </div>
);

}

export default VehiclePage;
